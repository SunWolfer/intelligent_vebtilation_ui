<template>
	<div class="app-wrapper forbiddenText" :class="'app_home_' + homeBgIndex">
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
		<!--    <div class="app_home_change">-->
		<!--      <div v-for="i in 4" class="app_home_icon" @click="changeBg(i)">{{i}}</div>-->
		<!--    </div>-->
	</div>
</template>

<script setup lang="ts">
	import useHomeMenu from '@/hooks/useHomeMenu'
	import { useUpdateMainData } from '@/hooks/useUpdateMainData'
	import useSettingsStore from '@/store/modules/settings'
	import { AppMain, Navbar } from './components'
	import Sidebar from './components/Sidebar/index.vue'

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
	const { loadPubData } = useUpdateMainData()
	loadPubData()

	//   当前背景
	const homeBgIndex = ref(1)
	const changeBg = (index: number) => {
		homeBgIndex.value = index
	}
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
			color: #ffffff;

			a {
				color: #ffffff;
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
	//  背景切换
	.app_home_change {
		position: fixed;
		width: 100%;
		height: vw(40);
		bottom: vh(5);
		color: #ffffff;
		display: grid;
		justify-content: center;
		grid-template-columns: repeat(4, vw(40));
		grid-column-gap: vw(5);
		grid-template-rows: 1fr;
		div {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #0dde79;
			cursor: pointer;
		}
	}
	.app_home {
		background-image: url('@/assets/images/main_bg.png');
	}
	@for $i from 1 through 4 {
		.app_home_#{$i} {
			background-image: url('@/assets/images/main_bg_#{$i}.png');
			background-size: 100% 100%;
		}
	}
</style>
