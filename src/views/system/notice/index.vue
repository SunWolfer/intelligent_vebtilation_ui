<template>
	<div class="table_page_default">
		<el-form :model="queryParams" ref="queryRef" :inline="true" label-width="auto">
			<el-form-item label="公告标题" prop="noticeTitle">
				<el-input
					v-model="queryParams.noticeTitle"
					placeholder="请输入公告标题"
					clearable
					@keyup.enter="handleQuery"
				/>
			</el-form-item>
			<el-form-item label="操作人员" prop="createBy">
				<el-input
					v-model="queryParams.createBy"
					placeholder="请输入操作人员"
					clearable
					@keyup.enter="handleQuery"
				/>
			</el-form-item>
			<el-form-item label="类型" prop="noticeType">
				<el-select v-model="queryParams.noticeType" placeholder="公告类型" clearable>
					<el-option
						v-for="dict in sys_notice_type"
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
		<div class="table_page_btn_line">
			<el-button
				class="add-btn"
				plain
				icon="Plus"
				@click="handleAdd"
				v-hasPermi="['system:notice:add']"
				>新增</el-button
			>
			<el-button
				class="add-btn"
				plain
				icon="Edit"
				:disabled="single"
				@click="handleUpdate"
				v-hasPermi="['system:notice:edit']"
				>修改</el-button
			>
			<el-button
				class="delete-btn"
				plain
				icon="Delete"
				:disabled="multiple"
				@click="handleDelete"
				v-hasPermi="['system:notice:remove']"
				>删除</el-button
			>
		</div>
		<el-table border :data="noticeList" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" align="center" />
			<el-table-column label="序号" align="center" prop="noticeId" width="100" />
			<el-table-column
				label="公告标题"
				align="center"
				prop="noticeTitle"
				:show-overflow-tooltip="true"
			/>
			<el-table-column label="公告类型" align="center" prop="noticeType" width="100">
				<template #default="scope">
					<dict-tag :options="sys_notice_type" :value="scope.row.noticeType" />
				</template>
			</el-table-column>
			<el-table-column label="状态" align="center" prop="status" width="100">
				<template #default="scope">
					<dict-tag :options="sys_notice_status" :value="scope.row.status" />
				</template>
			</el-table-column>
			<el-table-column label="创建者" align="center" prop="createBy" width="100" />
			<el-table-column label="创建时间" align="center" prop="createTime" width="100">
				<template #default="scope">
					<span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
				<template #default="scope">
					<el-button
						type="primary"
						link
						icon="Edit"
						@click="handleUpdate(scope.row)"
						v-hasPermi="['system:notice:edit']"
						>修改</el-button
					>
					<el-button
						type="primary"
						link
						icon="Delete"
						@click="handleDelete(scope.row)"
						v-hasPermi="['system:notice:remove']"
						>删除</el-button
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
		<!-- 添加或修改公告对话框 -->
		<dia-log
			:title="title"
			v-model="open"
			:width="800"
			has-bottom-btn
			@submit="submitForm"
			@cancel="cancel"
		>
			<el-form ref="formRef" :model="form" :rules="rules" label-width="80px" class="diaForm">
				<el-row>
					<el-col :span="12">
						<el-form-item label="公告标题" prop="noticeTitle">
							<el-input v-model="form.noticeTitle" placeholder="请输入公告标题" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="公告类型" prop="noticeType">
							<el-select :teleported="false" v-model="form.noticeType" placeholder="请选择">
								<el-option
									v-for="dict in sys_notice_type"
									:key="dict.value"
									:label="dict.label"
									:value="dict.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="状态">
							<el-radio-group v-model="form.status">
								<el-radio v-for="dict in sys_notice_status" :key="dict.value" :label="dict.value">{{
									dict.label
								}}</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="内容">
							<el-input
								:rows="6"
								type="textarea"
								placeholder="请输入内容"
								v-model="form.noticeContent"
							/>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</dia-log>
	</div>
</template>

<script setup name="Notice">
	import { listNotice, getNotice, delNotice, addNotice, updateNotice } from '@/api/system/notice'
	import useDict from '@/hooks/useDict'
	import useList from '@/hooks/useList'
	import { useForm } from '@/hooks/useForm'

	const { sys_notice_status, sys_notice_type } = useDict('sys_notice_status', 'sys_notice_type')

	const {
		queryParams,
		dataList: noticeList,
		total,
		getList,
		handleQuery,
		resetQuery,
		ids,
		single,
		multiple,
		handleSelectionChange,
		handleDelete,
	} = useList({
		apiFun: listNotice,
		params: {
			pageNum: 1,
			pageSize: 10,
			noticeTitle: undefined,
			createBy: undefined,
			status: undefined,
		},
		deleteFun: delNotice,
		deleteApi: {
			deleteMes: '公告编号为',
			deleteKey: 'noticeId',
		},
	})

	const rules = ref({
		noticeTitle: [{ required: true, message: '公告标题不能为空', trigger: 'blur' }],
		noticeType: [{ required: true, message: '公告类型不能为空', trigger: 'change' }],
	})
	const { formRef, form, title, open, reset, cancel, submitForm, handleUpdate, handleAdd } =
		useForm({
			domRefName: 'formRef',
			formParams: {
				noticeId: undefined,
				noticeTitle: undefined,
				noticeType: undefined,
				noticeContent: undefined,
				status: '0',
			},
			formId: 'undefined',
			titleMes: '公告',
			initApi: getNotice,
			updateApi: updateNotice,
			addApi: addNotice,
			afterAddFun: handleQuery,
			afterUpdateFun: handleQuery,
		})
</script>
