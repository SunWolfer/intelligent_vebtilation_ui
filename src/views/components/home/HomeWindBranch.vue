<!--风路分支图-->
<script setup>
	// 查询风路分支图
	import { branchDrawing } from '@/api/api/home'
	import { useGainList } from '@/hooks/useGainList'

	const props = defineProps({
		// 默认查询
		defaultList: {
			type: Boolean,
			default: true,
		},
		list: {
			type: Array,
			default: () => {
				return []
			},
		},
		//   选中巷道code
		selectCode: {
			type: String,
			default: '',
		},
	})
	const emits = defineEmits(['chooseWindFull'])

	// 风路分支图列表
	const { dataList: windPathList } = useGainList({
		automatic: props.defaultList,
		apiFun: branchDrawing,
	})
	// 当前选中风路分支图
	const selectWindFullData = ref('')
	// 选中风路分支图
	const chooseFullData = (row) => {
		selectWindFullData.value = row.code
		emits('chooseWindFull', row)
	}

	// 总dom
	const otherPathRef = ref(null)
	watch(
		() => props.selectCode,
		(val) => {
			let lineIndex = -1
			let rowIndex = -1
			for (let i = 0; i < windPathList.value.length; i++) {
				const child = windPathList.value[i]
				for (let j = 0; j < child.roadList.length; j++) {
					const data = child.roadList[j]
					if (data.code === val) {
						lineIndex = i
						rowIndex = j
						selectWindFullData.value = data.code
					}
				}
			}
			if (lineIndex !== -1) {
				const dom = otherPathRef.value?.getElementsByClassName('other_wind_path_body_item')[
					lineIndex
				]
				otherPathRef.value.scrollTop = dom.offsetTop
				const childDom = dom.getElementsByClassName('other_wind_path_body_item_4_body')[rowIndex]
				const fatherDom = dom.getElementsByClassName('other_wind_path_body_item_4')[0]
				fatherDom.scrollLeft = childDom.offsetLeft
			}
		},
	)

	onMounted(() => {
		if (!props.defaultList) {
			windPathList.value = props.list
		}
	})
</script>

<template>
	<div class="fullDom wind_full">
		<span class="other_title"><border-box name="border2" title="风路分支图" /></span>
		<div ref="otherPathRef" class="other_wind_path_body">
			<template v-for="(item, index) in windPathList" :key="'path' + index">
				<div class="other_wind_path_body_item">
					<div class="other_wind_path_body_item_1">{{ item.regionName }}</div>
					<div class="other_wind_path_body_item_4">
						<template v-for="child in item.roadList" :key="child.id">
							<div class="other_wind_path_body_item_4_body">
								<div
									class="other_wind_path_body_item_4_bar"
									:style="{ height: (child.airVolume / item.maxValue) * 100 + '%' }"
								></div>
								<div class="other_item_4_text">{{ child.airVolume.toFixed(2) }}</div>
								<div
									class="fullDom c-center"
									:class="selectWindFullData === child.code ? 'wind_full_select' : ''"
								>
									<div
										class="pointer"
										:class="
											child.venAirDirection === '1' ? 'other_item_4_icon_1' : 'other_item_4_icon_2'
										"
										@click="chooseFullData(child)"
									></div>
								</div>
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
		position: relative;
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
		font-size: vw(16);
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
		width: vw(35);
		height: vw(35);
		background-size: 100% 100%;
		line-height: vh(35);
		text-align: center;
		font-size: vw(13);
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
		font-size: vw(12);
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
	.wind_full_select {
		border: 2px solid #ffff00;
		box-shadow: 0 0 6px 2px #ff9b00;
	}
</style>
