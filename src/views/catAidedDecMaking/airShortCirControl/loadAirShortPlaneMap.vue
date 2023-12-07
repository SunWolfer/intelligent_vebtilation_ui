<script setup>
	import mapImg from '@/assets/images/catAidedDecMaking/windBg2.png'
	import { useOpenLayers } from '@/hooks/useOpenLayers'

	const { mapRef, textExtent, zoom, datalayerList, initMap } = useOpenLayers()
	zoom.value = 1
	textExtent.value = [0, 0, 1259, 673]
	datalayerList.value = [
		{
			paramlayer: mapImg,
			type: 'img',
		},
	]
	onMounted(() => {
		initMap?.()
	})
</script>

<template>
	<div class="fullDom" ref="mapRef"></div>
</template>

<style scoped lang="scss"></style>
