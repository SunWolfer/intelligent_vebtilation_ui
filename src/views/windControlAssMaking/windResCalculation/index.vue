<!--风阻测算-->
<script setup>
	import { windResCalculation } from '@/api/request/windControlAssMaking/windResCalculation'

	const { meaWindResDataList, artWindResDataList, calOfWindResDataList } = windResCalculation()
</script>

<template>
	<div class="wind_res_body">
		<div class="wind_res_icon">实测计算风阻</div>
		<div class="wind_res_body_table">
			<el-table :data="meaWindResDataList" height="100%" border>
				<el-table-column label="巷道名称" align="center" prop="name"></el-table-column>
				<el-table-column label="巷道编号" align="center" prop="name"></el-table-column>
				<el-table-column label="风阻" align="center" prop="name"></el-table-column>
				<el-table-column label="A" align="center">
					<el-table-column label="温度(℃)" align="center" prop="name"></el-table-column>
					<el-table-column label="湿度(%RH)" align="center" prop="name"></el-table-column>
					<el-table-column label="差压(Pa)" align="center" prop="name"></el-table-column>
					<el-table-column label="绝压(kPa)" align="center" prop="name"></el-table-column>
					<el-table-column label="高程(m)" align="center" prop="name"></el-table-column>
					<el-table-column label="风量(m³/s)" align="center" prop="name"></el-table-column>
				</el-table-column>
				<el-table-column label="B" align="center">
					<el-table-column label="温度(℃)" align="center" prop="name"></el-table-column>
					<el-table-column label="湿度(%RH)" align="center" prop="name"></el-table-column>
					<el-table-column label="差压(Pa)" align="center" prop="name"></el-table-column>
					<el-table-column label="绝压(kPa)" align="center" prop="name"></el-table-column>
					<el-table-column label="高程(m)" align="center" prop="name"></el-table-column>
					<el-table-column label="风量(m³/s)" align="center" prop="name"></el-table-column>
				</el-table-column>
				<el-table-column label="解算时间" align="center" prop="name"></el-table-column>
			</el-table>
		</div>

		<div class="wind_res_body_half">
			<div class="wind_res_icon">人工测定风阻</div>
			<div class="wind_res_body_half_right">
				<div class="wind_res_icon">测算风阻</div>
				<div class="normal_btn">保存</div>
				<div class="normal_2_btn">风阻测算</div>
			</div>
		</div>
		<div class="wind_res_body_half">
			<div class="wind_res_body_table">
				<el-table :data="artWindResDataList" height="100%" border>
					<el-table-column label="巷道名称" align="center" prop="name"></el-table-column>
					<el-table-column label="巷道编号" align="center" prop="name"></el-table-column>
					<el-table-column label="风阻" align="center" prop="name"></el-table-column>
					<el-table-column label="解算时间" align="center" prop="name"></el-table-column>
				</el-table>
			</div>
			<div class="wind_res_body_table">
				<el-table :data="calOfWindResDataList" height="100%" border>
					<el-table-column label="巷道名称" align="center" prop="name"></el-table-column>
					<el-table-column label="巷道编号" align="center" prop="name"></el-table-column>
					<el-table-column label="风阻" align="center" prop="name"></el-table-column>
					<el-table-column label="解算时间" align="center" prop="name"></el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/windResCalculation';
</style>
