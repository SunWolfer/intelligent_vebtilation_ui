<script setup>
	import LoadWindowModel from '@/views/components/loadModel/loadWindowModel.vue'
	import { homeAirWindow } from '@/api/request/home/homeAirWindow'
	import { dynamicHeight } from '@/utils/ruoyi'
	import HomeAirWindowMore from '@/views/components/home/HomeAirWindowMore.vue'

	const { showChart1, showChart2, showChart3, moreVisible, initMoreVisible } = homeAirWindow()
</script>

<template>
	<div class="home_air_window_body">
		<div class="home_air_window_body_l1">
			<load-window-model />
			<div class="home_air_window_body_l1_v1">
				<border-box name="border1" background-color="rgba(24, 25, 49, 0.71)"></border-box>
			</div>
			<div class="home_air_window_body_l1_v2">
				<border-box name="border1" background-color="rgba(24, 25, 49, 0.71)"></border-box>
			</div>
		</div>
		<div class="home_air_window_body_l2">
			<div class="home_air_window_body_l2_item_1">
				<border2 title="1301回风巷风窗" :hidden-glimmer="true" />
				<!--        选择按钮-->
				<div class="window_choose_icon" :style="{ left: dynamicHeight(7 * 24) + 'px' }">
					<el-dropdown trigger="click">
						<el-icon><CaretBottom /></el-icon>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item>Action 1</el-dropdown-item>
								<el-dropdown-item>Action 2</el-dropdown-item>
								<el-dropdown-item>Action 3</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
				<!--        更多-->
				<div class="window_more_btn" @click="initMoreVisible">更多</div>
			</div>
			<div class="home_air_window_body_l2_item_2">
				<span>位置：1301回风巷</span>
				<span>IP地址：10.231.35.10</span>
				<span>当前模式：自动</span>
				<span>A/B风窗：A</span>
				<span>类型：百叶窗</span>
			</div>
			<div class="home_air_window_body_l2_item_3">
				<div v-if="showChart3" class="fullDom" id="window_chart_3" />
				<div v-if="showChart3" class="fullDom" id="window_chart_4" />
				<div class="home_air_window_body_l2_item_3_chart_title">
					<span>通风面积</span>
					<span>1.009m2</span>
					<span>巷道面积</span>
					<span>12.76m2</span>
				</div>
			</div>
			<div class="home_air_window_body_l2_item_4"></div>
			<div class="home_air_window_body_l2_item_5">
				<div v-if="showChart3" class="fullDom" id="window_chart_5" />
				<div v-if="showChart3" class="fullDom" id="window_chart_6" />
			</div>
			<div class="home_air_window_body_l2_item_6">
				<div class="home_air_window_body_l2_item_6_item">
					<div class="door_icon_1"></div>
					<span>通信状态</span>
					<div class="large_light_1"></div>
				</div>
				<div class="home_air_window_body_l2_item_6_item">
					<div class="door_icon_2"></div>
					<span>气源动力</span>
					<div class="large_light_1"></div>
				</div>
				<div class="home_air_window_body_l2_item_6_item">
					<div class="door_icon_4"></div>
					<span>编码器故障</span>
					<div class="large_light_1"></div>
				</div>
			</div>
			<div class="home_air_window_body_l2_item_7">
				<div class="home_air_window_body_l2_item_7_item">
					<span>调风超时</span>
					<div class="small_light_1"></div>
				</div>
				<div class="home_air_window_body_l2_item_7_item">
					<span>正在调风</span>
					<div class="small_light_1"></div>
				</div>
				<div class="home_air_window_body_l2_item_7_item">
					<span>开到位</span>
					<div class="small_light_1"></div>
				</div>
				<div class="home_air_window_body_l2_item_7_item">
					<span>关到位</span>
					<div class="small_light_1"></div>
				</div>
			</div>
		</div>
		<div class="home_air_window_body_l3">
			<border-box name="border1" background-color="rgba(24, 25, 49, 0.71)">
				<div class="window_param">
					<div class="door_param_title">
						<border-box name="border5">
							<div class="door_param_title_body">
								<div class="window_param_title_icon"></div>
								<span>风阻特性曲线</span>
							</div>
						</border-box>
					</div>
					<div v-if="showChart1" class="fullDom" id="window_chart_1"></div>
				</div>
			</border-box>
			<border-box name="border1" background-color="rgba(24, 25, 49, 0.71)">
				<div class="window_param">
					<div class="door_param_title">
						<border-box name="border5">
							<div class="door_param_title_body">
								<div class="window_param_title_icon"></div>
								<span>监测曲线</span>
							</div>
						</border-box>
					</div>
					<div v-if="showChart2" class="fullDom" id="window_chart_2"></div>
				</div>
			</border-box>
			<border-box name="border1" background-color="rgba(24, 25, 49, 0.71)">
				<div class="window_param">
					<div class="door_param_title">
						<border-box name="border5">
							<div class="door_param_title_body">
								<div class="door_param_title_icon"></div>
								<span>参数设定</span>
							</div>
						</border-box>
					</div>
					<div class="window_param_body">
						<div class="window_param_item">
							开度
							<el-input />
							%
						</div>
						<div class="normal_btn">设定</div>
						<div class="window_param_item">
							风量
							<el-input />
							m³/min
						</div>
						<div class="normal_btn">设定</div>
						<div class="window_param_item">
							面积
							<el-input />
							m2
						</div>
						<div class="normal_btn">设定</div>
					</div>
				</div>
				<div class="window_operation">
					<div class="operation_btn">
						<border-box name="border7">
							<div class="operation_btn_body">
								<div class="door_icon_3"></div>
								操作记录
							</div>
						</border-box>
					</div>
				</div>
			</border-box>
		</div>

		<home-air-window-more v-if="moreVisible" v-model="moreVisible" title="123" />
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_air_window';
</style>
