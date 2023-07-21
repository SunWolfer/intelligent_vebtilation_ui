<template>
	<table-page>
		<template #tablePageForm>
			<el-form :model="queryParams" ref="queryRef" :inline="true">
				<el-form-item label="部门名称" prop="deptName">
					<el-input
						v-model="queryParams.deptName"
						placeholder="请输入部门名称"
						clearable
						@keyup.enter="handleQuery"
					/>
				</el-form-item>
				<el-form-item label="状态" prop="status">
					<el-select v-model="queryParams.status" placeholder="部门状态" clearable>
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
		</template>
		<template #tablePageBtn>
			<el-button
				class="add-btn"
				plain
				icon="Plus"
				@click="handleAdd"
				v-hasPermi="['system:dept:add']"
				>新增</el-button
			>
			<el-button class="ordinary-btn" plain icon="Sort" @click="toggleExpandAll"
				>展开/折叠</el-button
			>
		</template>
		<template #tablePageTable>
			<el-table
				v-if="refreshTable"
				v-loading="loading"
				:data="deptList"
				row-key="deptId"
				:default-expand-all="isExpandAll"
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
			>
				<el-table-column prop="deptName" label="部门名称" width="260"></el-table-column>
				<el-table-column prop="orderNum" label="排序" width="200"></el-table-column>
				<el-table-column prop="status" label="状态" width="100">
					<template #default="scope">
						<dict-tag :options="sys_normal_disable" :value="scope.row.status" />
					</template>
				</el-table-column>
				<el-table-column label="创建时间" align="center" prop="createTime" width="200">
					<template #default="scope">
						<span>{{ parseTime(scope.row.createTime) }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
					<template #default="scope">
						<el-button
							type="primary"
							link
							icon="Edit"
							@click="handleUpdate(scope.row)"
							v-hasPermi="['system:dept:edit']"
							>修改</el-button
						>
						<el-button
							type="primary"
							link
							icon="Plus"
							@click="handleAdd(scope.row)"
							v-hasPermi="['system:dept:add']"
							>新增</el-button
						>
						<el-button
							v-if="scope.row.parentId !== 0"
							type="primary"
							link
							icon="Delete"
							@click="handleDelete(scope.row)"
							v-hasPermi="['system:dept:remove']"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</template>
		<template #tablePagePagination>
			<!-- 添加或修改部门对话框 -->
			<dia-log
				:title="title"
				v-model="open"
				:width="800"
				has-bottom-btn
				@submit="submitForm"
				@cancel="cancel"
			>
				<el-form ref="formRef" :model="form" :rules="rules" label-width="auto" class="diaForm">
					<el-row>
						<el-col :span="24" v-if="form.parentId !== 0">
							<el-form-item label="上级部门" prop="parentId">
								<el-tree-select
									style="width: 100%"
									:teleported="false"
									v-model="form.parentId"
									:data="deptOptions"
									:props="{
										value: 'deptId',
										label: 'deptName',
										children: 'children',
									}"
									value-key="deptId"
									placeholder="选择上级部门"
									check-strictly
								/>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="部门名称" prop="deptName">
								<el-input v-model="form.deptName" placeholder="请输入部门名称" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="显示排序" prop="orderNum">
								<el-input-number
									style="width: 100%"
									v-model="form.orderNum"
									controls-position="right"
									:min="0"
								/>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="负责人" prop="leader">
								<el-input v-model="form.leader" placeholder="请输入负责人" maxlength="20" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="联系电话" prop="phone">
								<el-input v-model="form.phone" placeholder="请输入联系电话" maxlength="11" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="邮箱" prop="email">
								<el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="部门状态">
								<el-radio-group v-model="form.status">
									<el-radio
										v-for="dict in sys_normal_disable"
										:key="dict.value"
										:label="dict.value"
										>{{ dict.label }}</el-radio
									>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</dia-log>
		</template>
	</table-page>
</template>

<script setup name="Dept">
	import { listDept, getDept, delDept, addDept, updateDept } from '@/api/system/dept'
	import useDict from '@/hooks/useDict'
	import useList from '@/hooks/useList'
	import { useForm } from '@/hooks/useForm'

	const { proxy } = getCurrentInstance()
	const { sys_normal_disable } = useDict('sys_normal_disable')

	const {
		queryParams,
		dataList: deptList,
		loading,
		getList,
		handleQuery,
		resetQuery,
		handleDelete,
	} = useList({
		apiFun: listDept,
		params: {
			deptName: undefined,
			status: undefined,
		},
		deleteFun: delDept,
		deleteApi: {
			deleteKey: 'deptId',
		},
	})

	const deptOptions = ref([])
	const isExpandAll = ref(true)
	const refreshTable = ref(true)

	const rules = ref({
		parentId: [{ required: true, message: '上级部门不能为空', trigger: 'blur' }],
		deptName: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }],
		orderNum: [{ required: true, message: '显示排序不能为空', trigger: 'blur' }],
		email: [
			{
				type: 'email',
				message: '请输入正确的邮箱地址',
				trigger: ['blur', 'change'],
			},
		],
		phone: [
			{
				pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
				message: '请输入正确的手机号码',
				trigger: 'blur',
			},
		],
	})
	const { formRef, form, title, open, reset, cancel, submitForm, handleUpdate, handleAdd } =
		useForm({
			domRefName: 'formRef',
			formParams: {
				deptId: undefined,
				parentId: undefined,
				deptName: undefined,
				orderNum: 0,
				leader: undefined,
				phone: undefined,
				email: undefined,
				status: '0',
			},
			formId: 'deptId',
			titleMes: '部门',
			afterAddInitFun: (row) => {
				listDept().then((response) => {
					deptOptions.value = proxy.handleTree(response.data, 'deptId')
				})
				if (row !== undefined) {
					form.value.parentId = row.deptId
				}
			},
			initApi: getDept,
			beforeInitFun: (row) => {
				listDept(row.deptId).then((response) => {
					deptOptions.value = proxy.handleTree(response.data, 'deptId')
				})
			},
			updateApi: updateDept,
			addApi: addDept,
			afterAddFun: handleQuery,
			afterUpdateFun: handleQuery,
		})
	/** 展开/折叠操作 */
	function toggleExpandAll() {
		refreshTable.value = false
		isExpandAll.value = !isExpandAll.value
		nextTick(() => {
			refreshTable.value = true
		})
	}
</script>
