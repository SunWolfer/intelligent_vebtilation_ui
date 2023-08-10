<script setup>
	import { useWindNetCalculation } from '@/hooks/useWindNetCalculation'
	import LoadWindControlModel from '@/views/components/loadModel/loadWindControlModel.vue'
	import { onDemandAirDisNetSolution } from '@/api/request/windControlAssMaking/onDemandAirDisNetSolution'
	import SolvingSimulation from '@/views/components/windControlAssMaking/solvingSimulation.vue'

	const { fontList } = useWindNetCalculation()

	const {
		tunnelList,
		controlTunnelData,
		controlDelete,
		resetTunnelData,
		imitateVisible,
		operationStepsList,
		showImitateVisible,
		showAfterCalVisible,
		cancelAirDisNetwork,
		tunnelListVisible,
		chooseTunnel,
	} = onDemandAirDisNetSolution()
</script>

<template>
	<div class="fullDom">
		<load-wind-control-model :font-list="fontList" @choose-tunnel="chooseTunnel" />

		<div v-if="tunnelListVisible" class="on_dem_left">
			<div class="on_dem_left_top">
				<div class="normal_btn" @click="resetTunnelData">重置</div>
				<div class="normal_2_btn" @click="showImitateVisible">解算模拟</div>
			</div>
			<div class="on_dem_left_bottom">
				<template v-for="(item, index) in tunnelList">
					<border-box name="border3">
						<div class="on_dem_item">
							<div class="on_dem_item_top">
								<div class="on_dem_item_top_body">
									<border-box name="border5">
										<div class="on_dem_item_title">
											<div class="title_icon"></div>
											<el-input v-model="item.name" placeholder="- - - -" />
										</div>
									</border-box>
								</div>
							</div>
							<div class="on_dem_item_body">
								<div class="on_dem_item_left">
									<div class="on_dem_item_body_title">巷道信息</div>
									<div class="on_dem_item_left_item">
										<div class="on_dem_item_left_label">巷道编号</div>
										<el-input v-model="item.code" placeholder="- - - -" />
									</div>
									<div class="on_dem_item_left_item">
										<div class="on_dem_item_left_label">[巷道周长]</div>
										<el-input v-model="item.girth" placeholder="- - - -" />
									</div>
									<div class="on_dem_item_left_item">
										<div class="on_dem_item_left_label">[巷道断面积(m2)]</div>
										<el-input v-model="item.area" placeholder="- - - -" />
									</div>
									<div class="on_dem_item_left_item">
										<div class="on_dem_item_left_label">[巷道长度(m)]</div>
										<el-input v-model="item.length" placeholder="- - - -" />
									</div>
									<div class="on_dem_item_left_item">
										<div class="on_dem_item_left_label">[巷道形状]</div>
										<el-input v-model="item.shape" placeholder="- - - -" />
									</div>
									<div class="on_dem_item_left_item">
										<div class="on_dem_item_left_label">[支护类型]</div>
										<el-input v-model="item.supportType" placeholder="- - - -" />
									</div>
								</div>
								<div class="dashLine"></div>
								<div class="on_dem_item_right">
									<div class="on_dem_item_body_title">通风数据</div>
									<div class="on_dem_item_right_item">
										<div class="on_dem_item_right_label">供风量(m3/min)</div>
										<el-input v-model="item.airSupplyVolume" />
									</div>
									<div class="on_dem_item_right_btn">
										<div class="normal_btn" @click="controlTunnelData(index)">确定</div>
										<div class="normal_3_btn" v-if="item.hasSet" @click="controlDelete(index)">
											删除
										</div>
									</div>
								</div>
							</div>

							<div class="set_btn" v-if="item.hasSet"></div>
						</div>
					</border-box>
				</template>
			</div>
		</div>
		<!--    解算模拟-->
		<solving-simulation
			v-model:imitate-visible="imitateVisible"
			v-model:operation-steps-list="operationStepsList"
			@show-cal-visible="showAfterCalVisible"
			@cancel-cal-visible="cancelAirDisNetwork"
		/>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/onDemandAirDisNetSolution';
</style>
