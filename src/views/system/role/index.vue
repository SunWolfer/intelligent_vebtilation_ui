<template>
	<div class="table_page_default">
		<el-form :model="queryParams" ref="queryRef" :inline="true">
			<el-form-item label="角色名称" prop="roleName">
				<el-input
					v-model="queryParams.roleName"
					placeholder="请输入角色名称"
					clearable
					style="width: 240px"
					@keyup.enter="handleQuery"
				/>
			</el-form-item>
			<el-form-item label="权限字符" prop="roleKey">
				<el-input
					v-model="queryParams.roleKey"
					placeholder="请输入权限字符"
					clearable
					style="width: 240px"
					@keyup.enter="handleQuery"
				/>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-select
					v-model="queryParams.status"
					placeholder="角色状态"
					clearable
					style="width: 240px"
				>
					<el-option
						v-for="dict in sys_normal_disable"
						:key="dict.value"
						:label="dict.label"
						:value="dict.value"
					/>
				</el-select>
			</el-form-item>
			<el-form-item label="创建时间" style="width: 308px">
				<el-date-picker
					v-model="dateRange"
					value-format="YYYY-MM-DD"
					type="daterange"
					range-separator="-"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button class="ordinary-btn" type="primary" icon="Search" @click="handleQuery"
					>搜索</el-button
				>
				<el-button class="reset-btn" icon="Refresh" @click="resetQuery">重置</el-button>
			</el-form-item>
		</el-form>
		<div class="table_page_btn_line">
			<el-button
				class="add-btn"
				plain
				icon="Plus"
				@click="handleAdd"
				v-hasPermi="['system:role:add']"
				>新增</el-button
			>
			<el-button
				class="add-btn"
				plain
				icon="Edit"
				:disabled="single"
				@click="handleUpdate"
				v-hasPermi="['system:role:edit']"
				>修改</el-button
			>
			<el-button
				class="delete-btn"
				plain
				icon="Delete"
				:disabled="multiple"
				@click="handleDelete"
				v-hasPermi="['system:role:remove']"
				>删除</el-button
			>
			<el-button
				class="derive-btn"
				plain
				icon="Download"
				@click="handleExport"
				v-hasPermi="['system:role:export']"
				>导出</el-button
			>
		</div>
		<el-table :data="roleList" @selection-change="handleSelectionChange" border>
			<el-table-column type="selection" width="55" align="center" />
			<el-table-column label="角色编号" align="center" prop="roleId" width="120" />
			<el-table-column
				label="角色名称"
				align="center"
				prop="roleName"
				:show-overflow-tooltip="true"
				width="150"
			/>
			<el-table-column
				label="权限字符"
				align="center"
				prop="roleKey"
				:show-overflow-tooltip="true"
				width="150"
			/>
			<el-table-column label="显示顺序" align="center" prop="roleSort" width="100" />
			<el-table-column label="状态" align="center" width="100">
				<template #default="scope">
					<el-switch
						v-model="scope.row.status"
						active-value="0"
						inactive-value="1"
						@change="handleStatusChange(scope.row)"
					></el-switch>
				</template>
			</el-table-column>
			<el-table-column label="创建时间" align="center" prop="createTime" />
			<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
				<template #default="scope">
					<el-tooltip content="修改" placement="top" v-if="scope.row.roleId !== 1">
						<el-button
							type="primary"
							link
							icon="Edit"
							@click="handleUpdate(scope.row)"
							v-hasPermi="['system:role:edit']"
						></el-button>
					</el-tooltip>
					<el-tooltip content="删除" placement="top" v-if="scope.row.roleId !== 1">
						<el-button
							type="primary"
							link
							icon="Delete"
							@click="handleDelete(scope.row)"
							v-hasPermi="['system:role:remove']"
						></el-button>
					</el-tooltip>
					<el-tooltip content="数据权限" placement="top" v-if="scope.row.roleId !== 1">
						<el-button
							type="primary"
							link
							icon="CircleCheck"
							@click="handleDataScope(scope.row)"
							v-hasPermi="['system:role:edit']"
						></el-button>
					</el-tooltip>
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
		<!-- 添加或修改角色配置对话框 -->
		<dia-log
			:title="title"
			v-model="open"
			:width="800"
			:height="820"
			has-bottom-btn
			@submit="submitForm"
			@cancel="cancel"
		>
			<el-form ref="roleRef" :model="form" :rules="rules" label-width="auto" class="diaForm">
				<el-form-item label="角色名称" prop="roleName">
					<el-input v-model="form.roleName" placeholder="请输入角色名称" />
				</el-form-item>
				<el-form-item prop="roleKey">
					<template #label>
						<span>
							<el-tooltip
								content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)"
								placement="top"
							>
								<el-icon><question-filled /></el-icon>
							</el-tooltip>
							权限字符
						</span>
					</template>
					<el-input v-model="form.roleKey" placeholder="请输入权限字符" />
				</el-form-item>
				<el-form-item label="角色顺序" prop="roleSort">
					<el-input-number v-model="form.roleSort" controls-position="right" :min="0" />
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="form.status">
						<el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{
							dict.label
						}}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="菜单权限">
					<el-checkbox
						style="color: #ffffff; height: 30px"
						v-model="menuExpand"
						@change="handleCheckedTreeExpand($event, 'menu')"
						>展开/折叠</el-checkbox
					>
					<el-checkbox
						style="color: #ffffff; height: 30px"
						v-model="menuNodeAll"
						@change="handleCheckedTreeNodeAll($event, 'menu')"
						>全选/全不选</el-checkbox
					>
					<el-tree
						:teleported="false"
						class="tree-border"
						:data="menuOptions"
						show-checkbox
						ref="menuRef"
						node-key="id"
						empty-text="加载中，请稍候"
						:props="{ label: 'label', children: 'children' }"
					></el-tree>
				</el-form-item>
				<el-form-item label="备注">
					<el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
				</el-form-item>
			</el-form>
		</dia-log>

		<!-- 分配角色数据权限对话框 -->
		<dia-log
			:title="title"
			v-model="openDataScope"
			has-bottom-btn
			:width="800"
			:height="700"
			@submit="submitDataScope"
			@cancel="cancelDataScope"
		>
			<el-form :model="form" label-width="80px" class="diaForm">
				<el-form-item label="角色名称">
					<el-input v-model="form.roleName" :disabled="true" />
				</el-form-item>
				<el-form-item label="权限字符">
					<el-input v-model="form.roleKey" :disabled="true" />
				</el-form-item>
				<el-form-item label="权限范围">
					<el-select :teleported="false" v-model="form.dataScope" @change="dataScopeSelectChange">
						<el-option
							v-for="item in dataScopeOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="数据权限" v-show="form.dataScope === '2'">
					<el-checkbox
						style="color: #ffffff; height: 30px"
						v-model="deptExpand"
						@change="handleCheckedTreeExpand($event, 'dept')"
						>展开/折叠</el-checkbox
					>
					<el-checkbox
						style="color: #ffffff; height: 30px"
						v-model="deptNodeAll"
						@change="handleCheckedTreeNodeAll($event, 'dept')"
						>全选/全不选</el-checkbox
					>
					<el-tree
						:teleported="false"
						class="tree-border"
						:data="deptOptions"
						show-checkbox
						default-expand-all
						ref="deptRef"
						node-key="id"
						empty-text="加载中，请稍候"
						:props="{ label: 'label', children: 'children' }"
					></el-tree>
				</el-form-item>
			</el-form>
		</dia-log>
	</div>
</template>

<script setup name="Role">
	import {
		addRole,
		changeRoleStatus,
		dataScope,
		delRole,
		deptTreeSelect,
		exportRole,
		getRole,
		listRole,
		updateRole,
	} from '@/api/system/role'
	import { roleMenuTreeselect, treeselect as menuTreeselect } from '@/api/system/menu'
	import useDict from '@/hooks/useDict'
	import useList from '@/hooks/useList'
	import { useForm } from '@/hooks/useForm'

	const { proxy } = getCurrentInstance()
	const { sys_normal_disable } = useDict('sys_normal_disable')

	const {
		queryParams,
		dateRange,
		dataList: roleList,
		total,
		getList,
		handleQuery,
		resetQuery,
		ids,
		single,
		multiple,
		handleSelectionChange,
		handleDelete,
		handleExport,
	} = useList({
		apiFun: listRole,
		params: {
			pageNum: 1,
			pageSize: 10,
			roleName: undefined,
			roleKey: undefined,
			status: undefined,
		},
		deleteFun: delRole,
		deleteApi: {
			deleteMes: '角色编号为',
			deleteKey: 'roleId',
		},
		exportFun: exportRole,
	})

	const open = ref(false)
	const title = ref('')
	const menuOptions = ref([])
	const menuExpand = ref(false)
	const menuNodeAll = ref(false)
	const deptExpand = ref(true)
	const deptNodeAll = ref(false)
	const deptOptions = ref([])
	const openDataScope = ref(false)
	const menuRef = ref(null)
	const deptRef = ref(null)

	/** 数据范围选项*/
	const dataScopeOptions = ref([
		{ value: '1', label: '全部数据权限' },
		{ value: '2', label: '自定数据权限' },
		{ value: '3', label: '本部门数据权限' },
		{ value: '4', label: '本部门及以下数据权限' },
		{ value: '5', label: '仅本人数据权限' },
	])

	const data = reactive({
		form: {},
		rules: {
			roleName: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
			roleKey: [{ required: true, message: '权限字符不能为空', trigger: 'blur' }],
			roleSort: [{ required: true, message: '角色顺序不能为空', trigger: 'blur' }],
		},
	})

	const { form, rules } = toRefs(data)

	/** 角色状态修改 */
	function handleStatusChange(row) {
		let text = row.status === '0' ? '启用' : '停用'
		proxy.$modal
			.confirm('确认要"' + text + '""' + row.roleName + '"角色吗?')
			.then(function () {
				return changeRoleStatus(row.roleId, row.status)
			})
			.then(() => {
				proxy.$modal.msgSuccess(text + '成功')
			})
			.catch(function () {
				row.status = row.status === '0' ? '1' : '0'
			})
	}
	/** 查询菜单树结构 */
	function getMenuTreeselect() {
		menuTreeselect().then((response) => {
			menuOptions.value = response.data
		})
	}
	/** 所有部门节点数据 */
	function getDeptAllCheckedKeys() {
		// 目前被选中的部门节点
		let checkedKeys = deptRef.value.getCheckedKeys()
		// 半选中的部门节点
		let halfCheckedKeys = deptRef.value.getHalfCheckedKeys()
		checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
		return checkedKeys
	}
	const roleRef = ref(null)
	/** 重置新增的表单以及其他数据  */
	function reset() {
		if (menuRef.value) {
			menuRef.value.setCheckedKeys([])
		}
		menuExpand.value = false
		menuNodeAll.value = false
		deptExpand.value = true
		deptNodeAll.value = false
		form.value = {
			roleId: undefined,
			roleName: undefined,
			roleKey: undefined,
			roleSort: 0,
			status: '0',
			menuIds: [],
			deptIds: [],
			remark: undefined,
		}
		roleRef.value?.resetFields()
	}
	/** 添加角色 */
	function handleAdd() {
		reset()
		getMenuTreeselect()
		open.value = true
		title.value = '添加角色'
	}
	/** 修改角色 */
	function handleUpdate(row) {
		reset()
		const roleId = row.roleId || ids.value
		const roleMenu = getRoleMenuTreeselect(roleId)
		getRole(roleId).then((response) => {
			form.value = response.data
			form.value.roleSort = Number(form.value.roleSort)
			open.value = true
			nextTick(() => {
				roleMenu.then((res) => {
					let checkedKeys = res.checkedKeys
					checkedKeys.forEach((v) => {
						nextTick(() => {
							menuRef.value.setChecked(v, true, false)
						})
					})
				})
			})
			title.value = '修改角色'
		})
	}
	/** 根据角色ID查询菜单树结构 */
	function getRoleMenuTreeselect(roleId) {
		return roleMenuTreeselect(roleId).then((response) => {
			menuOptions.value = response.menus
			return response
		})
	}
	/** 根据角色ID查询部门树结构 */
	function getDeptTree(roleId) {
		return deptTreeSelect(roleId).then((response) => {
			deptOptions.value = response.depts
			return response
		})
	}
	/** 树权限（展开/折叠）*/
	function handleCheckedTreeExpand(value, type) {
		if (type === 'menu') {
			let treeList = menuOptions.value
			for (let i = 0; i < treeList.length; i++) {
				menuRef.value.store.nodesMap[treeList[i].id].expanded = value
			}
		} else if (type === 'dept') {
			let treeList = deptOptions.value
			for (let i = 0; i < treeList.length; i++) {
				deptRef.value.store.nodesMap[treeList[i].id].expanded = value
			}
		}
	}
	/** 树权限（全选/全不选） */
	function handleCheckedTreeNodeAll(value, type) {
		if (type === 'menu') {
			menuRef.value.setCheckedNodes(value ? menuOptions.value : [])
		} else if (type === 'dept') {
			deptRef.value.setCheckedNodes(value ? deptOptions.value : [])
		}
	}
	/** 所有菜单节点数据 */
	function getMenuAllCheckedKeys() {
		// 目前被选中的菜单节点
		let checkedKeys = menuRef.value.getCheckedKeys()
		// 半选中的菜单节点
		let halfCheckedKeys = menuRef.value.getHalfCheckedKeys()
		checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
		return checkedKeys
	}
	/** 提交按钮 */
	function submitForm() {
		proxy.$refs['roleRef'].validate((valid) => {
			if (valid) {
				if (form.value.roleId !== undefined) {
					form.value.menuIds = getMenuAllCheckedKeys()
					updateRole(form.value).then((response) => {
						proxy.$modal.msgSuccess('修改成功')
						open.value = false
						getList()
					})
				} else {
					form.value.menuIds = getMenuAllCheckedKeys()
					addRole(form.value).then((response) => {
						proxy.$modal.msgSuccess('新增成功')
						open.value = false
						getList()
					})
				}
			}
		})
	}
	/** 取消按钮 */
	function cancel() {
		open.value = false
		reset()
	}
	/** 选择角色权限范围触发 */
	function dataScopeSelectChange(value) {
		if (value !== '2') {
			deptRef.value.setCheckedKeys([])
		}
	}
	/** 分配数据权限操作 */
	function handleDataScope(row) {
		reset()
		const deptTreeSelect = getDeptTree(row.roleId)
		getRole(row.roleId).then((response) => {
			form.value = response.data
			openDataScope.value = true
			nextTick(() => {
				deptTreeSelect.then((res) => {
					nextTick(() => {
						if (deptRef.value) {
							deptRef.value.setCheckedKeys(res.checkedKeys)
						}
					})
				})
			})
			title.value = '分配数据权限'
		})
	}
	/** 提交按钮（数据权限） */
	function submitDataScope() {
		if (form.value.roleId !== undefined) {
			form.value.deptIds = getDeptAllCheckedKeys()
			dataScope(form.value).then((response) => {
				proxy.$modal.msgSuccess('修改成功')
				openDataScope.value = false
				getList()
			})
		}
	}
	/** 取消按钮（数据权限）*/
	function cancelDataScope() {
		openDataScope.value = false
		reset()
	}
</script>
<style lang="scss" scoped>
	.tree-border {
		width: 100%;
		height: vh(220);
		overflow-y: auto;
	}
</style>
