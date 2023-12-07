<script setup>
	import { useUserStore } from '@/store/modules/user'
	import { useRouter } from 'vue-router'

	const userStore = useUserStore()
	const router = useRouter()

	const loginForm = ref({
		username: window.SITE_CONFIG.noValidUser,
		password: window.SITE_CONFIG.noValidPass,
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
	handleLogin()
</script>

<template></template>

<style scoped lang="scss"></style>
