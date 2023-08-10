<!--风路分支图-->
<script setup></script>

<template>
	<div class="fullDom wind_full">
		<span class="other_title"><border-box name="border2" title="风路分支图"></border-box></span>
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
</template>

<style scoped lang="scss">
	.wind_full {
		padding: 0 vw(22);
		background-color: rgba(12, 41, 70, 0.85);
		display: grid;
		grid-template-rows: vh(45) auto;
	}
	.other_title {
		height: vh(35);
		align-self: center;
	}
	.other_wind_path_body {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		display: grid;
		grid-template-rows: repeat(auto-fill, vh(203));
	}
	.other_wind_path_body_item {
		width: 100%;
		height: 100%;
		padding: vh(5) vw(11) vh(17) vw(10);
		background-image: url('@/assets/images/home/home_visual_angle/home_visual_item.png');
		background-size: 100% 100%;
		display: grid;
		grid-template-rows: vh(33) vh(16) vh(52) vh(16) vh(55);
		place-content: space-between center;
	}
	.other_wind_path_body_item_1 {
		font-size: vh(16);
		font-family:
			Adobe Heiti Std,
			serif;
		font-weight: normal;
		color: #ffffff;
		line-height: vh(22);
		text-align: center;
	}
	.other_wind_path_body_item_2 {
		justify-self: center;
		width: vw(396);
		height: vh(16);
		background: linear-gradient(90deg, #031650, #2795f3, #041650);
		font-size: vh(12);
		font-family:
			Adobe Heiti Std,
			serif;
		font-weight: normal;
		color: #ffffff;
		text-align: center;
		line-height: vh(16);
	}
	.other_wind_path_body_item_3 {
		width: vw(396);
		height: vh(52);
	}
	.other_wind_path_body_item_4 {
		width: vw(396);
		height: vh(55);
		display: grid;
		grid-template-columns: repeat(8, vh(35));
		grid-template-rows: vh(35) vh(10);
		place-content: center space-between;
		grid-auto-flow: column;
	}
	@mixin itemIcon {
		width: vh(35);
		height: vh(35);
		background-size: 100% 100%;
		line-height: vh(35);
		text-align: center;
		font-size: vh(13);
		font-family: YouSheBiaoTiHei, serif;
		font-weight: 400;
		color: #ffffff;
	}
	.other_item_4_icon_1 {
		@include itemIcon;
		background-image: url('@/assets/images/home/home_visual_angle/item_1.png');
	}
	.other_item_4_icon_2 {
		@include itemIcon;
		background-image: url('@/assets/images/home/home_visual_angle/item_2.png');
	}
	.other_item_4_text {
		font-size: vh(12);
		font-family: SimSun, serif;
		font-weight: 400;
		color: #ffffff;
		line-height: vh(20);
	}
</style>
