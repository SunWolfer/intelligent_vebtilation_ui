<!--局扇信息管理-->
<script setup>
	import useList from '@/hooks/useList'
	import { useForm } from '@/hooks/useForm'

	const {
		queryParams,
		dataList,
		total,
		getList,
		handleQuery,
		handleSelectionChange,
		handleDelete,
	} = useList({
		apiFun: () => {},
		params: {
			pageNum: 1,
			pageSize: 10,
			name: undefined,
			code: undefined,
			position: undefined,
		},
		deleteFun: () => {},
	})
	const rules = ref({
		code: [{ required: true, message: '风机编码不能为空', trigger: 'blur' }],
		name: [{ required: true, message: '风机名称不能为空', trigger: 'blur' }],
		position: [{ required: true, message: '安装位置不能为空', trigger: 'blur' }],
		voltage: [{ required: true, message: '额定电压不能为空', trigger: 'blur' }],
		electricCurrent: [{ required: true, message: '额定电流不能为空', trigger: 'blur' }],
		power: [{ required: true, message: '额定功率不能为空', trigger: 'blur' }],
		airVolume: [{ required: true, message: '风量不能为空', trigger: 'blur' }],
		totalPressure: [{ required: true, message: '全压不能为空', trigger: 'blur' }],
		staticPressure: [{ required: true, message: '静压不能为空', trigger: 'blur' }],
		efficiency: [{ required: true, message: '效率不能为空', trigger: 'blur' }],
		staMachineVoltage: [{ required: true, message: '备机电压不能为空', trigger: 'blur' }],
		staMachineElectricCurrent: [{ required: true, message: '备机电流不能为空', trigger: 'blur' }],
		staMachinePower: [{ required: true, message: '备机功率不能为空', trigger: 'blur' }],
		staMachineAirVolume: [{ required: true, message: '备机风量不能为空', trigger: 'blur' }],
		staMachineTotalPressure: [{ required: true, message: '备机全压不能为空', trigger: 'blur' }],
		staMachineStaticPressure: [{ required: true, message: '备机静压不能为空', trigger: 'blur' }],
		staMachineEfficiency: [{ required: true, message: '备机效率不能为空', trigger: 'blur' }],
	})
	// 新增修改操作
	const { formRef, form, title, open, submitForm, handleUpdate, handleAdd } = useForm({
		formParams: {
			id: undefined,
			name: undefined,
			code: undefined,
			position: undefined,
			voltage: undefined,
			electricCurrent: undefined,
			power: undefined,
			airVolume: undefined,
			totalPressure: undefined,
			staticPressure: undefined,
			efficiency: undefined,
			staMachineVoltage: undefined,
			staMachineElectricCurrent: undefined,
			staMachinePower: undefined,
			staMachineAirVolume: undefined,
			staMachineTotalPressure: undefined,
			staMachineStaticPressure: undefined,
			staMachineEfficiency: undefined,
			remark: undefined,
		},
		titleMes: '局扇',
		initApi: () => {},
		updateApi: () => {},
		addApi: () => {},
		afterAddFun: handleQuery,
		afterUpdateFun: handleQuery,
	})
</script>

<template>
	<div class="table_page_default">
		<el-form :model="queryParams" inline>
			<el-form-item label="风机名称 ">
				<el-input v-model="queryParams.name"></el-input>
			</el-form-item>
			<el-form-item label="风机编号 ">
				<el-input v-model="queryParams.code"></el-input>
			</el-form-item>
			<el-form-item label="安装位置">
				<el-input v-model="queryParams.position"></el-input>
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
			<el-table-column label="风机名称" align="center" prop="name" />
			<el-table-column label="风机编号" align="center" prop="code" />
			<el-table-column label="风机位置" align="center" prop="position" />
			<el-table-column label="额定电压" align="center" prop="voltage" />
			<el-table-column label="额定电流" align="center" prop="electricCurrent" />
			<el-table-column label="额定功率" align="center" prop="power" />
			<el-table-column label="工作状态" align="center" prop="status" />
			<el-table-column label="风量" align="center" prop="airVolume" />
			<el-table-column label="全压" align="center" prop="totalPressure" />
			<el-table-column label="静压" align="center" prop="staticPressure" />
			<el-table-column label="效率" align="center" prop="efficiency" />
			<el-table-column label="备机电压" align="center" prop="voltage" />
			<el-table-column label="额定电流" align="center" prop="electricCurrent" />
			<el-table-column label="额定功率" align="center" prop="power" />
			<el-table-column label="工作状态" align="center" prop="status" />
			<el-table-column label="操作" align="center" width="150">
				<template #default="scope">
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
		<dia-log
			v-if="open"
			v-model="open"
			:title="title"
			@submit="submitForm"
			:width="900"
			:height="700"
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
				<el-form-item label="风机编码" prop="code">
					<el-input v-model="form.code"></el-input>
				</el-form-item>
				<el-form-item label="风机名称" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="风机位置" prop="position">
					<el-input v-model="form.position"></el-input>
				</el-form-item>
				<el-form-item label="额定电压(V)" prop="voltage">
					<el-input v-model="form.voltage"></el-input>
				</el-form-item>
				<el-form-item label="额定电流(A)" prop="electricCurrent">
					<el-input v-model="form.electricCurrent"></el-input>
				</el-form-item>
				<el-form-item label="额定功率(KW)" prop="power">
					<el-input v-model="form.power"></el-input>
				</el-form-item>
				<el-form-item label="风量" prop="airVolume">
					<el-input v-model="form.airVolume"></el-input>
				</el-form-item>
				<el-form-item label="全压" prop="totalPressure">
					<el-input v-model="form.totalPressure"></el-input>
				</el-form-item>
				<el-form-item label="静压" prop="staticPressure">
					<el-input v-model="form.staticPressure"></el-input>
				</el-form-item>
				<el-form-item label="效率" prop="efficiency">
					<el-input v-model="form.efficiency"></el-input>
				</el-form-item>
				<el-form-item label="备机电压" prop="staMachineVoltage">
					<el-input v-model="form.staMachineVoltage"></el-input>
				</el-form-item>
				<el-form-item label="备机电流" prop="staMachineElectricCurrent">
					<el-input v-model="form.staMachineElectricCurrent"></el-input>
				</el-form-item>
				<el-form-item label="备机功率" prop="staMachinePower">
					<el-input v-model="form.staMachinePower"></el-input>
				</el-form-item>
				<el-form-item label="备机风量" prop="staMachineAirVolume">
					<el-input v-model="form.staMachineAirVolume"></el-input>
				</el-form-item>
				<el-form-item label="备机全压" prop="staMachineTotalPressure">
					<el-input v-model="form.staMachineTotalPressure"></el-input>
				</el-form-item>
				<el-form-item label="备机静压" prop="staMachineStaticPressure">
					<el-input v-model="form.staMachineStaticPressure"></el-input>
				</el-form-item>
				<el-form-item label="备机效率" prop="staMachineEfficiency">
					<el-input v-model="form.staMachineEfficiency"></el-input>
				</el-form-item>
				<el-form-item label="&ensp;备注" prop="remark" class="table_page_form_row">
					<el-input v-model="form.remark"></el-input>
				</el-form-item>
			</el-form>
		</dia-log>
	</div>
</template>

<style scoped lang="scss"></style>
