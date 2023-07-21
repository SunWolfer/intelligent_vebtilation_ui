<!--巡检漫游-->
<script setup>
	import { homeRoam } from '@/api/request/home/homeRoam'
	import { MenuTypes } from '@/api/request/home/menuType'
  import useHomeMenu from "@/hooks/useHomeMenu";
	const emits = defineEmits(['moveCamera'])

	const { chooseBtn, changeBtn, domStyle } = homeRoam(emits)
  const {dislodgeDomStyle} = useHomeMenu()
</script>

<template>
	<div class="home_title_roam home_menu_item_bg" :style="{...domStyle,...dislodgeDomStyle}">
		<div class="home_roam_title">
			<div class="home_roam_title_1">巡检路线</div>
			<div class="home_roam_title_2">操作</div>
		</div>
		<div class="home_roam_body">
			<div class="home_roam_body_1">全部设备状态巡检</div>
			<div
				class="home_roam_body_2"
				:class="MenuTypes.ONE === chooseBtn ? 'home_roam_text_active' : ''"
				@click="changeBtn(MenuTypes.ONE)"
			>
				巡检
			</div>
			<div
				class="home_roam_body_2"
				:class="MenuTypes.TWO === chooseBtn ? 'home_roam_text_active' : ''"
				@click="changeBtn(MenuTypes.TWO)"
			>
				循环巡检
			</div>
		</div>
		<div class="home_roam_body">
			<div class="home_roam_body_1">风窗状态巡检</div>
			<div
				class="home_roam_body_2"
				:class="MenuTypes.THREE === chooseBtn ? 'home_roam_text_active' : ''"
				@click="changeBtn(MenuTypes.THREE)"
			>
				巡检
			</div>
			<div
				class="home_roam_body_2"
				:class="MenuTypes.FOUR === chooseBtn ? 'home_roam_text_active' : ''"
				@click="changeBtn(MenuTypes.FOUR)"
			>
				循环巡检
			</div>
		</div>
	</div >
  <div class="drive_bg" v-if="chooseBtn > 0"></div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_menu';
	@import '@/assets/styles/home/home_roam';
</style>
