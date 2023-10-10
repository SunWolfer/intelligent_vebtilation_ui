<!--AB窗表单-->
<script setup>
	import { dynamicHeight, selectDictLabel } from '@/utils/ruoyi'
	import { WindowParamType, WindowStatus } from '@/api/request/home/doorParams'
	import { useCommitForm } from '@/hooks/useForm'
	import { controlWindow } from '@/api/api/airWindow'
	import { getChart1, getChart2 } from '@/api/request/home/remoterControlCharts'
	import useResetCharts from '@/hooks/useResetCharts'
	import useDict from '@/hooks/useDict'

	const { window_work_model, window_type } = useDict('window_work_model', 'window_type')

	const props = defineProps({
		form: {
			type: Object,
		},
		dataList: {
			type: Array,
		},
	})

	const emits = defineEmits(['changeWindow', 'hisRecordHandle'])

	const dataForm = ref({})
	// 视频地址
	const videoUrl = ref('')
	onMounted(() => {
		dataForm.value = props.form
		let urls = dataForm.value.videoUrl ? dataForm.value.videoUrl.split(',') : []
		videoUrl.value = urls[0] ?? ''
	})

	//   加载A窗开度面积图
	const initChart1 = () => {
		getChart1('window_chart_a_b_1', dataForm.value?.openDegreeNow ?? 0)
		getChart2('window_chart_a_b_2', dataForm.value?.areaPercent ?? 0)
	}

	const { showCharts, resetCharts } = useResetCharts(initChart1, false)

	watch(
		() => props.form,
		(val) => {
			dataForm.value = val
			resetCharts?.()
		},
		{ deep: true },
	)

	//   风窗A状态
	const windowStatusALight = (data) => {
		return dataForm.value.status === data ? 'small_light_1' : 'small_light_2'
	}
	//   设置参数
	const setParams = async (key, type) => {
		await useCommitForm(controlWindow, {
			queryParams: {
				devId: dataForm.value.id,
				controlType: type,
				controlValue: dataForm.value[key],
			},
		})
	}

	//   操作记录
	const hisRecordHandle = () => {
		emits('hisRecordHandle')
	}
	// 下拉列表
	const changeWindow = (id) => {
		emits('changeWindow', id)
	}

	// 控制显示图表
	const domType = computed(() => {
		let type = '-1'
		const rsType = dataForm.value.rsSensorType
		if (rsType === '-1') {
			type = '1'
		} else if (rsType === '0') {
			type = '2'
		} else if (rsType === '2') {
			type = '3'
		} else if (rsType === '3') {
			type = '4'
		}
		return type
	})
</script>

<template>
	<div class="a_b_window_l1 fullDom">
		<div class="window_li_l1">
			<border-box name="border2" :title="dataForm?.name"></border-box>
			<!--        选择按钮-->
			<div
				class="window_choose_icon"
				:style="{ left: dynamicHeight(dataForm.name?.length * 24) + 'px' }"
			>
				<el-dropdown trigger="click" @command="changeWindow">
					<el-icon><CaretBottom /></el-icon>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item v-for="item in dataList" :command="item.id">{{
								item.name
							}}</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</div>
		<div class="window_li_l2">
			<div class="window_li_l2_l1">
				<span>位置：{{ dataForm.location }}</span>
				<span>IP地址：{{ dataForm.ip }}</span>
				<span>当前模式：{{ selectDictLabel(window_work_model, dataForm.workModel) }}</span>
				<span>类型：{{ selectDictLabel(window_type, dataForm.type) }}</span>
			</div>
			<template v-if="showCharts">
				<div class="fullDom" id="window_chart_a_b_1"></div>
				<div class="fullDom" id="window_chart_a_b_2"></div>
			</template>
			<div class="window_li_l2_l3">
				<div class="p-center">
					<span class="mr5">调风超时</span>
					<div :class="windowStatusALight(WindowStatus.THREE)"></div>
				</div>
				<div class="p-center">
					<span class="mr5">正在调风</span>
					<div :class="windowStatusALight(WindowStatus.ZERO)"></div>
				</div>
				<div class="p-center">
					<span class="mr5">开到位</span>
					<div :class="windowStatusALight(WindowStatus.ONE)"></div>
				</div>
				<div class="p-center">
					<span class="mr5">关到位</span>
					<div :class="windowStatusALight(WindowStatus.TWO)"></div>
				</div>
			</div>
		</div>
		<div class="window_li_l2_c2">
			<border-box name="border5">
				<div class="set_btn_default">
					<span>参数设定</span>
				</div>
			</border-box>
			<div class="operation_btn" @click="hisRecordHandle">
				<border-box name="border7">
					<div class="operation_btn_body">
						<div class="door_icon_3"></div>
						操作记录
					</div>
				</border-box>
			</div>

			<div class="window_li_l2_c2_item">
				开度
				<el-input v-model="dataForm.openDegreeNow" />
				%
				<div class="normal_btn" @click="setParams('openDegreeNow', WindowParamType.TEN)">设定</div>
			</div>

			<template v-if="['1', '2'].includes(domType)">
				<div class="window_param_item">
					风量
					<el-input v-model="dataForm.volume" />
					m³/min
					<div class="normal_btn" @click="setParams('volume', WindowParamType.ONE)">设定</div>
				</div>
			</template>
			<template v-else>
				<div class="window_li_l2_c2_item">
					风压
					<el-input v-model="dataForm.pressure" />
					m³/min
					<div class="normal_btn" @click="setParams('pressure', WindowParamType.TWO)">设定</div>
				</div>
			</template>
			<div class="window_li_l2_c2_item">
				面积
				<el-input v-model="dataForm.areaPercent" />
				m2
				<div class="normal_btn" @click="setParams('areaPercent', WindowParamType.ELEVEN)">设定</div>
			</div>
		</div>
		<div class="fullDom window_li_l2_c3">
			<m-video :video-path="videoUrl" :domid="`windowFormPlayer` + dataForm.id" type="fc" />
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_air_window';
	.a_b_window_l1 {
		padding-right: vw(40);
		display: grid;
		grid-template-columns: vw(650) vw(300) vw(423);
		justify-content: space-between;
		background-color: rgba(95, 104, 149, 0.28);
		grid-template-rows: vh(48) 1fr;
		.window_li_l1 {
			position: relative;
			grid-area: 1/1/2/4;
			padding-left: vw(13);
		}
		.window_li_l2 {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: vh(48) vh(232) vh(48);
			.window_li_l2_l1 {
				grid-area: 1/1/2/3;
				padding-left: vw(13);
				display: flex;
				align-items: center;
				grid-column-gap: vw(30);
				span {
					font-size: vw(14);
					font-family:
						Adobe Heiti Std,
						serif;
					font-weight: normal;
					color: #4bc8fc;
				}
			}
			.window_li_l2_l3 {
				grid-area: 3/1/4/3;
				background-color: rgba(22, 78, 145, 0.73);
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				place-items: center center;
				font-family:
					Adobe Heiti Std,
					serif;
				font-weight: normal;
				color: #ffffff;
				font-size: vw(18);
			}
		}
		.window_li_l2_c2 {
			position: relative;
			width: 100%;
			height: 100%;
			padding: vh(30) 0 vh(60) 0;
			display: grid;
			grid-template-rows: vh(37) vh(32) repeat(3, vh(40));
			align-content: space-between;
			.operation_btn {
				justify-self: end;
			}
			.window_li_l2_c2_item {
				width: 100%;
				display: grid;
				justify-content: start;
				grid-template-columns: vh(30) vw(105) vh(65) 1fr;
				@include ParamItemText;
				align-items: center;
				.el-input {
					width: vw(102);
					height: vh(32);
				}
			}
		}
		.window_li_l2_c3 {
			padding: vh(30) 0 vh(58) 0;
		}
	}
	.window_choose_icon {
		display: flex;
		align-items: end;
		top: 0;
		bottom: vh(10);
	}
</style>
