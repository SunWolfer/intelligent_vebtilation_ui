<!--风机特性曲线管理-->
<script setup>
	import FanCurveAddOrUpdate from '@/views/venManagement/fanCharCurveManagement/fanCurveAddOrUpdate.vue'
	import { fanCharCurveManagement } from '@/api/request/venManagement/fanCharCurveManagement/fanCharCurveManagement'

	const {
		queryParams,
		fanList,
		rotationalSpeedList,
		bladeAngleList,
		handleQuery,
		dataList,
		chooseRow,
		addOrUpdateVisible,
		handleAdd,
		handleUpdate,
		handleDelete,
		chartOption1,
	} = fanCharCurveManagement()
</script>

<template>
	<div class="fan_management">
		<div class="fan_management_l1">风机特性曲线</div>
		<div class="fullDom fan_management_l2">
			<el-form :model="queryParams" inline>
				<el-form-item label="风机">
					<el-select v-model="queryParams.devId" clearable>
						<el-option v-for="i in fanList" :label="i.name" :value="i.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="转速(r/min)">
					<el-select v-model="queryParams.zhuansu" clearable>
						<el-option
							v-for="i in rotationalSpeedList"
							:label="i.zhuansu"
							:value="i.zhuansu"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="叶片角度">
					<el-select v-model="queryParams.jiaodu" clearable>
						<el-option v-for="i in bladeAngleList" :value="i" :label="i"></el-option>
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
				<el-table-column label="风量(m3/s)" align="center" prop="fengliang" />
				<el-table-column label="通风阻力(Pa)" align="center" prop="tongfengzuli" />
				<el-table-column label="风机全压(Pa)" align="center" prop="quanya" />
				<el-table-column label="风机效率(%)" align="center" prop="xiaolv" />
				<el-table-column label="风机功率(kw)" align="center" prop="gonglv" />
			</el-table>
		</div>
		<fan-curve-add-or-update
			v-if="addOrUpdateVisible"
			v-model="addOrUpdateVisible"
			:choose-row="chooseRow"
			@submit="handleQuery"
		/>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/venManagement/fanCharCurveManagement';
</style>
