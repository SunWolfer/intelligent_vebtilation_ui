<!--其他-->
<script setup>
	import { calOfAirDemand } from '@/api/request/windControlAssMaking/calOfAirDemand'

	const { dataForm, requiredAirVolume, dataForm3, dataForm8 } = calOfAirDemand()
</script>

<template>
	<border-box name="border3">
		<div class="cal_child_body">
			<el-form :model="dataForm">
				<el-form-item label="巷道名称">
					<el-select v-model="dataForm.name">
						<el-option label="111" value="111"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div class="cal_child_body_center child_head_body">
				<border-box name="border1">
					<div class="child_body_item">
						<div class="child_body_item_t1">
							<border-box name="border5">
								<div class="child_body_item_t1_text">按照瓦斯涌出预测</div>
							</border-box>
						</div>
						<div class="child_body_item_t2">
							<div class="child_body_item_t2_default">
								<span>人工输入</span>
							</div>
							<div class="child_body_item_t2_active">
								<span>智能实时</span>
							</div>
						</div>
						<div class="child_body_item_t3">
							<div class="child_body_item_t3_line">
								<span>瓦斯传感器</span>
								<el-input v-model="dataForm3.gasSensor" />
							</div>
							<div class="child_body_item_t3_line">
								<span>风速传感器 </span>
								<el-input v-model="dataForm3.windSensor" />
							</div>
							<div class="child_body_item_t3_line">
								<span>巷道截面积(㎡)</span>
								<el-input v-model="dataForm3.sectionalArea" />
							</div>
							<div class="child_body_item_t3_line">
								<span>月平均日产煤量(t/d)</span>
								<el-input v-model="dataForm3.yield" />
							</div>
							<div class="child_body_item_t3_line">
								<span>采煤工作面回风瓦斯涌出量(m³/min)</span>
								<el-input v-model="dataForm3.gushingAmount" />
							</div>
							<div class="child_body_item_t3_line">
								<span>采煤工作面瓦斯涌出备用风量系数</span>
								<el-input v-model="dataForm3.airVolumeCoefficient" />
							</div>
							<div class="child_body_item_t3_line">
								<span>按照瓦斯涌出预测所需风量(m³/min)</span>
								<el-input v-model="dataForm3.airVolume" />
							</div>
						</div>
					</div>
				</border-box>
				<border-box name="border1">
					<div class="child_body_item">
						<div class="child_body_item_t1">
							<border-box name="border5">
								<div class="child_body_item_t1_text">按照风速进行验算</div>
							</border-box>
						</div>
						<div class="child_body_item_t2"></div>
						<div class="child_body_item_t3">
							<div class="child_body_item_t3_line">
								<span>掘进工作面有效断面积(㎡)</span>
								<el-input v-model="dataForm8.sectionalArea" />
							</div>
							<div class="child_body_item_t3_line">
								<span>按照风速预测所需风量(m³/min)</span>
								<el-input v-model="dataForm8.airVolume" />
							</div>
						</div>
					</div>
				</border-box>
			</div>
			<div class="cal_child_body_bottom">
				预测工作面所需风量(m³/min)<el-input v-model="requiredAirVolume" />
				<div class="normal_btn">确认</div>
			</div>
		</div>
	</border-box>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/calOfAirDemand';
</style>
