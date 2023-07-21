<script setup>
	import { initMap } from '@/utils/ol'

	onMounted(() => {
		initialize()
	})
	const mapData = ref({})
	const iconLayer = ref({})
	const textTent = [2306.015744065793, 1385.2053892506574, 3147.0157440657367, 1979.2053892506574]

	function initialize() {
		let datalayerList = [
			{
				paramlayer: 'coalmap:tunbaowangluoMap',
				type: 'wms',
			},
		]
		initMap(textTent, 'windCoalMap', mapData, [iconLayer], datalayerList, 2.5, {})
	}
</script>

<template>
	<div class="fullDom">
    <div @contextmenu.prevent id="windCoalMap" style="width: 100%; height: 100%"></div>
  </div>
</template>

<style lang="scss" scoped></style>
