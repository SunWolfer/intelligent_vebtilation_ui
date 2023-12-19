<!--其他-->
<script setup>
	import { calOtherData } from '@/api/request/windControlAssMaking/calOfAirDemand/calOtherData'
	import { useCommitForm } from '@/hooks/useForm'
	import { addOtherRoad, editOtherRoad } from '@/api/api/calOfAirDemand'

	const props = defineProps({
		chooseRow: {
			type: Object,
			default: undefined,
		},
	})

	const {
		dataFormInfo,
		dataList,
		wind_predict_type,
		dataForm,
		resetForm,
		checkPredictType,
		windList,
		gasList,
		chooseWindList,
		chooseGasList,
		gasS,
		changeRoad,
	} = calOtherData()

	watch(
		() => props.chooseRow,
		async (val) => {
			if (!val || val.id === dataForm.value.roadCode) return
			const data = await dataFormInfo?.(val.id)
			if (data) {
				dataForm.value = data
			} else {
				resetForm?.()
			}
		},
	)
	const emits = defineEmits(['changeTunnel', 'clearRow'])

	watch(
		() => dataForm.value.roadCode,
		(val) => {
			emits('clearRow', val)
		},
	)

	const submitForm = async () => {
		if (dataForm.value.airVolume === '0.00') return
		// 修改
		if (dataForm.value.mainId) {
			await useCommitForm(editOtherRoad, {
				queryParams: dataForm.value,
				afterReadyDataFun: () => {
					emits('changeTunnel')
				},
			})
		} else {
			await useCommitForm(addOtherRoad, {
				queryParams: dataForm.value,
				afterReadyDataFun: () => {
					changeRoad?.()
					emits('changeTunnel')
				},
			})
		}
	}
</script>

<template>
	<border-box name="border3">
		<div class="cal_child_body">
			<el-form :model="dataForm">
				<el-form-item label="巷道名称">
					<el-select v-model="dataForm.roadCode" @change="changeRoad" clearable>
						<el-option
							v-for="i in dataList"
							:key="i.code"
							:label="i.name + '  ' + i.code"
							:value="i.code"
						/>
					</el-select>
				</el-form-item>
			</el-form>
			<div class="cal_child_body_center child_head_body">
				<border-box name="border1">
					<div class="child_body_item">
						<div class="child_body_item_t1">
							<border-box name="border5">
								<div class="set_btn_default"><span>按照瓦斯涌出预测</span></div>
							</border-box>
						</div>
						<div class="child_body_item_t2">
							<div
								v-for="(i, index) in wind_predict_type"
								:key="index"
								:class="
									dataForm.gasPredictType === i.value
										? 'child_body_item_t2_active'
										: 'child_body_item_t2_default'
								"
								@click="checkPredictType(i.value)"
							>
								<span>{{ i.label }}</span>
							</div>
						</div>
						<div class="child_body_item_t3">
							<template v-if="dataForm.gasPredictType === '1'">
								<div class="child_body_item_t3_line">
									<span>瓦斯传感器</span>
									<el-select v-model="dataForm.gasSneosrCode" @change="chooseGasList" clearable>
										<el-option v-for="i in gasList" :key="i.code" :label="i.name" :value="i.code" />
									</el-select>
								</div>
								<div class="child_body_item_t3_line">
									<span>风速传感器 </span>
									<el-select v-model="dataForm.gasWindSensor" @change="chooseWindList" clearable>
										<el-option
											v-for="i in windList"
											:key="i.code"
											:label="i.name"
											:value="i.code"
										/>
									</el-select>
								</div>
								<div class="child_body_item_t3_line">
									<span>巷道截面积(㎡)</span>
									<el-input v-model="gasS" />
								</div>
							</template>
							<div class="child_body_item_t3_line">
								<span>其它用风巷道回风瓦斯涌出量(m³/min)</span>
								<el-input
									:disabled="dataForm.gasPredictType === '1'"
									v-model="dataForm.gasEmission"
								/>
							</div>
							<div class="child_body_item_t3_line">
								<span>其它用风巷道瓦斯涌出备用风量系数</span>
								<el-input v-model="dataForm.gasAirCoe" />
							</div>
							<div class="child_body_item_t3_line">
								<span>按照瓦斯涌出预测所需风量(m³/min)</span>
								<el-input disabled v-model="dataForm.gasQ" />
							</div>
						</div>
					</div>
				</border-box>
				<border-box name="border1">
					<div class="child_body_item">
						<div class="child_body_item_t1">
							<border-box name="border5">
								<div class="set_btn_default"><span>按照风速进行验算</span></div>
							</border-box>
						</div>
						<div class="child_body_item_t2"></div>
						<div class="child_body_item_t3">
							<div class="child_body_item_t3_line">
								<span>一般巷道有效断面积(㎡)</span>
								<el-input v-model="dataForm.gasSurface" />
							</div>
							<div class="child_body_item_t3_line">
								<span>按照风速预测所需风量(m³/min)</span>
								<el-input disabled v-model="dataForm.speedQ" />
							</div>
						</div>
					</div>
				</border-box>
			</div>
			<div class="cal_child_body_bottom">
				预测工作面所需风量(m³/min)<el-input disabled v-model="dataForm.airVolume" />
				<div class="normal_btn" v-if="dataForm.roadCode" @click="submitForm">确认</div>
			</div>
		</div>
	</border-box>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/calOfAirDemand';
</style>
