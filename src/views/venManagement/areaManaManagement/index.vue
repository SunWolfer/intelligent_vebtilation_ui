<!--风路分支图区域管理-->
<script setup>
	import useList from '@/hooks/useList'
	import { useCommitForm, useForm } from '@/hooks/useForm'
	import { addRegion, delRegion, listRegion, synchronizeData } from '@/api/api/areaManaManagement'

	const {
		queryParams,
		total,
		dataList,
		getList,
		handleQuery,
		handleDelete,
		handleSelectionChange,
	} = useList({
		apiFun: listRegion,
		params: {
			region: '',
			pageNum: 1,
			pageSize: 10,
		},
		deleteFun: delRegion,
	})

	// 边框样式
	// 默认
	const default_color = ['#b4b4bf', 'rgba(6, 134, 216, 0.5)', 'rgba(6, 134, 216, 1)']
	// 选中
	const choose_color = ['#b4b4bf', 'rgba(200, 151, 0,0.5)', 'rgba(200, 151, 0,1)']
	const chooseDataList = ref([])
	const clickData = (data) => {
		const index = chooseDataList.value.findIndex((i) => {
			return i.id === data.id
		})
		if (index === -1) {
			chooseDataList.value.push(data)
			handleSelectionChange?.(chooseDataList.value)
			data.checked = true
		} else {
			chooseDataList.value.splice(index, 1)
			handleSelectionChange?.(chooseDataList.value)
			data.checked = false
		}
	}
	// 同步
	const handSynchronize = async () => {
		await useCommitForm(synchronizeData, {})
	}

	const { formRef, form, open, submitForm, handleAdd } = useForm({
		formParams: {
			id: undefined,
			region: undefined,
		},
		titleMes: '测风站',
		addApi: addRegion,
		afterAddFun: handleQuery,
		afterUpdateFun: handleQuery,
	})
</script>

<template>
	<div class="area_manage">
		<div class="area_manage_l1">
			<el-form :model="queryParams" inline>
				<el-form-item label="区域名称">
					<el-input v-model="queryParams.region"></el-input>
				</el-form-item>
				<el-form-item>
					<div class="normal_btn" @click="handleQuery">查询</div>
					<div class="normal_3_btn" @click="handleAdd">新增</div>
					<div class="normal_2_btn" @click="handSynchronize">同步</div>
					<div class="normal_4_btn" @click="handleDelete">删除</div>
				</el-form-item>
			</el-form>
		</div>
		<div class="fullDom area_manage_l2">
			<template v-for="i in dataList">
				<border-box name="border1" :color="i.checked ? choose_color : default_color">
					<div
						class="fullDom c-center area_manage_l2_text pointer"
						:class="i.checked ? 'area_manage_l2_item_active' : ''"
						@click="clickData(i)"
					>
						{{ i?.region }}
					</div>
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
			@submit="submitForm"
		>
			<div class="fullDom c-center">
				<el-form :model="form" ref="formRef">
					<el-form-item>
						<template #label>
							<span class="area_manage_l2_text">区域名称</span>
						</template>
						<el-input class="area_manage_input ml10" v-model="form.region"></el-input>
					</el-form-item>
				</el-form>
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
	.area_manage_l2_item_active {
		box-shadow: inset 0 0 30px #c08c0d;
	}
	.area_manage_l2_text {
		font-size: vw(26);
		font-family: YouSheBiaoTiHei, serif;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.78);

		background: linear-gradient(180deg, #b8d6ff 30%, #3bcaec 100%);
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
