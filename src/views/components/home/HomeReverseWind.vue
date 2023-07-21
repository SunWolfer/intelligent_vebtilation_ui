<script setup>
	import { homeSolution } from '@/api/request/home/homeSolution'

	const { domStyle } = homeSolution()
</script>

<template>
	<div class="home_title_reverse_wind home_menu_item_bg" :style="domStyle">
		<div class="home_reverse_wind_title">全矿井一键反风</div>
		<div class="home_reverse_wind_btn">
			<div class="home_reverse_wind_btn_icon"></div>
			<span>模拟</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_menu';
	@import '@/assets/styles/home/home_reverse_wind';
</style>
