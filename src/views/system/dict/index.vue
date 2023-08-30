<template>
	<div class="table_page_default">
		<el-form :model="queryParams" ref="queryRef" :inline="true" label-width="auto">
			<el-form-item label="字典名称" prop="dictName">
				<el-input
					v-model="queryParams.dictName"
					placeholder="请输入字典名称"
					clearable
					@keyup.enter="handleQuery"
				/>
			</el-form-item>
			<el-form-item label="字典类型" prop="dictType">
				<el-input
					v-model="queryParams.dictType"
					placeholder="请输入字典类型"
					clearable
					@keyup.enter="handleQuery"
				/>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-select v-model="queryParams.status" placeholder="字典状态" clearable>
					<el-option
						v-for="dict in sys_normal_disable"
						:key="dict.value"
						:label="dict.label"
						:value="dict.value"
					/>
				</el-select>
			</el-form-item>
			<el-form-item label="创建时间">
				<el-date-picker
					v-model="dateRange"
					value-format="YYYY-MM-DD"
					type="daterange"
					range-separator="-"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				></el-date-picker>
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
				v-hasPermi="['system:dict:add']"
				>新增</el-button
			>
			<el-button
				class="add-btn"
				plain
				icon="Edit"
				:disabled="single"
				@click="handleUpdate"
				v-hasPermi="['system:dict:edit']"
				>修改</el-button
			>
			<el-button
				class="delete-btn"
				plain
				icon="Delete"
				:disabled="multiple"
				@click="handleDelete"
				v-hasPermi="['system:dict:remove']"
				>删除</el-button
			>
			<el-button
				class="derive-btn"
				plain
				icon="Download"
				@click="handleExport"
				v-hasPermi="['system:dict:export']"
				>导出</el-button
			>
		</div>
		<el-table border :data="typeList" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" align="center" />
			<el-table-column label="字典编号" align="center" prop="dictId" />
			<el-table-column
				label="字典名称"
				align="center"
				prop="dictName"
				:show-overflow-tooltip="true"
			/>
			<el-table-column label="字典类型" align="center" :show-overflow-tooltip="true">
				<template #default="scope">
					<router-link :to="'/system/dict-data/index/' + scope.row.dictId" class="link-type">
						<span>{{ scope.row.dictType }}</span>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column label="状态" align="center" prop="status">
				<template #default="scope">
					<dict-tag :options="sys_normal_disable" :value="scope.row.status" />
				</template>
			</el-table-column>
			<el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
			<el-table-column label="创建时间" align="center" prop="createTime" width="180" />
			<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
				<template #default="scope">
					<el-button
						type="primary"
						link
						icon="Edit"
						@click="handleUpdate(scope.row)"
						v-hasPermi="['system:dict:edit']"
						>修改</el-button
					>
					<el-button
						type="primary"
						link
						icon="Delete"
						@click="handleDelete(scope.row)"
						v-hasPermi="['system:dict:remove']"
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

		<!-- 添加或修改参数配置对话框 -->
		<dia-log
			:title="title"
			v-model="open"
			:width="800"
			has-bottom-btn
			@submit="submitForm"
			@cancel="cancel"
		>
			<el-form ref="formRef" :model="form" :rules="rules" label-width="80px" class="diaForm">
				<el-form-item label="字典名称" prop="dictName">
					<el-input v-model="form.dictName" placeholder="请输入字典名称" />
				</el-form-item>
				<el-form-item label="字典类型" prop="dictType">
					<el-input v-model="form.dictType" placeholder="请输入字典类型" />
				</el-form-item>
				<el-form-item label="状态" prop="status">
					<el-radio-group v-model="form.status">
						<el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{
							dict.label
						}}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
				</el-form-item>
			</el-form>
		</dia-log>
	</div>
</template>

<script setup name="Dict">
	import {
		addType,
		delType,
		exportType,
		getType,
		listType,
		updateType,
	} from '@/api/system/dict/type'
	import useDict from '@/hooks/useDict'
	import useList from '@/hooks/useList'
	import { useForm } from '@/hooks/useForm'
	const { sys_normal_disable } = useDict('sys_normal_disable')

	const {
		queryParams,
		dateRange,
		dataList: typeList,
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
		apiFun: listType,
		params: {
			pageNum: 1,
			pageSize: 10,
			dictName: undefined,
			dictType: undefined,
			status: undefined,
		},
		deleteFun: delType,
		deleteApi: {
			deleteKey: 'dictId',
		},
		exportFun: exportType,
	})

	const rules = ref({
		dictName: [{ required: true, message: '字典名称不能为空', trigger: 'blur' }],
		dictType: [{ required: true, message: '字典类型不能为空', trigger: 'blur' }],
	})
	const { formRef, form, title, open, reset, cancel, submitForm, handleUpdate, handleAdd } =
		useForm({
			domRefName: 'formRef',
			formParams: {
				dictId: undefined,
				dictName: undefined,
				dictType: undefined,
				status: '0',
				remark: undefined,
			},
			formId: 'dictId',
			titleMes: '字典类型',
			initApi: getType,
			updateApi: updateType,
			addApi: addType,
			afterAddFun: handleQuery,
			afterUpdateFun: handleQuery,
		})
</script>
