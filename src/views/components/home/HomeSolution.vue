<!--风网解算-->
<script setup>
	import { homeSolution } from '@/api/request/home/homeSolution'
	import useMenuItemPosition from '@/hooks/useMenuItemPosition'
	import { useThreeModelData } from '@/hooks/useThreeModelData'

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

	const { roadAllList, modelSize } = useThreeModelData()

	watch(
		() => [checkedWind.value, checkedWindPressure.value, checkedWindAge.value],
		() => {
			splitText()
		},
	)
	const splitText = () => {
		let fontList = []
		for (let i = 0; i < roadAllList.value.length; i++) {
			const wind = roadAllList.value[i]
			if (wind.modelWindShow === '0') continue
			let airQuantity = checkedWind.value ? `解算风量：${wind.airVolume ?? '-'}m3/min` : ''
			let windage = checkedWindAge.value ? `风阻：${wind.ventR ?? '-'}m/s` : ''
			let windPressure = checkedWindPressure.value ? `风压：${wind.airPressure ?? '-'}Kpa` : ''
			let text = `${airQuantity} ${windage} ${windPressure}`
			// 添加解算数据
			fontList.push({
				parent: wind.code,
				text: text,
				color: '#000',
				size: 1 * modelSize.value,
				height: 7 * modelSize.value,
				planeColor: '#00ff00',
			})
			//   添加人工实测风量
			let text2 = wind.personQ
				? `人工实测风量：${wind.personQ}m3/min  实时风量：${wind.airVolume}m3/min`
				: ''
			if (text2) {
				fontList.push({
					parent: wind.code,
					text: text2,
					color: '#000',
					size: 1 * modelSize.value,
					height: 4 * modelSize.value,
					planeColor: '#00ffff',
				})
			}
			//  人工测量时间
			let text3 = wind.personQTime ? `人工测量时间：${wind.personQTime}` : ''
			if (text3) {
				fontList.push({
					parent: wind.code,
					text: text3,
					color: '#000',
					size: 1 * modelSize.value,
					height: 1 * modelSize.value,
					planeColor: '#005aff',
				})
			}
		}
		emits('loadText', fontList)
	}
	onBeforeUnmount(() => {
		emits('cleanText')
	})
	splitText()
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
