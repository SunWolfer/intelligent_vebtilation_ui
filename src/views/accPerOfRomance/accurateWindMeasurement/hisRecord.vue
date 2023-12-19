<!--风速传感器历史记录-->
<script setup>
	import useList from '@/hooks/useList'
	import { sensorHisList } from '@/api/api/accurateWindMeasurement'
	import { parseTime } from '@/utils/ruoyi'

	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: false,
		},
		dataForm: {
			type: Object,
		},
	})
	const emits = defineEmits(['update:modelValue'])
	const diaVisible = computed({
		get() {
			return props.modelValue
		},
		set(val) {
			emits('update:modelValue', val)
		},
	})

	const { queryParams, handleQuery, dataList, total, getList, dateRange } = useList({
		apiFun: sensorHisList,
		params: {
			pageNum: 1,
			pageSize: 10,
			devId: props.dataForm.id,
		},
		initDateRange: [
			parseTime(new Date(new Date().getTime() - 3600 * 1000 * 24 * 7).getTime()),
			parseTime(new Date().getTime()),
		],
	})
</script>

<template>
	<dia-log v-model="diaVisible" title="历史记录" :width="1200" :height="800">
		<div class="his_record_dia fullDom">
			<el-form :model="queryParams" inline>
				<el-form-item label="时间区间：">
					<el-date-picker
						v-model="dateRange"
						style="width: 490px; height: 100%"
						value-format="YYYY-MM-DD hh:mm:ss"
						type="datetimerange"
						range-separator="-"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						prefix-icon="Calendar"
					/>
				</el-form-item>
				<el-form-item>
					<div class="normal_btn" @click="handleQuery">查询</div>
				</el-form-item>
			</el-form>
			<el-table :data="dataList" border height="100%">
				<el-table-column label="设备名称" align="center" prop="name" />
				<el-table-column label="设备位置" align="center" prop="location" />
				<el-table-column label="断面" align="center" prop="surface" />
				<el-table-column label="风速" align="center" prop="windSpeed" />
				<el-table-column label="风量" align="center" prop="airVolume" />
				<el-table-column label="测量时间" align="center" prop="measureTime" />
			</el-table>
			<pagination
				:total="total"
				v-model:page="queryParams.pageNum"
				v-model:limit="queryParams.pageSize"
				@pagination="getList"
			/>
		</div>
	</dia-log>
</template>

<style scoped lang="scss">
	.his_record_dia {
		display: grid;
		grid-template-rows: vh(48) 1fr vh(50);
		align-items: center;
	}
</style>
