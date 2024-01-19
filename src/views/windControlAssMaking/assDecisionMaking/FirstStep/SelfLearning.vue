<script setup>
	import { useAuxAddOrUpdate } from '@/api/request/windControlAssMaking/auxDecMakingRules/useAuxAddOrUpdate'
	import { deviceTypes } from '@/types/menuType'
	import { useCommitForm } from '@/hooks/useForm'
	import { autoLearnDecision } from '@/api/api/auxDecMakingRules'

	const props = defineProps({
		chooseRow: {
			type: Object,
			default: () => {
				return {
					id: undefined,
				}
			},
		},
		modelValue: {
			type: Boolean,
			default: false,
		},
		triggerTypeList: {
			type: Array,
			default: () => {
				return []
			},
		},
		detailTypeList: {
			type: Array,
			default: () => {
				return []
			},
		},
	})
	const emits = defineEmits(['update:modelValue', 'refresh'])
	const {
		showDiaLog,
		title,
		execute_role,
		trigger_conditions,
		after_lifting,
		formRef,
		dataForm,
		rules,
		queryParamList,
		changeQueryTriggerType,
		changeParam,
		devType,
		doorType,
		dataList,
		addTableRow,
		minusTableRow,
		downRow,
		upRow,
		changeDevType,
		initData,
		formatterDataList,
	} = useAuxAddOrUpdate(props, emits)

	const submitForm = async () => {
		dataForm.value.detailList = formatterDataList?.()
		if (dataForm.value.detailList.length === 0) return

		formRef.value?.validate(async (valid) => {
			if (valid) {
				await useCommitForm(autoLearnDecision, {
					queryParams: dataForm.value,
					afterReadyDataFun: () => {
						emits('refresh')
						showDiaLog.value = false
					},
				})
			}
		})
	}

	initData?.()
</script>

<template>
	<dia-log
		v-model="showDiaLog"
		title="调控建议自学习"
		:width="1000"
		:height="760"
		has-bottom-btn
		:btn-list="['保存', '取消']"
		@submit="submitForm"
	>
		<el-form
			ref="formRef"
			class="fullDom aux_add_update"
			:model="dataForm"
			:rules="rules"
			label-width="auto"
		>
			<div class="aux_add_update_label">触发配置</div>
			<div class="aux_add_update_line_self">
				<el-form-item label="动作次数" prop="actionCount">
					<el-input v-model="dataForm.actionCount" v-inputInt />
				</el-form-item>
			</div>
			<div class="aux_add_update_label">触发点配置</div>
			<div class="aux_add_update_line">
				<el-form-item label="触发点类型" prop="triggerType">
					<el-select
						v-model="dataForm.triggerType"
						clearable
						@change="changeQueryTriggerType"
						disabled
					>
						<el-option v-for="i in triggerTypeList" :key="i.code" :label="i.name" :value="i.code" />
					</el-select>
				</el-form-item>
				<el-form-item label="触发点位" prop="triggerPointCode">
					<el-select v-model="dataForm.triggerPointCode" clearable @change="changeParam" disabled>
						<el-option v-for="i in queryParamList" :key="i.code" :label="i.name" :value="i.code" />
					</el-select>
				</el-form-item>
				<el-form-item label="触发条件" prop="triggerConditions">
					<el-select v-model="dataForm.triggerConditions" clearable>
						<el-option
							v-for="i in trigger_conditions"
							:key="i.value"
							:label="i.label"
							:value="i.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="触发值" prop="triggerValue">
					<el-input v-model="dataForm.triggerValue" />
				</el-form-item>
			</div>
			<div class="aux_add_update_line_2">
				<div class="aux_add_update_label">决策规则</div>
				<div class="icon_add" @click="addTableRow"></div>
			</div>
			<el-table :data="dataList" height="100%" border>
				<el-table-column label="序号" align="center" prop="orderNum" />
				<el-table-column label="动作设备类型" align="center" prop="devType">
					<template #default="scoped">
						<el-select v-model="scoped.row.devType" clearable @change="changeDevType(scoped.row)">
							<el-option
								v-for="i in detailTypeList"
								:key="i.code"
								:label="i.name"
								:value="i.code"
							/>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column label="动作类型" align="center" prop="actionType">
					<template #default="scoped">
						<el-select v-model="scoped.row.actionType" clearable>
							<el-option
								v-for="i in scoped.row.actionTypeList"
								:key="i.value"
								:label="i.label"
								:value="i.value"
							/>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column label="动作设备名称" align="center" prop="devId">
					<template #default="scoped">
						<el-select v-model="scoped.row.devId" clearable>
							<el-option
								v-for="i in scoped.row.devList"
								:key="i.code"
								:label="i.name"
								:value="i.code"
							/>
						</el-select>
						<el-select
							v-if="scoped.row.devType === deviceTypes.DOOR"
							v-model="scoped.row.doorName"
							clearable
						>
							<el-option v-for="i in doorType" :key="i.value" :label="i.label" :value="i.value" />
						</el-select>
					</template>
				</el-table-column>
				<el-table-column label="动作方向" align="center" prop="actionDirection">
					<template #default="scoped">
						<el-select v-model="scoped.row.actionDirection" clearable>
							<el-option
								v-for="i in scoped.row.actionDirectionList"
								:key="i.value"
								:label="i.label"
								:value="i.value"
							/>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column label="动作值" align="center" prop="actionValue">
					<template #default="scoped">
						<el-input v-model="scoped.row.actionValue" />
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="120">
					<template #default="scoped">
						<div class="icon_line">
							<div class="icon_down" @click="downRow(scoped.$index)"></div>
							<div class="icon_up" @click="upRow(scoped.$index)"></div>
							<div class="icon_minus" @click="minusTableRow(scoped.$index)"></div>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</el-form>
	</dia-log>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/auxDecMakingRules/auxDecMakingRulesAddOrUpdate';
	.aux_add_update {
		display: grid;
		grid-template-rows: vh(26) vh(40) vh(26) vh(91) vh(23) 1fr;
		grid-row-gap: vh(20);
	}
	.aux_add_update_line_self {
		display: flex;
		align-items: center;
	}
</style>
