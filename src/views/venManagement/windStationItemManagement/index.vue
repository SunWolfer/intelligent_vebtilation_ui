<!--测风站数据项-->
<script setup>
	import useList from '@/hooks/useList'
	import {
		addWindStation,
		delWindStation,
		getWindStation,
		listWindStation,
		updateWindStation,
	} from '@/api/api/windStationItemManagement'
	import { useForm } from '@/hooks/useForm'

	const {
		queryParams,
		total,
		dataList,
		getList,
		handleQuery,
		handleDelete,
		handleSelectionChange,
	} = useList({
		apiFun: listWindStation,
		params: {
			propertyCode: '',
			propertyName: '',
			pageNum: 1,
			pageSize: 10,
		},
		deleteFun: delWindStation,
	})
	const { formRef, form, title, open, reset, cancel, submitForm, handleUpdate, handleAdd } =
		useForm({
			domRefName: 'formRef',
			formParams: {
				propertyCode: '',
				propertyName: '',
				propertyType: '',
				propertyUnit: '',
			},
			titleMes: '数据项',
			initApi: getWindStation,
			addApi: addWindStation,
			updateApi: updateWindStation,
			afterAddFun: handleQuery,
			afterUpdateFun: handleQuery,
		})
	const rules = reactive({
		propertyCode: [{ required: true, message: '标签编码不能为空', trigger: 'blur' }],
		propertyName: [{ required: true, message: '标签名称不能为空', trigger: 'blur' }],
	})
</script>

<template>
	<div class="table_page_default">
		<el-form :model="queryParams" inline>
			<el-form-item label="标签名称">
				<el-input v-model="queryParams.propertyName" />
			</el-form-item>
			<el-form-item label="标签编码">
				<el-input v-model="queryParams.propertyCode" />
			</el-form-item>
			<el-form-item>
				<div class="normal_btn" @click="handleQuery">查询</div>
			</el-form-item>
		</el-form>
		<div class="table_page_btn_line">
			<div class="normal_btn" @click="handleAdd">新增</div>
			<div class="normal_3_btn" @click="handleDelete">删除</div>
		</div>
		<el-table :data="dataList" border @selection-change="handleSelectionChange">
			<el-table-column type="selection" align="center" width="50" />
			<el-table-column
				prop="propertyName"
				align="center"
				min-width="110"
				show-overflow-tooltip
				label="标签名称"
			/>
			<el-table-column
				prop="propertyCode"
				align="center"
				min-width="160"
				show-overflow-tooltip
				label="标签编码"
			/><el-table-column
				prop="propertyUnit"
				align="center"
				min-width="160"
				show-overflow-tooltip
				label="标签单位"
			/>
			<el-table-column align="center" width="150" label="操作">
				<template #default="scope">
					<el-button link size="small" @click="handleUpdate(scope.row)">修改</el-button>
					<el-button link size="small" @click="handleDelete(scope.row)">删除</el-button>
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
		<dia-log
			:title="title"
			v-model="open"
			:width="800"
			:height="450"
			has-bottom-btn
			:btn-list="['保存', '取消']"
			@submit="submitForm"
			@cancel="cancel"
		>
			<el-form
				ref="formRef"
				:model="form"
				:rules="rules"
				class="table_page_form"
				label-width="auto"
				label-position="left"
			>
				<el-form-item label="标签名称" prop="propertyName">
					<el-input v-model="form.propertyName" />
				</el-form-item>
				<el-form-item label="标签编码" prop="propertyCode">
					<el-input v-model="form.propertyCode" />
				</el-form-item>
				<el-form-item label="属性单位" prop="propertyUnit">
					<el-input v-model="form.propertyUnit" />
				</el-form-item>
			</el-form>
		</dia-log>
	</div>
</template>

<style scoped lang="scss"></style>
