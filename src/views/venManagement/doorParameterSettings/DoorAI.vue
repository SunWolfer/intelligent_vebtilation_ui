<script setup>
	import { paramsAISetting } from '@/api/request/doorParameterSettings/paramsAISetting'
	import useDict from '@/hooks/useDict'

	const props = defineProps({
		dataFrom: {
			type: Object,
			default: () => {
				return {}
			},
		},
	})
	const emit = defineEmits(['update:dataFrom', 'setParam'])

	const { ai_type, ai_sensor_type, ai_sensor_factory, ai_sensor_model } = useDict(
		'ai_type',
		'ai_sensor_type',
		'ai_sensor_factory',
		'ai_sensor_model',
	)

	const { dataList, resetForm, controlForm, isDisable, setParams } = paramsAISetting(props, emit)
</script>

<template>
	<div class="ai_setting fullDom">
		<template v-for="data in dataList" :key="data.id">
			<div class="ai_setting_item">
				<el-form :model="data" label-width="auto" class="ai_setting_item_form">
					<el-form-item :label="data.label1" prop="value1">
						<el-select
							filterable
							v-model="controlForm[data.value1]"
							clearable
							@change="
								resetForm(
									data.value2,
									data.value3,
									data.value4,
									data.value5,
									data.value6,
									data.value7,
								)
							"
						>
							<el-option
								v-for="item in ai_type"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
						</el-select>
					</el-form-item>
					<el-form-item :label="data.label2" prop="value2">
						<el-input
							v-model="controlForm[data.value2]"
							:disabled="isDisable(controlForm[data.value1])"
						/>
					</el-form-item>
					<el-form-item :label="data.label3" prop="value3">
						<el-input
							v-model="controlForm[data.value3]"
							:disabled="isDisable(controlForm[data.value1])"
						/>
					</el-form-item>
					<el-form-item :label="data.label4" prop="value4">
						<el-input
							v-model="controlForm[data.value4]"
							:disabled="isDisable(controlForm[data.value1])"
						/>
					</el-form-item>
					<el-form-item :label="data.label5" prop="value5">
						<el-select
							filterable
							v-model="controlForm[data.value5]"
							clearable
							:disabled="isDisable(controlForm[data.value1])"
						>
							<el-option
								v-for="item in ai_sensor_type"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
						</el-select>
					</el-form-item>
					<el-form-item :label="data.label6" prop="value6">
						<el-select
							filterable
							v-model="controlForm[data.value6]"
							clearable
							:disabled="isDisable(controlForm[data.value1])"
						>
							<el-option
								v-for="item in ai_sensor_factory"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
						</el-select>
					</el-form-item>
					<el-form-item :label="data.label7" prop="value7">
						<el-select
							filterable
							v-model="controlForm[data.value7]"
							clearable
							:disabled="isDisable(controlForm[data.value1])"
						>
							<el-option
								v-for="item in ai_sensor_model"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label=" ">
						<el-button
							class="add-btn"
							icon="Setting"
							@click="
								setParams(
									data.value1,
									data.value2,
									data.value3,
									data.value4,
									data.value5,
									data.value6,
									data.value7,
								)
							"
							>设置</el-button
						>
					</el-form-item>
				</el-form>
			</div>
		</template>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/door/aISetting';
</style>
