<script setup>
	import mapImg from '@/assets/images/windControlAssMaking/gas.png'
	import { useOpenLayers } from '@/hooks/useOpenLayers'

	const { mapRef, textExtent, zoom, datalayerList, initMap } = useOpenLayers()
	zoom.value = 2.5
	textExtent.value = [0, 0, 1023, 673]
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
