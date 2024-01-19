<!--风网解算-->
<script setup>
	import { homeSolution } from '@/api/request/home/homeSolution'
	import useMenuItemPosition from '@/hooks/useMenuItemPosition'
	import { useThreeModelData } from '@/hooks/useThreeModelData'
	import { useWindNetCalculation } from '@/hooks/useWindNetCalculation'

	const props = defineProps({
		domLeft: {
			type: Number,
			default: 0,
		},
		domBottom: {
			type: Number,
			default: 90,
		},
	})

	const { domStyle } = useMenuItemPosition(props.domLeft, props.domBottom)

	const emits = defineEmits(['loadText', 'cleanText'])
	const { checkedWind, checkedWindAge, checkedWindPressure } = homeSolution()

	const { roadAllList } = useThreeModelData()
	const { fontList, splitText } = useWindNetCalculation()

	watch(
		() => [checkedWind.value, checkedWindPressure.value, checkedWindAge.value],
		() => {
			splitHomeText()
		},
	)
	const splitHomeText = () => {
		splitText?.(roadAllList.value, {
			checkedWind: checkedWind.value,
			checkedWindAge: checkedWindAge.value,
			checkedWindPressure: checkedWindPressure.value,
		})
		emits('loadText', fontList.value)
	}
	onBeforeUnmount(() => {
		emits('cleanText')
	})
	splitHomeText()
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
