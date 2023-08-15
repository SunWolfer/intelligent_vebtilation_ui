<!--环境监测异常预警-->
<script setup>
	import { fauDiaOfVentPower } from '@/api/request/intelFaultDiagnosis/fauDiaOfVentPower'
	import { abnEaWarOfEnvMonitoring } from '@/api/request/intelFaultDiagnosis/abnEaWarOfEnvMonitoring'
	import useResetCharts from '@/hooks/useResetCharts'

	const { dataForm, dateRange, dataList, warnLevelList } = fauDiaOfVentPower()

	const { initWarnPointList, initWarnTrendList, initWarnEquipList } = abnEaWarOfEnvMonitoring()

	const { showCharts: showPointChart } = useResetCharts(initWarnPointList)
	const { showCharts: showTrendChart } = useResetCharts(initWarnTrendList)
	const { showCharts: showTypeChart } = useResetCharts(initWarnEquipList)
</script>

<template>
	<div class="fau_net_body">
		<div class="fau_net_body_c1">
			<div class="fau_net_chart_title">预警点位Top5</div>
			<div v-if="showPointChart" class="fau_net_chart" id="fan_mon_chart_1"></div>
		</div>
		<div class="fau_net_body_c2">
			<div class="fau_net_chart_title">预警趋势</div>
			<div v-if="showTrendChart" class="fau_net_chart" id="fan_mon_chart_2"></div>
		</div>
		<div class="fau_net_body_c3">
			<div class="fau_net_chart_title">预警类型</div>
			<div v-if="showTypeChart" class="fau_net_chart" id="fan_mon_chart_3"></div>
		</div>
		<div class="fau_net_body_l2">
			<el-form :model="dataForm" inline>
				<el-form-item label="预警类型">
					<el-select v-model="dataForm.warnType"></el-select>
				</el-form-item>
				<el-form-item label="预警设备">
					<el-input v-model="dataForm.warnEquipment" />
				</el-form-item>
				<el-form-item label="设备类型">
					<el-select v-model="dataForm.eqType"></el-select>
				</el-form-item>
				<el-form-item label="时间区间">
					<el-date-picker
						v-model="dateRange"
						type="datetimerange"
						value-format="YYYY-MM-DD HH:mm:ss"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						prefix-icon="Calendar"
						:teleported="false"
					/>
				</el-form-item>
				<el-form-item>
					<div class="normal_btn">查询</div>
				</el-form-item>
			</el-form>
		</div>
		<div class="fau_net_body_l3">
			<el-table :data="dataList" border height="100%">
				<el-table-column label="预警类型" prop="warnType" align="center" />
				<el-table-column label="预警点位" prop="warnEquipment" align="center" />
				<el-table-column label="设备类型" prop="eqType" align="center" />
				<el-table-column label="预警等级" prop="eqType" align="center">
					<template #default="scope">
						<span :style="{ color: warnLevelList.get(scope.row.warnLevel)[0] }">{{
							warnLevelList.get(scope.row.warnLevel)[1]
						}}</span>
					</template>
				</el-table-column>
				<el-table-column label="预警时间" prop="dateTime" align="center" />
				<el-table-column label="操作" align="center">
					<template #default="scope">
						<el-button type="primary" link icon="Delete">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/intelFaultDiagnosis/fauDiaOfVentNetwork';
</style>
