<script setup>
	import { homeAirDoor } from '@/api/request/home/homeAirDoor'
	import { dynamicHeight, selectDictLabel } from '@/utils/ruoyi'
	import HomeAirDoorMore from '@/views/components/home/HomeAirDoorMore.vue'
	import useDict from '@/hooks/useDict'
	import { ControlKey, DoorStatus, WorkStatus } from '@/api/request/home/doorParams'
	import DoorHisRecord from '@/views/venEqMonitoring/throttleMonitoring/doorHisRecord.vue'
	import NormalDoor from '@/views/components/home/doorPage/NormalDoor.vue'
	import FourWindowDoor from '@/views/components/home/doorPage/FourWindowDoor.vue'

	const {
		dataList,
		videoUrl1,
		videoUrl2,
		dataForm,
		paramsData,
		changeDoor,
		moreVisible,
		initMoreVisible,
		modelActive,
		changeModel,
		doorAStatusLight,
		doorBStatusLight,
		controlDoorHandle,
		doorParamHandle,
		hisRecordVisible,
		hisRecordHandle,
		playmod,
	} = homeAirDoor()

	const tabs = reactive([
		{
			name: '默认显示',
			domName: markRaw(NormalDoor),
		},
		{
			name: '一拖四风门',
			domName: markRaw(FourWindowDoor),
		},
	])
	const showDoorDom = computed(() => {
		let domName = tabs[0].domName
		if (dataForm.value?.doorFlag === '1') {
			domName = tabs[1].domName
		}
		return domName
	})

	const { door_type } = useDict('door_type')
</script>

<template>
	<div class="home_air_door_body">
		<component
			:is="showDoorDom"
			:dataForm="dataForm"
			:playmod="playmod"
			:videoUrl1="videoUrl1"
			:videoUrl2="videoUrl2"
		></component>

		<div class="home_air_door_body_c2">
			<div class="home_air_door_body_c2_item1">
				<border2 :title="dataForm.name" :hidden-glimmer="true" />
				<!--        选择按钮-->
				<div
					class="door_choose_icon"
					:style="{ left: dynamicHeight(dataForm.name?.length * 24) + 'px' }"
				>
					<el-dropdown trigger="click" @command="changeDoor">
						<el-icon><CaretBottom /></el-icon>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item v-for="i in dataList" :command="i.id">{{
									i.name
								}}</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
				<!--        更多-->
				<div class="door_more_btn" @click="initMoreVisible">更多</div>
			</div>
			<div class="home_air_door_body_c2_item2">
				<span>位置：{{ dataForm.location }}</span>
				<span>IP地址：{{ dataForm.ip }}</span>
				<span>类型：{{ selectDictLabel(door_type, dataForm.type) }}</span>
			</div>
			<div class="home_air_door_body_c2_item3">
				<div class="home_air_door_body_c2_item3_c1">
					A门开：
					<div :class="doorAStatusLight(DoorStatus.SIX)"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c1">
					A门关：
					<div :class="doorAStatusLight(DoorStatus.TWO)"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c3"></div>
				<div class="home_air_door_body_c2_item3_c1">
					B门开：
					<div :class="doorBStatusLight(DoorStatus.SIX)"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c1">
					B门关：
					<div :class="doorBStatusLight(DoorStatus.TWO)"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c1">
					A门开启中：
					<div :class="doorAStatusLight(DoorStatus.FIVE)"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c1">
					A门关闭中：
					<div :class="doorAStatusLight(DoorStatus.ONE)"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c1">
					B门开启中：
					<div :class="doorBStatusLight(DoorStatus.FIVE)"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c1">
					B门关闭中：
					<div :class="doorBStatusLight(DoorStatus.ONE)"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c1">
					A门开超时：
					<div :class="doorAStatusLight(DoorStatus.EIGHT)"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c1">
					A门关超时：
					<div :class="doorAStatusLight(DoorStatus.FOUR)"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c1">
					B门开超时：
					<div :class="doorBStatusLight(DoorStatus.EIGHT)"></div>
				</div>
				<div class="home_air_door_body_c2_item3_c1">
					B门关超时：
					<div :class="doorBStatusLight(DoorStatus.FOUR)"></div>
				</div>
			</div>
			<div class="home_air_door_body_c2_item4">
				<div class="home_air_door_body_c2_item4_item">
					<div class="door_icon_1"></div>
					<span>通信状态</span>
					<div :class="dataForm.onlineStatus === '1' ? 'large_light_1' : 'large_light_2'"></div>
				</div>
				<div class="home_air_door_body_c2_item4_item">
					<div class="door_icon_2"></div>
					<span>气源动力</span>
					<div :class="dataForm.airStatus === '1' ? 'large_light_1' : 'large_light_2'"></div>
				</div>
			</div>
			<div class="home_air_door_body_c2_item5">
				<border-box name="border2" title="远程控制"></border-box>
			</div>
			<div class="home_air_door_body_c2_item6">
				<div class="home_air_door_body_c2_item6_l1 operation_btn" @click="hisRecordHandle">
					<border-box name="border7">
						<div class="operation_btn_body">
							<div class="door_icon_3"></div>
							操作记录
						</div>
					</border-box>
				</div>
				<div class="home_air_door_body_c2_item6_l2">
					<div class="open_door_btn" @click="controlDoorHandle(ControlKey.THREE)">
						<span>A远程开门</span>
					</div>
				</div>
				<div class="home_air_door_body_c2_item6_l3">
					<div class="close_door_btn" @click="controlDoorHandle(ControlKey.FOUR)">
						<span>A远程关门</span>
					</div>
				</div>
				<div class="home_air_door_body_c2_item6_l6">
					<div class="open_door_btn" @click="controlDoorHandle(ControlKey.FIVE)">
						<span>B远程开门</span>
					</div>
				</div>
				<div class="home_air_door_body_c2_item6_l7">
					<div class="close_door_btn" @click="controlDoorHandle(ControlKey.SIX)">
						<span>B远程关门</span>
					</div>
				</div>
				<div class="home_air_door_body_c2_item6_l4"></div>
				<div class="home_air_door_body_c2_item6_l5">
					<div
						class="home_air_door_body_c2_item6_l5_bg"
						:class="dataForm.lockStatus === '1' ? 'deadlock_bg' : 'open_lock_bg'"
						@click="
							controlDoorHandle(dataForm.lockStatus === '1' ? ControlKey.SEVEN : ControlKey.EIGHT)
						"
					>
						<span>{{ dataForm.lockStatus === '1' ? '关闭中' : '' }}</span>
					</div>
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
				<div class="item_text item_text_route_an_60" @click="changeModel(WorkStatus.ONE)">
					<div class="item_text_dec">
						<decorator2
							title="manual手动"
							:color="[dataForm.workModel === WorkStatus.ONE ? '#010000' : '#81bde3']"
							color="['#81bde3]"
						></decorator2>
					</div>
				</div>
				<!-- 远程 -->
				<div class="item_text" @click="changeModel(WorkStatus.TWO)">
					<div class="item_text_dec">
						<decorator2
							title="remote远程"
							:color="[dataForm.workModel === WorkStatus.TWO ? '#010000' : '#81bde3']"
							color="['#81bde3]"
						></decorator2>
					</div>
				</div>
				<!-- 自动 -->
				<div class="item_text item_text_route_60" @click="changeModel(WorkStatus.ZERO)">
					<div class="item_text_dec">
						<decorator2
							title="auto自动"
							:color="[dataForm.workModel === WorkStatus.ZERO ? '#010000' : '#81bde3']"
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
						<!--						<div class="door_param_item_1">-->
						<!--							<div class="door_param_item_1_body">-->
						<!--								外门遮挡时间-->
						<!--								<el-input-->
						<!--									v-model.trim="paramsData.coverOutDoorTime1"-->
						<!--									v-inputInt-->
						<!--									@blur="doorParamHandle('coverOutDoorTime1')"-->
						<!--								/>-->
						<!--								s-->
						<!--							</div>-->
						<!--							<div class="door_param_item_1_body">-->
						<!--								外门闪烁次数-->
						<!--								<el-input-->
						<!--									v-model.trim="paramsData.outDoorTwinkleCount1"-->
						<!--									v-inputInt-->
						<!--									@blur="doorParamHandle('outDoorTwinkleCount1')"-->
						<!--								/>-->
						<!--								次-->
						<!--							</div>-->
						<!--							<div class="door_param_item_1_body">-->
						<!--								内门遮挡时间-->
						<!--								<el-input-->
						<!--									v-model.trim="paramsData.coverInnerDoorTime1"-->
						<!--									v-inputInt-->
						<!--									@blur="doorParamHandle('coverInnerDoorTime1')"-->
						<!--								/>-->
						<!--								s-->
						<!--							</div>-->
						<!--							<div class="door_param_item_1_body">-->
						<!--								内门闪烁次数-->
						<!--								<el-input-->
						<!--									v-model.trim="paramsData.innerDoorTwinkleCount1"-->
						<!--									v-inputInt-->
						<!--									@blur="doorParamHandle('innerDoorTwinkleCount1')"-->
						<!--								/>-->
						<!--								次-->
						<!--							</div>-->
						<!--						</div>-->
						<div class="door_param_item_2">
							<div class="door_param_item_2_l1 green_bg">风门开启</div>
							<div class="door_param_item_2_l2">
								开门时间
								<el-input
									v-model.trim="paramsData.openDoorTimeSet1"
									v-inputInt
									@blur="doorParamHandle('openDoorTimeSet1')"
								/>
								s
							</div>
							<div class="door_param_item_2_l3">
								<div class="green_bg">开到位</div>
								<div class="orange_bg">开超时</div>
							</div>
							<div class="door_param_item_2_l2">
								开位保持
								<el-input
									v-model.trim="paramsData.coverOutDoorTime1"
									v-inputInt
									@blur="doorParamHandle('coverOutDoorTime1')"
								/>
								s
							</div>
							<div class="door_param_item_2_l4">
								等待时间
								<el-input
									v-model.trim="paramsData.doorWaitTimeSet1"
									v-inputInt
									@blur="doorParamHandle('doorWaitTimeSet1')"
								/>
								s
							</div>
						</div>
						<div class="door_param_item_2">
							<div class="door_param_item_2_l1 orange_bg">风门关闭</div>
							<div class="door_param_item_2_l2">
								关门时间
								<el-input
									v-model.trim="paramsData.closeDoorTimeSet1"
									v-inputInt
									@blur="doorParamHandle('closeDoorTimeSet1')"
								/>
								s
							</div>
							<div class="door_param_item_2_l3">
								<div class="green_bg">关到位</div>
								<div class="orange_bg">关超时</div>
							</div>
							<div class="door_param_item_2_l2">
								关位保持
								<el-input
									v-model.trim="paramsData.closeFlagTime1"
									v-inputInt
									@blur="doorParamHandle('closeFlagTime1')"
								/>
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
								<div class="set_btn_default"><span>B风门参数设置</span></div>
							</border-box>
						</div>
						<!--						<div class="door_param_item_1">-->
						<!--							<div class="door_param_item_1_body">-->
						<!--								外门遮挡时间-->
						<!--								<el-input-->
						<!--									v-model.trim="paramsData.coverOutDoorTime2"-->
						<!--									v-inputInt-->
						<!--									@blur="doorParamHandle('coverOutDoorTime2')"-->
						<!--								/>-->
						<!--								s-->
						<!--							</div>-->
						<!--							<div class="door_param_item_1_body">-->
						<!--								外门闪烁次数-->
						<!--								<el-input-->
						<!--									v-model.trim="paramsData.outDoorTwinkleCount2"-->
						<!--									v-inputInt-->
						<!--									@blur="doorParamHandle('outDoorTwinkleCount2')"-->
						<!--								/>-->
						<!--								次-->
						<!--							</div>-->
						<!--							<div class="door_param_item_1_body">-->
						<!--								内门遮挡时间-->
						<!--								<el-input-->
						<!--									v-model.trim="paramsData.coverInnerDoorTime2"-->
						<!--									v-inputInt-->
						<!--									@blur="doorParamHandle('coverInnerDoorTime2')"-->
						<!--								/>-->
						<!--								s-->
						<!--							</div>-->
						<!--							<div class="door_param_item_1_body">-->
						<!--								内门闪烁次数-->
						<!--								<el-input-->
						<!--									v-model.trim="paramsData.innerDoorTwinkleCount2"-->
						<!--									v-inputInt-->
						<!--									@blur="doorParamHandle('innerDoorTwinkleCount2')"-->
						<!--								/>-->
						<!--								次-->
						<!--							</div>-->
						<!--						</div>-->
						<div class="door_param_item_2">
							<div class="door_param_item_2_l1 green_bg">风门开启</div>
							<div class="door_param_item_2_l2">
								开门时间
								<el-input
									v-model.trim="paramsData.openDoorTimeSet2"
									v-inputInt
									@blur="doorParamHandle('openDoorTimeSet2')"
								/>
								s
							</div>
							<div class="door_param_item_2_l3">
								<div class="green_bg">开到位</div>
								<div class="orange_bg">开超时</div>
							</div>
							<div class="door_param_item_2_l2">
								开位保持
								<el-input
									v-model.trim="paramsData.coverOutDoorTime2"
									v-inputInt
									@blur="doorParamHandle('coverOutDoorTime2')"
								/>
								s
							</div>
							<div class="door_param_item_2_l4">
								等待时间
								<el-input
									v-model.trim="paramsData.doorWaitTimeSet1"
									v-inputInt
									@blur="doorParamHandle('doorWaitTimeSet1')"
								/>
								s
							</div>
						</div>
						<div class="door_param_item_2">
							<div class="door_param_item_2_l1 orange_bg">风门关闭</div>
							<div class="door_param_item_2_l2">
								关门时间
								<el-input
									v-model.trim="paramsData.closeDoorTimeSet2"
									v-inputInt
									@blur="doorParamHandle('closeDoorTimeSet2')"
								/>
								s
							</div>
							<div class="door_param_item_2_l3">
								<div class="green_bg">关到位</div>
								<div class="orange_bg">关超时</div>
							</div>
							<div class="door_param_item_2_l2">
								关位保持
								<el-input
									v-model.trim="paramsData.closeFlagTime2"
									v-inputInt
									@blur="doorParamHandle('closeFlagTime2')"
								/>
								s
							</div>
							<div class="door_param_item_2_l4">完成</div>
						</div>
					</div>
				</border-box>
			</div>
		</div>

		<!--    更多弹窗-->
		<home-air-door-more
			v-if="moreVisible"
			v-model="moreVisible"
			title="风门"
			:data-form="dataForm"
		/>
		<!--    操作记录-->
		<DoorHisRecord v-if="hisRecordVisible" v-model="hisRecordVisible" :data-form="dataForm" />
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_air_door';
</style>
