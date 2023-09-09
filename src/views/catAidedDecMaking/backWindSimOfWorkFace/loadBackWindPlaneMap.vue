<script setup>
	import mapImg from '@/assets/images/catAidedDecMaking/back_wind_plane.png'
	import { useOpenlayers } from '@/hooks/useOpenlayers'

	const { mapRef, textExtent, zoom, datalayerList, initMap } = useOpenlayers()
	zoom.value = 2.5
	textExtent.value = [0, 0, 1882, 886]
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
