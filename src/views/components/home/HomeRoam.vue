<!--巡检漫游-->
<script setup>
	import { homeRoam } from '@/api/request/home/homeRoam'
	import { MenuTypes } from '@/api/request/home/menuType'
	import useHomeMenu from '@/hooks/useHomeMenu'
	import useMenuItemPosition from '@/hooks/useMenuItemPosition'

  const props = defineProps({
    domLeft:{
      type:Number,
      default: 0
    },
    domBottom: {
      type: Number,
      default: 90
    }
  })

  const { domStyle } = useMenuItemPosition(props.domLeft,props.domBottom)

	const emits = defineEmits(['moveCamera'])

	const { chooseBtn, changeBtn, roamList, iconStyle, textStyle } = homeRoam(emits)
	const { dislodgeDomStyle, roam } = useHomeMenu()

	const videoUrl = import.meta.env.BASE_URL + 'file/pao1.mp4'
</script>

<template>
	<div class="home_title_roam home_menu_item_bg" :style="{ ...domStyle, ...dislodgeDomStyle }">
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
	</div>
	<div class="drive_bg" v-if="roam">
		<span @click="changeBtn(0)">结束漫游</span>
		<video :src="videoUrl" class="video_bg" autoplay loop />
		<div class="video_bg_border"></div>
	</div>
	<!--  巡检列表-->
	<div class="home_roam_equipment" v-if="roam">
		<div class="home_roam_equipment_title">
			<border-box name="border2" title="巡检列表"></border-box>
		</div>
		<div class="home_roam_equipment_bottom">
			<template v-for="(i, index) in roamList">
				<div class="home_roam_equipment_bottom_body" :class="!i ? 'equipment_op' : ''">
					<div class="home_roam_equipment_bottom_icon" :class="iconStyle(index)"></div>
					<div class="home_roam_equipment_bottom_title_text" :class="textStyle(index)">
						<span>【监测点5】</span>
						{{ i?.name }}
					</div>
					<div class="home_roam_equipment_bottom_border"></div>
					<div class="home_roam_equipment_bottom_body_text">
						<span>巡检位置：{{ i?.name }}</span>
						<span> 巡检状态： 时间： </span>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_menu';
	@import '@/assets/styles/home/home_roam';
</style>
