<script setup name="Job">
	import {
		addJob,
		changeJobStatus,
		delJob,
		exportJob,
		getJob,
		listJob,
		runJob,
		updateJob,
	} from '@/api/monitor/job'
	import useDict from '@/hooks/useDict'
	import useList from '@/hooks/useList'
	import { parseTime } from '@/utils/ruoyi'
	import { useForm } from '@/hooks/useForm'

	const router = useRouter()
	const { proxy } = getCurrentInstance()
	const { sys_job_group, sys_job_status } = useDict('sys_job_group', 'sys_job_status')

	const {
		queryParams,
		total,
		dataList: jobList,
		getList,
		handleQuery,
		resetQuery,
		ids,
		multiple,
		handleSelectionChange,
		handleDelete,
		handleExport,
	} = useList({
		apiFun: listJob,
		params: {
			pageNum: 1,
			pageSize: 10,
			jobName: undefined,
			jobGroup: undefined,
			status: undefined,
		},
		deleteFun: delJob,
		deleteApi: {
			deleteMes: '定时任务编号为',
			deleteKey: 'jobId',
		},
		exportFun: exportJob,
	})

	/** 任务组名字典翻译 */
	function jobGroupFormat(row, column) {
		return proxy.selectDictLabel(sys_job_group.value, row.jobGroup)
	}
	const rules = ref({
		jobName: [{ required: true, message: '任务名称不能为空', trigger: 'blur' }],
		invokeTarget: [{ required: true, message: '调用目标字符串不能为空', trigger: 'blur' }],
		cronExpression: [{ required: true, message: 'cron执行表达式不能为空', trigger: 'blur' }],
	})
	const { formRef, form, title, open, reset, cancel, submitForm, handleUpdate, handleAdd } =
		useForm({
			domRefName: 'formRef',
			formParams: {
				jobId: undefined,
				jobName: undefined,
				jobGroup: undefined,
				invokeTarget: undefined,
				cronExpression: undefined,
				misfirePolicy: 1,
				concurrent: 1,
				status: '0',
			},
			formId: 'jobId',
			titleMes: '任务',
			initApi: getJob,
			updateApi: updateJob,
			addApi: addJob,
			afterAddFun: handleQuery,
			afterUpdateFun: handleQuery,
		})

	// 任务状态修改
	function handleStatusChange(row) {
		let text = row.status === '0' ? '启用' : '停用'
		proxy.$modal
			.prompt({
				title: '系统提示',
				message: `确认要${text}${row.jobName}任务吗?`,
			})
			.then(() => {
				changeJobStatus(row.jobId, row.status).then(() => {
					getList()
					proxy.$modal.msgSuccess(text + '成功')
				})
			})
			.catch(() => {
				getList()
			})
	}
	/* 立即执行一次 */
	function handleRun(row) {
		proxy.$modal
			.prompt({
				title: '系统提示',
				message: `确认要立即执行一次${row.jobName}任务吗?`,
			})
			.then(() => {
				runJob(row.jobId, row.jobGroup).then(() => {
					proxy.$modal.msgSuccess('执行成功')
				})
			})
			.catch(() => {})
	}
	/** 任务详细信息 */
	const openView = ref(false)
	function handleView(row) {
		getJob(row.jobId).then((response) => {
			form.value = response.data
			openView.value = true
		})
	}
	/** 任务日志列表查询 */
	function handleJobLog(row) {
		const jobId = row.jobId || 0
		router.push({ path: '/monitor/job-log/index', query: { jobId: jobId } })
	}
</script>

<template>
	<table-page>
		<template #tablePageForm>
			<el-form :model="queryParams" ref="queryRef" :inline="true" label-width="auto">
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
				<el-form-item label="任务状态" prop="status">
					<el-select v-model="queryParams.status" placeholder="请选择任务状态" clearable>
						<el-option
							v-for="dict in sys_job_status"
							:key="dict.value"
							:label="dict.label"
							:value="dict.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button class="ordinary-btn" type="primary" icon="Search" @click="handleQuery"
						>搜索</el-button
					>
					<el-button class="reset-btn" icon="Refresh" @click="resetQuery">重置</el-button>
				</el-form-item>
			</el-form>
		</template>
		<template #tablePageBtn>
			<el-button
				class="add-btn"
				plain
				icon="Plus"
				@click="handleAdd"
				v-hasPermi="['monitor:job:add']"
				>新增</el-button
			>
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
				class="derive-btn"
				plain
				icon="Download"
				@click="handleExport"
				v-hasPermi="['monitor:job:export']"
				>导出</el-button
			>
			<el-button
				class="add-btn"
				plain
				icon="Operation"
				@click="handleJobLog"
				v-hasPermi="['monitor:job:query']"
				>日志</el-button
			>
		</template>
		<template #tablePageTable>
			<el-table :data="jobList" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center" />
				<el-table-column label="任务编号" width="100" align="center" prop="jobId" />
				<el-table-column
					label="任务名称"
					align="center"
					prop="jobName"
					:show-overflow-tooltip="true"
				/>
				<el-table-column label="任务组名" align="center" prop="jobGroup">
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
					label="cron执行表达式"
					align="center"
					prop="cronExpression"
					:show-overflow-tooltip="true"
				/>
				<el-table-column label="状态" align="center">
					<template #default="scope">
						<el-switch
							v-model="scope.row.status"
							active-value="0"
							inactive-value="1"
							@change="handleStatusChange(scope.row)"
						></el-switch>
					</template>
				</el-table-column>
				<el-table-column
					label="操作"
					align="center"
					width="200"
					class-name="small-padding fixed-width"
				>
					<template #default="scope">
						<el-tooltip content="修改" placement="top">
							<el-button
								type="primary"
								link
								icon="Edit"
								@click="handleUpdate(scope.row)"
								v-hasPermi="['monitor:job:edit']"
							></el-button>
						</el-tooltip>
						<el-tooltip content="删除" placement="top">
							<el-button
								type="primary"
								link
								icon="Delete"
								@click="handleDelete(scope.row)"
								v-hasPermi="['monitor:job:remove']"
							></el-button>
						</el-tooltip>
						<el-tooltip content="执行一次" placement="top">
							<el-button
								type="primary"
								link
								icon="CaretRight"
								@click="handleRun(scope.row)"
								v-hasPermi="['monitor:job:changeStatus']"
							></el-button>
						</el-tooltip>
						<el-tooltip content="任务详细" placement="top">
							<el-button
								type="primary"
								link
								icon="View"
								@click="handleView(scope.row)"
								v-hasPermi="['monitor:job:query']"
							></el-button>
						</el-tooltip>
						<el-tooltip content="调度日志" placement="top">
							<el-button
								type="primary"
								link
								icon="Operation"
								@click="handleJobLog(scope.row)"
								v-hasPermi="['monitor:job:query']"
							></el-button>
						</el-tooltip>
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
			<!-- 添加或修改定时任务对话框 -->
			<dia-log
				:title="title"
				v-model="open"
				:width="800"
				has-bottom-btn
				@submit="submitForm"
				@cancel="cancel"
			>
				<el-form ref="formRef" :model="form" :rules="rules" label-width="auto" class="diaForm">
					<el-row>
						<el-col :span="12">
							<el-form-item label="任务名称" prop="jobName">
								<el-input v-model="form.jobName" placeholder="请输入任务名称" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="任务分组" prop="jobGroup">
								<el-select :teleported="false" v-model="form.jobGroup" placeholder="请选择">
									<el-option
										v-for="dict in sys_job_group"
										:key="dict.value"
										:label="dict.label"
										:value="dict.value"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item prop="invokeTarget">
								<template #label>
									<span>
										调用方法
										<el-tooltip placement="top">
											<template #content>
												<div>
													Bean调用示例：ryTask.ryParams('ry')
													<br />Class类调用示例：com.ruoyi.quartz.task.RyTask.ryParams('ry')
													<br />参数说明：支持字符串，布尔类型，长整型，浮点型，整型
												</div>
											</template>
											<el-icon><question-filled /></el-icon>
										</el-tooltip>
									</span>
								</template>
								<el-input v-model="form.invokeTarget" placeholder="请输入调用目标字符串" />
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="cron表达式" prop="cronExpression">
								<el-input v-model="form.cronExpression" placeholder="请输入cron执行表达式">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="执行策略" prop="misfirePolicy">
								<el-radio-group v-model="form.misfirePolicy">
									<el-radio-button label="1">立即执行</el-radio-button>
									<el-radio-button label="2">执行一次</el-radio-button>
									<el-radio-button label="3">放弃执行</el-radio-button>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="是否并发" prop="concurrent">
								<el-radio-group v-model="form.concurrent">
									<el-radio-button label="0">允许</el-radio-button>
									<el-radio-button label="1">禁止</el-radio-button>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="状态">
								<el-radio-group v-model="form.status">
									<el-radio v-for="dict in sys_job_status" :key="dict.value" :label="dict.value">{{
										dict.label
									}}</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</dia-log>

			<!-- 任务日志详细 -->
			<dia-log title="任务详细" v-model="openView" :width="800" has-bottom-btn>
				<el-form :model="form" label-width="auto" class="diaForm">
					<el-row>
						<el-col :span="12">
							<el-form-item label="任务编号：">{{ form.jobId }}</el-form-item>
							<el-form-item label="任务名称：">{{ form.jobName }}</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="任务分组：">{{ jobGroupFormat(form) }}</el-form-item>
							<el-form-item label="创建时间：">{{ form.createTime }}</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="cron表达式：">{{ form.cronExpression }}</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="下次执行时间：">{{
								parseTime(form.nextValidTime)
							}}</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="调用目标方法：">{{ form.invokeTarget }}</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="任务状态：">
								<div v-if="form.status === '0'">正常</div>
								<div v-else-if="form.status === '1'">失败</div>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="是否并发：">
								<div v-if="form.concurrent === '0'">允许</div>
								<div v-else-if="form.concurrent === '1'">禁止</div>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="执行策略：">
								<div v-if="form.misfirePolicy === '0'">默认策略</div>
								<div v-else-if="form.misfirePolicy === '1'">立即执行</div>
								<div v-else-if="form.misfirePolicy === '2'">执行一次</div>
								<div v-else-if="form.misfirePolicy === '3'">放弃执行</div>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<template #btn>
					<div class="dialog-footer">
						<el-button class="reset-btn" @click="openView = false">关 闭</el-button>
					</div>
				</template>
			</dia-log>
		</template>
	</table-page>
</template>

<style lang="scss" scoped>
	.diaForm {
		:deep(.el-form-item__content) {
			color: #ffffff;
		}
	}
</style>
