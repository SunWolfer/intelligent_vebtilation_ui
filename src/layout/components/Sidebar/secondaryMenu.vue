<!--二级菜单-->
<script setup lang="ts">
	import { layout } from '@/api/request/layout'
	import AppLink from './Link.vue'
	import { IRouteRecordRaw } from '@/router'
	import { onClickOutside } from '@vueuse/core'

	interface secondaryProps {
		// 是否显示菜单
		showMenu: boolean
		// 	菜单
		secondLevelMenu: IRouteRecordRaw[]
		// 选中二级菜单
		selectedSecondaryMenu: string
		// 	选中路由路径
		chooseBasePath: string
		// 	鼠标点击位置
		mousePosition: MouseEvent
	}

	const props = withDefaults(defineProps<secondaryProps>(), {
		showMenu: false,
	})
	const emits = defineEmits(['update:showMenu'])
	const IShowMenu = computed({
		get() {
			return props.showMenu
		},
		set(val) {
			emits('update:showMenu', val)
		},
	})

	// 	区域位置
	const navigateStyle = computed(() => {
		const { offsetTop, offsetLeft, offsetHeight, offsetWidth }: any = props.mousePosition.target
		const top = offsetTop + offsetHeight
		return {
			top: top + 'px',
			left: offsetLeft + 'px',
			width: offsetWidth + 'px',
		}
	})
	const { resolvePath } = layout()

	// 判断二级菜单是否选中
	const getMenuChoose = (item: IRouteRecordRaw) => {
		return props.selectedSecondaryMenu === item.path
	}

	const sysSecondMenu = ref<HTMLElement>()
	onClickOutside(sysSecondMenu, () => {
		IShowMenu.value = false
	})
</script>

<template>
	<div v-show="showMenu" ref="sysSecondMenu" class="s_navigate" :style="navigateStyle">
		<template v-for="item in secondLevelMenu" :key="item.name">
			<div :class="getMenuChoose(item) ? 's_navigate_block_active' : 's_navigate_block'">
				<app-link
					v-if="item.meta"
					:to="resolvePath(chooseBasePath, item.path)"
					class="fullDom c-center"
				>
					<span>{{ item.meta.title }}</span>
				</app-link>
			</div>
		</template>
	</div>
</template>

<style lang="scss" scoped>
	.s_navigate {
		position: absolute;
		background: rgba(7, 31, 63, 0.93);
		border: 1px solid;
		border-image: linear-gradient(0deg, #163488, #071f3f) 10 10;
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: repeat(auto-fill, vh(52));
		z-index: 10;
	}
	@mixin textDefault {
		cursor: pointer;
		span {
			font-size: vh(16);
			font-family:
				Adobe Heiti Std,
				serif;
			font-weight: normal;
			line-height: vh(52);
		}
	}
	.s_navigate_block {
		@include textDefault;
		span {
			color: #00bfff;
		}
		&:hover {
			background: linear-gradient(90deg, #092453, #13307f, #082250);
			opacity: 0.89;
			span {
				color: #ffffff;
			}
		}
	}
	.s_navigate_block_active {
		@include textDefault;
		background: linear-gradient(90deg, #092453, #13307f, #082250);
		opacity: 0.89;
		span {
			color: #ffffff;
		}
	}
</style>
