<script setup>
	import AddOrUpdateAuxDecMakingRule from './AddOrUpdateAuxDecMakingRule.vue'
	import { auxDecMakingRules } from '@/api/request/windControlAssMaking/auxDecMakingRules'
	import useDict from '@/hooks/useDict'
	import { selectDictLabel } from '@/utils/ruoyi'
	import { useDictionary } from '@/api/request/windControlAssMaking/auxDecMakingRules/useDictionary'
	import { deviceTypes } from '@/types/menuType'

	const {
		queryParams,
		dataList,
		queryDataList,
		triggerTypeList,
		queryTriggerTypeList,
		detailTypeList,
		queryDetailTypeList,
		chooseRow,
		addOrUpdateVisible,
		handleAdd,
		handleUpdate,
		ruleList,
		previewForm,
		refreshList,
	} = auxDecMakingRules()

	const { execute_role, trigger_conditions, after_lifting } = useDict(
		'execute_role',
		'trigger_conditions',
		'after_lifting',
	)
	// 格式化触发条件
	const formatterTriggerConditions = (data) => {
		return selectDictLabel(trigger_conditions.value, data.triggerConditions)
	}

	const { formatterDevType, formatterActionType, formatterActionDirection, formatterDoorType } =
		useDictionary()

	queryTriggerTypeList?.()
	queryDetailTypeList?.()
	queryDataList?.()
</script>

<template>
	<div class="aux_body">
		<div class="aux_body_form">
			<el-form :model="queryParams" inline>
				<el-form-item label="触发点位类型">
					<el-select v-model="queryParams.triggerType" clearable>
						<el-option v-for="i in triggerTypeList" :key="i.code" :label="i.name" :value="i.code" />
					</el-select>
				</el-form-item>
				<el-form-item label="触发点位">
					<el-input clearable v-model="queryParams.triggerPoint" />
				</el-form-item>
				<el-form-item>
					<div class="normal_btn" @click="queryDataList">查询</div>
					<div class="normal_4_btn" @click="handleAdd">新增</div>
				</el-form-item>
			</el-form>
		</div>
		<el-table :data="dataList" border height="100%" highlight-current-row>
			<el-table-column label="触发点位类型" align="center" prop="triggerTypeName" />
			<el-table-column label="触发点位" align="center" prop="triggerPoint" />
			<el-table-column
				label="触发条件"
				align="center"
				prop="triggerConditions"
				:formatter="formatterTriggerConditions"
			/>
			<el-table-column label="触发值" align="center" prop="triggerValue" />
			<el-table-column label="决策规则" align="center">
				<template #default="scope">
					<el-button type="primary" link @click="previewForm(scope.row)">查看</el-button>
					<el-button type="primary" link @click="handleUpdate(scope.row)">修改</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="aux_body_rule" v-if="ruleList.length > 0">
			<div class="aux_body_rule_title">决策规则</div>
			<div class="aux_body_rule_text">
				<span>执行规则：</span>
				<span>{{ selectDictLabel(execute_role, chooseRow.executeRole) }}</span>
				<span>动作次数：</span>
				<span>{{ chooseRow.actionCount }}</span>
			</div>
			<div class="aux_body_rule_list">
				<template v-for="(item, index) in ruleList" :key="index">
					<div class="aux_body_rule_list_item">
						<border-box name="border1" background-color="rgba(24, 25, 49, 0.54)">
							<div class="fullDom aux_body_rule_list_item_body">
								<div class="aux_body_rule_list_item_body_line">
									<span>动作设备类型：</span>
									<span>{{ formatterDevType(item) }}</span>
								</div>
								<div class="aux_body_rule_list_item_body_line">
									<span>动作设备名称：</span>
									<span class="overText" :title="formatterDoorType(item)">{{
										formatterDoorType(item)
									}}</span>
								</div>
								<div class="aux_body_rule_list_item_body_line">
									<span>动作类型：</span>
									<span>{{ formatterActionType(item) }}</span>
								</div>
								<div class="aux_body_rule_list_item_body_line">
									<span>动作方向：</span>
									<span>{{ formatterActionDirection(item) }}</span>
								</div>
								<div class="aux_body_rule_list_item_body_line">
									<span>动作值：</span>
									<span>{{ item.actionValue }}</span>
								</div>
							</div>
						</border-box>
					</div>
				</template>
			</div>
		</div>
		<AddOrUpdateAuxDecMakingRule
			v-if="addOrUpdateVisible"
			v-model="addOrUpdateVisible"
			:choose-row="chooseRow"
			:trigger-type-list="triggerTypeList"
			:detail-type-list="detailTypeList"
			@refresh="refreshList"
		/>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/auxDecMakingRules/index';
</style>
