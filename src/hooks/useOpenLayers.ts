import 'ol/ol.css'
import { Map as olMap, View, Feature } from 'ol'
import type { DefaultsOptions } from 'ol/interaction/defaults'
import type { Extent } from 'ol/extent'
import Projection from 'ol/proj/Projection'
import { Image, Layer, Tile, Vector } from 'ol/layer'
import { ImageStatic, TileWMS, Vector as SourceVector } from 'ol/source'
import * as control from 'ol/control'
import * as extent from 'ol/extent'
import * as interaction from 'ol/interaction'
import { Style, Icon } from 'ol/style'
import { Point } from 'ol/geom'

export interface datalayer {
	type: string
	paramlayer: string
}

export const useOpenLayers = () => {
	const mapRef = ref<HTMLElement>()
	// 地图数据
	const mapData = ref<olMap>()
	//   地图范围
	const textExtent = ref<Extent>([])
	//   地图图层
	const iconLayer = ref<Layer>()
	// 地图缩放倍数
	const zoom = ref<number>(1)
	// 地图附加图层
	const layerOne = ref<Layer>()
	const layerTwo = ref<Layer>()
	const layerThree = ref<Layer>()
	//   地图数据列表
	const datalayerList = ref<datalayer[]>([])
	// 地图参数
	const interactions = ref<DefaultsOptions>()

	// 初始化地图图层
	function initMap() {
		const layers = getLayers()
		iconLayer.value = newLayers()
		layerOne.value = newLayers()
		layerTwo.value = newLayers()
		layerThree.value = newLayers()
		layers.push(iconLayer.value, layerOne.value, layerTwo.value, layerThree.value)

		const mapProjection = new Projection({
			code: 'EPSG:404000',
			units: 'degrees',
			extent: textExtent.value,
		})
		mapData.value = new olMap({
			layers: layers,
			target: mapRef.value,
			view: new View({
				projection: mapProjection,
				center: extent.getCenter(textExtent.value),
				zoom: zoom.value,
				extent: textExtent.value,
				minZoom: 0.1,
			}),
			controls: control.defaults({
				attribution: false,
				rotate: false,
				zoom: false,
			}),
			interactions: interaction.defaults(interactions.value),
		})
		mapData.value.render()
	}

	//   获取初始化图层列表
	function getLayers() {
		const layers: Layer[] = []
		for (let i = 0; i < datalayerList.value.length; i++) {
			const tData = datalayerList.value[i]
			if (tData.type === 'img') {
				const projection = new Projection({
					code: 'static-image',
					units: 'pixels',
					extent: textExtent.value,
				})
				const temLayer = new Image({
					source: new ImageStatic({
						url: tData.paramlayer,
						projection: projection,
						imageExtent: textExtent.value,
					}),
				})
				layers.push(temLayer)
			} else if (tData.type === 'wms') {
				const temLayer = new Tile({
					source: new TileWMS({
						url: window.SITE_CONFIG.mapUrl + '/geoserver/coalmap/wms',
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
	//   初始化图层
	function newLayers() {
		return new Vector({
			source: new SourceVector(),
		})
	}

	// 获取样式
	function setStyle(url: string) {
		return new Style({
			image: new Icon({
				anchor: [0.5, 0.5],
				src: url,
				scale: 0.5,
			}),
		})
	}

	function setFeature({ data = {}, point = [], url }) {
		const feature = new Feature({
			value: JSON.stringify(data),
			geometry: new Point(point),
		})
		const style = setStyle(url)
		feature.setStyle(style)
		return feature
	}
	// 单击事件
	function singleClick() {
		mapData.value?.on('singleclick', function (e) {
			mapData.value?.getEventPixel(e.originalEvent)
			console.log(e.coordinate)
		})
	}

	return {
		mapRef,
		mapData,
		textExtent,
		iconLayer,
		layerOne,
		layerTwo,
		layerThree,
		zoom,
		datalayerList,
		interactions,
		initMap,
		getLayers,
		newLayers,
		setStyle,
		setFeature,
		singleClick,
	}
}
