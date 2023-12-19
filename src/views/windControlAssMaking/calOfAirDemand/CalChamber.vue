<!--硐室-->
<script setup>
	import { calChamberData } from '@/api/request/windControlAssMaking/calOfAirDemand/calChamberData'
	import { useCommitForm } from '@/hooks/useForm'
	import { addChamber, editChamber } from '@/api/api/calOfAirDemand'

	const props = defineProps({
		chooseRow: {
			type: Object,
			default: undefined,
		},
	})

	const { dataForm, dataList, dataFormInfo, resetForm, changeRoad } = calChamberData()

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
			await useCommitForm(editChamber, {
				queryParams: dataForm.value,
				afterReadyDataFun: () => {
					emits('changeTunnel')
				},
			})
		} else {
			await useCommitForm(addChamber, {
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
			<div class="cal_child_body_center child_work_body">
				<div class="child_body_item_c1">
					<border-box name="border1">
						<div class="child_body_item">
							<div class="child_body_item_t1">
								<border-box name="border5">
									<div class="set_btn_default"><span>按照爆破材料库预测</span></div>
								</border-box>
							</div>
							<div class="child_body_item_t2"></div>
							<div class="child_body_item_t3">
								<div class="child_body_item_t3_line">
									<span>井下爆炸材料库的体积(m³)</span>
									<el-input v-model="dataForm.powderVolume" />
								</div>
								<div class="child_body_item_t3_line">
									<span>按照爆破材料库预测所需风量(m³/min)</span>
									<el-input disabled v-model="dataForm.powderQ" />
								</div>
							</div>
						</div>
					</border-box>
				</div>
				<div class="child_body_item_c2">
					<border-box name="border1">
						<div class="child_body_item">
							<div class="child_body_item_t1">
								<border-box name="border5">
									<div class="set_btn_default"><span>按照充电硐室预测</span></div>
								</border-box>
							</div>
							<div class="child_body_item_t2"></div>
							<div class="child_body_item_t3">
								<div class="child_body_item_t3_line">
									<span>充电硐室充电时产生的氢气量(m³/min)</span>
									<el-input v-model="dataForm.chargingH2" />
								</div>
								<div class="child_body_item_t3_line">
									<span>按照充电硐室预测所需风量(m³/min)</span>
									<el-input disabled v-model="dataForm.chargingQ" />
								</div>
							</div>
						</div>
					</border-box>
				</div>
				<div class="child_body_item_c3">
					<border-box name="border1">
						<div class="child_body_item">
							<div class="child_body_item_t1">
								<border-box name="border5">
									<div class="set_btn_default"><span>按照机电硐室预测</span></div>
								</border-box>
							</div>
							<div class="child_body_item_t2"></div>
							<div class="child_body_item_t3">
								<div class="child_body_item_t3_line">
									<span>机电硐室中运转的电动机总功率(kW) </span>
									<el-input v-model="dataForm.electrPower" />
								</div>
								<div class="child_body_item_t3_line">
									<span>机电硐室发热系数</span>
									<el-input v-model="dataForm.electrHeatCoe" />
								</div>
								<div class="child_body_item_t3_line">
									<span>空气密度(kg/m³)</span>
									<el-input v-model="dataForm.electrDensity" />
								</div>
								<div class="child_body_item_t3_line">
									<span>空气定压比热(KJ/(kg.K))</span>
									<el-input v-model="dataForm.electrAireHeat" />
								</div>
								<div class="child_body_item_t3_line">
									<span>机电硐室进、回风流的温度差</span>
									<el-input v-model="dataForm.electrTempDiff" />
								</div>
								<div class="child_body_item_t3_line">
									<span>按照机电硐室预测所需风量(m³/min)</span>
									<el-input disabled v-model="dataForm.electrQ" />
								</div>
							</div>
						</div>
					</border-box>
				</div>
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
