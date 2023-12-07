<script setup>
	import { useAssMakingChild } from '@/api/request/windControlAssMaking/assDecisionMaking/useAssMakingChild'
	import { useDictionary } from '@/api/request/windControlAssMaking/auxDecMakingRules/useDictionary'
	import { parseTime, selectDictLabel } from '@/utils/ruoyi'
	import { deviceTypes } from '@/types/menuType'

	const {
		queryParams,
		dataList,
		queryDataList,
		detailsVisible,
		detailsData,
		detailsChildDataList,
		handleDetails,
		cancelDetails,
	} = useAssMakingChild()
	const { devType, actionType, actionDirection, doorType } = useDictionary()

	onMounted(() => {
		queryParams.value.state = '3'
		queryDataList?.()
	})
</script>

<template>
	<div class="child_body">
		<template v-if="detailsVisible">
			<div class="details_form fullDom">
				<div class="details_form_title">辅助决策</div>
				<div class="details_decision_line">
					<span>决策状态：<span class="text_yellow">执行完成</span></span>
					<span>建议时间：{{ parseTime(detailsData.recommendTime) }}</span>
					<span>开始时间：{{ parseTime(detailsData.startTime) }}</span>
					<span>完成时间：{{ parseTime(detailsData.endTime) }}</span>
				</div>
				<div class="details_form_title">调控原因</div>
				<span v-html="detailsData.reason"></span>
				<div class="details_form_title">调控建议</div>
				<div class="details_form_count">
					<span>调控次数</span>
					<span>{{ detailsData.actionCount }}</span>
				</div>
				<div class="details_form_child_list fullDom">
					<template v-for="item in detailsChildDataList">
						<border-box class="details_form_child" name="border1">
							<div class="details_form_child_body fullDom">
								<div class="details_form_child_body_line">
									<span>调控设备类型：</span>
									<span>{{ selectDictLabel(devType, item.devType) }}</span>
								</div>
								<div class="details_form_child_body_line">
									<span>调控设备名称： </span>
									<span
										>{{
											item.devName +
											(item.devType === deviceTypes.DOOR
												? selectDictLabel(doorType, item.doorName)
												: '')
										}}
									</span>
								</div>
								<div class="details_form_child_body_line">
									<span>{{
										`当前${item.devType === deviceTypes.LOCALFAN ? '频率' : '开度'}：`
									}}</span>
									<span v-show="item.initialValue">{{
										item.initialValue + `${item.devType === deviceTypes.LOCALFAN ? 'HZ' : '%'}`
									}}</span>
								</div>
								<div class="details_form_child_body_line">
									<span>调控类型：</span>
									<span>{{ selectDictLabel(actionType(item.devType), item.actionType) }}</span>
								</div>
								<div class="details_form_child_body_line">
									<span>调控方向：</span>
									<span>{{
										selectDictLabel(actionDirection(item.devType), item.actionDirection)
									}}</span>
								</div>
								<div class="details_form_child_body_line">
									<span>调控值：</span>
									<span>{{ item.actionValue }}</span>
								</div>
							</div>
						</border-box>
					</template>
				</div>
				<div class="details_form_title">执行结果</div>
				<span v-html="detailsData.executionResult"></span>
				<div class="third_step_details_result_list fullDom">
					<template v-for="item in detailsChildDataList">
						<border-box name="border1" class="third_step_details_result">
							<div class="third_step_details_result_body fullDom">
								<div class="details_form_child_body_line">
									<span>调控设备类型：</span>
									<span>{{ selectDictLabel(devType, item.devType) }}</span>
								</div>
								<div class="details_form_child_body_line">
									<span>调控设备名称： </span>
									<span
										>{{
											item.devName +
											(item.devType === deviceTypes.DOOR
												? selectDictLabel(doorType, item.doorName)
												: '')
										}}
									</span>
								</div>
								<div class="details_form_child_body_line">
									<span>{{
										`当前${item.devType === deviceTypes.LOCALFAN ? '频率' : '开度'}：`
									}}</span>
									<span v-show="item.finishValue">{{
										item.finishValue + `${item.devType === deviceTypes.LOCALFAN ? 'HZ' : '%'}`
									}}</span>
								</div>
							</div>
						</border-box>
					</template>
				</div>

				<div class="details_form_btn fullDom">
					<div class="normal_4_btn" @click="cancelDetails">返回</div>
				</div>
			</div>
		</template>
		<template v-else>
			<div class="third_step fullDom">
				<template v-for="data in dataList">
					<border-box name="border1" class="third_step_item">
						<div class="third_step_item_body fullDom">
							<span>调控原因：</span>
							<span v-html="data.reason"></span>
							<span>建议时间：</span>
							<span>{{ parseTime(data.recommendTime) }}</span>
							<span>开始时间：</span>
							<span>{{ parseTime(data.startTime) }}</span>
							<span>完成时间：</span>
							<span>{{ parseTime(data.endTime) }}</span>
							<div class="details_btn" @click="handleDetails(data)">调控详情</div>
						</div>
					</border-box>
				</template>
			</div>
		</template>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/assDecisionMaking/index';
	.third_step {
		display: flex;
		flex-wrap: wrap;
		column-gap: vw(25);
		row-gap: vh(20);
		overflow-y: auto;
	}
	.third_step_item {
		width: vw(485);
		height: vh(350);
	}
	.third_step_item_body {
		padding: vh(34) vw(40);
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(8, vh(30)) 1fr;
		align-items: center;
		font-size: vw(16);
		font-family:
			Adobe Heiti Std,
			serif;
		font-weight: normal;
		color: #ffffff;
		line-height: vh(30);
		.details_btn {
			align-self: end;
		}
	}
	.details_form {
		grid-template-rows: repeat(2, vh(40) vh(85)) vh(40) vh(60) vh(200) vh(40) vh(50) 1fr vh(40);
	}
	.third_step_details_result_list {
		display: flex;
		flex-wrap: wrap;
		column-gap: vw(15);
		row-gap: vh(15);
		overflow-y: auto;
		height: vh(130);
	}
	.third_step_details_result {
		width: vw(465);
		height: vh(130);
	}
	.third_step_details_result_body {
		padding: vh(20) vw(30);
		display: grid;
		grid-template-columns: vw(150) 1fr;
		grid-column-gap: vw(40);
		grid-template-rows: repeat(2, 1fr);
		align-items: center;
	}
</style>
