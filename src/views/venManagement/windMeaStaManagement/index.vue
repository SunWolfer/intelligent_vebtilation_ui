<!--测风站信息管理-->
<script setup>
	import useList from '@/hooks/useList'
	import { useForm } from '@/hooks/useForm'
	import {
		addWindMea,
		delWindMea,
		getWindMea,
		listWindMea,
		updateWindMea,
	} from '@/api/api/windMeaStaManagement'
	import WindMeaStaConfig from '@/views/venManagement/windMeaStaManagement/windMeaStaConfig.vue'
	import WindMeaKanban from '@/views/venManagement/windMeaStaManagement/windMeaKanban.vue'

	const {
		queryParams,
		dataList,
		total,
		getList,
		handleQuery,
		handleSelectionChange,
		handleDelete,
	} = useList({
		apiFun: listWindMea,
		params: {
			pageNum: 1,
			pageSize: 10,
			name: '',
			code: '',
			location: undefined,
			ipAddr: undefined,
		},
		deleteFun: delWindMea,
	})

	const rules = ref({
		name: [{ required: true, message: '测风站名称不能为空', trigger: 'blur' }],
		location: [{ required: true, message: '安装位置不能为空', trigger: 'blur' }],
		ipAddr: [{ required: true, message: '测风站ip不能为空', trigger: 'blur' }],
		windArea: [{ required: true, message: '监测区域不能为空', trigger: 'blur' }],
		surface: [{ required: true, message: '断面积不能为空', trigger: 'blur' }],
		code: [{ required: true, message: '编码不能为空', trigger: 'blur' }],
	})
	// 新增修改操作
	const { formRef, form, title, open, submitForm, handleUpdate, handleAdd } = useForm({
		formParams: {
			id: undefined,
			name: undefined,
			location: undefined,
			ipAddr: undefined,
			port: undefined,
			windArea: undefined,
			surface: undefined,
			code: undefined,
			maxSpeed: undefined,
			minSpeed: undefined,
			pointX: undefined,
			pointY: undefined,
			pointZ: undefined,
			videoUrl: undefined,
		},
		titleMes: '测风站',
		initApi: getWindMea,
		updateApi: updateWindMea,
		addApi: addWindMea,
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
			ipAddr: undefined,
			port: undefined,
			windArea: undefined,
			surface: undefined,
			code: undefined,
			maxSpeed: undefined,
			minSpeed: undefined,
			pointX: undefined,
			pointY: undefined,
			pointZ: undefined,
			videoUrl: undefined,
		},
		titleMes: '测风站',
		initApi: getWindMea,
	})

	//   测风站配置
	const configVisible = ref(false)
	const chooseRow = ref({})
	const configHandle = (row) => {
		chooseRow.value = row
		configVisible.value = true
	}
	//   看板编辑
	const kanbanVisible = ref(false)
	const kanbanHandle = (row) => {
		chooseRow.value = row
		kanbanVisible.value = true
	}
</script>

<template>
	<div class="table_page_default">
		<el-form :model="queryParams" inline>
			<el-form-item label="测风站名称">
				<el-input v-model="queryParams.name" />
			</el-form-item>
			<el-form-item label="测风站编码">
				<el-input v-model="queryParams.code" />
			</el-form-item>
			<el-form-item label="安装位置">
				<el-input v-model="queryParams.location" />
			</el-form-item>
			<el-form-item label="IP地址">
				<el-input v-model="queryParams.ipAddr" />
			</el-form-item>
			<el-form-item>
				<div class="normal_btn" @click="handleQuery">查询</div>
			</el-form-item>
		</el-form>
		<div class="table_page_btn_line">
			<div class="normal_4_btn" @click="handleAdd">新增</div>
			<div class="normal_3_btn" @click="handleDelete">删除</div>
		</div>
		<el-table :data="dataList" border @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" align="center" />
			<el-table-column label="测风站编码" align="center" prop="code" />
			<el-table-column label="测风站名称" align="center" prop="name" />
			<el-table-column label="测风站位置" align="center" prop="location" />
			<el-table-column label="IP地址" align="center" prop="ipAddr" />
			<el-table-column label="监测区域" align="center" prop="windArea" />
			<el-table-column label="断面积(㎡)" align="center" prop="surface" />
			<el-table-column label="风速上限" align="center" prop="maxSpeed" />
			<el-table-column label="风速下限" align="center" prop="minSpeed" />
			<el-table-column label="操作" align="center" min-width="220">
				<template #default="scope">
					<el-button type="primary" link @click="kanbanHandle(scope.row)">看板</el-button>
					<el-button type="primary" link @click="configHandle(scope.row)">配置</el-button>
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
			:width="900"
			:height="600"
			has-bottom-btn
			:btn-list="['保存', '取消']"
		>
			<el-form
				ref="formRef"
				:model="form"
				:rules="rules"
				class="table_page_form"
				label-width="auto"
				label-position="left"
			>
				<el-form-item label="测风站名称" prop="name">
					<el-input v-model="form.name" />
				</el-form-item>
				<el-form-item label="安装位置" prop="location">
					<el-input v-model="form.location" />
				</el-form-item>
				<el-form-item label="测风站IP" prop="ipAddr">
					<el-input v-model="form.ipAddr" />
				</el-form-item>
				<el-form-item label="端口" prop="port">
					<el-input v-model="form.port" />
				</el-form-item>
				<el-form-item label="监测区域" prop="windArea">
					<el-input v-model="form.windArea" />
				</el-form-item>
				<el-form-item label="断面积(㎡)" prop="surface"
					><el-input v-model="form.surface"
				/></el-form-item>
				<el-form-item label="测风站编码" prop="code">
					<el-input v-model="form.code" />
				</el-form-item>
				<el-form-item />
				<el-form-item label="风速上限" prop="maxSpeed">
					<el-input v-model="form.maxSpeed" />
				</el-form-item>
				<el-form-item label="风速下限" prop="minSpeed">
					<el-input v-model="form.minSpeed" />
				</el-form-item>
				<el-form-item label="X坐标" prop="pointX">
					<el-input v-model="form.pointX" />
				</el-form-item>
				<el-form-item label="Y坐标" prop="pointY">
					<el-input v-model="form.pointY" />
				</el-form-item>
				<el-form-item label="Z坐标" prop="pointZ">
					<el-input v-model="form.pointZ" />
				</el-form-item>
				<el-form-item label="视频地址" prop="videoUrl" class="table_page_form_row">
					<el-input v-model="form.videoUrl" />
				</el-form-item>
			</el-form>
		</dia-log>
		<!--    查看-->
		<dia-log v-if="examine" v-model="examine" :title="examineTitle" :width="900" :height="520">
			<el-form
				ref="examineFormRef"
				:model="examineForm"
				class="table_page_form"
				label-width="auto"
				label-position="left"
			>
				<el-form-item label="测风站名称" prop="name">
					<el-input disabled v-model="examineForm.name" />
				</el-form-item>
				<el-form-item label="安装位置" prop="location">
					<el-input disabled v-model="examineForm.location" />
				</el-form-item>
				<el-form-item label="测风站IP" prop="ipAddr">
					<el-input disabled v-model="examineForm.ipAddr" />
				</el-form-item>
				<el-form-item label="端口" prop="port">
					<el-input disabled v-model="examineForm.port" />
				</el-form-item>
				<el-form-item label="监测区域" prop="windArea">
					<el-input v-model="form.windArea" />
				</el-form-item>
				<el-form-item label="断面积(㎡)" prop="surface"
					><el-input v-model="form.surface"
				/></el-form-item>
				<el-form-item label="测风站编码" prop="code">
					<el-input disabled v-model="examineForm.code" />
				</el-form-item>
				<el-form-item />
				<el-form-item label="风速上限" prop="maxSpeed">
					<el-input disabled v-model="examineForm.maxSpeed" />
				</el-form-item>
				<el-form-item label="风速下限" prop="minSpeed">
					<el-input disabled v-model="examineForm.minSpeed" />
				</el-form-item>
				<el-form-item label="X坐标" prop="pointX">
					<el-input disabled v-model="examineForm.pointX" />
				</el-form-item>
				<el-form-item label="Y坐标" prop="pointY">
					<el-input disabled v-model="examineForm.pointY" /> </el-form-item
				><el-form-item label="Z坐标" prop="pointZ">
					<el-input disabled v-model="examineForm.pointZ" />
				</el-form-item>
				<el-form-item label="视频地址" prop="videoUrl" class="table_page_form_row">
					<el-input disabled v-model="examineForm.videoUrl" />
				</el-form-item>
			</el-form>
		</dia-log>
		<!--    测风站配置-->
		<WindMeaStaConfig
			v-if="configVisible"
			v-model="configVisible"
			:choose-row="chooseRow"
			title="测风站配置"
		/>
		<!--    看板数据-->
		<WindMeaKanban
			v-if="kanbanVisible"
			v-model="kanbanVisible"
			:choose-row="chooseRow"
			title="看板数据"
		/>
	</div>
</template>

<style scoped lang="scss"></style>
