<template>
	<div class="icon-body">
		<el-input
			v-model="iconName"
			style="position: relative"
			clearable
			placeholder="请输入图标名称"
			@clear="filterIcons"
			@input="filterIcons"
		>
			<template #suffix><i class="el-icon-search el-input__icon"></i></template>
		</el-input>
		<div class="icon-list">
			<div v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)">
				<svg-icon :icon-class="item" style="width: 16px; height: 30px" />
				<span>{{ item }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import icons from './requireIcons'

	const iconName = ref('')
	const iconList = ref(icons)
	const emit = defineEmits(['selected'])

	function filterIcons() {
		iconList.value = icons
		if (iconName.value) {
			iconList.value = icons.filter((item) => item.indexOf(iconName.value) !== -1)
		}
	}

	function selectedIcon(name: string) {
		emit('selected', name)
		document.body.click()
	}

	function reset() {
		iconName.value = ''
		iconList.value = icons
	}

	defineExpose({
		reset,
	})
</script>

<style lang="scss" scoped>
	.icon-body {
		width: 100%;
		padding: 10px;
		:deep(.el-input) {
			padding: 1px;
			box-shadow: 0 0 0 1px rgba(14, 252, 255, 0.77) inset;
			height: vh(32);
			font-size: vh(14);
			.el-input__wrapper {
				padding: 1px 8px;
				background: rgba(26, 47, 86, 0.6);
				box-shadow: none;
				&:hover {
					box-shadow: 0 0 0 1px rgba(14, 252, 255, 0.77) inset;
				}
				.el-input__inner {
					color: #ffffff;
				}
			}
			.el-input__icon {
				color: rgba(14, 252, 255, 0.77);
			}
			.el-input-group__append {
				background: rgba(26, 47, 86, 0.6);
				box-shadow: none;
			}
		}
		.icon-list {
			height: 200px;
			overflow-y: scroll;

			div {
				height: 30px;
				line-height: 30px;
				margin-bottom: -5px;
				cursor: pointer;
				width: 50%;
				float: left;
			}
			span {
				display: inline-block;
				vertical-align: -0.15em;
				fill: currentColor;
				overflow: hidden;
				color: #ffffff;
			}
		}
	}
</style>
