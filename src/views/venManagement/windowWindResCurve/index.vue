<!--风窗风阻曲线-->
<script setup>
	import { windowWindResCurve } from '@/api/request/venManagement/windowCurveManagement/windowWindResCurve'
	import WindowCurveAddOrUpdate from '@/views/venManagement/windowWindResCurve/WindowCurveAddOrUpdate.vue'

	const {
		windowList,
		queryParams,
		handleQuery,
		dataList,
		chooseRow,
		addOrUpdateVisible,
		handleAdd,
		handleUpdate,
		handleDelete,
		chartOption1,
	} = windowWindResCurve()
</script>

<template>
	<div class="fan_management">
		<div class="fan_management_l1">风窗风阻曲线</div>
		<div class="fullDom fan_management_l2">
			<el-form :model="queryParams" inline>
				<el-form-item label="风窗">
					<el-select v-model="queryParams.devId" clearable>
						<el-option v-for="i in windowList" :key="i.id" :label="i.name" :value="i.id" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<div class="normal_btn" @click="handleQuery">查询</div>
					<div class="normal_4_btn" @click="handleAdd">新增</div>
					<div class="normal_2_btn" @click="handleUpdate">修改</div>
					<div class="normal_3_btn" @click="handleDelete">删除</div>
				</el-form-item>
			</el-form>
		</div>
		<div class="fullDom fan_management_l3">
			<BaseEchart :option="chartOption1" />
		</div>
		<div class="fullDom fan_management_l4">
			<el-table :data="dataList" border height="100%">
				<el-table-column label="开度" align="center" prop="kaidu" />
				<el-table-column label="风阻" align="center" prop="fengzu" />
			</el-table>
		</div>
		<WindowCurveAddOrUpdate
			v-if="addOrUpdateVisible"
			v-model="addOrUpdateVisible"
			:choose-row="chooseRow"
			:window-list="windowList"
			@submit="handleQuery"
		/>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/venManagement/fanCharCurveManagement';
</style>
