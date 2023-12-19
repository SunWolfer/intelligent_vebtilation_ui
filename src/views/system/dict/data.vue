<template>
	<div class="table_page_default">
		<el-form :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
			<el-form-item label="字典名称" prop="dictType">
				<el-select v-model="queryParams.dictType">
					<el-option
						v-for="item in typeOptions"
						:key="item.dictId"
						:label="item.dictName"
						:value="item.dictType"
					/>
				</el-select>
			</el-form-item>
			<el-form-item label="字典标签" prop="dictLabel">
				<el-input
					v-model="queryParams.dictLabel"
					placeholder="请输入字典标签"
					clearable
					@keyup.enter="handleQuery"
				/>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-select v-model="queryParams.status" placeholder="数据状态" clearable>
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
			<el-button class="add-btn" plain icon="Close" @click="handleClose">关闭</el-button>
		</div>
		<el-table border :data="dataList" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" align="center" />
			<el-table-column label="字典编码" align="center" prop="dictCode" />
			<el-table-column label="字典标签" align="center" prop="dictLabel">
				<template #default="scope">
					<span v-if="scope.row.listClass === '' || scope.row.listClass === 'default'">{{
						scope.row.dictLabel
					}}</span>
					<el-tag v-else :type="scope.row.listClass === 'primary' ? '' : scope.row.listClass">{{
						scope.row.dictLabel
					}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="字典键值" align="center" prop="dictValue" />
			<el-table-column label="字典排序" align="center" prop="dictSort" />
			<el-table-column label="状态" align="center" prop="status">
				<template #default="scope">
					<dict-tag :options="sys_normal_disable" :value="scope.row.status" />
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
			<el-form ref="formRef" :model="form" :rules="rules" label-width="auto" class="diaForm">
				<el-form-item label="字典类型">
					<el-input v-model="form.dictType" :disabled="true" />
				</el-form-item>
				<el-form-item label="数据标签" prop="dictLabel">
					<el-input v-model="form.dictLabel" placeholder="请输入数据标签" />
				</el-form-item>
				<el-form-item label="数据键值" prop="dictValue">
					<el-input v-model="form.dictValue" placeholder="请输入数据键值" />
				</el-form-item>
				<el-form-item label="样式属性" prop="cssClass">
					<el-input v-model="form.cssClass" placeholder="请输入样式属性" />
				</el-form-item>
				<el-form-item label="显示排序" prop="dictSort">
					<el-input-number v-model="form.dictSort" controls-position="right" :min="0" />
				</el-form-item>
				<el-form-item label="回显样式" prop="listClass">
					<el-select v-model="form.listClass" clearable>
						<el-option
							v-for="item in listClassOptions"
							:key="item.value"
							:label="item.label + '(' + item.value + ')'"
							:value="item.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="状态" prop="status">
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
	import useDictStore from '@/store/modules/dict'
	import { getType, optionselect as getOptionSelect } from '@/api/system/dict/type'
	import {
		addData,
		delData,
		exportData,
		getData,
		listData,
		updateData,
	} from '@/api/system/dict/data'
	import useDict from '@/hooks/useDict'
	import useList from '@/hooks/useList'
	import { useForm } from '@/hooks/useForm'

	const { proxy } = getCurrentInstance()
	const { sys_normal_disable } = useDict('sys_normal_disable')

	const {
		queryParams,
		dataList,
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
		automatic: false,
		apiFun: listData,
		params: {
			pageNum: 1,
			pageSize: 10,
			dictName: undefined,
			dictType: undefined,
			status: undefined,
		},
		afterResetQuery: () => {
			queryParams.value.dictType = defaultDictType
		},
		deleteFun: delData,
		deleteApi: {
			deleteMes: '字典编码为',
			deleteKey: 'dictCode',
		},
		afterDeleteFun: () => {
			useDictStore().removeDict(queryParams.value.dictType)
		},
		exportFun: exportData,
	})

	const rules = ref({
		dictLabel: [{ required: true, message: '数据标签不能为空', trigger: 'blur' }],
		dictValue: [{ required: true, message: '数据键值不能为空', trigger: 'blur' }],
		dictSort: [{ required: true, message: '数据顺序不能为空', trigger: 'blur' }],
	})

	const defaultDictType = ref('')
	const typeOptions = ref([])
	const route = useRoute()
	// 数据标签回显样式
	const listClassOptions = ref([
		{ value: 'default', label: '默认' },
		{ value: 'primary', label: '主要' },
		{ value: 'success', label: '成功' },
		{ value: 'info', label: '信息' },
		{ value: 'warning', label: '警告' },
		{ value: 'danger', label: '危险' },
	])

	/** 查询字典类型详细 */
	function getTypes(dictId) {
		getType(dictId).then((response) => {
			queryParams.value.dictType = response.data.dictType
			defaultDictType.value = response.data.dictType
			getList()
		})
	}

	/** 查询字典类型列表 */
	function getTypeList() {
		getOptionSelect().then((response) => {
			typeOptions.value = response.data
		})
	}

	const { formRef, form, title, open, reset, cancel, submitForm, handleUpdate, handleAdd } =
		useForm({
			domRefName: 'formRef',
			formParams: {
				dictCode: undefined,
				dictLabel: undefined,
				dictValue: undefined,
				cssClass: undefined,
				listClass: 'default',
				dictSort: 0,
				status: '0',
				remark: undefined,
			},
			formId: 'dictCode',
			titleMes: '参数',
			afterAddInitFun: () => {
				form.value.dictType = queryParams.value.dictType
			},
			initApi: getData,
			updateApi: updateData,
			addApi: addData,
			afterUpdateFun: () => {
				useDictStore().removeDict(queryParams.value.dictType)
			},
			afterAddFun: () => {
				useDictStore().removeDict(queryParams.value.dictType)
			},
		})

	/** 返回按钮操作 */
	function handleClose() {
		const obj = { path: '/system/dict' }
		proxy.$tab.closeOpenPage(obj)
	}

	getTypes(route.params && route.params.dictId)
	getTypeList()
</script>
