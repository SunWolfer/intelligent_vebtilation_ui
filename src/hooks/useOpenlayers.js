import * as ol from 'openlayers'
export const useOpenlayers = () => {
	const mapRef = ref(null)
	// 地图数据
	const mapData = ref({})
	//   地图范围
	const textExtent = ref([])
	//   地图图层
	const iconLayer = ref({})
	// 地图缩放倍数
	const zoom = ref(1)
	// 地图附加图层
	const layerOne = ref({})
	const layerTwo = ref({})
	const layerThree = ref({})
	//   地图数据列表
	const datalayerList = ref([])
	// 地图参数
	const interactions = ref({})

	// 初始化地图图层
	function initMap() {
		let layers = getLayers()
		iconLayer.value = newLayers()
		layerOne.value = newLayers()
		layerTwo.value = newLayers()
		layerThree.value = newLayers()
		layers.push(iconLayer.value, layerOne.value, layerTwo.value, layerThree.value)

		let mapProjection = new ol.proj.Projection({
			code: 'EPSG:404000',
			units: 'degrees',
			extent: textExtent.value,
		})
		mapData.value = new ol.Map({
			layers: layers,
			target: mapRef.value,
			view: new ol.View({
				projection: mapProjection,
				center: ol.extent.getCenter(textExtent.value),
				zoom: zoom.value,
				extent: textExtent.value,
			}),
			controls: ol.control.defaults({
				attribution: false,
				rotate: false,
				zoom: false,
			}),
			interactions: ol.interaction.defaults(interactions.value),
		})
		mapData.value.render()
	}

	//   获取初始化图层列表
	function getLayers() {
		let layers = []
		for (let i = 0; i < datalayerList.value.length; i++) {
			let tData = datalayerList.value[i]
			if (tData.type === 'img') {
				let projection = new ol.proj.Projection({
					code: 'xkcd-image',
					units: 'pixels',
					extent: textExtent.value,
				})
				let temLayer = new ol.layer.Image({
					source: new ol.source.ImageStatic({
						url: `${tData.paramlayer}`,
						projection: projection,
						imageExtent: textExtent.value,
					}),
				})
				layers.push(temLayer)
			} else if (tData.type === 'wms') {
				let temLayer = new ol.layer.Tile({
					source: new ol.source.TileWMS({
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
	//   初始化图层
	function newLayers() {
		return new ol.layer.Vector({
			source: new ol.source.Vector(),
		})
	}

	// 获取样式
	function setStyle(url) {
		return new ol.style.Style({
			image: new ol.style.Icon({
				anchor: [0.5, 0.5],
				src: url,
				scale: 0.5,
			}),
		})
	}

	function setFeature({ data = {}, point = [], url }) {
		let feature = new ol.Feature({
			value: JSON.stringify(data),
			geometry: new ol.geom.Point(point),
		})
		let style = setStyle(url)
		feature.setStyle(style)
		return feature
	}
	// 单击事件
	function singleClick(mapData) {
		mapData.value.on('singleclick', function (e) {
			let pixel = mapData.value.getEventPixel(e.originalEvent)
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
