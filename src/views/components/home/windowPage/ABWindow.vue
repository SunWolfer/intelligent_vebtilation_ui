<!--AB风窗-->
<script setup>
	import ABWindowForm from '@/views/components/home/windowPage/ABWindowForm.vue'
	import useResetCharts from '@/hooks/useResetCharts'
	import { getChart3, getChart4, getChart5 } from '@/api/request/home/remoterControlCharts'
	import ABWindowLine from '@/views/components/home/windowPage/ABWindowLine.vue'

	const props = defineProps({
		formA: {
			type: Object,
		},
		formB: {
			type: Object,
		},
		dataList: {
			type: Array,
		},
	})
	const emits = defineEmits(['moreVisibleHandle', 'changeWindow', 'hisRecordHandle'])
	//   A风窗
	const dataFormA = ref({})
	//   B风窗
	const dataFormB = ref({})

	watch(
		() => props.formA,
		(val) => {
			dataFormA.value = val
			resetCharts?.()
		},
		{ deep: true },
	)

	watch(
		() => props.formB,
		(val) => {
			dataFormB.value = val
		},
		{ deep: true },
	)

	//   更多
	const moreVisibleHandle = () => {
		emits('moreVisibleHandle')
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
		const rsType = dataFormA.value.rsSensorType
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
	const chartTitleMap = new Map([
		['1', ['当前风量(未接入)', '风量范围', '当前风速(未接入)']],
		['2', ['当前风量', '风量范围', '当前风速']],
		['3', ['当前风压', '风压范围', '当前绝压', '当前湿度', '当前温度']],
		['4', ['当前风压', '风压范围', '当前绝压', '当前湿度(未接入)', '当前温度(未接入)']],
	])
	const initChart3 = () => {
		getChart3(
			'window_chart_form_5',
			['1', '2'].includes(domType.value)
				? dataFormA.value.volume ?? 0
				: dataFormA.value.pressure ?? 0,
			chartTitleMap.get(domType.value)[0],
			chartTitleMap.get(domType.value)[1],
		)
		getChart4(
			'window_chart_form_6',
			['1', '2'].includes(domType.value)
				? dataFormA.value.speed ?? 0
				: dataFormA.value.absolutePressure ?? 0,
			chartTitleMap.get(domType.value)[2],
		)
		if (!['1', '2'].includes(domType.value)) {
			getChart5(
				'window_chart_form_7',
				'1',
				dataFormA.value.humidity ?? 0,
				chartTitleMap.get(domType.value)[3],
			)
			getChart5(
				'window_chart_form_7',
				'2',
				dataFormA.value.temperature ?? 0,
				chartTitleMap.get(domType.value)[4],
			)
		}
	}
	const { showCharts, resetCharts } = useResetCharts(initChart3, false)
	//  当前选中风窗
	const chooseWindow = ref(0)
	const windowHandle = (data) => {
		if (chooseWindow.value === data) return
		chooseWindow.value = data
	}
</script>

<template>
	<div class="a_b_window">
		<ABWindowForm
			:form="formA"
			:data-list="dataList"
			@change-window="changeWindow"
			@hisRecordHandle="hisRecordHandle"
		/>
		<ABWindowForm
			:form="formB"
			:data-list="dataList"
			@change-window="changeWindow"
			@hisRecordHandle="hisRecordHandle"
		/>
		<!--    监测状态-->
		<div class="a_b_window_c2">
			<!--      标题-->
			<div class="fullDom a_b_window_c2_l1">
				<border-box name="border2" title="监测状态" :hidden-glimmer="true"></border-box>
				<!--        更多-->
				<div class="window_more_btn" @click="moreVisibleHandle">更多</div>
			</div>
			<div class="home_air_window_body_l2_item_5">
				<div v-if="showCharts" class="fullDom" id="window_chart_form_5" />
				<div v-if="showCharts" class="fullDom" id="window_chart_form_6" />
				<template v-if="!['1', '2'].includes(domType)">
					<div v-if="showCharts" class="fullDom" id="window_chart_form_7" />
					<div v-if="showCharts" class="fullDom" id="window_chart_form_8" />
				</template>
			</div>

			<div class="fullDom home_air_window_body_l2_item_6">
				<div class="home_air_window_body_l2_item_6_item">
					<div class="door_icon_1"></div>
					<span>通信状态</span>
					<div :class="dataFormA.onlineStatus === '1' ? 'large_light_1' : 'large_light_2'"></div>
				</div>
				<div class="home_air_window_body_l2_item_6_item">
					<div class="door_icon_2"></div>
					<span>气源动力</span>
					<div :class="dataFormA.airStatus === '1' ? 'large_light_1' : 'large_light_2'"></div>
				</div>
				<div class="home_air_window_body_l2_item_6_item">
					<div class="door_icon_4"></div>
					<span>编码器故障</span>
					<div :class="dataFormA.encoderStatus === '1' ? 'large_light_1' : 'large_light_2'"></div>
				</div>
			</div>
			<div class="a_b_window_c2_l3">
				<div :class="chooseWindow === 0 ? 'ven_btn_active' : 'ven_btn'" @click="windowHandle(0)">
					<span>A风窗</span>
				</div>
				<div :class="chooseWindow === 1 ? 'ven_btn_active' : 'ven_btn'" @click="windowHandle(1)">
					<span>B风窗</span>
				</div>
			</div>
			<ABWindowLine :dev-id="chooseWindow === 0 ? dataFormA.id : dataFormB.id" />
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_air_window';
</style>
