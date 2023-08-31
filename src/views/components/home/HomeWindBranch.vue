<!--风路分支图-->
<script setup>
	// 查询风路分支图
	import { branchDrawing } from '@/api/api/home'
	import useResetCharts from '@/hooks/useResetCharts'
	import { useGainList } from '@/hooks/useGainList'
	// 风路分支图列表
	const { dataList: windPathList } = useGainList({
		apiFun: branchDrawing,
	})
</script>

<template>
	<div class="fullDom wind_full">
		<span class="other_title"><border-box name="border2" title="风路分支图"></border-box></span>
		<div class="other_wind_path_body">
			<template v-for="item in windPathList">
				<div class="other_wind_path_body_item">
					<div class="other_wind_path_body_item_1">{{ item.regionName }}</div>
					<div class="other_wind_path_body_item_4">
						<template v-for="child in item.roadList">
							<div class="other_wind_path_body_item_4_body">
								<div
									class="other_wind_path_body_item_4_bar"
									:style="{ height: (child.airVolume / item.maxValue) * 100 + '%' }"
								></div>
								<div class="other_item_4_text">{{ child.airVolume }}</div>
								<div
									:class="
										child.venAirDirection === '1' ? 'other_item_4_icon_1' : 'other_item_4_icon_2'
									"
								></div>
								<div class="other_item_4_text">
									<span>{{ child.code }}</span>
								</div>
							</div>
						</template>
					</div>
				</div>
			</template>
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
		grid-auto-rows: vh(203);
	}
	.other_wind_path_body_item {
		width: 100%;
		height: 100%;
		padding: vh(5) vw(11) vh(17) vw(10);
		background-image: url('@/assets/images/home/home_visual_angle/home_visual_item.png');
		background-size: 100% 100%;
		display: grid;
		grid-template-rows: vh(33) vh(140);
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
	.other_wind_path_body_item_4 {
		position: relative;
		width: vw(396);
		height: 100%;
		display: flex;
		overflow-x: auto;
		overflow-y: hidden;
	}
	.other_wind_path_body_item_4_body {
		width: vw(35);
		display: grid;
		grid-template-rows: 1fr vh(20) vh(35) vh(20);
		place-content: center;
		place-items: center;
		position: relative;
		height: 100%;
		margin-left: vw(15);
	}
	.other_wind_path_body_item_4_bar {
		align-self: end;
		width: vw(11);
		background-color: #01f4f4;
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
		height: 100%;
		font-size: vh(12);
		font-family: SimSun, serif;
		font-weight: 400;
		color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		span {
			position: absolute;
			width: max-content;
		}
	}
</style>
