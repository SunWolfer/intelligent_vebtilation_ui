<script setup lang="ts">
	import { dynamicHeight } from '@/utils/ruoyi'

	type TablePageType = {
		// 是否显示查询表单
		hasForm?: boolean
		// 是否显示操作按钮
		hasOperationBtn?: boolean
		//   是否显示分页
		showPage?: boolean
		background?: string
	}

	const props = withDefaults(defineProps<TablePageType>(), {
		hasForm: true,
		hasOperationBtn: true,
		showPage: true,
		background: 'rgba(11, 94, 243, 0.2)',
	})
	// 	页面已显示高度
	const initHeight = computed(() => {
		return dynamicHeight((props.hasForm ? 84 : 0) + (props.hasOperationBtn ? 65 : 0) + 25)
	})
	// 	表格显示高度
	const tableHeight = computed(() => {
		return `calc(100% - ${initHeight.value}px)`
	})
</script>

<template>
	<universal-body>
		<!--		内容-->
		<div class="fullDom">
			<!--				表单高度-->
			<div class="table-page-form" v-if="hasForm">
        <div class="table-page-form-body p-center">
          <slot name="tablePageForm"></slot>
        </div>
			</div>
			<!--				操作按钮高度-->
			<div class="table-page-btn" v-if="hasOperationBtn">
				<slot name="tablePageBtn"></slot>
			</div>
			<!--				表格高度-->
			<div class="table-page-table" :style="{ background: background }">
				<div :class="showPage ? 'table-page-table-s' : 'fullDom'">
					<slot name="tablePageTable"></slot>
				</div>
				<div v-if="showPage" class="table-page-table-pagination">
					<slot name="tablePagePagination"></slot>
				</div>
			</div>
		</div>
		<slot></slot>
	</universal-body>
</template>

<style lang="scss" scoped>
	.table-page-form {
		width: 100%;
		height: vh(84);
		.table-page-form-body {
			position: relative;
			width: 100%;
			height: 100%;
			padding: 0 vw(30);
		}
	}

	.table-page-btn {
		width: 100%;
		height: vh(65);
		padding-top: vh(10);
	}

	.table-page-table {
		width: 100%;
		height: v-bind(tableHeight);
		margin-top: vh(10);
	}
	.table-page-table-s {
		position: relative;
		width: 100%;
		height: calc(100% - #{vh(50)});
	}
	.table-page-table-pagination {
		position: relative;
		width: 100%;
		height: vh(50);
	}
</style>
