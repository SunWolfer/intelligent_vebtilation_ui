<!--三维通风系统巷道管理-->
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
		},
		deleteFun: () => {},
	})

	onMounted(() => {
		dataList.value.push({})
	})

	const rules = ref({
		code: [{ required: true, message: '风机编码不能为空', trigger: 'blur' }],
		name: [{ required: true, message: '风机名称不能为空', trigger: 'blur' }],
	})
	// 新增修改操作
	const { formRef, form, title, open, submitForm, handleUpdate, handleAdd } = useForm({
		formParams: {
			id: undefined,
			name: undefined,
			code: undefined,
		},
		titleMes: '巷道',
		initApi: () => {},
		updateApi: () => {},
		addApi: () => {},
		afterAddFun: handleQuery,
		afterUpdateFun: handleQuery,
	})
</script>

<template>
	<div class="table_page_default_no_btn">
		<el-form :model="queryParams" inline>
			<el-form-item label="巷道名称 ">
				<el-input v-model="queryParams.name"></el-input>
			</el-form-item>
			<el-form-item label="巷道编号 ">
				<el-input v-model="queryParams.code"></el-input>
			</el-form-item>
			<el-form-item>
				<div class="normal_btn" @click="handleQuery">查询</div>
				<div class="normal_2_btn" @click="handleQuery">导入</div>
				<div class="normal_2_btn" @click="handleQuery">导入模板</div>
				<div class="normal_3_btn" @click="handleDelete">删除</div>
			</el-form-item>
		</el-form>
		<el-table :data="dataList" border @selectionChange="handleSelectionChange">
			<el-table-column type="selection" width="55" align="center" />
			<el-table-column label="巷道名称" align="center" prop="name" />
			<el-table-column label="巷道编号" align="center" prop="code" />
			<el-table-column label="巷道周长(m)" align="center" prop="position" />
			<el-table-column label="巷道长度(m)" align="center" prop="voltage" />
			<el-table-column label="巷道断面积(㎡)" align="center" prop="electricCurrent" />
			<el-table-column label="巷道形状" align="center" prop="power" />
			<el-table-column label="支护类型" align="center" prop="status" />
			<el-table-column label="进回风巷" align="center" prop="airVolume" />
			<el-table-column label="风阻(N·S2/m8)" align="center" prop="totalPressure" />
			<el-table-column label="计划风量(m³/min)" align="center" prop="staticPressure" />
			<el-table-column label="人工实测风量(m³/min)" align="center" prop="efficiency" />
			<el-table-column label="人工实测风量时间" align="center" prop="voltage" />
			<el-table-column label="操作" align="center" width="150">
				<template #default="scope">
					<el-button type="primary" link @click="handleAdd(scope.row)">修改</el-button>
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
			:height="810"
			has-bottom-btn
			:btn-list="['保存', '取消']"
		>
			<div class="dia_form fullDom">
				<div class="form_title">巷道信息</div>
				<el-form
					ref="formRef"
					:model="form"
					inline
					label-width="auto"
					label-position="left"
					class="form_top"
				>
					<el-form-item label="巷道名称" class="table_page_form_row">
						<el-input />
					</el-form-item>
					<el-form-item label="巷道周长(m)">
						<el-input />
					</el-form-item>
					<el-form-item label="巷道长度(m)">
						<el-input />
					</el-form-item>
					<el-form-item label="巷道断面积(m2)">
						<el-input />
					</el-form-item>
					<el-form-item label="巷道形状">
						<el-select></el-select>
					</el-form-item>
					<el-form-item label="巷道支护类型">
						<el-select></el-select>
					</el-form-item>
					<el-form-item label="进回风类型">
						<el-select></el-select>
					</el-form-item>
					<el-form-item label="起始高程(m)">
						<el-input />
					</el-form-item>
					<el-form-item label="结束高程(m)">
						<el-input />
					</el-form-item>
				</el-form>
				<div class="form_title">通风参数</div>
				<el-form :model="form" inline label-width="auto" label-position="left" class="form_top">
					<el-form-item label="最大风量(m³/min)"> <el-input /> </el-form-item
					><el-form-item label="计划风量(m³/min)"> <el-input /> </el-form-item
					><el-form-item label="人工实测风量(m³/min)"> <el-input /> </el-form-item
					><el-form-item label="人工实测风量时间"> <el-input /> </el-form-item
					><el-form-item label="风阻(N·s2/m8)"> <el-input /> </el-form-item
					><el-form-item label="摩擦系数(N·s2/m4)"> <el-input /> </el-form-item
					><el-form-item label="局部阻力"> <el-input /> </el-form-item
					><el-form-item label="风阻测定来源"> <el-input /> </el-form-item
					><el-form-item label="人工测定风阻时间"> <el-input /> </el-form-item
					><el-form-item label="风路分支图区域"> <el-input /> </el-form-item
					><el-form-item label="起始节点"> <el-input /> </el-form-item
					><el-form-item label="结束节点">
						<el-input />
					</el-form-item>
				</el-form>
			</div>
		</dia-log>
	</div>
</template>

<style scoped lang="scss">
	.dia_form {
		display: grid;
		grid-template-rows: repeat(2, vh(26) 1fr);
		padding-left: vw(50);
	}
	.form_top {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(auto-fill, vh(38));
		align-content: space-between;
	}
	.form_title {
		font-size: vh(26);
		font-family: YouSheBiaoTiHei, serif;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.78);
		text-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);

		background: linear-gradient(180deg, #d7e8ff 0%, #2bbbea 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
