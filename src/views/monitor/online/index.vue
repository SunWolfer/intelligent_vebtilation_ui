<script setup name="Online">
	import { forceLogout, list as initData } from '@/api/monitor/online'
	import useList from '@/hooks/useList'
	import { parseTime } from '@/utils/ruoyi'

	const { proxy } = getCurrentInstance()

	const { queryParams, loading, total, dataList, getList, handleQuery, resetQuery } = useList({
		apiFun: initData,
		params: {
			ipaddr: undefined,
			userName: undefined,
			pageNum: 1,
			pageSize: 10,
		},
	})

	const tableData = computed(() => {
		return dataList.value.slice(
			(queryParams.value.pageNum - 1) * queryParams.value.pageSize,
			queryParams.value.pageNum * queryParams.value.pageSize,
		)
	})

	const serialNumber = (index) => {
		return (queryParams.value.pageNum - 1) * queryParams.value.pageSize + index + 1
	}

	/** 强退按钮操作 */
	function handleForceLogout(row) {
		proxy.$modal
			.prompt({
				title: '提示',
				message: `是否确认强退名称为${row.userName}的用户？`,
			})
			.then(() => {
				forceLogout(row.tokenId).then(() => {
					getList()
					proxy.$modal.msgSuccess('强退成功')
				})
			})
			.catch(() => {})
	}
</script>

<template>
	<table-page :has-operation-btn="false">
		<template #tablePageForm>
			<el-form :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
				<el-form-item label="登录地址" prop="ipaddr">
					<el-input
						v-model="queryParams.ipaddr"
						placeholder="请输入登录地址"
						clearable
						@keyup.enter="handleQuery"
					/>
				</el-form-item>
				<el-form-item label="用户名称" prop="userName">
					<el-input
						v-model="queryParams.userName"
						placeholder="请输入用户名称"
						clearable
						@keyup.enter="handleQuery"
					/>
				</el-form-item>
				<el-form-item>
					<el-button class="ordinary-btn" type="primary" icon="Search" @click="handleQuery"
						>搜索</el-button
					>
					<el-button class="reset-btn" icon="Refresh" @click="resetQuery">重置</el-button>
				</el-form-item>
			</el-form>
		</template>
		<template #tablePageTable>
			<el-table :data="tableData">
				<el-table-column label="序号" width="55" type="index" align="center">
					<template #default="scope">
						<span>{{ serialNumber(scope.$index) }}</span>
					</template>
				</el-table-column>
				<el-table-column
					label="会话编号"
					align="center"
					prop="tokenId"
					:show-overflow-tooltip="true"
				/>
				<el-table-column
					label="登录名称"
					align="center"
					prop="userName"
					:show-overflow-tooltip="true"
				/>
				<el-table-column
					label="所属部门"
					align="center"
					prop="deptName"
					:show-overflow-tooltip="true"
				/>
				<el-table-column label="主机" align="center" prop="ipaddr" :show-overflow-tooltip="true" />
				<el-table-column
					label="登录地点"
					align="center"
					prop="loginLocation"
					:show-overflow-tooltip="true"
				/>
				<el-table-column label="操作系统" align="center" prop="os" :show-overflow-tooltip="true" />
				<el-table-column
					label="浏览器"
					align="center"
					prop="browser"
					:show-overflow-tooltip="true"
				/>
				<el-table-column label="登录时间" align="center" prop="loginTime" width="180">
					<template #default="scope">
						<span>{{ parseTime(scope.row.loginTime) }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
					<template #default="scope">
						<el-button
							type="primary"
							link
							icon="Delete"
							@click="handleForceLogout(scope.row)"
							v-hasPermi="['monitor:online:forceLogout']"
							>强退</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</template>
		<template #tablePagePagination>
			<pagination
				v-show="total > 0"
				:total="total"
				v-model:page="queryParams.pageNum"
				v-model:limit="queryParams.pageSize"
				@pagination="getList"
			/>
		</template>
	</table-page>
</template>
