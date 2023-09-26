<!--主扇局扇数据项-->
<script setup>
	import useList from '@/hooks/useList'
	import {
		addFanItem,
		delFanItem,
		getFanItem,
		listFanItem,
		updateFanItem,
	} from '@/api/api/mainFanItemManagement'
	import useDict from '@/hooks/useDict'
	import { useForm } from '@/hooks/useForm'
	import { selectDictLabel } from '@/utils/ruoyi'

	const props = defineProps({
		type: {
			type: String,
			default: '1',
		},
	})
	const { dev_as_type, electric_machine_type, fan_property_type } = useDict(
		'dev_as_type',
		'electric_machine_type',
		'fan_property_type',
	)
	const {
		queryParams,
		total,
		dataList,
		getList,
		handleQuery,
		handleDelete,
		handleSelectionChange,
	} = useList({
		apiFun: listFanItem,
		params: {
			fanType: props.type,
			propertyName: '',
			propertyCode: '',
			pageNum: 1,
			pageSize: 10,
		},
		deleteFun: delFanItem,
	})
	const { formRef, form, title, open, reset, cancel, submitForm, handleUpdate, handleAdd } =
		useForm({
			domRefName: 'formRef',
			formParams: {
				fanType: props.type,
				devAs: '',
				electricMachine: '',
				propertyCode: '',
				propertyName: '',
				propertyType: '',
				propertyUnit: '',
			},
			titleMes: '数据项',
			initApi: getFanItem,
			addApi: addFanItem,
			updateApi: updateFanItem,
			afterAddFun: handleQuery,
			afterUpdateFun: handleQuery,
		})

	const rules = reactive({
		devAs: [{ required: true, message: '风机不能为空', trigger: 'blur' }],
		electricMachine: [{ required: true, message: '电机不能为空', trigger: 'blur' }],
		propertyCode: [{ required: true, message: '标签编码不能为空', trigger: 'blur' }],
		propertyName: [{ required: true, message: '标签名称不能为空', trigger: 'blur' }],
		propertyType: [{ required: true, message: '属性类型不能为空', trigger: 'blur' }],
	})
	//   改变风机
	const disableElect = ref(false)

	watch(
		() => form.value.devAs,
		(val) => {
			changeDevAs(val)
		},
	)
	const changeDevAs = (data) => {
		if (data === '0') {
			form.value.electricMachine = '0'
			disableElect.value = true
		} else {
			disableElect.value = false
		}
	}
</script>

<template>
	<div class="table_page_default">
		<el-form :model="queryParams" inline>
			<el-form-item label="标签名称">
				<el-input v-model="queryParams.propertyName"></el-input>
			</el-form-item>
			<el-form-item label="标签编码">
				<el-input v-model="queryParams.propertyCode"></el-input>
			</el-form-item>
			<el-form-item>
				<div class="normal_btn" @click="handleQuery">查询</div>
			</el-form-item>
		</el-form>
		<div class="table_page_btn_line">
			<div class="normal_btn" @click="handleAdd">新增</div>
			<div class="normal_3_btn" @click="handleDelete">删除</div>
		</div>
		<el-table :data="dataList" border @selectionChange="handleSelectionChange">
			<el-table-column type="selection" align="center" width="50" />
			<el-table-column
				prop="devAs"
				align="center"
				min-width="110"
				show-overflow-tooltip
				label="风机"
			>
				<template #default="scoped">
					<span>{{ selectDictLabel(dev_as_type, scoped.row.devAs) }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="electricMachine"
				align="center"
				min-width="110"
				show-overflow-tooltip
				label="电机"
			>
				<template #default="scoped">
					<span>{{ selectDictLabel(electric_machine_type, scoped.row.electricMachine) }}</span>
				</template>
			</el-table-column>
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
			/>
			<el-table-column prop="propertyUnit" align="center" min-width="110" label="标签单位" />
			<el-table-column
				prop="propertyType"
				align="center"
				min-width="110"
				show-overflow-tooltip
				label="属性类型"
			>
				<template #default="scoped">
					<span>{{ selectDictLabel(fan_property_type, scoped.row.propertyType) }}</span>
				</template>
			</el-table-column>
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
				<el-form-item label="风机" prop="devAs">
					<el-select v-model="form.devAs">
						<el-option v-for="i in dev_as_type" :label="i.label" :value="i.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="电机" prop="electricMachine">
					<el-select v-model="form.electricMachine" :disabled="disableElect">
						<el-option
							v-for="i in electric_machine_type"
							:label="i.label"
							:value="i.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="标签名称" prop="propertyName">
					<el-input v-model="form.propertyName" />
				</el-form-item>
				<el-form-item label="标签编码" prop="propertyCode">
					<el-input v-model="form.propertyCode" />
				</el-form-item>
				<el-form-item label="属性类型" prop="propertyType">
					<el-select v-model="form.propertyType">
						<el-option v-for="i in fan_property_type" :label="i.label" :value="i.value" />
					</el-select>
				</el-form-item>
				<el-form-item label="属性单位" prop="propertyUnit">
					<el-input v-model="form.propertyUnit" />
				</el-form-item>
			</el-form>
		</dia-log>
	</div>
</template>

<style scoped lang="scss"></style>
