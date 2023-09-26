<script setup>
	import IHomeMenu from '@/views/components/home/HomeMenu.vue'
	import HomeIcon from '@/views/components/home/HomeIcon.vue'
	import { home } from '@/api/request/home'
	import HomeThree from '@/views/components/home/HomeThree.vue'
	import HomeRightMess from '@/views/components/home/HomeRightMess.vue'
	import { homeMenu } from '@/api/request/home/homeMenu'
	import HomeRoam from '@/views/components/home/HomeRoam.vue'
	import HomeSolution from '@/views/components/home/HomeSolution.vue'
	import HomeReverseWind from '@/views/components/home/HomeReverseWind.vue'
	import HomeVisualAngle from '@/views/components/home/HomeVisualAngle.vue'
	import useHomeMenu from '@/hooks/useHomeMenu'
	import HomeDisPreRoute from '@/views/components/home/HomeDisPreRoute.vue'
	import HomeDisaster from '@/views/components/home/HomeDisaster.vue'
	import { useThreeModelData } from '@/hooks/useThreeModelData'
	import HomeModelType from '@/views/components/home/HomeModelType.vue'
  import {useInteraction} from "@/hooks/useInteraction";

	const {
		threeRef,
		moveCamera,
		loadText,
		cleanText,
		setDisaster,
		setPersonnel,
		imitateRoute,
		changeDisasterType,
		generateDisaster,
	} = home()
	// 首页菜单
	const {
		showEquipmentIndex,
		showInspectionRoaming,
		showWindNetworkCalculation,
		showMultiplePerspectives,
		showReverseWindSimulation,
		showDisasterPreventionRoute,
		showDisasterSimulation,
	} = homeMenu()
	const { dislodgeDomStyle } = useHomeMenu()
	const { refreshModel,refreshModelFun } = useThreeModelData()

  const {getSelectionRows,watchDomRef,selectCode, getSelectionTunnel} = useInteraction()
  watchDomRef?.(threeRef)

  onActivated(() => {
    refreshModelFun?.()
  })

</script>

<template>
	<div class="app-container">
		<!--    首页3D图-->
		<HomeThree v-if="refreshModel" ref="threeRef" @choose-tunnel="getSelectionTunnel" />
		<!--  首页左侧装饰  -->
		<div class="home_left_decorate" :style="dislodgeDomStyle"></div>
		<!--    首页右侧信息-->
		<HomeRightMess @move-camera="moveCamera" />
		<!--    首页底部菜单-->
		<IHomeMenu :style="dislodgeDomStyle" />
		<!--  设备索引-->
		<HomeIcon v-if="showEquipmentIndex" @move-camera="moveCamera" :style="dislodgeDomStyle" />
		<!--    巡检漫游-->
		<HomeRoam v-if="showInspectionRoaming" :dom-left="742" @move-camera="moveCamera" />
		<!--    风网解算-->
		<HomeSolution
			v-if="showWindNetworkCalculation"
			:dom-left="900"
			@load-text="loadText"
			@clean-text="cleanText"
			:style="dislodgeDomStyle"
		/>
		<!--    多视角-->
		<HomeVisualAngle v-if="showMultiplePerspectives" :dom-left="1100" @choose-wind-full="getSelectionRows" :select-code="selectCode" />
		<!--    反风模拟-->
		<HomeReverseWind v-if="showReverseWindSimulation" :dom-left="1270" />
		<!--    避灾路线模拟-->
		<HomeDisPreRoute
			v-if="showDisasterPreventionRoute"
			:dom-left="1382"
			@set-disaster="setDisaster"
			@set-personnel="setPersonnel"
			@imitate-route="imitateRoute"
			@change-disaster-type="changeDisasterType"
		/>
		<!--    灾害模拟-->
		<home-disaster
			v-if="showDisasterSimulation"
			:dom-left="1550"
			@set-disaster="setDisaster"
			@change-disaster-type="changeDisasterType"
			@generate-disaster="generateDisaster"
		/>
		<!--    模式切换-->
		<HomeModelType :top="40" :right="500" />
	</div>
</template>
<style scoped lang="scss">
	@import '@/assets/styles/home/index';
</style>
