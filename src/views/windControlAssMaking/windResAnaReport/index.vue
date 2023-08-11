<script setup>
	import { windResAnaReport } from '@/api/request/windControlAssMaking/windResAnaReport'

	const { windageRoute, windResAnalysisList, dataList } = windResAnaReport()
</script>

<template>
	<div class="wind_res_ana">
		<div class="wind_res_ana_title">通风阻力分析路线</div>
		<div class="wind_res_ana_route">
			<template v-for="item in windageRoute">
				<div class="wind_res_ana_route_item">
					<border-box name="border7"
						><span>{{ item }}</span></border-box
					>
				</div>
				<div class="wind_res_ana_route_icon"></div>
			</template>
		</div>
		<div class="wind_res_ana_t1 wind_res_ana_t">通风阻力分析结论</div>
		<div class="wind_res_ana_l1">
			<template v-for="(item, index) in windResAnalysisList">
				<div class="wind_res_ana_l1_icon">{{ index + 1 }}</div>
				<span>{{ item }}</span>
			</template>
		</div>

		<div class="wind_res_ana_t2 wind_res_ana_t">通风阻力分析汇总表</div>
		<div class="wind_res_ana_l2">
			<el-table :data="dataList" height="100%" border>
				<el-table-column label="井巷代号" align="center" prop="code"></el-table-column>
				<el-table-column label="巷道名称" align="center" prop="code"></el-table-column>
				<el-table-column label="巷道形状" align="center" prop="code"></el-table-column>
				<el-table-column label="支护类型" align="center" prop="code"></el-table-column>
				<el-table-column label="巷道通风阻力Pa" align="center" prop="code"></el-table-column>
				<el-table-column label="巷道断面积m2" align="center" prop="code"></el-table-column>
				<el-table-column label="巷道周长m" align="center" prop="code"></el-table-column>
				<el-table-column label="巷道长度m" align="center" prop="code"></el-table-column>
				<el-table-column label="巷道风量m3/s" align="center" prop="code"></el-table-column>
				<el-table-column label="巷道风阻N・s2/m8" align="center" prop="code"></el-table-column>
			</el-table>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/windResAnaReport';
</style>
