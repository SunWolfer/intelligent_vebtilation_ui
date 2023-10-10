<script setup>
	import { homeVisualAngle } from '@/api/request/home/homeVisualAngle'
	import useHomeMenu from '@/hooks/useHomeMenu'
	import useMenuItemPosition from '@/hooks/useMenuItemPosition'
	import HomeWindBranch from '@/views/components/home/HomeWindBranch.vue'
	import HomeVenNetwork from '@/views/components/home/HomeVenNetwork.vue'

	const props = defineProps({
		domLeft: {
			type: Number,
			default: 0,
		},
		domBottom: {
			type: Number,
			default: 90,
		},
		selectCode: {
			type: String,
			default: '',
		},
	})

	const { domStyle } = useMenuItemPosition(props.domLeft, props.domBottom)

	const { checkedWindPath, checkedVenNetwork } = homeVisualAngle()
	const { dislodgeDomStyle } = useHomeMenu()

	const emits = defineEmits(['chooseWindFull'])
	// 选中风路分支图
	const chooseFullData = (row) => {
		emits('chooseWindFull', row)
	}
</script>

<template>
	<div class="home_visual_bg home_menu_item_bg" :style="{ ...domStyle, ...dislodgeDomStyle }">
		<div class="home_visual_btn">
			<div class="home_visual_icon_1"></div>
			<span>风路分支图</span>
			<el-checkbox v-model="checkedWindPath" />
		</div>
		<div class="home_visual_btn">
			<div class="home_visual_icon_2"></div>
			<span>通风网络图</span>
			<el-checkbox v-model="checkedVenNetwork" />
		</div>
	</div>
	<!--  风路分支图-->
	<div v-if="checkedWindPath" class="other_wind_path">
		<home-wind-branch @choose-wind-full="chooseFullData" :select-code="selectCode" />
	</div>
	<!--  通风网络图-->
	<div v-if="checkedVenNetwork" class="other_wind_net">
		<home-ven-network />
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_menu';
	@import '@/assets/styles/home/home_visual_angle';
</style>
