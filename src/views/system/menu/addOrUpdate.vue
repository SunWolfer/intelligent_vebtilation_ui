<script setup>
	import { addMenu, getMenu, listMenu, updateMenu } from '@/api/system/menu'
	import useDict from '@/hooks/useDict'
	import useCurrentInstance from '@/hooks/useCurrentInstance'

	const { proxy } = useCurrentInstance()
	const { sys_show_hide, sys_normal_disable } = useDict('sys_show_hide', 'sys_normal_disable')
	const props = defineProps({
		title: {
			type: String,
			default: '',
		},
		modelValue: {
			type: Boolean,
			default: false,
		},
		chooseRow: {
			type: Object,
			default: {},
		},
		isAdd: {
			type: Boolean,
			default: false,
		},
	})
	const emits = defineEmits(['update:modelValue', 'refreshList'])
	const showDiaLog = computed({
		get() {
			return props.modelValue
		},
		set() {
			emits('update:modelValue', false)
		},
	})
	onMounted(() => {
		if (showDiaLog.value) {
			if (props.isAdd) {
				handleAdd(props.chooseRow)
			} else {
				handleUpdate(props.chooseRow)
			}
		}
	})

	const data = reactive({
		form: {},
		rules: {
			menuName: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }],
			orderNum: [{ required: true, message: '菜单顺序不能为空', trigger: 'blur' }],
			path: [{ required: true, message: '路由地址不能为空', trigger: 'blur' }],
		},
	})

	const { form, rules } = toRefs(data)

	function closeDia() {
		showDiaLog.value = false
		reset()
	}
	const menuRef = ref(null)
	/** 表单重置 */
	function reset() {
		form.value = {
			menuId: undefined,
			parentId: 0,
			menuName: undefined,
			icon: undefined,
			menuType: 'M',
			orderNum: undefined,
			isFrame: '1',
			isCache: 0,
			visible: '0',
			status: '0',
		}
		menuRef.value?.resetFields()
	}

	async function handleAdd(row) {
		reset()
		await getTreeselect()
		if (row != null && row.menuId) {
			form.value.parentId = row.menuId
		} else {
			form.value.parentId = 0
		}
	}

	const menuOptions = ref([])
	/** 查询菜单下拉树结构 */
	function getTreeselect() {
		menuOptions.value = []
		listMenu().then((response) => {
			const menu = { menuId: 0, menuName: '主类目', children: [] }
			menu.children = proxy.handleTree(response.data, 'menuId')
			menuOptions.value.push(menu)
		})
	}

	/** 修改按钮操作 */
	async function handleUpdate(row) {
		reset()
		await getTreeselect()
		getMenu(row.menuId).then((response) => {
			form.value = response.data
		})
	}

	const showChooseIcon = ref(false)
	/** 选择图标 */
	function selected(name) {
		form.value.icon = name
		showChooseIcon.value = false
	}

	/** 提交按钮 */
	function submitForm() {
		menuRef.value.validate((valid) => {
			if (valid) {
				if (form.value.menuId !== undefined) {
					updateMenu(form.value).then((response) => {
						proxy.$modal.msgSuccess('修改成功')
						showDiaLog.value = false
						emits('refreshList')
					})
				} else {
					addMenu(form.value).then((response) => {
						proxy.$modal.msgSuccess('新增成功')
						showDiaLog.value = false
						emits('refreshList')
					})
				}
			}
		})
	}
</script>

<template>
	<dia-log
		:title="title"
		v-model="showDiaLog"
		:width="800"
		:height="550"
		has-bottom-btn
		@submit="submitForm"
		@cancel="closeDia"
	>
		<el-form ref="menuRef" :model="form" :rules="rules" label-width="auto">
			<el-row>
				<el-col :span="24">
					<el-form-item label="上级菜单">
						<el-tree-select
							:teleported="false"
							v-model="form.parentId"
							default-expand-all
							:data="menuOptions"
							:props="{
								value: 'menuId',
								label: 'menuName',
								children: 'children',
							}"
							node-key="menuId"
							placeholder="选择上级菜单"
							check-strictly
						/>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="菜单类型" prop="menuType">
						<el-radio-group v-model="form.menuType">
							<el-radio label="M">目录</el-radio>
							<el-radio label="C">菜单</el-radio>
							<el-radio label="F">按钮</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="24" v-if="form.menuType !== 'F'">
					<el-form-item label="菜单图标" prop="icon">
						<el-popover
							:teleported="false"
							placement="bottom-start"
							:width="540"
							v-model:visible="showChooseIcon"
							trigger="click"
						>
							<template #reference>
								<el-input v-model="form.icon" placeholder="点击选择图标" readonly>
									<template #prefix>
										<svg-icon
											v-if="form.icon"
											:icon-class="form.icon"
											class="el-input__icon"
											style="height: 32px; width: 16px"
										/>
										<el-icon v-else style="height: 32px; width: 16px"><search /></el-icon>
									</template>
								</el-input>
							</template>
							<icon-select ref="iconSelectRef" @selected="selected" />
						</el-popover>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="菜单名称" prop="menuName">
						<el-input v-model="form.menuName" placeholder="请输入菜单名称" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="显示排序" prop="orderNum">
						<!--						<el-input v-model="form.orderNum" placeholder="请输入排序序号" />-->
						<el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType !== 'F'">
					<el-form-item prop="path">
						<template #label>
							<span>
								<el-tooltip
									content="访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头"
									placement="top"
								>
									<el-icon><question-filled /></el-icon>
								</el-tooltip>
								路由地址
							</span>
						</template>
						<el-input v-model="form.path" placeholder="请输入路由地址" />
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType === 'C'">
					<el-form-item prop="component">
						<template #label>
							<span>
								<el-tooltip
									content="访问的组件路径，如：`system/user/index`，默认在`views`目录下"
									placement="top"
								>
									<el-icon><question-filled /></el-icon>
								</el-tooltip>
								组件路径
							</span>
						</template>
						<el-input v-model="form.component" placeholder="请输入组件路径" />
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType !== 'M'">
					<el-form-item>
						<el-input v-model="form.perms" placeholder="请输入权限标识" maxlength="100" />
						<template #label>
							<span>
								<el-tooltip
									content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)"
									placement="top"
								>
									<el-icon><question-filled /></el-icon>
								</el-tooltip>
								权限字符
							</span>
						</template>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType === 'C'">
					<el-form-item>
						<el-input v-model="form.query" placeholder="请输入路由参数" maxlength="255" />
						<template #label>
							<span>
								<el-tooltip
									content='访问路由的默认传递参数，如：`{"id": 1, "name": "ry"}`'
									placement="top"
								>
									<el-icon><question-filled /></el-icon>
								</el-tooltip>
								路由参数
							</span>
						</template>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType === 'C'">
					<el-form-item>
						<template #label>
							<span>
								<el-tooltip
									content="选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致"
									placement="top"
								>
									<el-icon><question-filled /></el-icon>
								</el-tooltip>
								是否缓存
							</span>
						</template>
						<el-radio-group v-model="form.isCache">
							<el-radio :label="1">缓存</el-radio>
							<el-radio :label="0">不缓存</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType !== 'F'">
					<el-form-item>
						<template #label>
							<span>
								<el-tooltip
									content="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问"
									placement="top"
								>
									<el-icon><question-filled /></el-icon>
								</el-tooltip>
								显示状态
							</span>
						</template>
						<el-radio-group v-model="form.visible">
							<el-radio v-for="dict in sys_show_hide" :key="dict.value" :label="dict.value">{{
								dict.label
							}}</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType !== 'F'">
					<el-form-item>
						<template #label>
							<span>
								<el-tooltip
									content="选择停用则路由将不会出现在侧边栏，也不能被访问"
									placement="top"
								>
									<el-icon><question-filled /></el-icon>
								</el-tooltip>
								菜单状态
							</span>
						</template>
						<el-radio-group v-model="form.status">
							<el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{
								dict.label
							}}</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</dia-log>
</template>

<style lang="scss" scoped>
	.el-form {
		.el-form-item--default {
			margin-bottom: vh(10);
			.el-radio {
				color: #ffffff;
			}
		}
	}
	.dialog-footer {
		text-align: center;
		position: absolute;
		width: 100%;
		bottom: 0;
	}
</style>
