<script setup>
	import { homeDisPreRoute } from '@/api/request/home/homeDisPreRoute'
	import useHomeMenu from '@/hooks/useHomeMenu'
	import useMenuItemPosition from '@/hooks/useMenuItemPosition'
	import { DisasterTypes } from '@/api/request/menuType'

	const props = defineProps({
		domLeft: {
			type: Number,
			default: 430,
		},
		domBottom: {
			type: Number,
			default: 90,
		},
	})

	const { domStyle } = useMenuItemPosition(props.domLeft, props.domBottom)
	const { dislodgeDomStyle } = useHomeMenu()

	const emits = defineEmits(['setDisaster', 'setPersonnel', 'imitateRoute', 'changeDisasterType'])

	const { setDisaster, setPersonnel, changeDisaster, imitateRoute, quit, disasterRouteText } =
		homeDisPreRoute(emits)
	const { avoidDisaster } = useHomeMenu()
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
	<!--  显示避灾路线层-->
	<div v-if="avoidDisaster" class="reverse_wind_ing">
		<!--    人员撤退计划-->
		<div class="home_reverse_wind_people">
			<div class="home_reverse_wind_people_title">
				<border-box name="border2" title="人员撤退路线规划"></border-box>
			</div>
			<div class="home_reverse_wind_people_bottom">
				<template v-for="(i, index) in disasterRouteText">
					<div class="home_reverse_wind_people_bottom_item fullDom">
						<div class="home_reverse_wind_people_bottom_icon">{{ index + 1 }}</div>
						<div class="home_reverse_wind_people_bottom_text">
							{{ i }}
						</div>
						<div
							v-if="index !== disasterRouteText.length - 1"
							class="home_reverse_wind_people_bottom_border"
						></div>
					</div>
				</template>
			</div>
		</div>
		<div class="reverse_wind_ing_bottom">
			<div class="reverse_wind_ing_bottom_1" @click="quit"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_menu';
	@import '@/assets/styles/home/home_dis_pre_route';
	@import '@/assets/styles/home/home_reverse_wind';
</style>
