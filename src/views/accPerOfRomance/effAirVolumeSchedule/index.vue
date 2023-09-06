<!--有效风量明细表-->
<script setup>
	import { effAirVolumeSchedule } from '@/api/request/accPerOfRomance/effAirVolumeSchedule'

	const { dateRange, queryParams, dataList, getList, downLoadFire } = effAirVolumeSchedule()
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
				<div class="normal_btn" @click="getList">生成</div>
				<div class="normal_2_btn" @click="downLoadFire">导出</div>
			</el-form-item>
		</el-form>
		<div class="wind_report_body_content">
			<template v-for="i in dataList">
				<div class="wind_report_body_item">
					<div class="wind_report_body_item_label">{{ i.timeLine }}</div>
					<el-table :data="i.children" border>
						<el-table-column prop="name" label="测风地点" align="center"></el-table-column>
						<el-table-column prop="minQ" label="需要风量(m³/min)" align="center"></el-table-column>
						<el-table-column
							prop="windSensorAirVolume"
							label="有效风量(m³/min)"
							align="center"
						></el-table-column>
					</el-table>
				</div>
			</template>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/accPerOfRomance/windReport';
</style>
