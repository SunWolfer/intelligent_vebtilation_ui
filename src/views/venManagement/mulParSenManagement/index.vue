<!--多参传感器-->
<script setup>
	import useList from '@/hooks/useList'
	import { useForm } from '@/hooks/useForm'
	import AssWindSpeedSensor from '@/views/venManagement/mulParSenManagement/assWindSpeedSensor.vue'
	import {
		addDuoshen,
		delDuoshen,
		getDuoshenKey,
		listDuoshen,
		updateDuoshen,
	} from '@/api/api/mulParSenManagement'

	const {
		queryParams,
		dataList,
		total,
		getList,
		handleQuery,
		handleSelectionChange,
		handleDelete,
	} = useList({
		apiFun: listDuoshen,
		params: {
			pageNum: 1,
			pageSize: 10,
			name: undefined,
			location: undefined,
			code: undefined,
			ipAddress: undefined,
		},
		deleteFun: delDuoshen,
	})

	const rules = ref({
		name: [{ required: true, message: '传感器名称不能为空', trigger: 'blur' }],
		location: [{ required: true, message: '安装位置不能为空', trigger: 'blur' }],
		ipAddress: [{ required: true, message: 'ip不能为空', trigger: 'blur' }],
		code: [{ required: true, message: '编码不能为空', trigger: 'blur' }],
	})
	// 新增修改操作
	const { formRef, form, title, open, submitForm, handleUpdate, handleAdd } = useForm({
		formParams: {
			id: undefined,
			name: undefined,
			location: undefined,
			ipAddress: undefined,
			code: undefined,
			port: undefined,
			monitoringTunnels: undefined,
			elevation: undefined,
			pointX: undefined,
			pointY: undefined,
			pointZ: undefined,
			videoLocation: undefined,
		},
		titleMes: '多参传感器',
		initApi: getDuoshenKey,
		updateApi: updateDuoshen,
		addApi: addDuoshen,
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
			ipAddress: undefined,
			code: undefined,
			port: undefined,
			monitoringTunnels: undefined,
			elevation: undefined,
			pointX: undefined,
			pointY: undefined,
			pointZ: undefined,
			videoLocation: undefined,
		},
		titleMes: '多参传感器',
		initApi: getDuoshenKey,
	})

	const chooseRow = ref(undefined)
	//   关联风速传感器
	const assSensorVisible = ref(false)
	const showAssSensorVisible = (data) => {
		chooseRow.value = data
		assSensorVisible.value = true
	}
</script>

<template>
	<div class="table_page_default">
		<el-form :model="queryParams" inline>
			<el-form-item label="多参名称">
				<el-input v-model="queryParams.name"></el-input>
			</el-form-item>
			<el-form-item label="多参编码">
				<el-input v-model="queryParams.code"></el-input>
			</el-form-item>
			<el-form-item label="安装位置">
				<el-input v-model="queryParams.location"></el-input>
			</el-form-item>
			<el-form-item label="IP地址">
				<el-input v-model="queryParams.ipAddress"></el-input>
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
			<el-table-column label="多参编码" align="center" prop="code" />
			<el-table-column label="多参名称" align="center" prop="name" />
			<el-table-column label="安装位置" align="center" prop="location" />
			<el-table-column label="IP地址" align="center" prop="ipAddress" />
			<el-table-column label="端口" align="center" prop="port" />
			<el-table-column label="监测巷道" align="center" prop="monitoringTunnels" />
			<el-table-column label="高程" align="center" prop="elevation" />
			<el-table-column label="操作" align="center" width="320">
				<template #default="scope">
					<el-button type="primary" link @click="showAssSensorVisible(scope.row)"
						>关联风速传感器</el-button
					>
					<el-button type="primary" link @click="handleExamine(scope.row)">详情</el-button>
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
				<el-form-item label="多参传感器名称" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="安装位置" prop="location">
					<el-input v-model="form.location"></el-input>
				</el-form-item>
				<el-form-item label="IP地址" prop="ipAddress">
					<el-input v-model="form.ipAddress"></el-input>
				</el-form-item>
				<el-form-item label="端口" prop="port">
					<el-input v-model="form.port"></el-input>
				</el-form-item>
				<el-form-item label="监测巷道" prop="monitoringTunnels">
					<el-input v-model="form.monitoringTunnels"></el-input>
				</el-form-item>
				<el-form-item label="高程" prop="elevation"
					><el-input v-model="form.elevation"></el-input
				></el-form-item>
				<el-form-item label="多参编码" prop="code">
					<el-input v-model="form.code"></el-input>
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
				<el-form-item label="视频地址" prop="videoLocation" class="table_page_form_row">
					<el-input v-model="form.videoLocation"></el-input>
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
				<el-form-item label="多参传感器名称" prop="name">
					<el-input v-model="examineForm.name"></el-input>
				</el-form-item>
				<el-form-item label="安装位置" prop="location">
					<el-input disabled v-model="examineForm.location"></el-input>
				</el-form-item>
				<el-form-item label="IP地址" prop="ipAddress">
					<el-input v-model="examineForm.ipAddress"></el-input>
				</el-form-item>
				<el-form-item label="端口" prop="port">
					<el-input disabled v-model="examineForm.port"></el-input>
				</el-form-item>
				<el-form-item label="监测巷道" prop="monitoringTunnels">
					<el-input disabled v-model="examineForm.monitoringTunnels"></el-input>
				</el-form-item>
				<el-form-item label="高程" prop="elevation"
					><el-input v-model="examineForm.elevation"></el-input
				></el-form-item>
				<el-form-item label="多参编码" prop="code">
					<el-input v-model="examineForm.code"></el-input>
				</el-form-item>
				<el-form-item label="X坐标" prop="pointX">
					<el-input disabled v-model="examineForm.pointX"></el-input>
				</el-form-item>
				<el-form-item label="Y坐标" prop="pointY">
					<el-input disabled v-model="examineForm.pointY"></el-input>
				</el-form-item>
				<el-form-item label="Z坐标" prop="pointZ">
					<el-input disabled v-model="examineForm.pointZ"></el-input>
				</el-form-item>
				<el-form-item label="视频地址" prop="videoLocation" class="table_page_form_row">
					<el-input disabled v-model="examineForm.videoLocation"></el-input>
				</el-form-item>
			</el-form>
		</dia-log>
		<ass-wind-speed-sensor
			v-if="assSensorVisible"
			v-model="assSensorVisible"
			:choose-data="chooseRow"
		/>
	</div>
</template>

<style scoped lang="scss"></style>
