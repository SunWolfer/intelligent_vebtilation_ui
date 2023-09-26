<!--通风动力、通风设施、通风网络表格组件-->
<script setup>
	import useList from '@/hooks/useList'
	import { findDevTypeDict, listWarnLevel, updateWarnLevel } from '@/api/api/eaWarnLevelManagement'
	import { useGainList } from '@/hooks/useGainList'
	import { useCommitForm } from '@/hooks/useForm'
	import useDict from '@/hooks/useDict'
	import { selectDictLabel } from '@/utils/ruoyi'

	const props = defineProps({
		type: {
			type: String,
			default: '1',
		},
	})

	const { queryParams, total, getList, handleQuery, dataList } = useList({
		apiFun: listWarnLevel,
		params: {
			mainType: props.type,
			devType: '',
			warnLevel: '',
			pageNum: 1,
			pageSize: 10,
		},
	})
	// 设备类型
	const { dataList: devTypeList } = useGainList({
		apiFun: findDevTypeDict,
		queryArgs: {
			mainType: props.type,
		},
	})
	const warnLevelList = [
		{
			label: '1级',
			value: '1',
		},
		{
			label: '2级',
			value: '2',
		},
		{
			label: '3级',
			value: '3',
		},
		{
			label: '4级',
			value: '4',
		},
	]
	const { blend_sys_type } = useDict('blend_sys_type')
	const formatterBlendSysType = (row) => {
		return selectDictLabel(blend_sys_type.value, row.sysType)
	}
	//   变更
	const open = ref(false)
	const chooseRow = ref({})
	const handleUpdate = (row) => {
		chooseRow.value = row
		open.value = true
	}

	const submitForm = async () => {
		await useCommitForm(updateWarnLevel, {
			queryParams: {
				id: chooseRow.value.id,
				warnLevel: chooseRow.value.warnLevel,
			},
			afterReadyDataFun: () => {
				open.value = false
				handleQuery?.()
			},
		})
	}
</script>

<template>
	<el-form :model="queryParams" inline>
		<el-form-item label="设备类型">
			<el-select v-model="queryParams.devType" clearable>
				<el-option v-for="i in devTypeList" :label="i.dictLabel" :value="i.dictValue"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="预警等级">
			<el-select v-model="queryParams.warnLevel" clearable>
				<el-option v-for="i in warnLevelList" :label="i.label" :value="i.value"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item>
			<div class="normal_btn" @click="handleQuery">查询</div>
		</el-form-item>
	</el-form>
	<el-table :data="dataList" border height="100%">
		<el-table-column label="设备类型" align="center" prop="devTypeName" />
		<el-table-column label="预警类型" align="center" prop="yjmc" />
		<el-table-column label="预警等级" align="center" prop="warnLevel">
			<template #default="scope">
				<span :class="'warn_level_' + scope.row.warnLevel">{{ scope.row.warnLevel }}</span>
			</template>
		</el-table-column>
		<el-table-column
			v-if="type === '4'"
			label="融合系统"
			align="center"
			prop="sysType"
			:formatter="formatterBlendSysType"
		/>
		<el-table-column label="操作" align="center">
			<template #default="scope">
				<el-button type="primary" link @click="handleUpdate(scope.row)">等级变更</el-button>
			</template>
		</el-table-column>
	</el-table>
	<pagination
		v-show="total > 0"
		:total="total"
		v-model:page="queryParams.pageNum"
		v-model:limit="queryParams.pageSize"
		@pagination="getList"
	/>
	<!--  变更等级弹窗-->
	<dia-log
		v-if="open"
		v-model="open"
		title="等级变更"
		:width="800"
		:height="500"
		has-bottom-btn
		:btn-list="['保存', '取消']"
		@submit="submitForm"
	>
		<div class="level_dia fullDom">
			<div class="level_dia_text">设备类型：{{ chooseRow.devTypeName }}</div>
			<div class="level_dia_text">预警类型：{{ chooseRow.yjmc }}</div>
			<div class="level_full_row c-center">
				<div class="level_dia_text">预警等级：</div>
				<el-select v-model="chooseRow.warnLevel" clearable>
					<el-option v-for="i in warnLevelList" :label="i.label" :value="i.value"></el-option>
				</el-select>
			</div>
		</div>
	</dia-log>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_right_mess';
	.level_dia {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: vh(72) 1fr;
		align-items: center;
		justify-content: center;
	}
	.level_full_row {
		grid-area: 2/1/3/3;
	}
	.level_dia_text {
		font-size: vw(26);
		font-family: YouSheBiaoTiHei, serif;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.78);

		background: linear-gradient(0deg, #4691f7 0%, #2bc9ea 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
