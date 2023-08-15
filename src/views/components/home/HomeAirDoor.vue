<script setup>
	import LoadDoorModel from '@/views/components/loadModel/LoadDoorModel.vue'
	import { homeAirDoor } from '@/api/request/home/homeAirDoor'
	import { dynamicHeight } from '@/utils/ruoyi'
	import HomeAirDoorMore from '@/views/components/home/HomeAirDoorMore.vue'
	const { dataForm, moreVisible, initMoreVisible, modelActive, changeModel } = homeAirDoor()
</script>

<template>
	<div class="home_air_door_body">
		<div class="home_air_door_body_c1">
			<div class="home_air_door_body_c1_c1">
				<load-door-model />
			</div>
			<div class="home_air_door_body_c1_l1">
				<border-box name="border1" background-color="rgba(24, 25, 49, 0.54)"></border-box>
			</div>
			<div class="home_air_door_body_c1_l2">
				<border-box name="border1" background-color="rgba(24, 25, 49, 0.54)"></border-box>
			</div>
		</div>
		<div class="home_air_door_body_c2">
			<div class="home_air_door_body_c2_item1">
				<border2 title="1010上顺槽风门" :hidden-glimmer="true" />
				<!--        选择按钮-->
				<div class="door_choose_icon" :style="{ left: dynamicHeight(7 * 24) + 'px' }">
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
				<div class="door_more_btn" @click="initMoreVisible">更多</div>
			</div>
			<div class="home_air_door_body_c2_item2">
				<span>位置：1301回风巷</span>
				<span>IP地址：10.231.35.10</span>
				<span>类型：调节风门</span>
			</div>
			<div class="home_air_door_body_c2_item3">
				<div class="home_air_door_body_c2_item3_c1">
					A门开：
					<div class="small_light_1"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c1">
					A门关：
					<div class="small_light_2"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c3"></div>
				<div class="home_air_door_body_c2_item3_c1">
					B门开：
					<div class="small_light_2"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c1">
					B门关：
					<div class="small_light_2"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c1">
					A门开启中：
					<div class="small_light_1"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c1">
					A门关闭中：
					<div class="small_light_2"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c1">
					B门开启中：
					<div class="small_light_2"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c1">
					B门关闭中：
					<div class="small_light_2"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c1">
					A门开超时：
					<div class="small_light_1"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c1">
					A门关超时：
					<div class="small_light_2"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c1">
					B门开超时：
					<div class="small_light_1"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c1">
					B门关超时：
					<div class="small_light_2"></div>
				</div>
			</div>
			<div class="home_air_door_body_c2_item4">
				<div class="home_air_door_body_c2_item4_item">
					<div class="door_icon_1"></div>
					<span>通信状态</span>
					<div class="large_light_1"></div>
				</div>
				<div class="home_air_door_body_c2_item4_item">
					<div class="door_icon_2"></div>
					<span>气源动力</span>
					<div class="large_light_1"></div>
				</div>
			</div>
			<div class="home_air_door_body_c2_item5">
				<border-box name="border2" title="远程控制"></border-box>
			</div>
			<div class="home_air_door_body_c2_item6">
				<div class="home_air_door_body_c2_item6_l1 operation_btn">
					<border-box name="border7">
						<div class="operation_btn_body">
							<div class="door_icon_3"></div>
							操作记录
						</div>
					</border-box>
				</div>
				<div class="home_air_door_body_c2_item6_l2">
					<div class="open_door_btn">
						<span>A远程开门</span>
					</div>
				</div>
				<div class="home_air_door_body_c2_item6_l3">
					<div class="close_door_btn">
						<span>A远程关门</span>
					</div>
				</div>
				<div class="home_air_door_body_c2_item6_l6">
					<div class="open_door_btn">
						<span>B远程开门</span>
					</div>
				</div>
				<div class="home_air_door_body_c2_item6_l7">
					<div class="close_door_btn">
						<span>B远程关门</span>
					</div>
				</div>
				<div class="home_air_door_body_c2_item6_l4"></div>
				<div class="home_air_door_body_c2_item6_l5">
					<div class="home_air_door_body_c2_item6_l5_bg"><span>关闭中</span></div>
					<div class="home_air_door_body_c2_item6_l5_title">闭锁</div>
				</div>
			</div>
			<div class="home_air_door_body_c2_item7">
				<border-box name="border2" title="模式切换"></border-box>
			</div>
			<div class="modeSwitching">
				<div class="item_bg"></div>
				<div v-if="modelActive" class="item_active" :class="modelActive"></div>
				<!-- 手动 -->
				<div class="item_text item_text_route_an_60" @click="changeModel('1')">
					<div class="item_text_dec">
						<decorator2
							title="manual手动"
							:color="[dataForm.doorMode === '1' ? '#010000' : '#81bde3']"
							color="['#81bde3]"
						></decorator2>
					</div>
				</div>
				<!-- 远程 -->
				<div class="item_text" @click="changeModel('3')">
					<div class="item_text_dec">
						<decorator2
							title="remote远程"
							:color="[dataForm.doorMode === '3' ? '#010000' : '#81bde3']"
							color="['#81bde3]"
						></decorator2>
					</div>
				</div>
				<!-- 自动 -->
				<div class="item_text item_text_route_60" @click="changeModel('2')">
					<div class="item_text_dec">
						<decorator2
							title="auto自动"
							:color="[dataForm.doorMode === '2' ? '#010000' : '#81bde3']"
							color="['#81bde3]"
						></decorator2>
					</div>
				</div>
				<div class="item_bottom_line"></div>
				<div class="item_small_bg"></div>
				<div v-if="modelActive" class="item_needle" :class="modelActive"></div>
			</div>
		</div>
		<div class="home_air_door_body_r2">
			<div class="home_air_door_body_r2_c">
				<border-box name="border1" background-color="rgba(24, 25, 49, 0.54)">
					<div class="door_param">
						<div class="door_param_title">
							<border-box name="border5">
								<div class="set_btn_default"><span>A风门参数设置</span></div>
							</border-box>
						</div>
						<div class="door_param_item_1">
							<div class="door_param_item_1_body">
								外门遮挡时间
								<el-input></el-input>
								s
							</div>
							<div class="door_param_item_1_body">
								外门闪烁次数
								<el-input></el-input>
								次
							</div>
							<div class="door_param_item_1_body">
								内门遮挡时间
								<el-input></el-input>
								s
							</div>
							<div class="door_param_item_1_body">
								内门闪烁次数
								<el-input></el-input>
								次
							</div>
						</div>
						<div class="door_param_item_2">
							<div class="door_param_item_2_l1 green_bg">风门开启</div>
							<div class="door_param_item_2_l2">
								开门时间
								<el-input />
								s
							</div>
							<div class="door_param_item_2_l3">
								<div class="green_bg">开到位</div>
								<div class="orange_bg">开超时</div>
							</div>
							<div class="door_param_item_2_l2">
								开位保持
								<el-input />
								s
							</div>
							<div class="door_param_item_2_l4">
								等待时间
								<el-input />
								s
							</div>
						</div>
						<div class="door_param_item_2">
							<div class="door_param_item_2_l1 orange_bg">风门关闭</div>
							<div class="door_param_item_2_l2">
								关门时间
								<el-input />
								s
							</div>
							<div class="door_param_item_2_l3">
								<div class="green_bg">关到位</div>
								<div class="orange_bg">关超时</div>
							</div>
							<div class="door_param_item_2_l2">
								关位保持
								<el-input />
								s
							</div>
							<div class="door_param_item_2_l4">完成</div>
						</div>
					</div>
				</border-box>
			</div>
			<div class="home_air_door_body_r2_c">
				<border-box name="border1" background-color="rgba(24, 25, 49, 0.54)">
					<div class="door_param">
						<div class="door_param_title">
							<border-box name="border5">
								<div class="set_btn_default">
									<span> B风门参数设置</span>
								</div>
							</border-box>
						</div>
						<div class="door_param_item_1">
							<div class="door_param_item_1_body">
								外门遮挡时间
								<el-input></el-input>
								s
							</div>
							<div class="door_param_item_1_body">
								外门闪烁次数
								<el-input></el-input>
								次
							</div>
							<div class="door_param_item_1_body">
								内门遮挡时间
								<el-input></el-input>
								s
							</div>
							<div class="door_param_item_1_body">
								内门闪烁次数
								<el-input></el-input>
								次
							</div>
						</div>
						<div class="door_param_item_2">
							<div class="door_param_item_2_l1 green_bg">风门开启</div>
							<div class="door_param_item_2_l2">
								开门时间
								<el-input />
								s
							</div>
							<div class="door_param_item_2_l3">
								<div class="green_bg">开到位</div>
								<div class="orange_bg">开超时</div>
							</div>
							<div class="door_param_item_2_l2">
								开位保持
								<el-input />
								s
							</div>
							<div class="door_param_item_2_l4">
								等待时间
								<el-input />
								s
							</div>
						</div>
						<div class="door_param_item_2">
							<div class="door_param_item_2_l1 orange_bg">风门关闭</div>
							<div class="door_param_item_2_l2">
								关门时间
								<el-input />
								s
							</div>
							<div class="door_param_item_2_l3">
								<div class="green_bg">关到位</div>
								<div class="orange_bg">关超时</div>
							</div>
							<div class="door_param_item_2_l2">
								关位保持
								<el-input />
								s
							</div>
							<div class="door_param_item_2_l4">完成</div>
						</div>
					</div>
				</border-box>
			</div>
		</div>

		<!--    更多弹窗-->
		<home-air-door-more v-if="moreVisible" v-model="moreVisible" title="风门" />
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_air_door';
</style>
