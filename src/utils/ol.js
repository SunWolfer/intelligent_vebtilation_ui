import 'ol/ol.css'
import { Map as olMap, View, Feature, Overlay } from 'ol'
import Projection from 'ol/proj/Projection'
import { Image, Tile, Vector } from 'ol/layer'
import { ImageStatic, TileWMS, Vector as SourceVector } from 'ol/source'
import * as control from 'ol/control'
import * as extent from 'ol/extent'
import * as interaction from 'ol/interaction'
import { Style, Icon, Fill, Stroke } from 'ol/style'
import { Point, LineString, Polygon } from 'ol/geom'
import FlowLine from 'ol-ext/style/FlowLine'
import Path from 'ol-ext/featureanimation/Path.js'
import FeatureAnimation from 'ol-ext/featureanimation/FeatureAnimation.js'
import { unByKey as ol_Observable_unByKey } from 'ol/Observable'
import { easeIn } from 'ol/easing'

let myFeatureAnimation = new FeatureAnimation()

/**
 * 初始化地图
 * @param {*} myExtent 地图范围
 * @param {*} ids dom的id
 * @param {*} mapData 地图对象
 * @param {*} blankLayerList 显示图层列表
 * @param {*} datalayerList 待添加图层列表
 * @param {*} zoom 层级
 * @param {*} interactions 控制
 */
export function initMap(
	myExtent,
	ids,
	mapData,
	blankLayerList,
	datalayerList,
	zoom = 2,
	interactions = {},
) {
	let layers = getLayers(myExtent, datalayerList)

	for (let i = 0; i < blankLayerList.length; i++) {
		let source = new SourceVector()
		blankLayerList[i].value = new Vector({
			source: source,
		})
		layers.push(blankLayerList[i].value)
	}

	let mapProjection = new Projection({
		code: 'EPSG:404000',
		units: 'degrees',
		extent: myExtent,
	})
	mapData.value = new olMap({
		layers: layers,
		target: ids,
		view: new View({
			projection: mapProjection,
			center: extent.getCenter(myExtent),
			zoom: zoom,
			extent: myExtent,
		}),
		controls: control.defaults({
			attribution: false,
			rotate: false,
			zoom: false,
		}),
		interactions: interaction.defaults(interactions),
	})
	mapData.value.render()
}

/**
 * 生成地图图层
 * @param {*} myExtent 图层范围
 * @param {*} datalayerList 图层数据列表
 * [{
			paramlayer: '图层名',
			type: 'wms' 类型
		}]
 * @returns
 */
function getLayers(myExtent, datalayerList) {
	let layers = []
	for (let i = 0; i < datalayerList.length; i++) {
		let tData = datalayerList[i]
		if (tData.type === 'img') {
			let projection = new Projection({
				code: 'xkcd-image',
				units: 'pixels',
				extent: myExtent,
			})
			let temLayer = new Image({
				source: new ImageStatic({
					url: `${tData.paramlayer}`,
					projection: projection,
					imageExtent: myExtent,
				}),
			})
			layers.push(temLayer)
		} else {
			let temLayer = new Tile({
				source: new TileWMS({
					url: import.meta.env.VITE_APP_MAP_URL + '/geoserver/coalmap/wms',
					params: {
						LAYERS: tData.paramlayer,
						TILED: false,
						wrapX: false,
						VERSION: '1.1.0',
					},
					serverType: 'geoserver',
				}),
			})
			layers.push(temLayer)
		}
	}
	return layers
}

function myStyle(url) {
	return new Style({
		image: new Icon({
			anchor: [0.5, 1],
			src: import.meta.env.BASE_URL + url,
			scale: 0.5,
		}),
	})
}
/**
 * 创建爱feature
 * @param {Object} data
 */
export function setFeature(data) {
	let feature = new Feature({
		name: data.id,
		value: JSON.stringify(data),
		geometry: new Point([data.xAxis, data.yAxis]),
	})

	return feature
}
/**
 * 创建爱feature
 * @param {Object} coordinate 坐标
 */
export function setTrmFeature(coordinate) {
	let feature = new Feature({
		type: 'icon',
		geometry: new Point(coordinate),
	})
	return feature
}
/**
 * 创建overlay
 * @param {*} vid dom 的id
 * @param {*} val 坐标对象
 */
export function setOverlay(vid, val) {
	let container = document.getElementById(vid)
	let overlay = new Overlay({
		id: `odom${vid}`,
		element: container,
		autoPan: true,
		positioning: 'bottom-left',
		autoPanAnimation: {
			duration: 250,
		},
	})
	overlay.setPosition([parseFloat(val.xAxis), parseFloat(val.yAxis)])

	return overlay
}

/**
 * 创建生成div
 * @param ids
 * @param data
 * @param imgurl
 */
export function addAntubuilder(ids, data, imgurl, mapData) {
	let _overlay = document.getElementById(ids)
	let sElement = document.createElement('div')
	sElement.id = 'overlay' + data.id
	sElement.style.width = `${data.size[0]}px`
	sElement.style.height = `${data.size[1]}px`
	sElement.style.cursor = `${data.pointer ? 'pointer' : ''}`
	sElement.style.backgroundSize = 'contain'
	sElement.x = data.xAxis
	sElement.y = data.yAxis
	sElement.style.backgroundImage = 'url(' + imgurl + ')'
	_overlay.appendChild(sElement)
	let _lyr = new Overlay({
		id: 'overlay' + data.id,
		positioning: 'center-center',
		element: document.getElementById('overlay' + data.id),
	})
	mapData.value.addOverlay(_lyr)
	nextTick(() => {
		_lyr.setPosition([data.xAxis, data.yAxis])
	})
}

// 清除overlayer覆盖物
export function clearOverlay(mapData) {
	let olLyrs = mapData.value.getOverlays().getArray()
	let olLyrsLength = olLyrs.length
	for (let i = 0; i < olLyrsLength; i++) {
		olLyrs[i].setPosition(undefined)
	}
	mapData.value.getOverlays().clear()
}

export function monitorsbclick(mapData) {
	mapData.value.on('singleclick', function (e) {
		let pixel = mapData.value.getEventPixel(e.originalEvent)
		console.log(e.coordinate)
	})
}

export function setBottomPoper(val, mapData) {
	let vid = val.id + ''
	let container = document.getElementById(vid)
	let overlay = new Overlay({
		id: `odom${vid}`,
		element: container,
		autoPan: true,
		positioning: 'bottom-center',
		autoPanAnimation: {
			duration: 250,
		},
	})
	const posList = [parseFloat(val.xAxis), parseFloat(val.yAxis)]
	if (posList.length) overlay.setPosition(posList)
	mapData.value.addOverlay(overlay)
}

export function creatLine(pointList, multiple, icons, reverseicons, idName, mapData) {
	for (let i = 0; i < pointList.length - 1; i++) {
		let primeX = pointList[i + 1][0] - pointList[i][0]
		let primeY = pointList[i + 1][1] - pointList[i][1]
		// 取x,y绝对值
		let xmis = Math.abs(primeX)
		let ymis = Math.abs(primeY)
		// 依据x/y生成点
		let acc = xmis > ymis ? xmis : ymis
		// 生成点的个数
		let cirNum = parseInt(acc / multiple)
		let iconList = []
		// 两点距离小于设定元距离情况下添加一个点
		if (cirNum > 0) {
			for (let a = 0; a < cirNum; a++) {
				iconList.push({
					xAxis: pointList[i][0] + a * (primeX / cirNum),
					yAxis: pointList[i][1] + a * (primeY / cirNum),
				})
			}
		} else {
			iconList.push({
				xAxis: pointList[i][0],
				yAxis: pointList[i][1],
			})
		}
		// 添加结束坐标
		if (i + 1 === pointList.length - 1) {
			iconList.push({
				xAxis: pointList[i + 1][0],
				yAxis: pointList[i + 1][1],
			})
		}
		for (let b = 0; b < iconList.length; b++) {
			addAntubuilder(
				idName,
				{
					id: Math.random() * 100,
					xAxis: iconList[b].xAxis,
					yAxis: iconList[b].yAxis,
					size: [25, 25],
				},
				primeX >= 0 ? icons : reverseicons,
				mapData,
			)
		}
	}
}

const colors = [
	'rgba(130,50,130,0.8)',
	'rgba(255,0,0,0.8)',
	'rgba(255,150,0,0.8)',
	'rgba(255,255,0,0.8)',
	'rgba(0,255,0,0.8)',
]

/**
 * 渐变色线段
 * @returns {Feature<Polygon>}
 * @param leftTop
 * @param leftBottom
 * @param rightBottom
 * @param rightTop
 * @param colorArea
 */
export function gradientColorLine(leftTop, leftBottom, rightBottom, rightTop, colorArea) {
	console.log(colorArea)
	let feature = new Feature({
		type: 'Polygon',
		geometry: new Polygon([[leftTop, leftBottom, rightBottom, rightTop, leftTop]]),
	})
	const newStyle = new Style({
		renderer(coordinates, state) {
			const pointsX = coordinates[0].map((obj) => obj[0])
			const pointsY = coordinates[0].map((obj) => obj[1])
			let startPoint = [(pointsX[0] + pointsX[1]) / 2, (pointsY[0] + pointsY[1]) / 2]
			let endPoint = [(pointsX[3] + pointsX[2]) / 2, (pointsY[3] + pointsY[2]) / 2]
			const ctx = state.context
			const grad = ctx.createLinearGradient(pointsX[0], pointsY[0], pointsX[3], pointsY[3])

			let perce = parseFloat(1 / colorArea.length)
			for (let i = 0; i < colorArea.length - 1; i++) {
				grad.addColorStop(i * perce, colors[colorArea[i]])
			}
			grad.addColorStop(1, colors[colorArea[colorArea.length - 1]])
			ctx.beginPath()
			ctx.fillStyle = grad
			ctx.moveTo(coordinates[0][0][0], coordinates[0][0][1])
			for (let i = 0; i < coordinates[0].length; i++) {
				ctx.lineTo(coordinates[0][i][0], coordinates[0][i][1])
			}
			ctx.fill()
		},
	})

	feature.setStyle(newStyle)
	return feature
}

/**
 * 渐变色线Style
 * @param color
 * @param color2
 * @param width
 * @returns {FlowLine}
 */
export function resetStyle(color, color2, width) {
	return new FlowLine({
		color: color,
		color2: color2,
		width: width,
		width2: width,
	})
}

const CH4Style = myStyle2(`img/CH4.png`)
const ClO2Style = myStyle2(`img/ClO2.png`)
const COStyle = myStyle2(`img/CO.png`)
const CO2Style = myStyle2(`img/CO2.png`)
function myStyle2(url) {
	return new Style({
		image: new Icon({
			anchor: [0.5, 0.5],
			src: import.meta.env.BASE_URL + url,
			scale: 0.2,
		}),
	})
}
const iconTypeMap = new Map([
	['1', CH4Style],
	['2', ClO2Style],
	['3', COStyle],
	['4', CO2Style],
])
export function animateFeature(point, layer, mapData, iconType) {
	let path = readyPath(point, layer)
	let f, anim
	let fStyle = iconTypeMap.get(iconType)
	f = new Feature(new Point(point[0]))
	f.setStyle(fStyle)
	layer.value.getSource().addFeature(f)

	anim = new Path({
		path: path,
		easing: easeIn,
		speed: 0.1,
	})
	setTimeout(() => {
		layer.value.animateFeature(f, anim)
	}, 0)
	let listener = anim.on('animationend', function (e) {
		if (e.feature === f) {
			// Remove feature on end
			layer.value.getSource().removeFeature(f)
			ol_Observable_unByKey(listener)
		}
	})
	adaptZoom(mapData, f, 10, fStyle)
}

export function removeListener(mapData, layer) {
	layer.value
		.getSource()
		.getFeatures()
		.forEach((feature) => {
			layer.value.getSource().removeFeature(feature)
		})

	layer.value.getSource().clear()
	mapData.value.removeLayer(layer.value)

	let source = new SourceVector()
	layer.value = new Vector({
		source: source,
	})
	nextTick(() => {
		mapData.value.addLayer(layer.value)
	})
}

function adaptZoom(mapData, anchor, size, style) {
	mapData.value.getView().on('change:resolution', function () {
		// 重新设置图标的缩放率，基于层级10来做缩放
		style.getImage().setScale(this.getZoom() / size)
		anchor.setStyle(style)
	})
}

function readyPath(point, layer) {
	let path = new Feature({
		type: 'LineString',
		geometry: new LineString(point),
	})
	let style = new Style({
		stroke: new Stroke({
			color: [0, 0, 0, 0],
			width: 1,
		}),
	})
	path.setStyle(style)
	layer.value.getSource().addFeature(path)
	return path
}
