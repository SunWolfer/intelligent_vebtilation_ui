<script setup>
	import { initMap } from '@/utils/ol'
	import mapImg from '@/assets/images/windControlAssMaking/gas.png'

	const mapData = ref({})
	const iconLayer = ref({})
	const texTent = [0, 0, 1023, 673]

	function initialize() {
		let datalayerList = [
			{
				paramlayer: mapImg,
				type: 'img',
			},
		]
		initMap(texTent, 'coalmap', mapData, [iconLayer], datalayerList)
	}
	onMounted(() => {
		initialize()
	})
</script>

<template>
	<div class="fullDom" id="coalmap"></div>
</template>

<style scoped lang="scss"></style>
