<script setup name="Operlog">
	import { list } from '@/api/monitor/operlog'
	import { parseTime } from '@/utils/ruoyi'
	import useList from '@/hooks/useList'

	const { queryParams, dateRange, total, dataList, getList, handleQuery, resetQuery } = useList({
		apiFun: list,
		params: {
			pageNum: 1,
			pageSize: 10,
			title: undefined,
			gatewayIp: undefined,
		},
	})
</script>

<template>
	<div class="table_page_default_no_btn">
		<el-form :model="queryParams" ref="queryRef" :inline="true" label-width="auto">
			<el-form-item label="系统模块" prop="title">
				<el-input
					v-model="queryParams.title"
					placeholder="请输入标题"
					clearable
					@keyup.enter="handleQuery"
				/>
			</el-form-item>
			<el-form-item label="网关IP" prop="gatewayIp">
				<el-input
					v-model="queryParams.gatewayIp"
					placeholder="请输入网关IP"
					clearable
					@keyup.enter="handleQuery"
				/>
			</el-form-item>
			<el-form-item label="操作时间">
				<el-date-picker
					v-model="dateRange"
					value-format="YYYY-MM-DD"
					type="daterange"
					range-separator="-"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				/>
			</el-form-item>
			<el-form-item>
				<el-button class="ordinary-btn" type="primary" icon="Search" @click="handleQuery"
					>搜索</el-button
				>
				<el-button class="reset-btn" icon="Refresh" @click="resetQuery">重置</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="dataList" border>
			<el-table-column label="标题" align="center" prop="title" />
			<el-table-column label="网关IP" align="center" prop="gatewayIp" />
			<el-table-column label="网关名称" align="center" prop="gatewayName" />
			<el-table-column label="操作时间" align="center" prop="operTime" width="180">
				<template #default="scope">
					<span>{{ parseTime(scope.row.operTime) }}</span>
				</template>
			</el-table-column>
		</el-table>
		<pagination
			v-show="total > 0"
			:total="total"
			v-model:page="queryParams.pageNum"
			v-model:limit="queryParams.pageSize"
			@pagination="getList"
		/>
	</div>
</template>
