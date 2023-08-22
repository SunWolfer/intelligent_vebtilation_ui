<!--测风站信息管理-->
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
			position: undefined,
			ip: undefined,
		},
		deleteFun: () => {},
	})

	const rules = ref({
		name: [{ required: true, message: '测风站名称不能为空', trigger: 'blur' }],
		position: [{ required: true, message: '安装位置不能为空', trigger: 'blur' }],
		ip: [{ required: true, message: '测风站ip不能为空', trigger: 'blur' }],
		monitoringArea: [{ required: true, message: '监测区域不能为空', trigger: 'blur' }],
		sectionalArea: [{ required: true, message: '断面积不能为空', trigger: 'blur' }],
		code: [{ required: true, message: '编码不能为空', trigger: 'blur' }],
	})
	// 新增修改操作
	const { formRef, form, title, open, submitForm, handleUpdate, handleAdd } = useForm({
		formParams: {
			id: undefined,
			name: undefined,
			position: undefined,
			ip: undefined,
			port: undefined,
			monitoringArea: undefined,
			sectionalArea: undefined,
			code: undefined,
			upperLimit: undefined,
			lowerLimit: undefined,
			xPosition: undefined,
			yPosition: undefined,
			videoUrl: undefined,
		},
		titleMes: '测风站',
		initApi: () => {},
		updateApi: () => {},
		addApi: () => {},
		afterAddFun: handleQuery,
		afterUpdateFun: handleQuery,
	})
	// 查看
	const {
		formRef: examineFormRef,
		form: examineForm,
		examineTitle,
		examine,
		handleExamine,
	} = useForm({
		formParams: {
			id: undefined,
			name: undefined,
			position: undefined,
			ip: undefined,
			port: undefined,
			monitoringArea: undefined,
			sectionalArea: undefined,
			code: undefined,
			upperLimit: undefined,
			lowerLimit: undefined,
			xPosition: undefined,
			yPosition: undefined,
			videoUrl: undefined,
		},
		titleMes: '测风站',
		initApi: () => {},
	})
</script>

<template>
	<div class="table_page_default">
		<el-form :model="queryParams" inline>
			<el-form-item label="安装位置">
				<el-input v-model="queryParams.position"></el-input>
			</el-form-item>
			<el-form-item label="IP地址">
				<el-input v-model="queryParams.ip"></el-input>
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
			<el-table-column label="测风站编码" align="center" prop="code" />
			<el-table-column label="测风站名称" align="center" prop="name" />
			<el-table-column label="测风站位置" align="center" prop="position" />
			<el-table-column label="IP地址" align="center" prop="ip" />
			<el-table-column label="监测区域" align="center" prop="monitoringArea" />
			<el-table-column label="断面积(㎡)" align="center" prop="sectionalArea" />
			<el-table-column label="风速上限" align="center" prop="upperLimit" />
			<el-table-column label="风速下限" align="center" prop="lowerLimit" />
			<el-table-column label="操作" align="center" width="150">
				<template #default="scope">
					<el-button type="primary" link>配置</el-button>
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
				<el-form-item label="安装位置" prop="position">
					<el-input v-model="form.position"></el-input>
				</el-form-item>
				<el-form-item label="风速传感器IP" prop="ip">
					<el-input v-model="form.ip"></el-input>
				</el-form-item>
				<el-form-item label="&ensp;端口" prop="port">
					<el-input v-model="form.port"></el-input>
				</el-form-item>
				<el-form-item label="监测区域" prop="monitoringArea">
					<el-input v-model="form.monitoringArea"></el-input>
				</el-form-item>
				<el-form-item label="断面积(㎡)" prop="sectionalArea"
					><el-input v-model="form.sectionalArea"></el-input
				></el-form-item>
				<el-form-item label="测风站编码" prop="code">
					<el-input v-model="form.code"></el-input>
				</el-form-item>
				<el-form-item></el-form-item>
				<el-form-item label="&ensp;风速上限" prop="upperLimit">
					<el-input v-model="form.upperLimit"></el-input>
				</el-form-item>
				<el-form-item label="&ensp;风速下限" prop="lowerLimit">
					<el-input v-model="form.lowerLimit"></el-input>
				</el-form-item>
				<el-form-item label="&ensp;X坐标" prop="xPosition">
					<el-input v-model="form.xPosition"></el-input>
				</el-form-item>
				<el-form-item label="&ensp;Y坐标" prop="yPosition">
					<el-input v-model="form.yPosition"></el-input>
				</el-form-item>
				<el-form-item label="&ensp;视频地址" prop="videoUrl" class="table_page_form_row">
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
				<el-form-item label="安装位置" prop="position">
					<el-input disabled v-model="examineForm.position"></el-input>
				</el-form-item>
				<el-form-item label="风速传感器IP" prop="ip">
					<el-input disabled v-model="examineForm.ip"></el-input>
				</el-form-item>
				<el-form-item label="端口" prop="port">
					<el-input disabled v-model="examineForm.port"></el-input>
				</el-form-item>
				<el-form-item label="监测区域" prop="monitoringArea">
					<el-input v-model="form.monitoringArea"></el-input>
				</el-form-item>
				<el-form-item label="断面积(㎡)" prop="sectionalArea"
					><el-input v-model="form.sectionalArea"></el-input
				></el-form-item>
				<el-form-item label="测风站编码" prop="code">
					<el-input disabled v-model="examineForm.code"></el-input>
				</el-form-item>
				<el-form-item></el-form-item>
				<el-form-item label="风速上限" prop="upperLimit">
					<el-input disabled v-model="examineForm.upperLimit"></el-input>
				</el-form-item>
				<el-form-item label="风速下限" prop="lowerLimit">
					<el-input disabled v-model="examineForm.lowerLimit"></el-input>
				</el-form-item>
				<el-form-item label="X坐标" prop="xPosition">
					<el-input disabled v-model="examineForm.xPosition"></el-input>
				</el-form-item>
				<el-form-item label="Y坐标" prop="yPosition">
					<el-input disabled v-model="examineForm.yPosition"></el-input>
				</el-form-item>
				<el-form-item label="视频地址" prop="videoUrl" class="table_page_form_row">
					<el-input disabled v-model="examineForm.videoUrl"></el-input>
				</el-form-item>
			</el-form>
		</dia-log>
	</div>
</template>

<style scoped lang="scss"></style>
