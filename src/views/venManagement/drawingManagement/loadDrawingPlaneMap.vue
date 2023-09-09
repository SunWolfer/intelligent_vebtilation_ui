<script setup>
	import { useOpenlayers } from '@/hooks/useOpenlayers'

	const { mapRef, textExtent, zoom, initMap, iconLayer, setFeature } = useOpenlayers()
	zoom.value = 1
	textExtent.value = [0, 0, 120000, 180000]

	function addFeature() {
		iconLayer.value.getSource().addFeature(
			setFeature?.({
				point: [6000, 9000],
				url: import.meta.env.BASE_URL + 'file/1.svg',
			}),
		)
	}

	onMounted(() => {
		initMap?.()
		addFeature()
	})
</script>

<template>
	<div class="fullDom" ref="mapRef"></div>
</template>

<style scoped lang="scss"></style>
