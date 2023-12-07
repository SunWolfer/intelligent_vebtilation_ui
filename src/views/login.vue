<template>
	<div class="login">
		<div class="login-form-content">
			<div class="login-form-content_l1">欢迎登录</div>
			<el-input
				prefix-icon="User"
				v-model="loginForm.username"
				type="text"
				link
				autocomplete="off"
				placeholder="账号"
			>
			</el-input>
			<el-input
				prefix-icon="Lock"
				v-model="loginForm.password"
				type="password"
				autocomplete="new-password"
				placeholder="密码"
				@keyup.enter="handleLogin"
			/>
			<div class="login-form-content_l4" @click="handleLogin">登录</div>
		</div>
	</div>
</template>

<script setup>
	import { useUserStore } from '@/store/modules/user'

	const userStore = useUserStore()
	const router = useRouter()

	const loginForm = ref({
		username: 'admin',
		password: '123456',
		code: '',
		uuid: '',
	})
	const loading = ref(false)

	function handleLogin() {
		// 调用action的登录方法
		userStore
			.login(loginForm.value)
			.then(() => {
				router.push({ path: '/' })
			})
			.catch(() => {
				loading.value = false
			})
	}
</script>

<style lang="scss" scoped>
	.login {
		position: relative;
		width: 100%;
		height: 100%;
		background-image: url('@/assets/images/login/login_bg.gif');
		background-size: 100% 100%;
	}
	.login-form-content {
		position: absolute;
		top: vh(200);
		right: vw(160);
		width: vw(671);
		height: vh(693);
		background-image: url('@/assets/images/login/login_form.png');
		background-size: 100% 100%;
		padding: vh(173) vw(97) vh(190) vw(110);
		display: grid;
		grid-template-rows: vh(34) vh(50) vh(50) 1fr;
		grid-row-gap: vh(32);
		justify-content: center;
		align-items: center;
		&:before {
			justify-self: center;
			position: absolute;
			content: '';
			width: vw(463);
			height: vh(459);
			background-image: url('@/assets/images/login/login_border.svg');
			background-size: 100% 100%;
			pointer-events: none;
		}
	}
	.login-form-content_l1 {
		justify-self: center;

		font-size: vw(36);
		font-family:
			Adobe Heiti Std,
			serif;
		font-weight: normal;
		color: #ffffff;
	}
	:deep(.el-input) {
		width: vw(390);
		height: vh(50);
		box-shadow: none;
		.el-input__wrapper {
			background-color: rgba(0, 137, 255, 0.3);
		}
		.el-input__inner {
			--el-input-inner-height: vh(50);
		}
		.el-input__prefix {
			color: rgba(74, 171, 254, 1);
			font-size: vw(24);
		}
		&:hover {
			box-shadow: none;
		}
	}

	.login-form-content_l4 {
		justify-self: center;
		align-self: end;
		width: vw(254);
		height: vh(50);
		background-image: url('@/assets/images/login/form_btn.gif');
		background-size: 100% 100%;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #ffffff;
	}
</style>
