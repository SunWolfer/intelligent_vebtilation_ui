<!--主扇信息管理-->
<script setup>
	import useList from '@/hooks/useList'
	import { useForm } from '@/hooks/useForm'
	import {
		addMainFan,
		delMainFan,
		getMainFan,
		listMainFan,
		updateMainFan,
	} from '@/api/api/mainFanManagement'
	import useDict from '@/hooks/useDict'
	import { selectDictLabel } from '@/utils/ruoyi'
	import FanTagsConfig from '@/views/venManagement/mainFanManagement/fanTagsConfig.vue'

	const { fan_work_status } = useDict('fan_work_status')

	const {
		queryParams,
		dataList,
		total,
		getList,
		handleQuery,
		handleSelectionChange,
		handleDelete,
	} = useList({
		apiFun: listMainFan,
		params: {
			pageNum: 1,
			pageSize: 10,
			name: undefined,
			code: undefined,
			location: undefined,
			devType: 'mainfan',
		},
		deleteFun: delMainFan,
	})
	const rules = ref({
		code: [{ required: true, message: '风机编码不能为空', trigger: 'blur' }],
		name: [{ required: true, message: '风机名称不能为空', trigger: 'blur' }],
		location: [{ required: true, message: '安装位置不能为空', trigger: 'blur' }],
		ratedVoltage1: [{ required: true, message: '额定电压不能为空', trigger: 'blur' }],
		ratedCurrent1: [{ required: true, message: '额定电流不能为空', trigger: 'blur' }],
		ratedPower1: [{ required: true, message: '额定功率不能为空', trigger: 'blur' }],
		airVolume1: [{ required: true, message: '风量不能为空', trigger: 'blur' }],
		fullPressure1: [{ required: true, message: '全压不能为空', trigger: 'blur' }],
		negativePressure1: [{ required: true, message: '静压不能为空', trigger: 'blur' }],
		efficiency1: [{ required: true, message: '效率不能为空', trigger: 'blur' }],
		ratedVoltage2: [{ required: true, message: '备机电压不能为空', trigger: 'blur' }],
		ratedCurrent2: [{ required: true, message: '备机电流不能为空', trigger: 'blur' }],
		ratedPower2: [{ required: true, message: '备机功率不能为空', trigger: 'blur' }],
		airVolume2: [{ required: true, message: '备机风量不能为空', trigger: 'blur' }],
		fullPressure2: [{ required: true, message: '备机全压不能为空', trigger: 'blur' }],
		negativePressure2: [{ required: true, message: '备机静压不能为空', trigger: 'blur' }],
		efficiency2: [{ required: true, message: '备机效率不能为空', trigger: 'blur' }],
	})
	// 新增修改操作
	const { formRef, form, title, open, submitForm, handleUpdate, handleAdd } = useForm({
		formParams: {
			id: undefined,
			name: undefined,
			code: undefined,
			location: undefined,
			ratedVoltage1: undefined,
			ratedCurrent1: undefined,
			ratedPower1: undefined,
			airVolume1: undefined,
			fullPressure1: undefined,
			negativePressure1: undefined,
			efficiency1: undefined,
			ratedVoltage2: undefined,
			ratedCurrent2: undefined,
			ratedPower2: undefined,
			airVolume2: undefined,
			fullPressure2: undefined,
			negativePressure2: undefined,
			efficiency2: undefined,
			remark: undefined,
			videoUrl: undefined,
			devType: 'mainfan',
		},
		titleMes: '主扇',
		initApi: getMainFan,
		updateApi: updateMainFan,
		addApi: addMainFan,
		afterAddFun: handleQuery,
		afterUpdateFun: handleQuery,
	})

	//   标签查询
	const tagsVisible = ref(false)
	const chooseRow = ref({})
	const tagsHandle = (row) => {
		chooseRow.value = row
		tagsVisible.value = true
	}
</script>

<template>
	<div class="table_page_default">
		<el-form :model="queryParams" inline>
			<el-form-item label="风机名称 ">
				<el-input v-model="queryParams.name"></el-input>
			</el-form-item>
			<el-form-item label="风机编码 ">
				<el-input v-model="queryParams.code"></el-input>
			</el-form-item>
			<el-form-item label="安装位置">
				<el-input v-model="queryParams.location"></el-input>
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
			<el-table-column label="风机编码" align="center" prop="code" />
			<el-table-column label="风机位置" align="center" prop="location" />
			<el-table-column label="额定电压" align="center" prop="ratedVoltage1">
				<template #default="scope">
					{{ scope.row.workStatus2 === '1' ? scope.row.ratedVoltage2 : scope.row.ratedVoltage1 }}
				</template>
			</el-table-column>
			<el-table-column label="额定电流" align="center" prop="ratedCurrent1">
				<template #default="scope">
					{{ scope.row.workStatus2 === '1' ? scope.row.ratedCurrent2 : scope.row.ratedCurrent1 }}
				</template>
			</el-table-column>
			<el-table-column label="额定功率" align="center" prop="ratedPower1">
				<template #default="scope">
					{{ scope.row.workStatus2 === '1' ? scope.row.ratedPower2 : scope.row.ratedPower1 }}
				</template>
			</el-table-column>
			<el-table-column label="工作状态" align="center" prop="workStatus1">
				<template #default="scope">
					{{
						selectDictLabel(
							fan_work_status,
							scope.row.workStatus2 === '1' ? scope.row.workStatus2 : scope.row.workStatus1,
						)
					}}
				</template>
			</el-table-column>
			<el-table-column label="风量" align="center" prop="airVolume1">
				<template #default="scope">
					{{ scope.row.workStatus2 === '1' ? scope.row.airVolume2 : scope.row.airVolume1 }}
				</template>
			</el-table-column>
			<el-table-column label="全压" align="center" prop="fullPressure1">
				<template #default="scope">
					{{ scope.row.workStatus2 === '1' ? scope.row.fullPressure2 : scope.row.fullPressure1 }}
				</template>
			</el-table-column>
			<el-table-column label="静压" align="center" prop="negativePressure1">
				<template #default="scope">
					{{
						scope.row.workStatus2 === '1'
							? scope.row.negativePressure2
							: scope.row.negativePressure1
					}}
				</template>
			</el-table-column>
			<el-table-column label="效率" align="center" prop="efficiency1">
				<template #default="scope">
					{{ scope.row.workStatus2 === '1' ? scope.row.efficiency2 : scope.row.efficiency1 }}
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="150">
				<template #default="scope">
					<el-button type="primary" link @click="tagsHandle(scope.row)">编辑</el-button>
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
			:height="750"
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
				<el-form-item label="风机位置" prop="location">
					<el-input v-model="form.location"></el-input>
				</el-form-item>
				<el-form-item label="额定电压(V)" prop="ratedVoltage1">
					<el-input v-model="form.ratedVoltage1"></el-input>
				</el-form-item>
				<el-form-item label="额定电流(A)" prop="ratedCurrent1">
					<el-input v-model="form.ratedCurrent1"></el-input>
				</el-form-item>
				<el-form-item label="额定功率(KW)" prop="ratedPower1">
					<el-input v-model="form.ratedPower1"></el-input>
				</el-form-item>
				<el-form-item label="风量" prop="airVolume1">
					<el-input v-model="form.airVolume1"></el-input>
				</el-form-item>
				<el-form-item label="全压" prop="fullPressure1">
					<el-input v-model="form.fullPressure1"></el-input>
				</el-form-item>
				<el-form-item label="静压" prop="negativePressure1">
					<el-input v-model="form.negativePressure1"></el-input>
				</el-form-item>
				<el-form-item label="效率" prop="efficiency1">
					<el-input v-model="form.efficiency1"></el-input>
				</el-form-item>
				<el-form-item label="备机电压" prop="ratedVoltage2">
					<el-input v-model="form.ratedVoltage2"></el-input>
				</el-form-item>
				<el-form-item label="备机电流" prop="ratedCurrent2">
					<el-input v-model="form.ratedCurrent2"></el-input>
				</el-form-item>
				<el-form-item label="备机功率" prop="ratedPower2">
					<el-input v-model="form.ratedPower2"></el-input>
				</el-form-item>
				<el-form-item label="备机风量" prop="airVolume2">
					<el-input v-model="form.airVolume2"></el-input>
				</el-form-item>
				<el-form-item label="备机全压" prop="fullPressure2">
					<el-input v-model="form.fullPressure2"></el-input>
				</el-form-item>
				<el-form-item label="备机静压" prop="negativePressure2">
					<el-input v-model="form.negativePressure2"></el-input>
				</el-form-item>
				<el-form-item label="备机效率" prop="efficiency2">
					<el-input v-model="form.efficiency2"></el-input>
				</el-form-item>
				<el-form-item label="&ensp;视频地址" prop="videoUrl" class="table_page_form_row">
					<el-input v-model="form.videoUrl"></el-input>
				</el-form-item>
				<el-form-item label="&ensp;备注" prop="remark" class="table_page_form_row">
					<el-input v-model="form.remark"></el-input>
				</el-form-item>
			</el-form>
		</dia-log>
		<!--    标签弹窗-->
		<FanTagsConfig
			v-if="tagsVisible"
			v-model="tagsVisible"
			:choose-row="chooseRow"
			title="主扇标签"
		/>
	</div>
</template>

<style scoped lang="scss"></style>
