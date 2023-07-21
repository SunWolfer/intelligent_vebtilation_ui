<script setup>
	import HomeMenu from '@/views/components/home/HomeMenu.vue'
	import HomeIcon from '@/views/components/home/HomeIcon.vue'
	import { home } from '@/api/request/home'
	import HomeThree from '@/views/components/home/HomeThree.vue'
	import HomeRightMess from '@/views/components/home/HomeRightMess.vue'
	import { homeMenu } from '@/api/request/home/homeMenu'
	import HomeRoam from '@/views/components/home/HomeRoam.vue'
	import HomeSolution from '@/views/components/home/HomeSolution.vue'
	import HomeReverseWind from '@/views/components/home/HomeReverseWind.vue'
	import HomeVisualAngle from '@/views/components/home/HomeVisualAngle.vue'
  import useHomeMenu from "@/hooks/useHomeMenu";

	const { threeRef, moveCamera, loadText,redrawingWind } = home()
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
  const {dislodgeDomStyle} = useHomeMenu()
</script>

<template>
	<div class="app-container">
		<!--    首页3D图-->
		<home-three ref="threeRef" />
    <!--  首页左侧装饰  -->
    <div class="home_left_decorate" :style="dislodgeDomStyle"></div>
    <!--    首页右侧信息-->
    <home-right-mess @move-camera="moveCamera" />
    <!--    首页底部菜单-->
    <home-menu :style="dislodgeDomStyle" />
    <!--  设备索引-->
    <home-icon v-if="showEquipmentIndex" @move-camera="moveCamera" :style="dislodgeDomStyle" />
    <!--    巡检漫游-->
    <home-roam v-if="showInspectionRoaming" @move-camera="moveCamera"/>
    <!--    风网解算-->
    <home-solution v-if="showWindNetworkCalculation" @load-text="loadText" :style="dislodgeDomStyle" />
    <!--    多视角-->
    <home-visual-angle v-if="showMultiplePerspectives" :style="dislodgeDomStyle" />
    <!--    反风模拟-->
    <home-reverse-wind v-if="showReverseWindSimulation" :style="dislodgeDomStyle" />
	</div>
</template>
<style scoped lang="scss">
	@import '@/assets/styles/home/index';
</style>
