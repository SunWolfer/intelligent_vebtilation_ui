<!--三维通风系统图管理-->
<script setup>
	import LoadVenSysManModel from '@/views/components/loadModel/loadVenSysManModel.vue'
	import { venSystemManagement } from '@/api/request/venManagement/venSystemManagement'
	import { TunnelBtn } from '@/components/VueThree/types/editType'
	import useEquipmentData from '@/hooks/useEquipmentData'

	const {
		modelRef,
		editType,
		addTunnel,
		deleteTunnel,
		bindSensorVisible,
		bindSensorHandle,
		chooseSensorType,
		cancelEdit,
		preserve,
		tunnelVisible,
		editBtnType,
		dataForm,
		sensorLabel,
		sensorList,
		tunnelHandle,
		tunnelForm,
		windDataForm,
		closeTunnelHandle,
	} = venSystemManagement()

	const { equipmentTypeList } = useEquipmentData()
</script>

<template>
	<div class="fullDom">
		<load-ven-sys-man-model ref="modelRef" :edit-type="editType" @tunnel-handle="tunnelHandle" />
		<!--    操作按钮-->
		<div class="ven_sys_operate">
			<div
				:class="editBtnType === TunnelBtn.ADD ? 'normal_4_btn_active' : 'normal_4_btn'"
				@click="addTunnel"
			>
				新增
			</div>
			<div
				:class="editBtnType === TunnelBtn.SENSOR ? 'normal_btn_active' : 'normal_btn'"
				@click="bindSensorHandle"
			>
				绑定设备
			</div>
			<div
				:class="editBtnType === TunnelBtn.DELETE ? 'normal_3_btn_active' : 'normal_3_btn'"
				@click="deleteTunnel"
			>
				删除
			</div>
			<div class="normal_2_btn" @click="cancelEdit">取消编辑</div>
			<div class="normal_btn" @click="preserve">保存</div>
		</div>
		<!--    设备-->
		<div class="ven_sys_sensor" v-if="bindSensorVisible">
			<border-box name="border3">
				<div class="ven_sys_sensor_body fullDom">
					<template v-for="item in equipmentTypeList">
						<div
							@click="chooseSensorType(item.modeType)"
							class="c-center"
							:class="editType === item.modeType ? 'ven_btn_active' : 'ven_btn'"
						>
							<span>{{ item.label }}</span>
						</div>
					</template>
					<div class="fullDom ven_btn_select c-center">
						<el-form :model="dataForm">
							<el-form-item :label="sensorLabel">
								<el-select v-model="dataForm.devId">
									<el-option v-for="i in sensorList" :label="i.label" :value="i.value"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</div>
					<div class="ven_btn_submit">
						<div class="normal_btn">确认</div>
						<div class="normal_btn" @click="cancelEdit">关闭</div>
					</div>
				</div>
			</border-box>
		</div>
		<div class="ven_sys_tunnel" v-if="tunnelVisible">
			<border-box name="border3">
				<div class="fullDom ven_sys_tunnel_body">
					<div class="ven_sys_tunnel_body_title_c1">
						<border-box name="border5">
							<div class="set_btn_default"><span>巷道信息</span></div>
						</border-box>
					</div>
					<div class="ven_sys_tunnel_body_title_c2">
						<border-box name="border5">
							<div class="set_btn_default"><span>通风数据</span></div>
						</border-box>
					</div>
					<div class="fullDom">
						<el-form
							:model="tunnelForm"
							inline
							class="ven_sys_tunnel_body_l2_c1"
							label-width="auto"
							label-position="left"
						>
							<el-form-item label="巷道名称">
								<el-input />
							</el-form-item>
							<el-form-item label="巷道编号">
								<el-input />
							</el-form-item>
							<el-form-item label="巷道周长(m)">
								<el-input />
							</el-form-item>
							<el-form-item label="巷道长度(m)">
								<el-input />
							</el-form-item>
							<el-form-item label="巷道断面积(㎡)">
								<el-input />
							</el-form-item>
							<el-form-item label="巷道形状">
								<el-input />
							</el-form-item>
							<el-form-item label="巷道支护类型">
								<el-input />
							</el-form-item>
							<el-form-item label="进回风类型">
								<el-input />
							</el-form-item>
							<el-form-item label="起始高程(m)">
								<el-input />
							</el-form-item>
							<el-form-item label="结束高程(m)">
								<el-input />
							</el-form-item>
						</el-form>
					</div>
					<div class="ven_sys_tunnel_body_l2_c2 fullDom"></div>
					<div class="fullDom">
						<el-form
							:model="windDataForm"
							inline
							class="ven_sys_tunnel_body_l2_c1"
							label-width="auto"
							label-position="left"
						>
							<el-form-item label="最大风量(m3/min)">
								<el-input />
							</el-form-item>
							<el-form-item label="计划风量(m3/min)">
								<el-input />
							</el-form-item>
							<el-form-item label="人工实测风量(m3/min)">
								<el-input />
							</el-form-item>
							<el-form-item label="人工实测时间">
								<el-input />
							</el-form-item>
							<el-form-item label="风阻(N·S2/m8)">
								<el-input />
							</el-form-item>
							<el-form-item label="摩擦系数(N·s2/m4)">
								<el-input />
							</el-form-item>
							<el-form-item label="局部阻力">
								<el-input />
							</el-form-item>
							<el-form-item label="风路分支图区域">
								<el-input />
							</el-form-item>
							<el-form-item label="风阻测定来源">
								<el-input />
							</el-form-item>
							<el-form-item label="人工测定风阻时间">
								<el-input />
							</el-form-item>
						</el-form>
					</div>
					<div class="ven_sys_tunnel_body_l3 fullDom">
						<div class="normal_btn">保存</div>
						<div class="normal_btn" @click="closeTunnelHandle">取消</div>
					</div>
				</div>
			</border-box>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/venManagement/venSystemManagement';
</style>
