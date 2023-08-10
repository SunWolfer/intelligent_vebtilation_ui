<!--工作面-->
<script setup>
	import { calOfAirDemand } from '@/api/request/windControlAssMaking/calOfAirDemand'

	const {
		dataForm,
		requiredAirVolume,
		dataForm1,
		dataForm2,
		dataForm3,
		dataForm4,
		dataForm5,
		dataForm6,
	} = calOfAirDemand()
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
			<div class="cal_child_body_center child_work_body">
				<div class="child_body_item_c1">
					<border-box name="border1">
						<div class="child_body_item">
							<div class="child_body_item_t1">
								<border-box name="border5">
									<div class="child_body_item_t1_text">按气象条件预测</div>
								</border-box>
							</div>
							<div class="child_body_item_t2"></div>
							<div class="child_body_item_t3">
								<div class="child_body_item_t3_line">
									<span>采煤工作面风速(m/s)</span>
									<el-input v-model="dataForm1.windSpeed" />
								</div>
								<div class="child_body_item_t3_line">
									<span>采煤工作面有效断面(㎡)</span>
									<el-input v-model="dataForm1.sectionalArea" />
								</div>
								<div class="child_body_item_t3_line">
									<span>采煤工作面高度风量系数</span>
									<el-input v-model="dataForm1.heightCoefficient" />
								</div>
								<div class="child_body_item_t3_line">
									<span>采煤工作面长度风量系数</span>
									<el-input v-model="dataForm1.lengthFactor" />
								</div>
								<div class="child_body_item_t3_line">
									<span>按气象条件预测所需风量(m³/min)</span>
									<el-input v-model="dataForm1.airVolume" />
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
									<div class="child_body_item_t1_text">按照风速进行验算</div>
								</border-box>
							</div>
							<div class="child_body_item_t2"></div>
							<div class="child_body_item_t3">
								<div class="child_body_item_t3_line">
									<span>工作面最大控顶有效断面积(㎡)</span>
									<el-input v-model="dataForm2.maxArea" />
								</div>
								<div class="child_body_item_t3_line">
									<span>工作面最小控顶有效断面积(㎡)</span>
									<el-input v-model="dataForm2.minArea" />
								</div>
								<div class="child_body_item_t3_line">
									<span>工作面实际采高(m)</span>
									<el-input v-model="dataForm2.miningHeight" />
								</div>
								<div class="child_body_item_t3_line">
									<span>工作面高度最大控顶距离(m)</span>
									<el-input v-model="dataForm2.maxDistance" />
								</div>
								<div class="child_body_item_t3_line">
									<span>工作面高度最小控顶距离(m)</span>
									<el-input v-model="dataForm2.minDistance" />
								</div>
								<div class="child_body_item_t3_line">
									<span>按照风速预测所需风量(m³/min)</span>
									<el-input v-model="dataForm2.airVolume" />
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
				</div>
				<div class="child_body_item_c4">
					<border-box name="border1">
						<div class="child_body_item">
							<div class="child_body_item_t1">
								<border-box name="border5">
									<div class="child_body_item_t1_text">按照二氧化碳涌出预测</div>
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
									<span>二氧化碳传感器 </span>
									<el-input v-model="dataForm4.carSensor" />
								</div>
								<div class="child_body_item_t3_line">
									<span>风速传感器 </span>
									<el-input v-model="dataForm4.windSensor" />
								</div>
								<div class="child_body_item_t3_line">
									<span>巷道截面积(㎡)</span>
									<el-input v-model="dataForm4.sectionalArea" />
								</div>
								<div class="child_body_item_t3_line">
									<span>月平均日产煤量(t/d)</span>
									<el-input v-model="dataForm4.yield" />
								</div>
								<div class="child_body_item_t3_line">
									<span>采煤工作面回风CO2涌出量(m³/min)</span>
									<el-input v-model="dataForm4.carAmount" />
								</div>
								<div class="child_body_item_t3_line">
									<span>采煤工作面CO2涌出备用风量系数</span>
									<el-input v-model="dataForm4.airVolumeCoefficient" />
								</div>
								<div class="child_body_item_t3_line">
									<span>按照CO2涌出预测所需风量(m³/min)</span>
									<el-input v-model="dataForm4.airVolume" />
								</div>
							</div>
						</div>
					</border-box>
				</div>
				<div class="child_body_item_c5">
					<border-box name="border1">
						<div class="child_body_item">
							<div class="child_body_item_t1">
								<border-box name="border5">
									<div class="child_body_item_t1_text">按照工作人员数量预测</div>
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
									<span>人员定位位置 </span>
									<el-input v-model="dataForm5.perLocation" />
								</div>
								<div class="child_body_item_t3_line">
									<span>采煤工作面同时工作最大人数(人) </span>
									<el-input v-model="dataForm5.maxPeoNum" />
								</div>
								<div class="child_body_item_t3_line">
									<span>按照工作人员数量预测所需风量(m³/min)</span>
									<el-input v-model="dataForm5.airVolume" />
								</div>
							</div>
						</div>
					</border-box>
				</div>
				<div class="child_body_item_c6">
					<border-box name="border1">
						<div class="child_body_item_2">
							<div class="child_body_item_t1">
								<border-box name="border5">
									<div class="child_body_item_t1_text">按照炸药量预测</div>
								</border-box>
							</div>
							<div class="child_body_item_t3">
								<div class="child_body_item_t3_line">
									<span>采煤工作面一次爆破最大炸药量(kg) </span>
									<el-input v-model="dataForm6.maxExpQuantity" />
								</div>
								<div class="child_body_item_t3_line">
									<span>按照炸药量预测所需风量(m³/min)</span>
									<el-input v-model="dataForm6.airVolume" />
								</div>
							</div>
						</div>
					</border-box>
				</div>
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
