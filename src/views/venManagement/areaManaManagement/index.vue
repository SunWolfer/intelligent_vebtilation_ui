<!--风路分支图区域管理-->
<script setup>
	import useList from '@/hooks/useList'
	import { useForm } from '@/hooks/useForm'

	const { queryParams, total, dataList, getList, handleQuery } = useList({
		apiFun: () => {},
		params: {
			name: '',
		},
	})
	onMounted(() => {
		dataList.value.length = 20
	})
	const { formRef, form, title, open, submitForm, handleUpdate, handleAdd } = useForm({
		formParams: {
			id: undefined,
			name: undefined,
		},
		titleMes: '测风站',
		initApi: () => {},
		updateApi: () => {},
		addApi: () => {},
		afterAddFun: handleQuery,
		afterUpdateFun: handleQuery,
	})
</script>

<template>
	<div class="area_manage">
		<div class="area_manage_l1">
			<el-form :model="queryParams" inline>
				<el-form-item label="区域名称">
					<el-input v-model="queryParams.name"></el-input>
				</el-form-item>
				<el-form-item>
					<div class="normal_btn">查询</div>
					<div class="normal_3_btn" @click="handleAdd">新增</div>
					<div class="normal_2_btn">同步</div>
					<div class="normal_4_btn">删除</div>
				</el-form-item>
			</el-form>
		</div>
		<div class="fullDom area_manage_l2">
			<template v-for="i in dataList">
				<border-box name="border1">
					<div class="fullDom c-center area_manage_l2_text">副斜井</div>
				</border-box>
			</template>
		</div>
		<div class="fullDom area_manage_l3">
			<pagination
				v-show="total > 0"
				:total="total"
				v-model:page="queryParams.pageNum"
				v-model:limit="queryParams.pageSize"
				@pagination="getList"
			/>
		</div>
		<dia-log
			v-if="open"
			v-model="open"
			title="新增"
			:width="800"
			:height="420"
			has-bottom-btn
			:btn-list="['保存', '取消']"
		>
			<div class="fullDom c-center">
				<span class="area_manage_l2_text">区域名称</span>
				<el-input class="area_manage_input ml10" v-model="form.name"></el-input>
			</div>
		</dia-log>
	</div>
</template>

<style scoped lang="scss">
	.area_manage {
		position: relative;
		width: 100%;
		height: 100%;
		padding: 0 vw(65);
		display: grid;
		grid-template-rows: vh(80) 1fr vh(70);
		align-items: center;
	}
	.area_manage_l1 {
		padding-left: vw(70);
	}
	.area_manage_l2 {
		overflow-y: auto;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-column-gap: vw(15);
		grid-template-rows: repeat(auto-fill, vh(181));
		grid-auto-rows: vh(181);
		grid-row-gap: vh(20);
	}
	.area_manage_l2_text {
		font-size: vh(26);
		font-family: YouSheBiaoTiHei, serif;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.78);
		text-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);

		background: linear-gradient(180deg, #b8d6ff 0%, #2bc9ea 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.area_manage_l3 {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.area_manage_input {
		width: vw(250);
	}
</style>
