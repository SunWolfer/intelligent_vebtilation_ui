<!--风速传感器信息管理-->
<script setup>
	import useList from '@/hooks/useList'
	import { useForm } from '@/hooks/useForm'
	import CorMultiParSensor from '@/views/venManagement/windSpeedSenManagement/corMultiParSensor.vue'
	import {
		addWindSpeed,
		delWindSpeed,
		getWindSpeed,
		listWindSpeed,
		updateWindSpeed,
	} from '@/api/api/windSpeedSenManagement'
	import WindSpeedConfig from '@/views/venManagement/windSpeedSenManagement/windSpeedConfig.vue'

	const {
		queryParams,
		dataList,
		total,
		getList,
		handleQuery,
		handleSelectionChange,
		handleDelete,
	} = useList({
		apiFun: listWindSpeed,
		params: {
			pageNum: 1,
			pageSize: 10,
			name: undefined,
			code: undefined,
			location: undefined,
			ipAddr: undefined,
		},
		deleteFun: delWindSpeed,
	})

	const rules = ref({
		name: [{ required: true, message: '传感器名称不能为空', trigger: 'blur' }],
		location: [{ required: true, message: '安装位置不能为空', trigger: 'blur' }],
		ipAddr: [{ required: true, message: 'ip不能为空', trigger: 'blur' }],
		windArea: [{ required: true, message: '巷道不能为空', trigger: 'blur' }],
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
		titleMes: '风速传感器',
		initApi: getWindSpeed,
		updateApi: updateWindSpeed,
		addApi: addWindSpeed,
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
		titleMes: '风速传感器',
		initApi: getWindSpeed,
	})
	//   关联多参传感器
	const corSensorVisible = ref(false)
	const showCorSensorVisible = (row) => {
		chooseRow.value = row
		corSensorVisible.value = true
	}
	//   测风传感器配置
	const configVisible = ref(false)
	const chooseRow = ref({})
	const configHandle = (row) => {
		chooseRow.value = row
		configVisible.value = true
	}
</script>

<template>
	<div class="table_page_default">
		<el-form :model="queryParams" inline>
			<el-form-item label="传感器名称">
				<el-input v-model="queryParams.name"></el-input>
			</el-form-item>
			<el-form-item label="传感器编码">
				<el-input v-model="queryParams.code"></el-input>
			</el-form-item>
			<el-form-item label="安装位置">
				<el-input v-model="queryParams.location"></el-input>
			</el-form-item>
			<el-form-item label="IP地址">
				<el-input v-model="queryParams.ipAddr"></el-input>
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
			<el-table-column label="风速传感器编码" align="center" prop="code" />
			<el-table-column label="风速传感器名称" align="center" prop="name" />
			<el-table-column label="安装位置" align="center" prop="location" />
			<el-table-column label="IP地址" align="center" prop="ipAddr" />
			<el-table-column label="监测巷道" align="center" prop="windArea" />
			<el-table-column label="断面积(㎡)" align="center" prop="surface" />
			<el-table-column label="风速上限" align="center" prop="maxSpeed" />
			<el-table-column label="风速下限" align="center" prop="minSpeed" />
			<el-table-column label="操作" align="center" width="320">
				<template #default="scope">
					<el-button type="primary" link @click="configHandle(scope.row)">配置</el-button>
					<el-button type="primary" link @click="showCorSensorVisible(scope.row)"
						>关联多参传感器</el-button
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
				<el-form-item label="风速传感器名称" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="安装位置" prop="location">
					<el-input v-model="form.location"></el-input>
				</el-form-item>
				<el-form-item label="风速传感器IP" prop="ipAddr">
					<el-input v-model="form.ipAddr"></el-input>
				</el-form-item>
				<el-form-item label="端口" prop="port">
					<el-input v-model="form.port"></el-input>
				</el-form-item>
				<el-form-item label="监测巷道" prop="windArea">
					<el-input v-model="form.windArea"></el-input>
				</el-form-item>
				<el-form-item label="断面积" prop="surface"
					><el-input v-model="form.surface"></el-input
				></el-form-item>
				<el-form-item label="风速传感器编码" prop="code">
					<el-input v-model="form.code"></el-input>
				</el-form-item>
				<el-form-item></el-form-item>
				<el-form-item label="风速上限" prop="maxSpeed">
					<el-input v-model="form.maxSpeed"></el-input>
				</el-form-item>
				<el-form-item label="风速下限" prop="minSpeed">
					<el-input v-model="form.minSpeed"></el-input>
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
				<el-form-item label="视频地址" prop="videoUrl" class="table_page_form_row">
					<el-input v-model="form.videoUrl"></el-input>
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
				<el-form-item label="风速传感器名称" prop="name">
					<el-input disabled v-model="examineForm.name"></el-input>
				</el-form-item>
				<el-form-item label="安装位置" prop="location">
					<el-input disabled v-model="examineForm.location"></el-input>
				</el-form-item>
				<el-form-item label="风速传感器IP" prop="ipAddr">
					<el-input disabled v-model="examineForm.ipAddr"></el-input>
				</el-form-item>
				<el-form-item label="端口" prop="port">
					<el-input disabled v-model="examineForm.port"></el-input>
				</el-form-item>
				<el-form-item label="监测巷道" prop="windArea">
					<el-input disabled v-model="examineForm.windArea"></el-input>
				</el-form-item>
				<el-form-item label="断面积" prop="surface"
					><el-input disabled v-model="examineForm.surface"></el-input
				></el-form-item>
				<el-form-item label="风速传感器编码" prop="code">
					<el-input disabled v-model="examineForm.code"></el-input>
				</el-form-item>
				<el-form-item></el-form-item>
				<el-form-item label="风速上限" prop="maxSpeed">
					<el-input disabled v-model="examineForm.maxSpeed"></el-input>
				</el-form-item>
				<el-form-item label="风速下限" prop="minSpeed">
					<el-input disabled v-model="examineForm.minSpeed"></el-input>
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
				<el-form-item label="视频地址" prop="videoUrl" class="table_page_form_row">
					<el-input disabled v-model="examineForm.videoUrl"></el-input>
				</el-form-item>
			</el-form>
		</dia-log>
		<!--    关联多参传感器-->
		<cor-multi-par-sensor
			v-if="corSensorVisible"
			v-model="corSensorVisible"
			:choose-data="chooseRow"
		/>
		<!--    传感器配置-->
		<WindSpeedConfig
			v-if="configVisible"
			v-model="configVisible"
			:choose-row="chooseRow"
			title="测风传感器配置"
		/>
	</div>
</template>

<style scoped lang="scss"></style>
