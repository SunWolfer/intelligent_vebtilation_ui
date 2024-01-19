<!--串口(RS485)配置-->
<script setup>
	import { useDict } from '@/hooks/useDict'
	import { paramsRSSetting } from '@/api/request/doorParameterSettings/paramsRSSetting'

	const { rs_type, rs_baud, rs_check, rs_sensor_type } = useDict(
		'rs_type',
		'rs_baud',
		'rs_check',
		'rs_sensor_type',
	)

	const props = defineProps({
		dataFrom: {
			type: Object,
			default: () => {
				return {}
			},
		},
	})
	const emit = defineEmits(['update:dataFrom', 'setParam'])

	const { controlForm, dataList, rules, clearData, setParams, isDisable, isSensorDisable } =
		paramsRSSetting(props, emit)
</script>

<template>
	<div class="rs_setting">
		<template v-for="data in dataList" :key="data.id">
			<div class="rs_setting_item">
				<el-row>
					<el-col :span="20">
						<el-form :model="data" class="rs_setting_item_form" label-width="auto">
							<el-form-item :label="data.label1">
								<el-select
									filterable
									v-model="controlForm[data.value1]"
									clearable
									@change="clearData(data.value2, data.value3, data.value4)"
								>
									<el-option
										v-for="item in rs_type"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									/>
								</el-select>
							</el-form-item>
							<el-form-item :label="data.label2">
								<el-select
									filterable
									v-model="controlForm[data.value2]"
									clearable
									:disabled="isDisable(controlForm[data.value1])"
								>
									<el-option
										v-for="item in rs_baud"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									/>
								</el-select>
							</el-form-item>
							<el-form-item :label="data.label3">
								<el-select
									filterable
									v-model="controlForm[data.value3]"
									clearable
									:disabled="isDisable(controlForm[data.value1])"
								>
									<el-option
										v-for="item in rs_check"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									/>
								</el-select>
							</el-form-item>
							<el-form-item :label="data.label4">
								<el-select
									filterable
									v-model="controlForm[data.value4]"
									clearable
									:disabled="isSensorDisable(controlForm[data.value1])"
								>
									<el-option
										v-for="item in rs_sensor_type"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									/>
								</el-select>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="4">
						<div class="fullDom c-center">
							<div
								class="form-setting-img"
								@click="setParams(data.value1, data.value2, data.value3, data.value4)"
							></div>
						</div>
					</el-col>
				</el-row>
			</div>
		</template>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/door/rsSetting';
</style>
