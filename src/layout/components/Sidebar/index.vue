<script setup lang="ts">
	import { layout } from '@/api/request/layout'
	import useInterceptList from '@/hooks/useInterceptList'
	import SecondaryMenu from '@/layout/components/Sidebar/secondaryMenu.vue'
	import AppLink from './Link.vue'
	//标题
	const sysTitle = window.SITE_CONFIG.APP_TITLE
	const {
		leftSidebarRouters,
		rightSidebarRouters,
		onlyOneChild,
		hasOneShowingChild,
		resolvePath,
		getMenuChoose,
		clickTheFirstLevelMenu,
		showSecondLevelMenu,
		secondLevelMenu,
		selectedSecondaryMenu,
		chooseBasePath,
		clickPosition,
	} = layout()

	const {
		inShowList: rightRoutersList,
		toLast,
		showLast,
		toNext,
		showNext,
	} = useInterceptList(rightSidebarRouters, 4)
</script>
<template>
	<div>
		<div class="sys_top">
			<div class="sys_top_line1"><div class="d_line"></div></div>
			<div class="sys_top_line2"><div class="d_line"></div></div>
			<div class="sys_top_left_img"></div>
			<div class="sys_top_right_img"></div>
			<!--    左侧导航栏-->
			<div class="sys_top_left_navigate">
				<template v-for="item in leftSidebarRouters" :key="item.name">
					<template v-if="!item.alwaysShow && hasOneShowingChild(item) && !onlyOneChild?.children"
						><app-link v-if="onlyOneChild" :to="resolvePath(item.path, onlyOneChild.path)">
							<div class="navigate_home"></div> </app-link
					></template>
					<template v-else>
						<div
							:class="getMenuChoose(item) ? 'navigate_left_bg_active' : 'navigate_left_bg'"
							@click="clickTheFirstLevelMenu(item, $event)"
						>
							{{ item.meta?.title }}
						</div>
					</template>
				</template>
				<div></div>
			</div>
			<!--   标题-->
			<div class="sys_title" :content="sysTitle">
				<span>{{ sysTitle }}</span>
			</div>
			<div class="sys_top_right_navigate">
				<template v-for="item in rightRoutersList" :key="item.name">
					<div
						:class="getMenuChoose(item) ? 'navigate_left_bg_active' : 'navigate_left_bg'"
						@click="clickTheFirstLevelMenu(item, $event)"
					>
						{{ item.meta?.title }}
					</div>
				</template>
				<div class="sys_top_right_navigate_icon">
					<div v-show="showLast" class="sys_top_right_navigate_icon_left" @click="toLast"></div>
					<div v-show="showNext" class="sys_top_right_navigate_icon_right" @click="toNext"></div>
				</div>
			</div>
		</div>
		<secondary-menu
			v-if="showSecondLevelMenu"
			v-model:show-menu="showSecondLevelMenu"
			:second-level-menu="secondLevelMenu"
			:selected-secondary-menu="selectedSecondaryMenu"
			:choose-base-path="chooseBasePath"
			:mouse-position="clickPosition"
		/>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/assets/styles/layout/index';
</style>
