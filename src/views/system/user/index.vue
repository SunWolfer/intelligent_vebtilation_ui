<template>
	<div class="fullDom use_content">
		<!--部门数据-->
		<div class="fullDom">
			<div class="head-container">
				<el-input
					v-model="deptName"
					placeholder="请输入部门名称"
					clearable
					prefix-icon="Search"
					style="margin-bottom: 20px"
				/>
			</div>
			<div class="head-container">
				<el-tree
					:data="deptOptions"
					:props="{ label: 'label', children: 'children' }"
					:expand-on-click-node="false"
					:filter-node-method="filterNode"
					ref="deptTreeRef"
					highlight-current
					default-expand-all
					@node-click="handleNodeClick"
				/>
			</div>
		</div>
		<div class="table_page_default">
			<el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
				<el-form-item label="用户名称" prop="userName">
					<el-input
						v-model="queryParams.userName"
						placeholder="请输入用户名称"
						clearable
						@keyup.enter="handleQuery"
					/>
				</el-form-item>
				<el-form-item label="手机号码" prop="phonenumber">
					<el-input
						v-model="queryParams.phonenumber"
						placeholder="请输入手机号码"
						clearable
						@keyup.enter="handleQuery"
					/>
				</el-form-item>
				<el-form-item label="状态" prop="status">
					<el-select v-model="queryParams.status" placeholder="用户状态" clearable>
						<el-option
							v-for="dict in sys_normal_disable"
							:key="dict.value"
							:label="dict.label"
							:value="dict.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="创建时间">
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
					v-hasPermi="['system:user:add']"
					>新增</el-button
				>
				<el-button
					class="add-btn"
					plain
					icon="Edit"
					:disabled="single"
					@click="handleUpdate"
					v-hasPermi="['system:user:edit']"
					>修改</el-button
				>
				<el-button
					class="delete-btn"
					plain
					icon="Delete"
					:disabled="multiple"
					@click="handleDelete"
					v-hasPermi="['system:user:remove']"
					>删除</el-button
				>
				<el-button
					class="add-btn"
					plain
					icon="Upload"
					@click="handleImport"
					v-hasPermi="['system:user:import']"
					>导入</el-button
				>
				<el-button
					class="derive-btn"
					plain
					icon="Download"
					@click="handleExport"
					v-hasPermi="['system:user:export']"
					>导出</el-button
				>
			</div>

			<el-table :data="userList" @selection-change="handleSelectionChange" border height="100%">
				<el-table-column type="selection" width="50" align="center" />
				<el-table-column
					label="用户编号"
					:min-width="60"
					align="center"
					key="userId"
					prop="userId"
				/>
				<el-table-column
					label="用户名称"
					:min-width="100"
					align="center"
					key="userName"
					prop="userName"
					:show-overflow-tooltip="true"
				/>
				<el-table-column
					label="用户昵称"
					:min-width="100"
					align="center"
					key="nickName"
					prop="nickName"
					:show-overflow-tooltip="true"
				/>
				<el-table-column
					label="部门"
					:min-width="100"
					align="center"
					key="deptName"
					prop="dept.deptName"
					:show-overflow-tooltip="true"
				/>
				<el-table-column
					label="手机号码"
					:min-width="100"
					align="center"
					key="phonenumber"
					prop="phonenumber"
				/>
				<el-table-column label="状态" :min-width="100" align="center" key="status">
					<template #default="scope">
						<el-switch
							v-model="scope.row.status"
							active-value="0"
							inactive-value="1"
							@change="handleStatusChange(scope.row)"
						></el-switch>
					</template>
				</el-table-column>
				<el-table-column label="创建时间" align="center" prop="createTime" :min-width="120">
					<template #default="scope">
						<span>{{ parseTime(scope.row.createTime) }}</span>
					</template>
				</el-table-column>
				<el-table-column
					label="操作"
					align="center"
					:min-width="100"
					class-name="small-padding fixed-width"
				>
					<template #default="scope">
						<el-tooltip content="修改" placement="top" v-if="scope.row.userId !== 1">
							<el-button
								type="primary"
								link
								icon="Edit"
								@click="handleUpdate(scope.row)"
								v-hasPermi="['system:user:edit']"
							></el-button>
						</el-tooltip>
						<el-tooltip content="删除" placement="top" v-if="scope.row.userId !== 1">
							<el-button
								type="primary"
								link
								icon="Delete"
								@click="handleDelete(scope.row)"
								v-hasPermi="['system:user:remove']"
							></el-button>
						</el-tooltip>
						<el-tooltip content="重置密码" placement="top" v-if="scope.row.userId !== 1">
							<el-button
								type="primary"
								link
								icon="Key"
								@click="handleResetPwd(scope.row)"
								v-hasPermi="['system:user:resetPwd']"
							></el-button>
						</el-tooltip>
						<!--								<el-tooltip content="分配角色" placement="top" v-if="scope.row.userId !== 1">-->
						<!--									<el-button type="primary" link icon="CircleCheck" @click="handleAuthRole(scope.row)" v-hasPermi="['system:user:edit']"></el-button>-->
						<!--								</el-tooltip>-->
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
		</div>

		<!-- 添加或修改用户配置对话框 -->
		<dia-log
			:title="title"
			v-model="open"
			@submit="submitForm"
			:width="800"
			:height="520"
			has-bottom-btn
			@cancel="cancel"
		>
			<el-form :model="form" class="diaForm" :rules="rules" ref="userRef" label-width="auto">
				<el-row>
					<el-col :span="12">
						<el-form-item label="用户昵称" prop="nickName">
							<el-input
								v-model="form.nickName"
								placeholder="请输入用户昵称"
								maxlength="30"
								clearable
							/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="归属部门" prop="deptId">
							<el-tree-select
								style="width: 100%"
								:teleported="false"
								v-model="form.deptId"
								:data="deptOptions"
								:props="{ value: 'id', label: 'label', children: 'children' }"
								value-key="id"
								placeholder="请选择归属部门"
								check-strictly
							/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="手机号码" prop="phonenumber">
							<el-input v-model="form.phonenumber" placeholder="请输入手机号码" maxlength="11" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="邮箱" prop="email">
							<el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item v-if="form.userId === undefined" label="用户名称" prop="userName">
							<el-input v-model="form.userName" placeholder="请输入用户名称" maxlength="30" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item v-if="form.userId === undefined" label="用户密码" prop="password">
							<el-input
								v-model="form.password"
								placeholder="请输入用户密码"
								type="password"
								maxlength="20"
								show-password
							/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="用户性别">
							<el-select
								style="width: 100%"
								:teleported="false"
								v-model="form.sex"
								placeholder="请选择"
							>
								<el-option
									v-for="dict in sys_user_sex"
									:key="dict.value"
									:label="dict.label"
									:value="dict.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="状态">
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
				<el-row>
					<el-col :span="12">
						<el-form-item label="岗位">
							<el-select
								style="width: 100%"
								:teleported="false"
								v-model="form.postIds"
								placeholder="请选择"
								multiple
								collapse-tags
								collapse-tags-tooltip
							>
								<el-option
									v-for="item in postOptions"
									:key="item.postId"
									:label="item.postName"
									:value="item.postId"
									:disabled="item.status === 1"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="角色">
							<el-select
								style="width: 100%"
								:teleported="false"
								v-model="form.roleIds"
								placeholder="请选择"
								multiple
								collapse-tags
								collapse-tags-tooltip
							>
								<el-option
									v-for="item in roleOptions"
									:key="item.roleId"
									:label="item.roleName"
									:value="item.roleId"
									:disabled="item.status === 1"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="备注">
							<el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</dia-log>
		<!-- 用户导入对话框 -->
		<dia-log
			:title="upload.title"
			v-model="upload.open"
			:width="800"
			:height="500"
			has-bottom-btn
			@submit="submitFileForm"
		>
			<el-upload
				ref="uploadRef"
				:limit="1"
				accept=".xlsx, .xls"
				:headers="upload.headers"
				:action="upload.url + '?updateSupport=' + upload.updateSupport"
				:disabled="upload.isUploading"
				:on-progress="handleFileUploadProgress"
				:on-success="handleFileSuccess"
				:auto-upload="false"
				drag
			>
				<el-icon class="el-icon--upload"><upload-filled /></el-icon>
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				<template #tip>
					<div class="el-upload__tip text-center">
						<div class="el-upload__tip" style="color: #ffffff">
							<el-checkbox v-model="upload.updateSupport" />是否更新已经存在的用户数据
						</div>
						<span style="color: #ffffff">仅允许导入xls、xlsx格式文件。</span>
						<!--						<el-link type="primary" :underline="false" style="font-size: 12px; vertical-align: baseline" @click="importTemplate">下载模板</el-link>-->
					</div>
				</template>
			</el-upload>
		</dia-log>
		<!--    重置密码-->
		<dia-log
			title="提示"
			v-model="resetPassVisible"
			has-bottom-btn
			@submit="closeResetDia"
			:width="800"
			:height="500"
		>
			<el-form ref="resetFormRef" :model="resetForm" :rules="resetRules">
				<el-form-item :label="`请输入${chooseRow.userName}的新密码`" prop="password">
					<el-input
						v-model="resetForm.password"
						placeholder="请输入密码"
						clearable
						style="margin-bottom: 20px"
					/>
				</el-form-item>
			</el-form>
		</dia-log>
	</div>
</template>

<script setup name="User">
	import { getToken } from '@/utils/auth'
	import { oldDownload, parseTime } from '@/utils/ruoyi'
	import {
		addUser,
		changeUserStatus,
		delUser,
		deptTreeSelect,
		exportUser,
		getUser,
		listUser,
		resetUserPwd,
		updateUser,
	} from '@/api/system/user'
	import useDict from '@/hooks/useDict'
	import useList from '@/hooks/useList'

	const { proxy } = getCurrentInstance()
	const { sys_normal_disable, sys_user_sex } = useDict('sys_normal_disable', 'sys_user_sex')

	const {
		queryParams,
		dateRange,
		dataList: userList,
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
		apiFun: listUser,
		params: {
			pageNum: 1,
			pageSize: 10,
			userName: undefined,
			phonenumber: undefined,
			status: undefined,
			deptId: undefined,
		},
		deleteFun: delUser,
		deleteApi: {
			deleteMes: '用户编号为',
			deleteKey: 'userId',
		},
		exportFun: exportUser,
	})

	const open = ref(false)
	const showSearch = ref(true)
	const title = ref('')
	const deptName = ref('')
	const deptOptions = ref(undefined)
	const initPassword = ref(undefined)
	const postOptions = ref([])
	const roleOptions = ref([])
	/*** 用户导入参数 */
	const upload = reactive({
		// 是否显示弹出层（用户导入）
		open: false,
		// 弹出层标题（用户导入）
		title: '',
		// 是否禁用上传
		isUploading: false,
		// 是否更新已经存在的用户数据
		updateSupport: 0,
		// 设置上传的请求头部
		headers: { Authorization: 'Bearer ' + getToken() },
		// 上传的地址
		url: import.meta.env.VITE_APP_BASE_API + '/system/user/importData',
	})

	const data = reactive({
		form: {},
		rules: {
			userName: [
				{ required: true, message: '用户名称不能为空', trigger: 'blur' },
				{
					min: 2,
					max: 20,
					message: '用户名称长度必须介于 2 和 20 之间',
					trigger: 'blur',
				},
			],
			nickName: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
			password: [
				{ required: true, message: '用户密码不能为空', trigger: 'blur' },
				{
					min: 5,
					max: 20,
					message: '用户密码长度必须介于 5 和 20 之间',
					trigger: 'blur',
				},
			],
			email: [
				{
					type: 'email',
					message: '请输入正确的邮箱地址',
					trigger: ['blur', 'change'],
				},
			],
			phonenumber: [
				{
					pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
					message: '请输入正确的手机号码',
					trigger: 'blur',
				},
			],
		},
	})

	const { form, rules } = toRefs(data)

	/** 通过条件过滤节点  */
	const filterNode = (value, data) => {
		if (!value) return true
		return data.label.indexOf(value) !== -1
	}
	/** 根据名称筛选部门树 */
	watch(deptName, (val) => {
		proxy.$refs['deptTreeRef'].filter(val)
	})
	/** 查询部门下拉树结构 */
	function getDeptTree() {
		deptTreeSelect().then((response) => {
			deptOptions.value = response.data
		})
	}
	/** 节点单击事件 */
	function handleNodeClick(data) {
		queryParams.value.deptId = data.id
		handleQuery()
	}
	/** 用户状态修改  */
	function handleStatusChange(row) {
		let text = row.status === '0' ? '启用' : '停用'
		proxy.$modal
			.prompt({
				title: '系统提示',
				message: '确认要"' + text + '""' + row.userName + '"用户吗?',
			})
			.then(() => {
				changeUserStatus(row.userId, row.status).then(() => {
					proxy.$modal.msgSuccess(text + '成功')
				})
			})
			.catch(() => {
				row.status = row.status === '0' ? '1' : '0'
			})
	}
	/** 重置密码按钮操作 */
	const resetPassVisible = ref(false)
	const resetForm = ref({
		password: '',
	})
	const resetRules = {
		password: [
			{ required: true, message: '密码不能为空', trigger: 'blur' },
			{
				min: 5,
				max: 20,
				message: '用户密码长度必须介于 5 和 20 之间',
				trigger: 'blur',
			},
		],
	}
	const chooseRow = ref('')
	function handleResetPwd(row) {
		chooseRow.value = row
		resetForm.value.password = ''
		resetPassVisible.value = true
	}
	function closeResetDia() {
		proxy.$refs['resetFormRef'].validate((valid) => {
			if (valid) {
				resetUserPwd(chooseRow.value.userId, resetForm.value.password).then((response) => {
					proxy.$modal.msgSuccess('修改成功，新密码是：' + resetForm.value.password)
					resetPassVisible.value = false
				})
			}
		})
	}
	/** 导入按钮操作 */
	function handleImport() {
		upload.title = '用户导入'
		upload.open = true
	}
	/**文件上传中处理 */
	const handleFileUploadProgress = (event, file, fileList) => {
		upload.isUploading = true
	}
	/** 文件上传成功处理 */
	const handleFileSuccess = (response, file, fileList) => {
		upload.open = false
		upload.isUploading = false
		proxy.$refs['uploadRef'].handleRemove(file)
		proxy.$alert(
			"<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" +
				response.msg +
				'</div>',
			'导入结果',
			{
				dangerouslyUseHTMLString: true,
			},
		)
		getList()
	}
	/** 提交上传文件 */
	function submitFileForm() {
		proxy.$refs['uploadRef'].submit()
	}
	const userRef = ref(null)
	/** 重置操作表单 */
	function reset() {
		form.value = {
			userId: undefined,
			deptId: undefined,
			userName: undefined,
			nickName: undefined,
			password: undefined,
			phonenumber: undefined,
			email: undefined,
			sex: undefined,
			status: '0',
			remark: undefined,
			postIds: [],
			roleIds: [],
		}
		userRef.value?.resetFields()
	}
	/** 取消按钮 */
	function cancel() {
		open.value = false
		reset()
	}
	/** 新增按钮操作 */
	function handleAdd() {
		reset()
		getUser().then((response) => {
			postOptions.value = response.posts
			roleOptions.value = response.roles
			open.value = true
			title.value = '添加用户'
			form.value.password = initPassword.value
		})
	}
	/** 修改按钮操作 */
	function handleUpdate(row) {
		reset()
		const userId = row.userId || ids.value
		getUser(userId).then((response) => {
			form.value = response.data
			form.value.password = ''
			form.value.postIds = response.postIds
			form.value.roleIds = response.roleIds
			postOptions.value = response.posts
			roleOptions.value = response.roles
			open.value = true
			title.value = '修改用户'
		})
	}
	/** 提交按钮 */
	function submitForm() {
		proxy.$refs['userRef'].validate((valid) => {
			if (valid) {
				if (form.value.userId !== undefined) {
					updateUser(form.value).then((response) => {
						proxy.$modal.msgSuccess('修改成功')
						open.value = false
						getList()
					})
				} else {
					addUser(form.value).then((response) => {
						proxy.$modal.msgSuccess('新增成功')
						open.value = false
						getList()
					})
				}
			}
		})
	}

	getDeptTree()
</script>
<style lang="scss" scoped>
	.use_content {
		padding: 0 vw(60) vh(20) vw(60);
		display: grid;
		grid-template-columns: vw(300) 1fr;
	}
	.table_page_default {
		padding: 0 0 0 vw(20);
	}
	.head-container {
		:deep(.el-input) {
			padding: 1px;
			box-shadow: 0 0 0 1px rgba(14, 252, 255, 0.77) inset;
			height: vh(32);
			font-size: vw(14);
			.el-input__wrapper {
				padding: 1px 8px;
				background: rgba(26, 47, 86, 0.6);
				box-shadow: none;
				&:hover {
					box-shadow: 0 0 0 1px rgba(14, 252, 255, 0.77) inset;
				}
				.el-input__inner {
					color: #ffffff;
				}
			}
			.el-input__icon {
				color: rgba(14, 252, 255, 0.77);
			}
			.el-input-group__append {
				background: rgba(26, 47, 86, 0.6);
				box-shadow: none;
			}
		}
		:deep(.el-tree) {
			background: none;
			color: #ffffff;
			--el-color-primary-light-9: #36e5ff;
			--el-tree-node-hover-bg-color: #36e5ff;
			.el-tree-node.is-current > .el-tree-node__content {
				color: #1f2d3d;
			}
			.el-tree-node__content:hover {
				color: #1f2d3d;
			}
		}
	}
</style>
