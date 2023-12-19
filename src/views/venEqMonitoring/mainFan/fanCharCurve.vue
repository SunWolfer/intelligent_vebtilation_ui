<!--风机特性曲线-->
<script setup>
	import { fanChart1 } from '@/api/request/venEqMonitoring/fansCharts'
	import { useGainList } from '@/hooks/useGainList'
	import { fanLineDict, findFanLines } from '@/api/api/mainFan'

	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: false,
		},
		fanInfo: {
			type: Object,
		},
	})
	const emits = defineEmits(['update:modelValue'])
	const showDiaLog = computed({
		get() {
			return props.modelValue
		},
		set() {
			emits('update:modelValue', false)
		},
	})

	// 查询转速和角度
	const { dataList } = useGainList({
		apiFun: fanLineDict,
		queryArgs: {
			devId: props.fanInfo.id,
		},
	})
	const angleList = ref([])
	const changeAngle = (row) => {
		queryParams.value.angle = ''
		angleList.value =
			dataList.value.find((i) => {
				return i.zhuansu === row
			})?.children ?? []
	}

	//   查询表单
	const queryParams = ref({
		rotationalSpeed: '',
		angle: '',
	})

	//  风机曲线
	const chartOption = ref(undefined)
	const initFanChart = async () => {
		const res = await findFanLines({
			devId: props.fanInfo.id,
			zhuansu: queryParams.value.rotationalSpeed,
			jiaodu: queryParams.value.angle,
		})
		if (res.code === 200) {
			const { fengliang, tongfengzuli, xiaolv, gonglv, quanya } = res.data
			const xData = fengliang
			const yData = [tongfengzuli, xiaolv, gonglv, quanya]
			const legends = ['通风阻力', '全压', '效率', '功率']

			chartOption.value = fanChart1({
				xData: xData,
				yData: yData,
				legends: legends,
			})
		}
	}
</script>

<template>
	<dia-log v-model="showDiaLog" title="风机特性曲线" :width="1240" :height="530">
		<div class="fullDom fan_curve">
			<el-form :model="queryParams" inline>
				<el-form-item label="转速(r/min)">
					<el-select v-model="queryParams.rotationalSpeed" @change="changeAngle" clearable>
						<el-option
							v-for="i in dataList"
							:key="i.zhuansu"
							:label="i.zhuansu"
							:value="i.zhuansu"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="叶片角度">
					<el-select v-model="queryParams.angle" clearable>
						<el-option v-for="i in angleList" :key="i" :label="i" :value="i" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<div class="normal_btn" @click="initFanChart">查询</div>
				</el-form-item>
			</el-form>
			<BaseEchart :option="chartOption" />
		</div>
	</dia-log>
</template>

<style scoped lang="scss">
	.fan_curve {
		display: grid;
		grid-template-rows: vh(40) 1fr;
		grid-row-gap: vh(10);
	}
</style>
