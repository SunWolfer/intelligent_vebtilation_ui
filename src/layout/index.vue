<template>
	<div class="app-wrapper forbiddenText app-home">
		<!--系统顶部栏-->
		<sidebar v-show="!roam" />
		<!--    右上角登录人员信息-->
		<navbar />
		<!--  面包屑  -->
		<breadcrumb class="breadcrumb-container" v-show="!showBreadcrumb" />

		<!--内容-->
		<div :class="showBreadcrumb ? 'sys_content' : 'sys_content_default'" @contextmenu.prevent>
			<app-main />
		</div>
	</div>
</template>

<script setup lang="ts">
	import {useUpdateMainData} from "@/hooks/useUpdateMainData";
  import Sidebar from './components/Sidebar/index.vue'
	import { AppMain, Navbar } from './components'
	import useSettingsStore from '@/store/modules/settings'
	import useHomeMenu from '@/hooks/useHomeMenu'

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
	const { roam } = useHomeMenu()
	const {loadPubData} = useUpdateMainData()
  loadPubData()
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
		padding: 0 vw(80);
		z-index: 0;

		:deep(.el-breadcrumb__inner) {
			color: #97a8be;

			a {
				color: #97a8be;
			}
		}
	}
	//  系统内容(无面包屑)
	.sys_content {
		position: absolute;
		width: 100%;
		height: calc(100vh - #{vh(91)});
		top: vh(91);
	}
	//  系统内容(有面包屑)
	.sys_content_default {
		position: absolute;
		width: 100%;
		height: calc(100vh - #{vh(121)});
		top: vh(121);
	}
</style>
