<script setup>
	import { initMap } from '@/utils/ol'

	onMounted(() => {
		initialize()
	})
	const mapData = ref({})
	const iconLayer = ref({})
	const textTent = [2306, 1385, 3147, 1979]

	function initialize() {
		let datalayerList = [
			{
				paramlayer: 'coalmap:tunbaowangluoMap',
				type: 'wms',
			},
		]
		initMap(textTent, 'windCoalMap', mapData, [iconLayer], datalayerList, 1, {})
	}
</script>

<template>
	<div class="fullDom">
		<div @contextmenu.prevent id="windCoalMap" style="width: 100%; height: 100%"></div>
	</div>
</template>

<style lang="scss" scoped></style>
