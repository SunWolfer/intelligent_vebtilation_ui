<!--掘进面-->
<script setup>
	import { calHeadingFaceData } from '@/api/request/windControlAssMaking/calOfAirDemand/calHeadingFaceData'
	import { useCommitForm } from '@/hooks/useForm'
	import { addTunnelFace, editTunnelFace } from '@/api/api/calOfAirDemand'

	const props = defineProps({
		chooseRow: {
			type: Object,
			default: undefined,
		},
	})

	const {
		dataList,
		wind_predict_type,
		num_yes_no,
		dataForm,
		checkPredictType,
		windList,
		gasList,
		chooseWindList,
		chooseGasList,
		gasS,
		co2List,
		chooseCo2WindList,
		chooseCo2List,
		co2S,
		checkCo2PredictType,
		personList,
		choosePersonList,
		checkPersonDictType,
		dataFormInfo,
		resetForm,
		changeRoad,
	} = calHeadingFaceData()

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
			await useCommitForm(editTunnelFace, {
				queryParams: dataForm.value,
				afterReadyDataFun: () => {
					emits('changeTunnel')
				},
			})
		} else {
			await useCommitForm(addTunnelFace, {
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
							:label="i.name + '  ' + i.code"
							:value="i.code"
						></el-option>
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
								v-for="i in wind_predict_type"
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
										<el-option v-for="i in gasList" :label="i.name" :value="i.code"></el-option>
									</el-select>
								</div>
								<div class="child_body_item_t3_line">
									<span>风速传感器 </span>
									<el-select v-model="dataForm.gasWindSensor" @change="chooseWindList" clearable>
										<el-option v-for="i in windList" :label="i.name" :value="i.code"></el-option>
									</el-select>
								</div>
								<div class="child_body_item_t3_line">
									<span>巷道截面积(㎡)</span>
									<el-input v-model="gasS" />
								</div>
							</template>

							<div class="child_body_item_t3_line">
								<span>掘进工作面回风瓦斯涌出量(m³/min)</span>
								<el-input
									:disabled="dataForm.gasPredictType === '1'"
									v-model="dataForm.gasEmission"
								/>
							</div>
							<div class="child_body_item_t3_line">
								<span>掘进工作面瓦斯涌出备用风量系数</span>
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
								<div class="set_btn_default"><span>按照二氧化碳涌出预测</span></div>
							</border-box>
						</div>
						<div class="child_body_item_t2">
							<div
								v-for="i in wind_predict_type"
								:class="
									dataForm.co2PredictType === i.value
										? 'child_body_item_t2_active'
										: 'child_body_item_t2_default'
								"
								@click="checkCo2PredictType(i.value)"
							>
								<span>{{ i.label }}</span>
							</div>
						</div>
						<div class="child_body_item_t3">
							<template v-if="dataForm.co2PredictType === '1'">
								<div class="child_body_item_t3_line">
									<span>二氧化碳传感器 </span>
									<el-select v-model="dataForm.co2SneosrCode" @change="chooseCo2List" clearable>
										<el-option v-for="i in co2List" :label="i.name" :value="i.code"></el-option>
									</el-select>
								</div>
								<div class="child_body_item_t3_line">
									<span>风速传感器 </span>
									<el-select v-model="dataForm.co2WindSensor" @change="chooseCo2WindList" clearable>
										<el-option v-for="i in windList" :label="i.name" :value="i.code"></el-option>
									</el-select>
								</div>
								<div class="child_body_item_t3_line">
									<span>巷道截面积(㎡)</span>
									<el-input v-model="co2S" />
								</div>
							</template>

							<div class="child_body_item_t3_line">
								<span>掘进工作面回风CO2涌出量(m³/min)</span>
								<el-input
									:disabled="dataForm.co2PredictType === '1'"
									v-model="dataForm.co2Emission"
								/>
							</div>
							<div class="child_body_item_t3_line">
								<span>掘进工作面CO2涌出备用风量系数</span>
								<el-input v-model="dataForm.co2AirCoe" />
							</div>
							<div class="child_body_item_t3_line">
								<span>按照CO2涌出预测所需风量(m³/min)</span>
								<el-input v-model="dataForm.co2Q" />
							</div>
						</div>
					</div>
				</border-box>
				<border-box name="border1">
					<div class="child_body_item">
						<div class="child_body_item_t1">
							<border-box name="border5">
								<div class="set_btn_default"><span>按照工作人员数量预测</span></div>
							</border-box>
						</div>
						<div class="child_body_item_t2">
							<div
								v-for="i in wind_predict_type"
								:class="
									dataForm.personPredictType === i.value
										? 'child_body_item_t2_active'
										: 'child_body_item_t2_default'
								"
								@click="checkPersonDictType(i.value)"
							>
								<span>{{ i.label }}</span>
							</div>
						</div>
						<div class="child_body_item_t3">
							<template v-if="dataForm.personPredictType === '1'">
								<div class="child_body_item_t3_line">
									<span>人员定位位置 </span>
									<el-select v-model="dataForm.personAre" @change="choosePersonList" clearable>
										<el-option v-for="i in personList" :label="i.name" :value="i.code"></el-option>
									</el-select>
								</div>
							</template>

							<div class="child_body_item_t3_line">
								<span>掘进工作面同时工作最大人数(人) </span>
								<el-input
									:disabled="dataForm.personPredictType === '1'"
									v-model="dataForm.personTotal"
								/>
							</div>
							<div class="child_body_item_t3_line">
								<span>按照工作人员数量预测所需风量(m³/min)</span>
								<el-input v-model="dataForm.personQ" />
							</div>
						</div>
					</div>
				</border-box>
				<border-box name="border1">
					<div class="child_body_item_2">
						<div class="child_body_item_t1">
							<border-box name="border5">
								<div class="set_btn_default"><span>按照炸药量预测</span></div>
							</border-box>
						</div>
						<div class="child_body_item_t3">
							<div class="child_body_item_t3_line">
								<span>掘进工作面一次爆破最大炸药量(kg) </span>
								<el-input v-model="dataForm.powderTotal" />
							</div>
							<div class="child_body_item_t3_line">
								<span>按照炸药量预测所需风量(m³/min)</span>
								<el-input disabled v-model="dataForm.powderQ" />
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
								<span>掘进工作面有效断面积(㎡)</span>
								<el-input v-model="dataForm.speedSurface" />
							</div>
							<div class="child_body_item_t3_line">
								<span>是否有瓦斯涌出</span>
								<el-select v-model="dataForm.speedGasEmission" clearable>
									<el-option v-for="i in num_yes_no" :label="i.label" :value="i.value"></el-option>
								</el-select>
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
