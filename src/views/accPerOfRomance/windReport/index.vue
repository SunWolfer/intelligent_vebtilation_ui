<script setup>
	import { windReport } from '@/api/request/accPerOfRomance/windReport'

	const { dateRange, queryParams, tables } = windReport()
</script>

<template>
	<div class="wind_report_body">
		<el-form inline v-model="queryParams">
			<el-form-item label="时间区间">
				<el-date-picker
					v-model="dateRange"
					style="width: 490px; height: 100%"
					value-format="YYYY-MM-DD hh:mm:ss"
					type="datetimerange"
					range-separator="-"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					prefix-icon="Calendar"
				></el-date-picker>
			</el-form-item>
			<el-form-item>
				<div class="normal_btn">生成</div>
				<div class="normal_2_btn">导出</div>
			</el-form-item>
		</el-form>
		<div class="wind_report_body_content">
			<template v-for="i in tables">
				<div class="wind_report_body_item">
					<div class="wind_report_body_item_label">{{ i.date }}</div>
					<el-table :data="i.dataList" border>
						<el-table-column prop="position" label="测风地点" align="center"></el-table-column>
						<el-table-column prop="position" label="断面(m2)" align="center"></el-table-column>
						<el-table-column prop="position" label="风速(m/s)" align="center"></el-table-column>
						<el-table-column
							prop="position"
							label="风量(m3/min)"
							width="110"
							align="center"
						></el-table-column>
						<el-table-column
							prop="position"
							label="解算风量(m3/min)"
							min-width="120"
							align="center"
						></el-table-column>
						<el-table-column
							prop="position"
							label="计划风量(m3/min)"
							min-width="120"
							align="center"
						></el-table-column>
						<el-table-column
							prop="position"
							label="人工实测风量(m3/min)"
							min-width="140"
							align="center"
						></el-table-column>
						<el-table-column
							prop="position"
							label="设备/人工误差率(%)"
							min-width="120"
							align="center"
						></el-table-column>
						<el-table-column
							prop="position"
							label="解算/人工误差率(%)"
							min-width="120"
							align="center"
						></el-table-column>
						<el-table-column
							prop="position"
							label="最近测风时间"
							min-width="100"
							align="center"
						></el-table-column>
						<el-table-column
							prop="position"
							label="最近解算时间"
							min-width="100"
							align="center"
						></el-table-column>
						<el-table-column
							prop="position"
							label="人工实测时间"
							min-width="100"
							align="center"
						></el-table-column>
						<el-table-column prop="position" label="温度(C)" align="center"></el-table-column>
						<el-table-column prop="position" label="湿度(%RH)" align="center"></el-table-column>
						<el-table-column prop="position" label="差压(Pa)" align="center"></el-table-column>
						<el-table-column prop="position" label="绝压(Pa)" align="center"></el-table-column>
					</el-table>
				</div>
			</template>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/accPerOfRomance/windReport';
</style>
