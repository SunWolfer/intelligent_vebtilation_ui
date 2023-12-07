<template>
	<div class="table_page_default">
		<el-form :model="queryParams" ref="queryRef" :inline="true" label-width="auto">
			<el-form-item label="参数名称" prop="configName">
				<el-input
					v-model="queryParams.configName"
					placeholder="请输入参数名称"
					clearable
					@keyup.enter="handleQuery"
				/>
			</el-form-item>
			<el-form-item label="参数键名" prop="configKey">
				<el-input
					v-model="queryParams.configKey"
					placeholder="请输入参数键名"
					clearable
					@keyup.enter="handleQuery"
				/>
			</el-form-item>
			<el-form-item label="系统内置" prop="configType">
				<el-select v-model="queryParams.configType" placeholder="系统内置" clearable>
					<el-option
						v-for="dict in sys_yes_no"
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
				v-hasPermi="['system:config:add']"
				>新增</el-button
			>
			<el-button
				class="add-btn"
				plain
				icon="Edit"
				:disabled="single"
				@click="handleUpdate"
				v-hasPermi="['system:config:edit']"
				>修改</el-button
			>
			<el-button
				class="delete-btn"
				plain
				icon="Delete"
				:disabled="multiple"
				@click="handleDelete"
				v-hasPermi="['system:config:remove']"
				>删除</el-button
			>
			<el-button
				class="derive-btn"
				plain
				icon="Download"
				@click="handleExport"
				v-hasPermi="['system:config:export']"
				>导出</el-button
			>
		</div>
		<el-table :data="configList" border @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" align="center" />
			<el-table-column label="参数主键" align="center" prop="configId" />
			<el-table-column
				label="参数名称"
				align="center"
				prop="configName"
				:show-overflow-tooltip="true"
			/>
			<el-table-column
				label="参数键名"
				align="center"
				prop="configKey"
				:show-overflow-tooltip="true"
			/>
			<el-table-column label="参数键值" align="center" prop="configValue" />
			<el-table-column label="系统内置" align="center" prop="configType">
				<template #default="scope">
					<dict-tag :options="sys_yes_no" :value="scope.row.configType" />
				</template>
			</el-table-column>
			<el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
			<el-table-column label="创建时间" align="center" prop="createTime" width="180">
				<template #default="scope">
					<span>{{ parseTime(scope.row.createTime) }}</span>
				</template>
			</el-table-column>
			<el-table-column
				label="操作"
				align="center"
				width="150"
				class-name="small-padding fixed-width"
			>
				<template #default="scope">
					<el-button
						type="primary"
						link
						icon="Edit"
						@click="handleUpdate(scope.row)"
						v-hasPermi="['system:config:edit']"
						>修改</el-button
					>
					<el-button
						type="primary"
						link
						icon="Delete"
						@click="handleDelete(scope.row)"
						v-hasPermi="['system:config:remove']"
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
			<el-form ref="formRef" :model="form" :rules="rules" label-width="auto" class="diaForm">
				<el-form-item label="参数名称" prop="configName">
					<el-input v-model="form.configName" placeholder="请输入参数名称" />
				</el-form-item>
				<el-form-item label="参数键名" prop="configKey">
					<el-input v-model="form.configKey" placeholder="请输入参数键名" />
				</el-form-item>
				<el-form-item label="参数键值" prop="configValue">
					<el-input v-model="form.configValue" placeholder="请输入参数键值" />
				</el-form-item>
				<el-form-item label="系统内置" prop="configType">
					<el-radio-group v-model="form.configType">
						<el-radio v-for="dict in sys_yes_no" :key="dict.value" :label="dict.value">{{
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

<script setup name="Config">
	import {
		addConfig,
		delConfig,
		exportConfig,
		getConfig,
		listConfig,
		updateConfig,
	} from '@/api/system/config'
	import useDict from '@/hooks/useDict'
	import useList from '@/hooks/useList'
	import { useForm } from '@/hooks/useForm'

	const { sys_yes_no } = useDict('sys_yes_no')

	const {
		queryParams,
		dateRange,
		dataList: configList,
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
		apiFun: listConfig,
		params: {
			pageNum: 1,
			pageSize: 10,
			configName: undefined,
			configKey: undefined,
			configType: undefined,
		},
		deleteFun: delConfig,
		deleteApi: {
			deleteMes: '参数编号为',
			deleteKey: 'configId',
		},
		exportFun: exportConfig,
	})

	const rules = ref({
		configName: [{ required: true, message: '参数名称不能为空', trigger: 'blur' }],
		configKey: [{ required: true, message: '参数键名不能为空', trigger: 'blur' }],
		configValue: [{ required: true, message: '参数键值不能为空', trigger: 'blur' }],
	})
	const { formRef, form, title, open, reset, cancel, submitForm, handleUpdate, handleAdd } =
		useForm({
			domRefName: 'formRef',
			formParams: {
				configId: undefined,
				configName: undefined,
				configKey: undefined,
				configValue: undefined,
				configType: 'Y',
				remark: undefined,
			},
			formId: 'configId',
			titleMes: '参数',
			initApi: getConfig,
			updateApi: updateConfig,
			addApi: addConfig,
			afterAddFun: handleQuery,
			afterUpdateFun: handleQuery,
		})
</script>
