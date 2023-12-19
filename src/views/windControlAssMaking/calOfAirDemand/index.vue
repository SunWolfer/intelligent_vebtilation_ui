<!--需风量计算-->
<script setup>
	import CalWorkingFace from '@/views/windControlAssMaking/calOfAirDemand/CalWorkingFace.vue'
	import CalHeadingFace from '@/views/windControlAssMaking/calOfAirDemand/CalHeadingFace.vue'
	import CalOther from '@/views/windControlAssMaking/calOfAirDemand/CalOther.vue'
	import { getNeedRoads, removeNeedRoad } from '@/api/api/calOfAirDemand'
	import CalChamber from '@/views/windControlAssMaking/calOfAirDemand/CalChamber.vue'
	import useDict from '@/hooks/useDict'
	import { selectDictLabel } from '@/utils/ruoyi'
	import { useCommitForm } from '@/hooks/useForm'
	// 加载组件
	const loadDom = computed(() => {
		return tabs.find((i) => i.domType === chooseDom.value).domName
	})

	//   左侧选择项目列表
	const tabs = reactive([
		{
			name: '工作面',
			domType: '1',
			domName: shallowRef(CalWorkingFace),
		},
		{
			name: '掘进面',
			domType: '2',
			domName: shallowRef(CalHeadingFace),
		},
		{
			name: '硐室',
			domType: '3',
			domName: shallowRef(CalChamber),
		},
		{
			name: '其他',
			domType: '4',
			domName: shallowRef(CalOther),
		},
	])
	// 选中项目
	const chooseDom = ref('1')
	// 改变加载项目
	const changeChooseDom = (type) => {
		if (type === chooseDom.value) return
		chooseDom.value = type
		changeTunnel()
	}
	const tableRef = ref(null)
	// 配风巷道
	const airDisList = ref([])
	const { wind_predict_type } = useDict('wind_predict_type')
	const formatterWindPredictType = (row) => {
		return selectDictLabel(wind_predict_type.value, row.predictType)
	}
	// 下拉改变巷道
	const changeTunnel = async () => {
		const { data } = await getNeedRoads({
			needCalType: chooseDom.value,
		})
		airDisList.value = data
	}
	const isDelete = ref(false)
	//   表格选择巷道
	const chooseRow = ref({})
	const handleCurrentChange = (val) => {
		if (isDelete.value) return
		chooseRow.value = val
	}
	// 清除选中巷道
	const clearRow = (val) => {
		if (val !== chooseRow.value?.id) {
			if (chooseRow.value?.id) {
				tableRef.value?.toggleRowSelection(chooseRow.value, false)
			}
		}
	}
	//   删除配风巷道
	const deleteDataList = async (row) => {
		isDelete.value = true
		await useCommitForm(removeNeedRoad, {
			queryParams: {
				needCalType: chooseDom.value,
				id: row.id,
			},
			afterReadyDataFun: () => {
				changeTunnel()
				isDelete.value = false
			},
			catchFun: () => {
				isDelete.value = false
			},
		})
	}
	changeTunnel()
</script>

<template>
	<div class="cal_air_body">
		<div class="cal_air_body_top">
			<div class="cal_air_body_top_left">
				<template v-for="i in tabs" :key="i.domType">
					<div
						:class="i.domType === chooseDom ? 'cal_air_btn_1_active' : 'cal_air_btn_1'"
						@click="changeChooseDom(i.domType)"
					>
						<span>{{ i.name }}</span>
					</div>
				</template>
			</div>
			<div class="fullDom">
				<component
					:is="loadDom"
					:chooseRow="chooseRow"
					@change-tunnel="changeTunnel"
					@clear-row="clearRow"
				/>
			</div>
		</div>
		<div class="cal_air_body_center">配风巷道</div>
		<div class="cal_air_body_end">
			<el-table
				ref="tableRef"
				:data="airDisList"
				height="100%"
				border
				highlight-current-row
				@cell-click="handleCurrentChange"
			>
				<el-table-column label="配风巷道" align="center" prop="roadName" />
				<el-table-column label="配风巷道编号" align="center" prop="roadCode" />
				<el-table-column label="需风量(m3/min)" align="center" prop="airVolume" />
				<el-table-column
					label="预测类型"
					align="center"
					prop="predictType"
					:formatter="formatterWindPredictType"
				/>
				<el-table-column label="预测时间" align="center" prop="predictTime" />
				<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
					<template #default="scope">
						<el-button type="primary" link icon="Delete" @click="deleteDataList(scope.row)"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/calOfAirDemand';
</style>
