<!--实时分风网络解算-->
<script setup>
	import { realTimeDisNetSolution } from '@/api/request/windControlAssMaking/realTimeDisNetSolution'
	import LoadWindControlModel from '@/views/components/loadModel/loadWindControlModel.vue'
	import { useWindNetCalculation } from '@/hooks/useWindNetCalculation'
	import { useThreeModelData } from '@/hooks/useThreeModelData'
	import { useInteraction } from '@/hooks/useInteraction'

	// 巷道详情
	const { roadAllList } = useThreeModelData()
	const { fontList, splitText } = useWindNetCalculation()
	watch(
		() => roadAllList.value,
		(value) => {
			splitText?.(value)
		},
	)

	const { frequency, dataList, chooseTabs, tabsHandle, setFrequency } = realTimeDisNetSolution()
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

	const { refreshModel } = useThreeModelData()

	const { threeModelRef, tableRef, getSelectionRows, getSelectionTunnel, watchCode } =
		useInteraction()

	watchCode?.(dataList)
	splitText?.(roadAllList.value)
</script>

<template>
	<div class="real_time_body">
		<!--    3D模型-->
		<div class="fullDom">
			<load-wind-control-model
				v-if="refreshModel"
				ref="threeModelRef"
				:font-list="fontList"
				@choose-tunnel="getSelectionTunnel"
			/>
		</div>
		<!--    实时解算频率-->
		<div class="real_time_body_top">
			<div class="real_time_body_top_body">
				<border-box name="border3" background-color="rgba(15, 46, 81, 0.78)">
					<div class="real_time_body_top_body_title">实时解算频率</div>
					<div class="real_time_body_top_body_line">
						<el-slider v-model="frequency" />
						<el-input-number v-model="frequency" controls-position="right" :max="100" :min="1" />
						<span>分钟</span>
						<div class="normal_btn" @click="setFrequency">确认</div>
					</div>
				</border-box>
			</div>
		</div>
		<div class="real_time_body_bottom">
			<div class="real_time_body_bottom_body">
				<div class="real_time_body_bottom_body_title">
					<border-box name="border2" title="实时解算"></border-box>
				</div>
				<div class="real_time_body_bottom_center">
					<div class="real_time_body_bottom_center_left">
						<div
							:class="chooseTabs === '0' ? 'real_btn_1_active' : 'real_btn_1'"
							@click="tabsHandle('0')"
						>
							<span>全部</span>
						</div>
						<div
							:class="chooseTabs === '1' ? 'real_btn_1_active' : 'real_btn_1'"
							@click="tabsHandle('1')"
						>
							<span>设备测风</span>
						</div>
						<div
							:class="chooseTabs === '2' ? 'real_btn_1_active' : 'real_btn_1'"
							@click="tabsHandle('2')"
						>
							<span>人工测风</span>
						</div>
					</div>
					<div class="real_time_body_bottom_center_right">
						<span>解算结果:</span>
						<div class="red_piece"></div>
						<span>{{ `>10%` }}</span>
						<div class="powder_piece"></div>
						<span>5%-10%</span>
						<div class="orange_piece"></div>
						<span>1%-5%</span>
					</div>
				</div>
				<div class="real_time_body_bottom_table">
					<el-table
						ref="tableRef"
						:data="dataList"
						height="100%"
						border
						highlight-current-row
						@row-click="getSelectionRows"
					>
						<el-table-column label="巷道" align="center" prop="name"></el-table-column>
						<el-table-column
							label="解算风量(m³/min)"
							align="center"
							prop="airVolume"
						></el-table-column>
						<el-table-column label="实时风量(m³/min)" align="center" prop="windSensorAirVolume">
							<template #default="scope">
								<span
									class="full_table_cell_bg"
									:class="cellStyle(scope.row.windSensorAirVolume)"
									>{{ scope.row.windSensorAirVolume }}</span
								>
							</template>
						</el-table-column>
						<el-table-column label="人工实测风量(m³/min)" align="center" prop="personQ">
							<template #default="scope">
								<span class="full_table_cell_bg" :class="cellStyle(scope.row.personQ)">{{
									scope.row.personQ
								}}</span>
							</template>
						</el-table-column>
						<el-table-column label="目标风量(m³/min)" align="center" prop="minQ"></el-table-column>
						<el-table-column
							label="解算/设备误差率(%)"
							align="center"
							prop="calSensorDeviation"
						></el-table-column>
						<el-table-column
							label="解算/人工误差率(%)"
							align="center"
							prop="calPersonDeviation"
						></el-table-column>
						<el-table-column
							label="解算风速(m/s)"
							align="center"
							prop="windSpeed"
						></el-table-column>
						<el-table-column label="风阻" align="center" prop="ventR"></el-table-column>
						<el-table-column
							label="解算风压(Pa)"
							align="center"
							prop="airPressure"
						></el-table-column>
						<el-table-column label="解算时间" align="center" prop="calculateTime"></el-table-column>
						<el-table-column
							label="人工实测时间"
							align="center"
							prop="personQTime"
						></el-table-column>
					</el-table>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/realTimeDisNetSolution';
</style>
