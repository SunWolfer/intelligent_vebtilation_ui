<template>
	<div class="table_page_default">
		<el-form :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
			<el-form-item label="岗位编码" prop="postCode">
				<el-input
					v-model="queryParams.postCode"
					placeholder="请输入岗位编码"
					clearable
					@keyup.enter="handleQuery"
				/>
			</el-form-item>
			<el-form-item label="岗位名称" prop="postName">
				<el-input
					v-model="queryParams.postName"
					placeholder="请输入岗位名称"
					clearable
					@keyup.enter="handleQuery"
				/>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-select v-model="queryParams.status" placeholder="岗位状态" clearable>
					<el-option
						v-for="dict in sys_normal_disable"
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
				v-hasPermi="['system:post:add']"
				>新增</el-button
			>
			<el-button
				class="add-btn"
				plain
				icon="Edit"
				:disabled="single"
				@click="handleUpdate"
				v-hasPermi="['system:post:edit']"
				>修改</el-button
			>
			<el-button
				class="delete-btn"
				plain
				icon="Delete"
				:disabled="multiple"
				@click="handleDelete"
				v-hasPermi="['system:post:remove']"
				>删除</el-button
			>
			<el-button
				class="derive-btn"
				plain
				icon="Download"
				@click="handleExport"
				v-hasPermi="['system:post:export']"
				>导出</el-button
			>
		</div>
		<el-table :data="postList" border @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" align="center" />
			<el-table-column label="岗位编号" align="center" prop="postId" />
			<el-table-column label="岗位编码" align="center" prop="postCode" />
			<el-table-column label="岗位名称" align="center" prop="postName" />
			<el-table-column label="岗位排序" align="center" prop="postSort" />
			<el-table-column label="状态" align="center" prop="status">
				<template #default="scope">
					<dict-tag :options="sys_normal_disable" :value="scope.row.status" />
				</template>
			</el-table-column>
			<el-table-column label="创建时间" align="center" prop="createTime" width="180" />
			<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
				<template #default="scope">
					<el-button
						type="primary"
						link
						icon="Edit"
						@click="handleUpdate(scope.row)"
						v-hasPermi="['system:post:edit']"
						>修改</el-button
					>
					<el-button
						type="primary"
						link
						icon="Delete"
						@click="handleDelete(scope.row)"
						v-hasPermi="['system:post:remove']"
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
		<!-- 添加或修改岗位对话框 -->
		<dia-log
			:title="title"
			v-model="open"
			:width="800"
			has-bottom-btn
			@submit="submitForm"
			@cancel="cancel"
		>
			<el-form ref="formRef" :model="form" :rules="rules" label-width="auto" class="diaForm">
				<el-form-item label="岗位名称" prop="postName">
					<el-input v-model="form.postName" placeholder="请输入岗位名称" />
				</el-form-item>
				<el-form-item label="岗位编码" prop="postCode">
					<el-input v-model="form.postCode" placeholder="请输入编码名称" />
				</el-form-item>
				<el-form-item label="岗位顺序" prop="postSort">
					<el-input-number v-model="form.postSort" controls-position="right" :min="0" />
				</el-form-item>
				<el-form-item label="岗位状态" prop="status">
					<el-radio-group v-model="form.status">
						<el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{
							dict.label
						}}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
				</el-form-item>
			</el-form>
		</dia-log>
	</div>
</template>

<script setup>
	import { addPost, delPost, exportPost, getPost, listPost, updatePost } from '@/api/system/post'
	import useDict from '@/hooks/useDict'
	import useList from '@/hooks/useList'
	import { useForm } from '@/hooks/useForm'

	const { sys_normal_disable } = useDict('sys_normal_disable')

	const {
		queryParams,
		dateRange,
		dataList: postList,
		total,
		getList,
		handleQuery,
		resetQuery,
		ids,
		single,
		multiple,
		handleSelectionChange,
		handleDelete,
		handleExport,
	} = useList({
		apiFun: listPost,
		params: {
			pageNum: 1,
			pageSize: 10,
			postCode: undefined,
			postName: undefined,
			status: undefined,
		},
		deleteFun: delPost,
		deleteApi: {
			deleteMes: '岗位编号为',
			deleteKey: 'postId',
		},
		exportFun: exportPost,
	})

	const rules = ref({
		postName: [{ required: true, message: '岗位名称不能为空', trigger: 'blur' }],
		postCode: [{ required: true, message: '岗位编码不能为空', trigger: 'blur' }],
		postSort: [{ required: true, message: '岗位顺序不能为空', trigger: 'blur' }],
	})
	const { formRef, form, title, open, reset, cancel, submitForm, handleUpdate, handleAdd } =
		useForm({
			domRefName: 'formRef',
			formParams: {
				postId: undefined,
				postCode: undefined,
				postName: undefined,
				postSort: 0,
				status: '0',
				remark: undefined,
			},
			formId: 'postId',
			titleMes: '岗位',
			initApi: getPost,
			updateApi: updatePost,
			addApi: addPost,
			afterAddFun: handleQuery,
			afterUpdateFun: handleQuery,
		})
</script>
