<!--风网解算-->
<script setup>
	import { homeSolution } from '@/api/request/home/homeSolution'
	const emits = defineEmits(['loadText'])
	const { domStyle, checkedWind, checkedWindAge, checkedWindPressure } = homeSolution()

	watch(
		() => [checkedWind.value, checkedWindPressure.value, checkedWindAge.value],
		() => {
			splitText()
		},
	)

	const windTextList = ref([
		{
			parent: '023-043',
			airQuantity: '1235',
			windage: '38.5',
			windPressure: '26.8',
		},
		{
			parent: '128-124',
			airQuantity: '1235',
			windage: '38.5',
			windPressure: '26.8',
		},
	])
	const splitText = () => {
		let fontList = []
		for (let i = 0; i < windTextList.value.length; i++) {
			const wind = windTextList.value[i]
			let airQuantity = checkedWind.value ? `解算风量：${wind.airQuantity}m3/min` : ''
			let windage = checkedWindAge.value ? `风阻：${wind.windage}m/s` : ''
			let windPressure = checkedWindPressure.value ? `风压：${wind.windPressure}Kpa` : ''
			let text = `${airQuantity} ${windage} ${windPressure}`
			fontList.push({
				parent: wind.parent,
				text: text,
				color: '#000',
				size: 300,
				height: 600,
			})
		}
		emits('loadText', fontList)
	}
	onMounted(() => {
		splitText()
	})
</script>

<template>
	<div class="home_title_solution home_menu_item_bg" :style="domStyle">
		<div class="home_title_solution_btn">
			<div class="home_so_icon home_so_icon_1"></div>
			<span>风量</span>
			<el-checkbox v-model="checkedWind" />
		</div>
		<div class="home_title_solution_btn">
			<div class="home_so_icon home_so_icon_2"></div>
			<span>风阻</span>
			<el-checkbox v-model="checkedWindAge" />
		</div>
		<div class="home_title_solution_btn">
			<div class="home_so_icon home_so_icon_3"></div>
			<span>风压</span>
			<el-checkbox v-model="checkedWindPressure" />
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_menu';
	@import '@/assets/styles/home/home_solution';
</style>
