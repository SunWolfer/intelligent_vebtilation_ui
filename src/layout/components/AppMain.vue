<template>
	<section class="app-main">
		<router-view v-slot="{ Component, route }">
			<keep-alive>
				<component v-if="route.meta.isCache" :is="Component" :key="route.path" />
			</keep-alive>
			<component v-if="!route.meta.isCache" :is="Component" :key="route.path" />
		</router-view>
	</section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
	.app-main {
		/* 50= navbar  50  */
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}

	.fixed-header + .app-main {
		padding-top: 50px;
	}

	.hasTagsView {
		.app-main {
			/* 84 = navbar + tags-view = 50 + 34 */
			min-height: calc(100vh - 84px);
		}

		.fixed-header + .app-main {
			padding-top: 84px;
		}
	}
</style>
<style lang="scss">
	// fix css style bug in open el-dialog
	.el-popup-parent--hidden {
		.fixed-header {
			padding-right: 17px;
		}
	}
</style>
