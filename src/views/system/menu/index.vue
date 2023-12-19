<template>
	<div class="table_page_default">
		<el-form :model="queryParams" ref="queryRef" :inline="true">
			<el-form-item label="菜单名称" prop="menuName">
				<el-input
					v-model="queryParams.menuName"
					placeholder="请输入菜单名称"
					clearable
					@keyup.enter="handleQuery"
				/>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-select v-model="queryParams.status" placeholder="菜单状态" clearable>
					<el-option
						v-for="dict in sys_normal_disable"
						:key="dict.value"
						:label="dict.label"
						:value="dict.value"
					/>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" class="ordinary-btn" icon="Search" @click="handleQuery"
					>搜索</el-button
				>
				<el-button icon="Refresh" class="reset-btn" @click="resetQuery">重置</el-button>
			</el-form-item>
		</el-form>
		<div class="table_page_btn_line">
			<el-button
				type="primary"
				class="add-btn"
				plain
				icon="Plus"
				@click="handleAdd"
				v-hasPermi="['system:menu:add']"
				>新增</el-button
			>
			<el-button type="info" class="ordinary-btn" plain icon="Sort" @click="toggleExpandAll"
				>展开/折叠</el-button
			>
		</div>
		<el-table
			v-if="refreshTable"
			:data="menuList"
			border
			row-key="menuId"
			style="height: 100%"
			:default-expand-all="isExpandAll"
			:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
		>
			<el-table-column
				prop="menuName"
				label="菜单名称"
				:show-overflow-tooltip="true"
				:min-width="160"
				align="left"
			/>
			<el-table-column prop="icon" label="图标" align="center" width="100">
				<template #default="scope">
					<svg-icon :icon-class="scope.row.icon" />
				</template>
			</el-table-column>
			<el-table-column prop="orderNum" label="排序" align="center" width="60" />
			<el-table-column prop="perms" label="权限标识" align="center" :show-overflow-tooltip="true" />
			<el-table-column
				prop="component"
				label="组件路径"
				align="center"
				:show-overflow-tooltip="true"
			/>
			<el-table-column prop="status" label="状态" align="center" width="80">
				<template #default="scope">
					<dict-tag :options="sys_normal_disable" :value="scope.row.status" />
				</template>
			</el-table-column>
			<el-table-column label="创建时间" align="center" prop="createTime">
				<template #default="scope">
					<span>{{ parseTime(scope.row.createTime) }}</span>
				</template>
			</el-table-column>
			<el-table-column
				label="操作"
				align="center"
				:min-width="200"
				class-name="small-padding fixed-width"
			>
				<template #default="scope">
					<el-button
						link
						icon="Edit"
						@click="handleUpdate(scope.row)"
						v-hasPermi="['system:menu:edit']"
						>修改</el-button
					>
					<el-button link icon="Plus" @click="handleAdd(scope.row)" v-hasPermi="['system:menu:add']"
						>新增</el-button
					>
					<el-button
						link
						icon="Delete"
						@click="handleDelete(scope.row)"
						v-hasPermi="['system:menu:remove']"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
		<add-or-update
			v-if="open"
			:title="title"
			v-model="open"
			:choose-row="chooseRow"
			:is-add="isAdd"
			@refresh-list="getList"
		/>
	</div>
</template>

<script setup>
	import { delMenu, listMenu } from '@/api/system/menu'
	import AddOrUpdate from './addOrUpdate'
	import useDict from '@/hooks/useDict'
	import useCurrentInstance from '@/hooks/useCurrentInstance'
	import { parseTime } from '@/utils/ruoyi'

	const { proxy } = useCurrentInstance()
	const { sys_show_hide, sys_normal_disable } = useDict('sys_show_hide', 'sys_normal_disable')

	const menuList = ref([])
	const open = ref(false)
	const loading = ref(true)
	const title = ref('')
	const isExpandAll = ref(false)
	const refreshTable = ref(true)

	const data = reactive({
		queryParams: {
			menuName: undefined,
			visible: undefined,
		},
	})

	const { queryParams } = toRefs(data)

	/** 查询菜单列表 */
	function getList() {
		loading.value = true
		listMenu(queryParams.value).then((response) => {
			menuList.value = proxy.handleTree(response.data, 'menuId')
			loading.value = false
		})
	}
	/** 搜索按钮操作 */
	function handleQuery() {
		getList()
	}
	const queryRef = ref(null)
	/** 重置按钮操作 */
	function resetQuery() {
		queryRef.value?.resetFields()
		handleQuery()
	}

	const chooseRow = ref({})
	const isAdd = ref(false)

	/** 新增按钮操作 */
	function handleAdd(row) {
		chooseRow.value = row
		isAdd.value = true
		title.value = '添加菜单'
		open.value = true
	}
	/** 展开/折叠操作 */
	function toggleExpandAll() {
		refreshTable.value = false
		isExpandAll.value = !isExpandAll.value
		nextTick(() => {
			refreshTable.value = true
		})
	}
	/** 修改按钮操作 */
	async function handleUpdate(row) {
		chooseRow.value = row
		isAdd.value = false
		title.value = '修改菜单'
		open.value = true
	}

	/** 删除按钮操作 */
	function handleDelete(row) {
		proxy.$modal
			.prompt({
				message: `是否确认删除名称为${row.menuName}的数据项？`,
			})
			.then(() => {
				delMenu(row.menuId).then(() => {
					getList()
					proxy.$modal.msgSuccess('删除成功')
				})
			})
			.catch(() => {})
	}

	getList()
</script>

<style lang="scss" scoped></style>
