<!--风门风窗预警列表-->
<script setup>
	import useList from '@/hooks/useList'
	import { dynamicHeight, parseTime } from '@/utils/ruoyi'

	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: false,
		},
		chooseRow: {
			type: Object,
			default: {},
		},
	})
	const emits = defineEmits(['update:modelValue'])
	const showDiaLog = computed({
		get() {
			return props.modelValue
		},
		set(val) {
			emits('update:modelValue', val)
		},
	})
	const { queryParams, dateRange, dataList, total, getList, handleQuery, resetQuery } = useList({
		apiFun: () => {},
		params: {
			devId: props.chooseRow.id,
			yjmc: '',
			pageNum: 1,
			pageSize: 10,
		},
		initDateRange: [
			parseTime(new Date(new Date().getTime() - 3600 * 1000 * 24).getTime()),
			parseTime(new Date().getTime()),
		],
	})
</script>

<template>
	<dia-log :title="chooseRow?.name" v-model="showDiaLog" :width="1610" :height="643">
		<el-form ref="queryRef" :model="queryParams" label-width="auto" label-position="right" inline>
			<el-form-item label="时间区间" prop="createtime">
				<el-date-picker
					v-model="dateRange"
					type="datetimerange"
					value-format="YYYY-MM-DD HH:mm:ss"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					prefix-icon="Calendar"
					:teleported="false"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item label="预警内容">
				<el-input v-model="queryParams.yjmc" placeholder="请输入预警内容"></el-input>
			</el-form-item>
			<el-form-item>
				<div class="normal_btn" @click="handleQuery">查询</div>
			</el-form-item>
		</el-form>
		<el-table :data="dataList" border :max-height="dynamicHeight(470)">
			<el-table-column label="设备名称" align="center" prop="devName" />
			<el-table-column label="设备位置" align="center" prop="devLocation" />
			<el-table-column label="预警内容" align="center" prop="yjmc" />
			<el-table-column label="预警时间" align="center" prop="createTime" />
		</el-table>
		<pagination
			:total="total"
			v-model:page="queryParams.pageNum"
			v-model:limit="queryParams.pageSize"
			@pagination="getList"
		/>
	</dia-log>
</template>

<style scoped lang="scss"></style>
