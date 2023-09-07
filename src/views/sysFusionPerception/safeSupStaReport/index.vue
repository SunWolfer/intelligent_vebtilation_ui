<!--安监统计报表-->
<script setup>
	import useDict from '@/hooks/useDict'
	import useList from '@/hooks/useList'
	import { listSafeSupStaReport, safeTypeDict } from '@/api/api/safeSupStaReport'

	const { report_type } = useDict('report_type')

	const { queryParams, dataList, handleQuery, dateRange, downLoadFire } = useList({
		apiFun: listSafeSupStaReport,
		params: {
			createTime: '',
			reportType: '',
			type: '',
		},
		resetReadyListFun: (res) => {
			dataList.value = res.data
		},
		beforeReadyListFun: () => {
			queryParams.value.createTime = dateRange.value
			return !queryParams.value.createTime || !queryParams.value.reportType
		},
		exportParams: {
			api: '/api/attribute/dayMonthReportExport',
			params: () => {
				queryParams.value.createTime = dateRange.value
				return queryParams.value
			},
			title: `安监报表${new Date().getTime()}.xlsx`,
		},
	})
	// 点位类型
	const typeList = ref([])
	const getTypeList = async () => {
		const res = await safeTypeDict()
		if (!res) return
		typeList.value = res.data
	}
	getTypeList()

	//   格式化类型
	const formatterType = (row) => {
		return typeList.value.find((i) => {
			return i.type === row.type
		})?.typeName
	}
</script>

<template>
	<div class="table_page_default_no_btn">
		<el-form :model="queryParams" inline>
			<el-form-item label="统计类型">
				<el-select v-model="queryParams.reportType">
					<el-option v-for="i in report_type" :label="i.label" :value="i.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="设备类型">
				<el-select v-model="queryParams.type">
					<el-option v-for="i in typeList" :label="i.typeName" :value="i.type"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="日期：">
				<el-date-picker
					v-model="dateRange"
					v-if="queryParams.reportType === '1'"
					value-format="YYYY-MM-DD"
					type="date"
					placeholder="选择日期"
					prefix-icon="Calendar"
				></el-date-picker>
				<el-date-picker
					v-model="dateRange"
					v-else
					value-format="YYYY-MM"
					type="month"
					placeholder="选择日期"
					prefix-icon="Calendar"
				></el-date-picker>
			</el-form-item>
			<el-form-item>
				<div class="normal_btn" @click="handleQuery">查询</div>
				<div class="normal_2_btn" @click="downLoadFire">导出</div>
			</el-form-item>
		</el-form>
		<el-table :data="dataList" border height="100%">
			<el-table-column label="设备编码" align="center" prop="sensor_code" />
			<el-table-column label="安装位置" align="center" prop="sensor_loc" />
			<el-table-column label="类型" align="center" prop="type" :formatter="formatterType" />
			<el-table-column label="单位" align="center" prop="unit" />
			<el-table-column label="最大值" align="center" prop="valueMax" />
			<el-table-column label="最小值" align="center" prop="valueMin" />
			<el-table-column label="平均值" align="center" prop="valueAvg" />
		</el-table>
	</div>
</template>
