<!--安监统计报表-->
<script setup>
	const queryParams = {
		dateTime: '',
	}
	const dataList = ref([])
</script>

<template>
	<div class="safe_body">
		<el-form :model="queryParams" inline>
			<el-form-item label="统计类型">
				<el-select></el-select>
			</el-form-item>
			<el-form-item label="设备类型">
				<el-select></el-select>
			</el-form-item>
			<el-form-item label="日期：">
				<el-date-picker
					v-model="queryParams.dateTime"
					value-format="YYYY-MM-DD"
					type="dates"
					placeholder="选择日期"
					prefix-icon="Calendar"
				></el-date-picker>
			</el-form-item>
			<el-form-item>
				<div class="normal_btn">查询</div>
				<div class="normal_2_btn">导出</div>
			</el-form-item>
		</el-form>
		<el-table :data="dataList" border height="100%">
			<el-table-column label="设备编码" align="center" prop="dictId" />
			<el-table-column label="安装位置" align="center" prop="dictId" />
			<el-table-column label="类型" align="center" prop="dictId" />
			<el-table-column label="单位" align="center" prop="dictId" />
			<el-table-column label="最大值" align="center" prop="dictId" />
			<el-table-column label="最小值" align="center" prop="dictId" />
			<el-table-column label="平均值" align="center" prop="dictId" />
		</el-table>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/sysFusionPerception/safeSupStaReport';
</style>
