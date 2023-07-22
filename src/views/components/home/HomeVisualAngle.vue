<script setup>
	import { homeVisualAngle } from '@/api/request/home/homeVisualAngle'
	import WindFloorPlanMap from '@/views/components/home/WindFloorPlanMap.vue'
	import useHomeMenu from '@/hooks/useHomeMenu'
	import useMenuItemPosition from '@/hooks/useMenuItemPosition'

	const { domStyle } = useMenuItemPosition(299)
	const { checkedWindPath, checkedVenNetwork } = homeVisualAngle()
	const { dislodgeDomStyle } = useHomeMenu()
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
		<span class="other_title">风路分支图</span>
		<div class="other_wind_path_body">
			<div class="other_wind_path_body_item">
				<div class="other_wind_path_body_item_1">回风井</div>
				<div class="other_wind_path_body_item_2">风量</div>
				<div class="other_wind_path_body_item_3"></div>
				<div class="other_wind_path_body_item_2">巷道</div>
				<div class="other_wind_path_body_item_4">
					<div class="other_item_4_icon_1">回</div>
					<div class="other_item_4_text">10-11</div>
					<div class="other_item_4_icon_2">进</div>
					<div class="other_item_4_text">10-12</div>
				</div>
			</div>
		</div>
	</div>
	<!--  通风网络图-->
	<div v-if="checkedVenNetwork" class="other_wind_net">
		<span class="other_title">通风网络图</span>
		<wind-floor-plan-map />
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_menu';
	@import '@/assets/styles/home/home_visual_angle';
</style>
