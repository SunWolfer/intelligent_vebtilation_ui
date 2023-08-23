<!--风机特性曲线管理-->
<script setup>
	import useResetCharts from '@/hooks/useResetCharts'
	import { fanChart1 } from '@/api/request/venEqMonitoring/fansCharts'
	import FanCurveAddOrUpdate from '@/views/venManagement/fanCharCurveManagement/fanCurveAddOrUpdate.vue'

	const queryParams = ref({
		fanName: '',
		rotationalSpeed: '',
		bladeAngle: '',
	})

	//  风机曲线
	const initFanChart = () => {
		const xData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		const yData = [[], [], [], []]
		const legends = ['通风阻力', '全压', '效率', '功率']

		for (let i = 0; i < 10; i++) {
			yData[0].push(Math.random() * 10)
			yData[1].push(Math.random() * 100)
			yData[2].push(Math.random() * 10)
			yData[3].push(Math.random() * 100)
		}

		fanChart1({
			domId: 'fan_curve_chart_1',
			xData: xData,
			yData: yData,
			legends: legends,
		})
	}

	const { showCharts } = useResetCharts(initFanChart)

	const dataList = ref([{ airVolume: '' }])

	const chooseRow = ref({
		id: undefined,
	})
	//   新增风机特性曲线
	const addOrUpdateVisible = ref(false)

	const handleAdd = () => {
		chooseRow.value = {
			id: undefined,
		}
		addOrUpdateVisible.value = true
	}
	const handleUpdate = (row) => {
		chooseRow.value = row
		addOrUpdateVisible.value = true
	}
</script>

<template>
	<div class="fan_management">
		<div class="fan_management_l1">风机特性曲线</div>
		<div class="fullDom fan_management_l2">
			<el-form :model="queryParams" inline>
				<el-form-item label="风机">
					<el-select v-model="queryParams.fanName"></el-select>
				</el-form-item>
				<el-form-item label="转速(r/min)">
					<el-select v-model="queryParams.rotationalSpeed"></el-select>
				</el-form-item>
				<el-form-item label="叶片角度">
					<el-select v-model="queryParams.bladeAngle"></el-select>
				</el-form-item>
				<el-form-item>
					<div class="normal_btn">查询</div>
					<div class="normal_4_btn" @click="handleAdd">新增</div>
					<div class="normal_2_btn">修改</div>
					<div class="normal_3_btn">删除</div>
				</el-form-item>
			</el-form>
		</div>
		<div class="fullDom fan_management_l3">
			<div id="fan_curve_chart_1" v-if="showCharts" class="fullDom"></div>
		</div>
		<div class="fullDom fan_management_l4">
			<el-table :data="dataList" border height="100%">
				<el-table-column label="风量(m3/s)" align="center" prop="airVolume" />
				<el-table-column label="通风阻力(Pa)" align="center" prop="airVolume" />
				<el-table-column label="风机全压(Pa)" align="center" prop="airVolume" />
				<el-table-column label="风机效率(%)" align="center" prop="airVolume" />
				<el-table-column label="风机功率(kw)" align="center" prop="airVolume" />
			</el-table>
		</div>
		<fan-curve-add-or-update
			v-if="addOrUpdateVisible"
			v-model="addOrUpdateVisible"
			:choose-row="chooseRow"
		/>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/venManagement/fanCharCurveManagement';
</style>
