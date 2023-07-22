<script setup>
	import { homeDisPreRoute } from '@/api/request/home/homeDisPreRoute'
	import useHomeMenu from '@/hooks/useHomeMenu'
	import useMenuItemPosition from '@/hooks/useMenuItemPosition'
	import { DisasterTypes } from '@/api/request/home/menuType'

	const { domStyle } = useMenuItemPosition(430)
	const { dislodgeDomStyle } = useHomeMenu()

	const emits = defineEmits([
		'setDisaster',
		'setPersonnel',
		'backDisasterRoute',
		'imitateRoute',
		'changeDisasterType',
	])

	const { setDisaster, setPersonnel, changeDisaster, imitateRoute } = homeDisPreRoute(emits)
</script>

<template>
	<div class="home_title_route home_menu_item_bg" :style="{ ...domStyle, ...dislodgeDomStyle }">
		<div class="home_title_route_left">
			<div class="home_title_route_btn" @click="changeDisaster(DisasterTypes.ONE)">
				<div class="home_title_route_btn_icon home_route_icon_1"></div>
				<div class="home_route_text">火灾</div>
			</div>
			<div class="home_title_route_btn" @click="changeDisaster(DisasterTypes.TWO)">
				<div class="home_title_route_btn_icon home_route_icon_2"></div>
				<div class="home_route_text">瓦斯</div>
			</div>
			<div class="home_title_route_btn" @click="changeDisaster(DisasterTypes.THREE)">
				<div class="home_title_route_btn_icon home_route_icon_3"></div>
				<div class="home_route_text">粉尘</div>
			</div>
			<div class="home_title_route_btn" @click="changeDisaster(DisasterTypes.FOUR)">
				<div class="home_title_route_btn_icon home_route_icon_4"></div>
				<div class="home_route_text">水灾</div>
			</div>
		</div>
		<div class="home_title_route_right">
			<div class="home_title_route_top">
				<div class="res_text">灾变地点</div>
				<div class="res_btn">
					<div class="res_btn_icon"></div>
					<div class="res_btn_text" @click="setDisaster">点击地图拾取</div>
				</div>
			</div>
			<div class="home_title_route_bottom">
				<div class="res_text">人员位置</div>
				<div class="res_btn">
					<div class="res_btn_icon"></div>
					<div class="res_btn_text" @click="setPersonnel">点击地图拾取</div>
				</div>
			</div>
			<div class="home_title_route_right_btn" @click="imitateRoute">
				<div class="home_reverse_wind_btn_icon"></div>
				<span>模拟</span>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_menu';
	@import '@/assets/styles/home/home_dis_pre_route';
</style>
