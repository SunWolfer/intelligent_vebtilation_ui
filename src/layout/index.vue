<template>
	<div class="app-wrapper forbiddenText app-home">
		<!--系统顶部栏-->
		<sidebar />
		<!--    右上角登录人员信息-->
		<navbar />
		<!--  面包屑  -->
		<breadcrumb class="breadcrumb-container" v-show="!showBreadcrumb" />
		<!--内容-->
		<div class="sys-content">
			<app-main />
		</div>
	</div>
</template>

<script setup lang="ts">
	import Sidebar from './components/Sidebar/index.vue'
	import { AppMain, Navbar } from './components'
	import useSettingsStore from '@/store/modules/settings'

	const settingsStore = useSettingsStore()

	const route = useRoute()
	const showBreadcrumb = computed(() => {
		return route.path === '/index'
	})

	watch(
		() => route.path,
		() => {
			settingsStore.updateNavigate(false)
		},
	)
</script>

<style lang="scss" scoped>
	@import '@/assets/styles/mixin.scss';

	.forbiddenText {
		-ms-user-select: none;
		-khtml-user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
	}

	.app-wrapper {
		@include clearfix;
		position: relative;
		height: 100%;
		width: 100%;
		overflow: hidden;
		background-size: 100% 100%;
	}

	.app-home {
		background-image: url('@/assets/images/main_bg.png');
	}

	.breadcrumb-container {
		position: absolute;
		top: vh(100);
		padding: 0 vw(40);
		z-index: 1;

		:deep(.el-breadcrumb__inner) {
			color: #97a8be;

			a {
				color: #97a8be;
			}
		}
	}
	//  系统内容
	.sys-content {
		position: absolute;
		width: 100%;
		height: calc(100vh - #{vh(91)});
		top: vh(91);
	}
</style>
