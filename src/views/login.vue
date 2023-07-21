<template>
	<div class="login">
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form-content">
      <el-form-item prop="username">
        <el-input
          prefix-icon="User"
          v-model="loginForm.username"
          type="primary"
          link
          auto-complete="off"
          placeholder="账号"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          prefix-icon="Lock"
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter="handleLogin"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input
          prefix-icon="Lock"
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          @keyup.enter="handleLogin"
        >
          <template #append
          ><div class="login-code">
            <img
              :src="codeUrl"
              @click="getCode"
              class="login-code-img"
            /></div
          ></template>
        </el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          type="primary"
          class="login-Btn"
          @click.prevent="handleLogin"
        >
          <span>{{ !loading ? '登录' : '登录中...' }}</span>
        </el-button>
      </el-form-item>
    </el-form>
	</div>
</template>

<script setup>
	import useUserStore from '@/store/modules/user'
  import {getCodeImg} from "@/api/login";

	const userStore = useUserStore()
	const router = useRouter()

	const title = import.meta.env.VITE_APP_TITLE

	const loginForm = ref({
		username: 'admin',
		password: '123456',
		code: '',
		uuid: '',
	})
	const loginRules = {
		username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
		password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
	}

	const loading = ref(false)

	const loginRef = ref(null)
	function handleLogin() {
		loginRef.value?.validate((valid) => {
			if (valid) {
				loading.value = true
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
		})
	}
  const codeUrl = ref('')
  // 验证码开关
  const captchaEnabled = ref(true)
  function getCode() {
    getCodeImg().then((res) => {
      captchaEnabled.value =
        res.captchaEnabled === undefined ? true : res.captchaEnabled
      if (captchaEnabled.value) {
        codeUrl.value = 'data:image/gif;base64,' + res?.img
        loginForm.value.uuid = res?.uuid
      }
    })
  }
  getCode()
</script>

<style lang="scss" scoped>
</style>
