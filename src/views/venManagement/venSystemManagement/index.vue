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
	} = venSystemManagement()

	const { equipmentTypeList } = useEquipmentData()
</script>

<template>
	<div class="fullDom">
		<load-ven-sys-man-model ref="modelRef" :edit-type="editType" />
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
			<border-box name="border3"></border-box>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/venManagement/venSystemManagement';
</style>
