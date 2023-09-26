<script setup lang="ts">
	interface IData {
		gridArea: any
		bodyClass?: string
		isHtml?: boolean
		label?: string
		isInput?: boolean
		formKey?: string
	}
	interface ITableItem {
		dataForm: any
		dataList: IData[]
	}

	defineProps<ITableItem>()
</script>

<template>
	<template v-for="i in dataList">
		<div
			v-if="i.isHtml"
			:class="i.bodyClass ?? ''"
			v-html="i.label ?? ''"
			:style="{ 'grid-area': i.gridArea }"
		></div>
		<div
			v-if="i.isInput"
			:class="i.bodyClass ?? 'table_item_body'"
			:style="{ 'grid-area': i.gridArea }"
		>
			<el-input v-model="dataForm[i.formKey]" />
		</div>
	</template>
</template>

<style scoped lang="scss">
	@mixin tableBorder {
		box-sizing: border-box;
		width: 100%;
		height: calc(100% - 2px);
		border-right: 1px solid #9eb7d4;
		border-bottom: 1px solid #9eb7d4;
	}
	@mixin default_title_text {
		font-size: vw(14);
		font-family:
			Adobe Heiti Std,
			serif;
		font-weight: normal;
		color: #5fd1fe;
		background: #155095;
		display: flex;
		align-items: center;
		text-align: center;
		@include tableBorder;
	}
	.table_title_text {
		@include default_title_text;
		justify-content: center;
	}
	.table_title_text_left {
		@include default_title_text;
		justify-content: start;
		padding-left: vw(5);
	}
	.table_item_body {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: vw(14);
		font-family:
			Adobe Heiti Std,
			serif;
		font-weight: normal;
		color: #a2ccdb;
		text-align: center;
		@include tableBorder;
	}
	.table_border_bottom {
		font-size: vw(14);
		font-family:
			Adobe Heiti Std,
			serif;
		font-weight: normal;
		color: #a2ccdb;
		box-sizing: border-box;
		border-bottom: 1px solid #9eb7d4;
	}
	:deep(.el-input) {
		height: calc(100% - 2px);
		padding: 0;
		.el-input__wrapper {
			padding: 0;
		}
		.el-input__inner {
			height: 100%;
			line-height: 100%;
		}
	}
</style>
