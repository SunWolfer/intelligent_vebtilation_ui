<script setup>
	import { useOpenLayers } from '@/hooks/useOpenLayers'

	const props = defineProps({
		groupName: {
			type: String,
			default: '',
		},
		extent: {
			type: Array,
			default: [0, 0, 12000, 18000],
		},
	})

	const { mapRef, textExtent, zoom, datalayerList, initMap } = useOpenLayers()
	zoom.value = 3
	textExtent.value = props.extent
	datalayerList.value = [
		{
			type: 'wms',
			paramlayer: 'coalmap:' + props.groupName,
		},
	]

	onMounted(() => {
		initMap?.()
	})
</script>

<template>
	<div class="fullDom" ref="mapRef" style="background-color: #111115"></div>
</template>

<style scoped lang="scss"></style>
