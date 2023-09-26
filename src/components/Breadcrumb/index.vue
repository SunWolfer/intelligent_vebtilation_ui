<script setup lang="ts">
	import useCurrentInstance from '@/hooks/useCurrentInstance'
	import { RouteLocationMatched } from 'vue-router'

	const { proxy } = useCurrentInstance()
	const route = useRoute()
	const router = useRouter()
	const levelList = ref<RouteLocationMatched[]>([])

	function getBreadcrumb() {
		// only show routes with meta.title
		let matched: RouteLocationMatched[] = route.matched.filter(
			(item) => item.meta && item.meta.title,
		)
		const first = matched[0]
		// 判断是否为首页
		if (!isDashboard(first)) {
			let homeMatched: any[] = [{ path: '/index', meta: { title: '首页', name: 'Index' } }]
			matched = homeMatched.concat(matched)
		}

		levelList.value = matched.filter(
			(item) => item.meta && item.meta.title && item.meta.breadcrumb !== false,
		)
	}
	function isDashboard(route: any) {
		const name = route && route.name
		if (!name) {
			return false
		}
		return name.trim() === 'Index'
	}
	function handleLink(item: any) {
		const { redirect, path } = item
		if (redirect) {
			router.push(redirect)
			return
		}
		router.push(path)
		//关闭所有标签
		proxy.$tab.closeAllPage()
	}

	watchEffect(() => {
		// if you go to the redirect page, do not update the breadcrumbs
		if (route.path.startsWith('/redirect/')) {
			return
		}
		getBreadcrumb()
	})
	getBreadcrumb()
</script>
<template>
	<el-breadcrumb class="app-breadcrumb" separator=">">
		<transition-group name="breadcrumb">
			<el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
				<span
					v-if="item.redirect === 'noRedirect' || index === levelList.length - 1"
					class="no-redirect"
					>{{ item.meta.title }}</span
				>
				<a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>

<style lang="scss" scoped>
	@mixin textColor {
		font-family:
			Adobe Heiti Std,
			serif;
		line-height: vh(30);
		font-size: vw(14);
		font-weight: normal;
		color: #709de1;
	}

	.app-breadcrumb .el-breadcrumb {
		display: inline-block;
		--el-text-color-placeholder: #709de1;

		.no-redirect {
			cursor: text;
		}

		span {
			@include textColor;
		}

		:deep(.el-breadcrumb__inner) {
			a {
				@include textColor;
			}
		}
	}
</style>
