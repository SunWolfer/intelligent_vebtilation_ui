<!--风门信息管理-->
<script setup>
	import useList from '@/hooks/useList'
	import { useForm } from '@/hooks/useForm'
	import { dynamicWidth, selectDictLabel } from '@/utils/ruoyi'
	import {
		addThrottle,
		delThrottle,
		getThrottle,
		listThrottle,
		updateThrottle,
	} from '@/api/api/throttleManagement'
	import useDict from '@/hooks/useDict'
	import DoorTags from '@/views/venEqMonitoring/throttleMonitoring/doorTags.vue'

	const {
		queryParams,
		dataList,
		total,
		getList,
		handleQuery,
		handleSelectionChange,
		handleDelete,
	} = useList({
		apiFun: listThrottle,
		params: {
			pageNum: 1,
			pageSize: 10,
			name: undefined,
			location: undefined,
			ip: undefined,
			devVersion: undefined,
		},
		deleteFun: delThrottle,
	})

	const { door_type, door_version } = useDict('door_type', 'door_version')
	const formatterDoorType = (row) => {
		return selectDictLabel(door_type.value, row.type)
	}
	const formatterVersion = (data) => {
		return selectDictLabel(door_version.value, data.devVersion)
	}

	const rules = ref({
		name: [{ required: true, message: '风门不能为空', trigger: 'blur' }],
		location: [{ required: true, message: '风门位置不能为空', trigger: 'blur' }],
		ip: [{ required: true, message: 'ip不能为空', trigger: 'blur' }],
		length: [{ required: true, message: '风门长度不能为空', trigger: 'blur' }],
		width: [{ required: true, message: '风门宽度不能为空', trigger: 'blur' }],
		code: [{ required: true, message: '风门编码不能为空', trigger: 'blur' }],
		type: [{ required: true, message: '风门类型不能为空', trigger: 'blur' }],
		devVersion: [{ required: true, message: '风门版本不能为空', trigger: 'blur' }],
	})
	// 新增修改操作
	const { formRef, form, title, open, submitForm, handleUpdate, handleAdd } = useForm({
		formParams: {
			id: undefined,
			name: undefined,
			location: undefined,
			ip: undefined,
			port: undefined,
			length: undefined,
			width: undefined,
			code: undefined,
			type: undefined,
			pointX: undefined,
			pointY: undefined,
			pointZ: undefined,
			devVersion: undefined,
			videoUrl: undefined,
		},
		titleMes: '风门',
		initApi: getThrottle,
		updateApi: updateThrottle,
		addApi: addThrottle,
		afterAddFun: handleQuery,
		afterUpdateFun: handleQuery,
	})
	// 查看
	const {
		formRef: examineFormRef,
		form: examineForm,
		title: examineTitle,
		examine,
		handleExamine,
	} = useForm({
		formParams: {
			id: undefined,
			name: undefined,
			location: undefined,
			ip: undefined,
			port: undefined,
			length: undefined,
			width: undefined,
			code: undefined,
			type: undefined,
			pointX: undefined,
			pointY: undefined,
			pointZ: undefined,
			devVersion: undefined,
			videoUrl: undefined,
		},
		titleMes: '风门',
		initApi: getThrottle,
	})
	//   编辑弹窗
	const chooseData = ref(undefined)
	const editingVisible = ref(false)
	const editingHandle = (row) => {
		chooseData.value = row
		editingVisible.value = true
	}
</script>

<template>
	<div class="table_page_default">
		<el-form :model="queryParams" inline>
			<el-form-item label="风门名称">
				<el-input v-model="queryParams.name"></el-input>
			</el-form-item>
			<el-form-item label="风门位置">
				<el-input v-model="queryParams.location"></el-input>
			</el-form-item>
			<el-form-item label="风门ip">
				<el-input v-model="queryParams.ip"></el-input>
			</el-form-item>
			<el-form-item label="风门版本">
				<el-select v-model="queryParams.devVersion" clearable>
					<el-option v-for="i in door_version" :label="i.label" :value="i.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<div class="normal_btn" @click="handleQuery">查询</div>
			</el-form-item>
		</el-form>
		<div class="table_page_btn_line">
			<div class="normal_4_btn" @click="handleAdd">新增</div>
			<div class="normal_3_btn" @click="handleDelete">删除</div>
		</div>
		<el-table :data="dataList" border @selectionChange="handleSelectionChange">
			<el-table-column type="selection" width="55" align="center" />
			<el-table-column label="风门编码" align="center" prop="code" />
			<el-table-column label="风门名称" align="center" prop="name" />
			<el-table-column label="风门位置" align="center" prop="location" />
			<el-table-column label="风门地址" align="center" prop="ip" />
			<el-table-column label="风门长度" align="center" prop="length" />
			<el-table-column label="风门宽度" align="center" prop="width" />
			<el-table-column label="风门类型" align="center" prop="type" :formatter="formatterDoorType" />
			<el-table-column
				label="风门版本"
				align="center"
				prop="devVersion"
				:formatter="formatterVersion"
			/>
			<el-table-column label="操作" align="center" min-width="150">
				<template #default="scope">
					<el-button
						type="primary"
						link
						v-if="scope.row.devVersion === 'V0.1'"
						@click="editingHandle(scope.row)"
						>编辑</el-button
					>
					<el-button type="primary" link @click="handleExamine(scope.row)">查看</el-button>
					<el-button type="primary" link @click="handleUpdate(scope.row)">修改</el-button>
					<el-button type="primary" link @click="handleDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="table_page_pagination">
			<pagination
				v-show="total > 0"
				:total="total"
				v-model:page="queryParams.pageNum"
				v-model:limit="queryParams.pageSize"
				@pagination="getList"
			/>
		</div>
		<!--    新增修改弹窗-->
		<dia-log
			v-if="open"
			v-model="open"
			:title="title"
			@submit="submitForm"
			has-bottom-btn
			:width="800"
			:height="600"
		>
			<el-form
				ref="formRef"
				:model="form"
				:rules="rules"
				class="table_page_form"
				:label-width="dynamicWidth(120)"
				label-position="left"
			>
				<el-form-item label="风门名称" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="风门位置" prop="location">
					<el-input v-model="form.location"></el-input>
				</el-form-item>
				<el-form-item label="风门ip" prop="ip">
					<el-input v-model="form.ip"></el-input>
				</el-form-item>
				<el-form-item label="风门端口" prop="port">
					<el-input v-model="form.port"></el-input>
				</el-form-item>
				<el-form-item label="风门长度" prop="length">
					<el-input v-model="form.length"></el-input>
				</el-form-item>
				<el-form-item label="风门宽度" prop="width">
					<el-input v-model="form.width"></el-input>
				</el-form-item>
				<el-form-item label="风门编码" prop="code">
					<el-input v-model="form.code"></el-input>
				</el-form-item>
				<el-form-item label="风门类型" prop="type">
					<el-select v-model="form.type" clearable>
						<el-option v-for="i in door_type" :label="i.label" :value="i.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="X坐标" prop="pointX">
					<el-input v-model="form.pointX"></el-input>
				</el-form-item>
				<el-form-item label="Y坐标" prop="pointY">
					<el-input v-model="form.pointY"></el-input>
				</el-form-item>
				<el-form-item label="Z坐标" prop="pointZ">
					<el-input v-model="form.pointZ"></el-input>
				</el-form-item>
				<el-form-item label="风门版本" prop="devVersion">
					<el-select v-model="form.devVersion" clearable>
						<el-option v-for="i in door_version" :label="i.label" :value="i.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="视频地址" prop="videoUrl" class="table_page_form_row">
					<el-input v-model="form.videoUrl"></el-input>
				</el-form-item>
			</el-form>
		</dia-log>
		<!--    查看弹窗-->
		<dia-log v-if="examine" v-model="examine" :title="examineTitle" :width="800" :height="520">
			<el-form
				ref="examineFormRef"
				:model="examineForm"
				class="table_page_form"
				:label-width="dynamicWidth(120)"
				label-position="left"
			>
				<el-form-item label="风门名称" prop="name">
					<el-input disabled v-model="examineForm.name"></el-input>
				</el-form-item>
				<el-form-item label="风门位置" prop="location">
					<el-input disabled v-model="examineForm.location"></el-input>
				</el-form-item>
				<el-form-item label="风门ip" prop="ip">
					<el-input disabled v-model="examineForm.ip"></el-input>
				</el-form-item>
				<el-form-item label="风门端口" prop="port">
					<el-input disabled v-model="examineForm.port"></el-input>
				</el-form-item>
				<el-form-item label="风门长度" prop="length">
					<el-input disabled v-model="examineForm.length"></el-input>
				</el-form-item>
				<el-form-item label="风门宽度" prop="width">
					<el-input disabled v-model="examineForm.width"></el-input>
				</el-form-item>
				<el-form-item label="风门编码" prop="code">
					<el-input disabled v-model="examineForm.code"></el-input>
				</el-form-item>
				<el-form-item label="风门类型" prop="type">
					<el-select disabled v-model="examineForm.type" clearable>
						<el-option v-for="i in door_type" :label="i.label" :value="i.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="X坐标" prop="pointX">
					<el-input disabled v-model="examineForm.pointX"></el-input>
				</el-form-item>
				<el-form-item label="Y坐标" prop="pointY">
					<el-input disabled v-model="examineForm.pointY"></el-input>
				</el-form-item>
				<el-form-item label="Z坐标" prop="pointZ">
					<el-input v-model="examineForm.pointZ"></el-input>
				</el-form-item>
				<el-form-item label="风门版本" prop="version">
					<el-select disabled v-model="examineForm.devVersion" clearable>
						<el-option v-for="i in door_version" :label="i.label" :value="i.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="视频地址" prop="videoUrl" class="table_page_form_row">
					<el-input disabled v-model="examineForm.videoUrl"></el-input>
				</el-form-item>
			</el-form>
		</dia-log>
		<!--    编辑弹窗-->
		<DoorTags
			v-if="editingVisible"
			v-model="editingVisible"
			:choose-row="chooseData"
			title="风门编辑"
		/>
	</div>
</template>

<style scoped lang="scss"></style>
