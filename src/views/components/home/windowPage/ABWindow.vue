<!--AB风窗-->
<script setup>
	import ABWindowFormA from '@/views/components/home/windowPage/ABWindowForm.vue'
	import ABWindowFormB from '@/views/components/home/windowPage/ABWindowForm.vue'
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
			initChart3?.()
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

	// 气源动力样式
	const airStatusClass = computed(() => {
		let dev_class = 'large_light_1'
		if (dataFormA.value.airStatus === '0') {
			dev_class = 'large_light_2'
		} else if (dataFormA.value.airStatus === '1') {
			dev_class = 'large_light_1'
		} else if (dataFormA.value.airStatus === '2') {
			dev_class = 'large_light_3'
		}

		return dev_class
	})

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

	const option1 = ref({})
	const option2 = ref({})
	const option3 = ref({})
	const option4 = ref({})

	let timer
	const initChart3 = () => {
		const dataType = ['1', '2'].includes(domType.value)
		option1.value = getChart3(
			dataType ? dataFormA.value.volume ?? 0 : dataFormA.value.pressure ?? 0,
			chartTitleMap.get(domType.value)[0],
			chartTitleMap.get(domType.value)[1],
			dataType ? 'm³/min' : 'Pa',
		)
		option2.value = getChart4(
			dataType ? dataFormA.value.speed ?? 0 : dataFormA.value.absolutePressure ?? 0,
			chartTitleMap.get(domType.value)[2],
			dataType ? 'm/s' : 'Pa',
		)
		if (!['1', '2'].includes(domType.value)) {
			option3.value = getChart5(
				'1',
				dataFormA.value.humidity ?? 0,
				chartTitleMap.get(domType.value)[3],
			)
			option4.value = getChart5(
				'2',
				dataFormA.value.temperature ?? 0,
				chartTitleMap.get(domType.value)[4],
			)

			timer && clearInterval(timer)

			function doing() {
				option3.value.series[1].startAngle = option3.value.series[1].startAngle - 1
				option4.value.series[1].startAngle = option4.value.series[1].startAngle - 1
			}
			function startTimer() {
				timer = setInterval(doing, 100)
			}
			setTimeout(startTimer, 1000)
		}
	}

	//  当前选中风窗
	const chooseWindow = ref(0)
	const windowHandle = (data) => {
		if (chooseWindow.value === data) return
		chooseWindow.value = data
	}

	onBeforeUnmount(() => {
		clearInterval(timer)
	})
</script>

<template>
	<div class="a_b_window">
		<ABWindowFormA
			:key="'formA'"
			:form="formA"
			:data-list="dataList"
			@change-window="changeWindow"
			@hisRecordHandle="hisRecordHandle"
		/>
		<ABWindowFormB
			:key="'formB'"
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
				<BaseEchart :option="option1" />
				<BaseEchart :option="option2" />
				<template v-if="!['1', '2'].includes(domType)">
					<BaseEchart :option="option3" />
					<BaseEchart :option="option4" />
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
					<div :class="airStatusClass"></div>
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
