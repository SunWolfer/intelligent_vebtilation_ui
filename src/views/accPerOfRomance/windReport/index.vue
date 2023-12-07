<script setup>
	import useList from '@/hooks/useList'
	import { listWindReport } from '@/api/api/windReport'
	import { addDateRange, getMonthStartEnd } from '@/utils/ruoyi'

	const { dateRange, queryParams, dataList, getList, total, downLoadFire, handleQuery } = useList({
		apiFun: listWindReport,
		params: {
			pageNum: 1,
			pageSize: 10,
		},
		initDateRange: getMonthStartEnd(),
		exportParams: {
			api: '/api/report/export',
			params: () => {
				return addDateRange(queryParams.value, dateRange.value)
			},
			title: `测风报表${new Date().getTime()}.xlsx`,
		},
	})
</script>

<template>
	<div class="wind_report_body">
		<el-form inline v-model="queryParams">
			<el-form-item label="时间区间">
				<el-date-picker
					v-model="dateRange"
					style="width: 490px; height: 100%"
					value-format="YYYY-MM-DD"
					type="daterange"
					range-separator="-"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					prefix-icon="Calendar"
				></el-date-picker>
			</el-form-item>
			<el-form-item>
				<div class="normal_btn" @click="handleQuery">生成</div>
				<div class="normal_2_btn" @click="downLoadFire">导出</div>
			</el-form-item>
		</el-form>
		<div class="wind_report_body_content">
			<template v-for="i in dataList">
				<div class="wind_report_body_item">
					<div class="wind_report_body_item_label">{{ i.timeLine }}</div>
					<el-table :data="i.children" border>
						<el-table-column prop="name" label="测风地点" align="center"></el-table-column>
						<el-table-column prop="surface" label="断面(m2)" align="center"></el-table-column>
						<el-table-column
							prop="windSensorSpeed"
							label="风速(m/s)"
							align="center"
						></el-table-column>
						<el-table-column
							prop="windSensorAirVolume"
							label="风量(m³/min)"
							width="110"
							align="center"
						></el-table-column>
						<el-table-column
							prop="airVolume"
							label="解算风量(m³/min)"
							min-width="120"
							align="center"
						></el-table-column>
						<el-table-column
							prop="minQ"
							label="计划风量(m³/min)"
							min-width="120"
							align="center"
						></el-table-column>
						<el-table-column
							prop="personQ"
							label="人工实测风量(m³/min)"
							min-width="130"
							align="center"
						></el-table-column>
						<el-table-column
							prop="calSensorDeviation"
							label="解算/设备误差率 %"
							min-width="110"
							align="center"
						></el-table-column>
						<el-table-column
							prop="calPersonDeviation"
							label="解算/人工误差率 %"
							min-width="110"
							align="center"
						></el-table-column>
						<el-table-column
							prop="windSensorTime"
							label="最近测风时间"
							min-width="120"
							align="center"
						></el-table-column>
						<el-table-column
							prop="calculateTime"
							label="最近解算时间"
							min-width="120"
							align="center"
						></el-table-column>
						<el-table-column
							prop="personQTime"
							label="人工实测时间"
							min-width="120"
							align="center"
						></el-table-column>
						<el-table-column
							prop="pressureTemperature"
							label="温度(C)"
							align="center"
						></el-table-column>
						<el-table-column prop="airHumidity" label="湿度(%RH)" align="center"></el-table-column>
						<el-table-column prop="pressure" label="差压(Pa)" align="center"></el-table-column>
						<el-table-column
							prop="absolutePressure"
							label="绝压(kPa)"
							align="center"
						></el-table-column
						><el-table-column prop="ch4" label="CH4(%)" align="center"></el-table-column
						><el-table-column prop="co2" label="CO2(%)" align="center"></el-table-column
						><el-table-column prop="co" label="CO(ppm)" align="center"></el-table-column>
					</el-table>
				</div>
			</template>
		</div>
		<pagination
			v-show="total > 0"
			:total="total"
			v-model:page="queryParams.pageNum"
			v-model:limit="queryParams.pageSize"
			@pagination="getList"
		/>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/accPerOfRomance/windReport';
</style>
