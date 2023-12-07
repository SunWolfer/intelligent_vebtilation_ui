<script setup>
	import { usePermission } from '@/hooks/usePermission'
	import CancelControl from './CencelControl.vue'
	import SelfLearning from './SelfLearning.vue'
	import { parseTime, selectDictLabel, isNull } from '@/utils/ruoyi'
	import { useAssMakingChild } from '@/api/request/windControlAssMaking/assDecisionMaking/useAssMakingChild'
	import { useDictionary } from '@/api/request/windControlAssMaking/auxDecMakingRules/useDictionary'
	import { deviceTypes } from '@/types/menuType'
	import { useCommitForm } from '@/hooks/useForm'
	import { beginRegulation, cancelRegulation } from '@/api/api/auxDecMakingRules'
	import useCurrentInstance from '@/hooks/useCurrentInstance'

	const {
		queryParams,
		dataList,
		queryDataList,
		triggerTypeList,
		queryTriggerTypeList,
		detailTypeList,
		queryDetailTypeList,
		detailsVisible,
		detailsData,
		detailsChildDataList,
		handleDetails,
		cancelDetails,
	} = useAssMakingChild()

	const { devType, actionType, actionDirection, doorType } = useDictionary()
	// 权限认证
	const { validateFun, confirmFun } = usePermission()
	// 执行调控认证
	const executeRegulation = () => {
		if (validateDetailsList()) return

		let hasFan = false
		for (let i = 0; i < detailsChildDataList.value.length; i++) {
			if (detailsChildDataList.value[i].devType === deviceTypes.LOCALFAN) {
				hasFan = true
				break
			}
		}
		if (hasFan) {
			validateFun?.(async () => {
				await handleRegulation()
			})
		} else {
			confirmFun?.(handleRegulation)
		}
	}

	const handleRegulation = async () => {
		await useCommitForm(beginRegulation, {
			queryParams: {
				...detailsData.value,
				detailList: detailsChildDataList.value,
			},
			afterReadyDataFun: cancelDetails,
		})
	}

	const { proxy } = useCurrentInstance()

	const validateDetailsList = () => {
		let passValidate = false
		if (isNull(detailsData.value.actionCount)) {
			proxy.$modal.msgWarning('调控次数不能为空')
			return true
		}
		for (let i = 0; i < detailsChildDataList.value.length; i++) {
			let data = detailsChildDataList.value[i]
			passValidate = isNull(data.actionValue)
			if (passValidate) break
		}
		if (passValidate) {
			proxy.$modal.msgWarning('调控值不能为空')
		}
		return passValidate
	}

	// 取消调控弹窗
	const cancelControlVisible = ref(false)
	const setCancelControl = () => {
		cancelControlVisible.value = true
	}
	const controlCancelRegulation = async () => {
		await useCommitForm(cancelRegulation, {
			queryParams: {
				id: detailsData.value.id,
			},
			afterReadyDataFun: cancelDetails,
		})
	}
	// 调控建议自学习弹窗
	const selfLeaningVisible = ref(false)
	const handleSelfLeaning = () => {
		selfLeaningVisible.value = true
	}

	onMounted(() => {
		queryTriggerTypeList?.()
		queryDetailTypeList?.()
		queryParams.value.state = '1'
		queryDataList?.()
	})
</script>

<template>
	<div class="child_body">
		<!--    详情-->
		<template v-if="detailsVisible">
			<div class="details_form fullDom">
				<div class="details_form_title">辅助决策</div>
				<div class="details_decision_line">
					<span>决策状态：<span class="text_yellow">待执行</span></span>
					<span>建议时间：{{ parseTime(detailsData.recommendTime) }}</span>
				</div>
				<div class="details_form_title">调控原因</div>
				<span v-html="detailsData.reason"></span>
				<div class="details_form_title">调控建议</div>
				<div class="details_form_count">
					<span>调控次数</span>
					<el-input v-model="detailsData.actionCount" v-inputInt />
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
									<el-input v-model="item.actionValue" />
								</div>
							</div>
						</border-box>
					</template>
				</div>
				<div class="details_form_btn fullDom">
					<div class="normal_2_btn" @click="executeRegulation">执行调控</div>
					<div class="normal_btn" @click="setCancelControl">取消调控</div>
					<div class="normal_4_btn" @click="cancelDetails">返回</div>
				</div>
			</div>
		</template>
		<!--    总列表-->
		<template v-else>
			<div class="first_step fullDom">
				<template v-for="data in dataList">
					<border-box name="border1" class="first_step_item">
						<div class="first_step_item_body fullDom">
							<span>调控原因：</span>
							<span v-html="data.reason"></span>
							<span>建议时间：</span>
							<span>{{ parseTime(data.recommendTime) }}</span>
							<div class="details_btn" @click="handleDetails(data)">调控详情</div>
						</div>
					</border-box>
				</template>
			</div>
		</template>
		<!--    取消调控弹窗-->
		<CancelControl
			v-if="cancelControlVisible"
			v-model="cancelControlVisible"
			@submit="handleSelfLeaning"
			@cancel="controlCancelRegulation"
		/>
		<!--    调控建议自学习弹窗-->
		<SelfLearning
			v-if="selfLeaningVisible"
			v-model="selfLeaningVisible"
			:detail-type-list="detailTypeList"
			:trigger-type-list="triggerTypeList"
			:choose-row="detailsData"
			@refresh="cancelDetails"
		/>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/assDecisionMaking/index';
	@import '@/assets/styles/windControlAssMaking/assDecisionMaking/firstStep';
</style>
