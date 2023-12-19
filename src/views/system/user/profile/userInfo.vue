<template>
	<el-form
		ref="userRef"
		:model="uUser"
		:rules="rules"
		label-width="100px"
		label-position="left"
		class="userInfo-form"
	>
		<el-form-item label="用户昵称" prop="nickName">
			<el-input v-model="uUser.nickName" maxlength="30" />
		</el-form-item>
		<el-form-item label="手机号码" prop="phonenumber">
			<el-input v-model="uUser.phonenumber" maxlength="11" />
		</el-form-item>
		<el-form-item label="邮箱" prop="email">
			<el-input v-model="uUser.email" maxlength="50" />
		</el-form-item>
		<el-form-item label="性别" prop="sex">
			<el-radio-group v-model="uUser.sex">
				<el-radio label="0">男</el-radio>
				<el-radio label="1">女</el-radio>
			</el-radio-group>
		</el-form-item>
		<div class="subBtn">
			<el-button class="ordinary-btn" type="primary" @click="submit">保存</el-button>
			<el-button class="close-btn" type="danger" @click="close">关闭</el-button>
		</div>
	</el-form>
</template>

<script setup>
	import { updateUserProfile } from '@/api/system/user'
	import { useVModel } from '@vueuse/core'

	const props = defineProps({
		user: {
			type: Object,
		},
	})
	const emits = defineEmits(['update:user'])
	const uUser = useVModel(props, 'user', emits)

	const { proxy } = getCurrentInstance()

	const rules = ref({
		nickName: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
		email: [
			{ required: true, message: '邮箱地址不能为空', trigger: 'blur' },
			{
				type: 'email',
				message: '请输入正确的邮箱地址',
				trigger: ['blur', 'change'],
			},
		],
		phonenumber: [
			{ required: true, message: '手机号码不能为空', trigger: 'blur' },
			{
				pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
				message: '请输入正确的手机号码',
				trigger: 'blur',
			},
		],
		sex: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
	})

	/** 提交按钮 */
	function submit() {
		proxy.$refs.userRef.validate((valid) => {
			if (valid) {
				updateUserProfile(uUser.value).then((response) => {
					proxy.$modal.msgSuccess('修改成功')
				})
			}
		})
	}

	const router = useRouter()
	/** 关闭按钮 */
	function close() {
		proxy.$tab.closePage(router.currentRoute.value)
		router.go(-1)
	}
</script>
<style lang="scss" scoped>
	@import '@/assets/styles/user/profile.scss';
</style>
