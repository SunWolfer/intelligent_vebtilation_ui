<!--环境监测异常预警-->
<script setup>
	import { abnEaWarOfEnvMonitoring } from '@/api/request/intelFaultDiagnosis/abnEaWarOfEnvMonitoring'

	const {
		showPointChart,
		showTrendChart,
		showTypeChart,
		warnLevelList,
		dateRange,
		dataList,
		queryParams,
		total,
		handleQuery,
		getList,
		handleDelete,
		devTypeList,
		YJLXList,
		formatterDevType,
	} = abnEaWarOfEnvMonitoring()
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
			<el-form :model="queryParams" inline>
				<el-form-item label="设备类型">
					<el-select v-model="queryParams.devType" clearable>
						<el-option
							v-for="i in devTypeList"
							:label="i.dictLabel"
							:value="i.dictValue"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="预警设备">
					<el-input v-model="queryParams.devName" clearable />
				</el-form-item>
				<el-form-item label="预警类型">
					<el-select v-model="queryParams.yjlx" clearable>
						<el-option v-for="i in YJLXList" :label="i.yjmc" :value="i.yjlx"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="时间区间">
					<el-date-picker
						clearable
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
					<div class="normal_btn" @click="handleQuery">查询</div>
				</el-form-item>
			</el-form>
		</div>
		<div class="fau_net_body_l3">
			<el-table :data="dataList" border height="100%">
				<el-table-column label="预警类型" prop="yjmc" align="center" />
				<el-table-column label="预警设备" prop="devName" align="center" />
				<el-table-column
					label="设备类型"
					prop="devType"
					align="center"
					:formatter="formatterDevType"
				/>
				<el-table-column label="预警等级" prop="warnLevel" align="center">
					<template #default="scope">
						<span :style="{ color: warnLevelList.get(scope.row.warnLevel)?.[0] }">{{
							warnLevelList.get(scope.row.warnLevel)?.[1]
						}}</span>
					</template>
				</el-table-column>
				<el-table-column label="预警时间" prop="createTime" align="center" />
				<el-table-column label="操作" align="center">
					<template #default="scope">
						<el-button type="primary" link icon="Delete" @click="handleDelete(scope.row)"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
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
	@import '@/assets/styles/intelFaultDiagnosis/fauDiaOfVentNetwork';
</style>
