<script setup>
	import useHomeMenu from '@/hooks/useHomeMenu'
	import useMenuItemPosition from '@/hooks/useMenuItemPosition'

	const { domStyle } = useMenuItemPosition(299)

	const { reverseWind, dislodgeDomStyle } = useHomeMenu()
	const imitate = () => {
		reverseWind.value = true
	}
	//   退出
	const quit = () => {
		reverseWind.value = false
	}
</script>

<template>
	<div
		class="home_title_reverse_wind home_menu_item_bg"
		:style="{ ...domStyle, ...dislodgeDomStyle }"
	>
		<div class="home_reverse_wind_title">全矿井一键反风</div>
		<div class="home_reverse_wind_btn">
			<div class="home_reverse_wind_btn_icon"></div>
			<span @click="imitate">模拟</span>
		</div>
	</div>
	<!--  反风中-->
	<div v-if="reverseWind" class="reverse_wind_ing">
		<div class="reverse_wind_ing_top"></div>
		<div class="reverse_wind_ing_bottom">
			<div class="reverse_wind_ing_bottom_1" @click="quit"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_menu';
	@import '@/assets/styles/home/home_reverse_wind';
</style>
