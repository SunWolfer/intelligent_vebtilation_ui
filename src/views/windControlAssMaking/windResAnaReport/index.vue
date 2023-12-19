<script setup>
	import useList from '@/hooks/useList'
	import { getVentList, getVentResult } from '@/api/api/windResAnaReport'

	//   通风阻力分析路线
	const windageRoute = ref([
		'副斜井',
		'井底停车场',
		'消防材料库',
		'950皮带',
		'1311皮带上山',
		'021301运',
		'021301回',
		'1213回风上山',
		'12层总回',
		'南风井',
	])
	const dataForm = ref({
		inVent: 0,
		outVent: 0,
		ventR1: 0,
		ventR2: 0,
		ventP: 0,
		ventD: 0,
		ventS: 0,
	})
	const getDataForm = async () => {
		const { data } = await getVentResult()
		dataForm.value = data
	}
	// 通风阻力分析结论
	const windResAnalysisList = computed(() => {
		return [
			`矿井总进风量：${dataForm.value.inVent}m³/min`,
			`矿井总回风量：${dataForm.value.outVent}m³/min`,
			`系统理论计算阻力值：${dataForm.value.ventR1}Pa`,
			`系统气压计检测阻力值：${dataForm.value.ventR2}Pa`,
			`自然风压：${dataForm.value.ventP}Pa`,
			`相对误差：${dataForm.value.ventD}%`,
			`矿井等级孔：${dataForm.value.ventS}m²`,
		]
	})
	// 通风阻力分析汇总表
	const { queryParams, dataList, total, getList } = useList({
		apiFun: getVentList,
		params: {
			pageNum: 1,
			pageSize: 10,
		},
	})

	getDataForm()
</script>

<template>
	<div class="wind_res_ana">
		<div class="wind_res_ana_title">通风阻力分析路线</div>
		<div class="wind_res_ana_route">
			<template v-for="(item, index) in windageRoute" :key="index">
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
			<template v-for="(item, index) in windResAnalysisList" :key="'wind' + index">
				<div class="wind_res_ana_l1_icon">{{ index + 1 }}</div>
				<span>{{ item }}</span>
			</template>
		</div>

		<div class="wind_res_ana_t2 wind_res_ana_t">通风阻力分析汇总表</div>
		<div class="wind_res_ana_l2">
			<el-table :data="dataList" height="100%" border>
				<el-table-column label="井巷代号" align="center" prop="code" />
				<el-table-column label="巷道名称" align="center" prop="code" />
				<el-table-column label="巷道形状" align="center" prop="code" />
				<el-table-column label="支护类型" align="center" prop="code" />
				<el-table-column label="巷道通风阻力Pa" align="center" prop="code" />
				<el-table-column label="巷道断面积m2" align="center" prop="code" />
				<el-table-column label="巷道周长m" align="center" prop="code" />
				<el-table-column label="巷道长度m" align="center" prop="code" />
				<el-table-column label="巷道风量m3/s" align="center" prop="code" />
				<el-table-column label="巷道风阻N・s2/m8" align="center" prop="code" />
			</el-table>
			<pagination
				v-show="total > 0"
				:total="total"
				v-model:page="queryParams.pageNum"
				v-model:limit="queryParams.pageSize"
				@pagination="getList"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/windResAnaReport';
</style>
