<script setup>
	import HomeWindBranch from '@/views/components/home/HomeWindBranch.vue'
	import HomeVenNetwork from '@/views/components/home/HomeVenNetwork.vue'
	import { useInteraction } from '@/hooks/useInteraction'

	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: false,
		},
		// 解算列表
		dataList: {
			type: Array,
			default: [],
		},
		// 显示风路分支图
		showWindBranch: {
			type: Boolean,
			default: true,
		},
		// 风路分支图列表
		windBranchList: {
			type: Array,
			default: [],
		},
		// 显示通风网络图
		showVentilationNetwork: {
			type: Boolean,
			default: true,
		},
		//   通风网络图默认生成
		defaultNetWork: {
			type: Boolean,
			default: true,
		},
		//   通风网络图新路径
		reloadNetWorkUrl: {
			type: String,
			default: '',
		},
		// 点击巷道code
		selectCode: {
			type: String,
			default: '',
		},
	})

	const emits = defineEmits(['update:modelValue', 'cancel', 'getSelectionRows'])
	const showDiaLog = computed({
		get() {
			return props.modelValue
		},
		set() {
			emits('update:modelValue', false)
		},
	})
	function closeDia() {
		showDiaLog.value = false
		emits('cancel')
	}
	const cellStyle = (data) => {
		let cell = ''
		let numData = parseFloat(data)
		if (numData > 1 && numData <= 5) {
			cell = 'orange_cell'
		} else if (numData > 5 && numData <= 10) {
			cell = 'powder_cell'
		} else if (numData > 10) {
			cell = 'red_cell'
		}
		return cell
	}
	// 点击巷道code
	const afTunnelCode = ref('')
	//   表格点击
	const getSelectionRows = (row) => {
		afTunnelCode.value = row.code
		emits('getSelectionRows', row)
	}
	const { tableRef, positionTableRow } = useInteraction()
	//   巷道被点击
	watch(
		() => props.selectCode,
		(val) => {
			if (val) {
				afTunnelCode.value = val
				positionTableRow?.(props.dataList, val)
			}
		},
	)

	//   风路分支图被点击
	const chooseFullData = (row) => {
		positionTableRow?.(props.dataList, row.code)
		emits('getSelectionRows', row)
	}

	//   是否显示固定风量巷道文字
	const hasFixedData = computed(() => {
		return props.dataList.filter((i) => i.isFixed).length > 0
	})
</script>

<template>
	<div class="after_cal_body">
		<div class="after_cal_body_top">
			<border-box name="border3" background-color="rgba(15, 46, 81, 0.78)">
				<div class="after_cal_body_top_body">
					<div class="after_cal_body_top_body_top">
						<span>解算结果:</span>
						<div class="red_piece"></div>
						<span>{{ `>10%` }}</span>
						<div class="powder_piece"></div>
						<span>5%-10%</span>
						<div class="orange_piece"></div>
						<span>1%-5%</span>
						<template v-if="hasFixedData">
							<div class="green_piece"></div>
							<span>固定风量巷道</span>
						</template>
					</div>
					<div class="after_cal_body_table">
						<el-table
							ref="tableRef"
							:data="dataList"
							height="100%"
							border
							highlight-current-row
							@row-click="getSelectionRows"
						>
							<el-table-column label="巷道" align="center" prop="name">
								<template #default="scope">
									<div
										class="fullDom"
										:style="{ backgroundColor: scope.row?.isFixed ? '#87B827' : 'transparent' }"
									>
										<span style="color: #ffffff">
											{{ scope.row.name }}
										</span>
									</div>
								</template>
							</el-table-column>
							<el-table-column label="解算风量(m³/min)" align="center" prop="airVolume" />
							<el-table-column label="解算前风量(m³/min)" align="center" prop="oldAirVolume">
								<template #default="scope">
									<span
										class="full_table_cell_bg"
										:class="cellStyle(scope.row.calBeforeDeviation)"
										>{{ scope.row.oldAirVolume }}</span
									>
								</template>
							</el-table-column>
							<el-table-column label="实时风量(m³/min)" align="center" prop="windSensorAirVolume">
							</el-table-column>
							<el-table-column label="目标风量(m³/min)" align="center" prop="minQ" />
							<el-table-column label="人工实测风量(m³/min)" align="center" prop="personQ" />
							<el-table-column label="解算风速(m/s)" align="center" prop="windSpeed" />
							<el-table-column label="风阻" align="center" prop="ventR" />
							<el-table-column label="解算风压(Pa)" align="center" prop="airPressure" />
						</el-table>
					</div>
				</div>
			</border-box>
		</div>
		<!--    风路分支图-->
		<div class="after_cal_body_left" v-if="showWindBranch">
			<home-wind-branch
				:default-list="false"
				:list="windBranchList"
				@choose-wind-full="chooseFullData"
				:select-code="afTunnelCode"
			/>
		</div>
		<!--    通风网络图-->
		<div class="after_cal_body_right" v-if="showVentilationNetwork">
			<home-ven-network :default-net-work="defaultNetWork" :reload-url="reloadNetWorkUrl" />
		</div>
		<div class="after_quit_btn">
			<div class="after_quit_btn_item" @click="closeDia"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/afterCalculation';
</style>
