<script setup name="JobLog">
	import { getJob } from '@/api/monitor/job'
	import { cleanJobLog, delJobLog, exportJobLog, listJobLog } from '@/api/monitor/jobLog'
	import { useDict } from '@/hooks/useDict'
	import useList from '@/hooks/useList'

	const { proxy } = getCurrentInstance()
	const { sys_common_status, sys_job_group } = useDict('sys_common_status', 'sys_job_group')

	const {
		queryParams,
		dateRange,
		total,
		dataList,
		getList,
		handleQuery,
		resetQuery,
		ids,
		multiple,
		handleSelectionChange,
		handleDelete,
		handleExport,
	} = useList({
		automatic: false,
		apiFun: listJobLog,
		params: {
			pageNum: 1,
			pageSize: 10,
			dictName: undefined,
			dictType: undefined,
			status: undefined,
		},
		deleteFun: delJobLog,
		deleteApi: {
			deleteKey: 'jobLogId',
			deleteMes: '调度日志编号为',
		},
		exportFun: exportJobLog,
	})

	// 返回按钮
	function handleClose() {
		const obj = { path: '/monitor/job' }
		proxy.$tab.closeOpenPage(obj)
	}

	const open = ref(false)
	const showSearch = ref(true)
	const route = useRoute()

	const form = ref({})

	/** 详细按钮操作 */
	function handleView(row) {
		open.value = true
		form.value = row
	}
	/** 清空按钮操作 */
	function handleClean() {
		proxy.$modal
			.prompt({
				message: '是否确认清空所有调度日志数据项',
			})
			.then(() => {
				cleanJobLog().then(() => {
					getList()
					proxy.$modal.msgSuccess('清空成功')
				})
			})
			.catch(() => {})
	}

	onMounted(() => {
		const jobId = route.query.jobId
		if (jobId !== undefined && jobId !== 0) {
			getJob(jobId).then((response) => {
				queryParams.value.jobName = response.data?.jobName
				queryParams.value.jobGroup = response.data?.jobGroup
				getList()
			})
		} else {
			getList()
		}
	})
</script>

<template>
	<div class="table_page_default">
		<el-form
			:model="queryParams"
			ref="queryRef"
			:inline="true"
			v-show="showSearch"
			label-width="auto"
		>
			<el-form-item label="任务名称" prop="jobName">
				<el-input
					v-model="queryParams.jobName"
					placeholder="请输入任务名称"
					clearable
					@keyup.enter="handleQuery"
				/>
			</el-form-item>
			<el-form-item label="任务组名" prop="jobGroup">
				<el-select v-model="queryParams.jobGroup" placeholder="请选择任务组名" clearable>
					<el-option
						v-for="dict in sys_job_group"
						:key="dict.value"
						:label="dict.label"
						:value="dict.value"
					/>
				</el-select>
			</el-form-item>
			<el-form-item label="执行状态" prop="status">
				<el-select v-model="queryParams.status" placeholder="请选择执行状态" clearable>
					<el-option
						v-for="dict in sys_common_status"
						:key="dict.value"
						:label="dict.label"
						:value="dict.value"
					/>
				</el-select>
			</el-form-item>
			<el-form-item label="执行时间">
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
		<div class="table_page_btn_line">
			<el-button
				class="delete-btn"
				plain
				icon="Delete"
				:disabled="multiple"
				@click="handleDelete"
				v-hasPermi="['monitor:job:remove']"
				>删除</el-button
			>
			<el-button
				class="delete-btn"
				plain
				icon="Delete"
				@click="handleClean"
				v-hasPermi="['monitor:job:remove']"
				>清空</el-button
			>
			<el-button
				class="derive-btn"
				plain
				icon="Download"
				@click="handleExport"
				v-hasPermi="['monitor:job:export']"
				>导出</el-button
			>
			<el-button class="add-btn" plain icon="Close" @click="handleClose">关闭</el-button>
		</div>
		<el-table border :data="dataList" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" align="center" />
			<el-table-column label="日志编号" width="80" align="center" prop="jobLogId" />
			<el-table-column
				label="任务名称"
				align="center"
				prop="jobName"
				:show-overflow-tooltip="true"
			/>
			<el-table-column
				label="任务组名"
				align="center"
				prop="jobGroup"
				:show-overflow-tooltip="true"
			>
				<template #default="scope">
					<dict-tag :options="sys_job_group" :value="scope.row.jobGroup" />
				</template>
			</el-table-column>
			<el-table-column
				label="调用目标字符串"
				align="center"
				prop="invokeTarget"
				:show-overflow-tooltip="true"
			/>
			<el-table-column
				label="日志信息"
				align="center"
				prop="jobMessage"
				:show-overflow-tooltip="true"
			/>
			<el-table-column label="执行状态" align="center" prop="status">
				<template #default="scope">
					<dict-tag :options="sys_common_status" :value="scope.row.status" />
				</template>
			</el-table-column>
			<el-table-column label="执行时间" align="center" prop="createTime" width="180">
				<template #default="scope">
					<span>{{ parseTime(scope.row.createTime) }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
				<template #default="scope">
					<el-button
						type="primary"
						link
						icon="View"
						@click="handleView(scope.row)"
						v-hasPermi="['monitor:job:query']"
						>详细</el-button
					>
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
		<!-- 调度日志详细 -->
		<dia-log title="调度日志详细" v-model="open" :width="800">
			<el-form :model="form" label-width="auto" class="diaForm">
				<el-row>
					<el-col :span="12">
						<el-form-item label="日志序号：">{{ form.jobLogId }}</el-form-item>
						<el-form-item label="任务名称：">{{ form.jobName }}</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="任务分组：">{{ form.jobGroup }}</el-form-item>
						<el-form-item label="执行时间：">{{ form.createTime }}</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="调用方法：">{{ form.invokeTarget }}</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="日志信息：">{{ form.jobMessage }}</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="执行状态：">
							<div v-if="form.status === '0'">正常</div>
							<div v-else-if="form.status === '1'">失败</div>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="异常信息：" v-if="form.status == 1">{{
							form.exceptionInfo
						}}</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #btn>
				<div class="dialog-footer">
					<el-button class="reset-btn" @click="open = false">关 闭</el-button>
				</div>
			</template>
		</dia-log>
	</div>
</template>

<style lang="scss" scoped>
	.diaForm {
		:deep(.el-form-item__content) {
			color: #ffffff;
		}
	}
</style>
