<!--三维通风系统图管理-->
<script setup>
	import LoadVenSysManModel from '@/views/components/loadModel/loadVenSysManModel.vue'
	import { venSystemManagement } from '@/api/request/venManagement/venSystemManagement/venSystemManagement'
	import { EditType, TunnelBtn } from '@/components/VueThree/types/editType'
	import useEquipmentData from '@/hooks/useEquipmentData'
	import EditTunnelVersion from '@/views/venManagement/venSystemManagement/EditTunnelVersion.vue'
	import { customizeThreeData } from '@/api/request/venManagement/venSystemManagement/customizeThreeData'
	import { useCommitForm } from '@/hooks/useForm'
	import {
		bindDevice,
		roadHaveDeviceList,
		roadwayModelEdit,
		setModelUse,
	} from '@/api/api/venSystemManagement'
	import useCurrentInstance from '@/hooks/useCurrentInstance'
	import useEquipment from '@/store/modules/equipmentData'
	import { useTunnelData } from '@/hooks/useTunnelData'
	import { useGainList } from '@/hooks/useGainList'
	import { listRegion } from '@/api/api/roadwayManagement'
	import useDict from '@/hooks/useDict'

	const {
		modelRef,
		editType,
		addTunnel,
		deleteTunnel,
		bindSensorVisible,
		bindSensorHandle,
		chooseSensorType,
		cancelEdit,
		editBtnType,
		dataForm,
		sensorLabel,
		sensorList,
		sensorType,
	} = venSystemManagement()

	const { equipmentTypeList } = useEquipmentData()

	const {
		getSysVersion,
		customizeData,
		customizeMaxNodeNum,
		readyThreeModel,
		editVisible,
		handleEdit,
		dataForm: versionForm,
		tunnelVisible,
		tunnelForm,
		tunnelHandle,
		confirmList,
		submitTunnelForm,
		closeTunnelHandle,
		tunnelColor,
		chooseTunnel,
		handleColor,
		changeVersion,
		chooseTunnelData,
		intersectedPosition,
	} = customizeThreeData()

	const { need_cal_type } = useDict('need_cal_type')

	const { vent_shape, shore_type, ven_air_direction, vent_source } = useTunnelData()
	// 查询风路分支图区域
	const { dataList: regionList } = useGainList({
		apiFun: listRegion,
	})
	// 监听编辑
	watch(
		() => editType.value,
		(value) => {
			if (value !== EditType.DEFAULT) closeTunnelHandle?.()
		},
	)
	const { proxy } = useCurrentInstance()
	// 保存
	const preserve = async () => {
		cancelEdit?.()
		// 	获取改变巷道
		const redrawList = modelRef.value?.changeHandle()
		const { newTunnel, deleteTunnel } = redrawList
		const names = deleteTunnel.map((i) => {
			return {
				code: i.nodeName + '-' + i.nextNode,
			}
		})
		const { data } = await roadHaveDeviceList(names)
		const puList = data.filter((i) => i.have)
		if (puList.length) {
			const name = puList.map((i) => i.code)
			proxy.$modal.msgWarning(`编号为${name.toString()}的巷道已绑定设备`)
		} else {
			await useCommitForm(roadwayModelEdit, {
				queryParams: {
					tag: versionForm.tag,
					roadwayModelBodyList: [
						{
							type: 'insert',
							children: newTunnel,
						},
						{
							type: 'delete',
							children: deleteTunnel,
						},
					],
				},
				afterReadyDataFun: () => {
					modelRef.value?.redrawModel(redrawList)
				},
			})
		}
	}
	// 发布模型到系统
	const handlePublic = async () => {
		await useCommitForm(setModelUse, {
			queryParams: {
				tag: versionForm.tag,
			},
		})
	}
	const equipmentData = useEquipment()
	//   绑定设备
	const bindSensor = async () => {
		if (!chooseTunnelData.value || !dataForm.value.devId) return
		await useCommitForm(bindDevice, {
			queryParams: {
				devId: dataForm.value.devId,
				devType: sensorType.value,
				mapModelCode: chooseTunnelData.value.name,
				pointX: intersectedPosition.value.x,
				pointY: intersectedPosition.value.y,
				pointZ: intersectedPosition.value.z,
			},
			afterReadyDataFun: async () => {
				equipmentData.updateData()
			},
		})
	}

	//   获取模型信息
	onMounted(async () => {
		await getSysVersion?.()
	})
</script>

<template>
	<div class="fullDom">
		<load-ven-sys-man-model
			ref="modelRef"
			v-if="readyThreeModel"
			:edit-type="editType"
			:customize-data="customizeData"
			:customize-max-node-num="customizeMaxNodeNum"
			@tunnel-handle="tunnelHandle"
			@choose-tunnel="chooseTunnel"
		/>
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
			<div class="normal_btn" @click="handleEdit">切换编辑版本</div>
			<div class="normal_btn" @click="getSysVersion">重置</div>
			<div class="normal_btn" @click="preserve">保存</div>
			<div class="normal_btn" @click="handlePublic">发布到系统</div>
			<div class="normal_2_btn" @click="handleColor">改变巷道颜色</div>
			<div class="p-center">
				<el-color-picker v-model="tunnelColor" />
			</div>
		</div>
		<!--    设备-->
		<div class="ven_sys_sensor" v-if="bindSensorVisible">
			<border-box name="border3">
				<div class="ven_sys_sensor_body fullDom">
					<template v-for="(item, index) in equipmentTypeList" :key="index">
						<div
							@click="chooseSensorType(item)"
							class="c-center"
							:class="editType === item.modeType ? 'ven_btn_active' : 'ven_btn'"
						>
							<span>{{ item.label }}</span>
						</div>
					</template>
					<div class="fullDom ven_btn_select c-center">
						<el-form :model="dataForm">
							<el-form-item :label="sensorLabel">
								<el-select v-model="dataForm.devId" clearable>
									<el-option v-for="i in sensorList" :key="i.id" :label="i.name" :value="i.id" />
								</el-select>
							</el-form-item>
						</el-form>
					</div>
					<div class="ven_btn_submit">
						<div class="normal_btn" @click="bindSensor">确认</div>
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
								<el-input v-model="tunnelForm.name" />
							</el-form-item>
							<el-form-item label="巷道编号">
								<el-input v-model="tunnelForm.code" />
							</el-form-item>
							<el-form-item label="巷道周长(m)">
								<el-input v-model="tunnelForm.circumference" />
							</el-form-item>
							<el-form-item label="巷道长度(m)">
								<el-input v-model="tunnelForm.length" />
							</el-form-item>
							<el-form-item label="巷道断面积(㎡)">
								<el-input v-model="tunnelForm.surface" />
							</el-form-item>
							<el-form-item label="巷道形状">
								<el-select v-model="tunnelForm.ventShape" clearable>
									<el-option
										v-for="i in vent_shape"
										:key="i.value"
										:label="i.label"
										:value="i.value"
									/>
								</el-select>
							</el-form-item>
							<el-form-item label="巷道支护类型">
								<el-select v-model="tunnelForm.shoreType" clearable>
									<el-option
										v-for="i in shore_type"
										:key="i.value"
										:label="i.label"
										:value="i.value"
									/>
								</el-select>
							</el-form-item>
							<el-form-item label="进回风类型">
								<el-select v-model="tunnelForm.venAirDirection" clearable>
									<el-option
										v-for="i in ven_air_direction"
										:key="i.value"
										:label="i.label"
										:value="i.value"
									/>
								</el-select>
							</el-form-item>
							<el-form-item label="起始高程(m)">
								<el-input v-model="tunnelForm.startAltitude" />
							</el-form-item>
							<el-form-item label="结束高程(m)">
								<el-input v-model="tunnelForm.endAltitude" />
							</el-form-item>
							<el-form-item label="需风量计算类型">
								<el-select v-model="tunnelForm.needCalType" clearable>
									<el-option
										v-for="i in need_cal_type"
										:key="i.value"
										:label="i.label"
										:value="i.value"
									/>
								</el-select>
							</el-form-item>
							<el-form-item label="是否显示风流方向">
								<el-select v-model="tunnelForm.directionShow" clearable>
									<el-option
										v-for="i in confirmList"
										:key="i.value"
										:label="i.label"
										:value="i.value"
									/>
								</el-select>
							</el-form-item>
							<el-form-item label="是否有密闭墙">
								<el-select v-model="tunnelForm.wallExists" clearable>
									<el-option
										v-for="i in confirmList"
										:key="i.value"
										:label="i.label"
										:value="i.value"
									/>
								</el-select>
							</el-form-item>
							<el-form-item label="是否连通地面">
								<el-select v-model="tunnelForm.groundFlag" clearable>
									<el-option
										v-for="i in confirmList"
										:key="i.value"
										:label="i.label"
										:value="i.value"
									/>
								</el-select>
							</el-form-item>
							<el-form-item label="是否显示巷道名称">
								<el-select v-model="tunnelForm.roadNameShow" clearable>
									<el-option
										v-for="i in confirmList"
										:key="i.value"
										:label="i.label"
										:value="i.value"
									/>
								</el-select>
							</el-form-item>
							<el-form-item label="是否显示风量标签">
								<el-select v-model="tunnelForm.modelWindShow" clearable>
									<el-option
										v-for="i in confirmList"
										:key="i.value"
										:label="i.label"
										:value="i.value"
									/>
								</el-select>
							</el-form-item>
						</el-form>
					</div>
					<div class="ven_sys_tunnel_body_l2_c2 fullDom"></div>
					<div class="fullDom">
						<el-form
							:model="tunnelForm"
							inline
							class="ven_sys_tunnel_body_l2_c1"
							label-width="auto"
							label-position="left"
						>
							<el-form-item label="最大风量(m3/min)">
								<el-input v-model="tunnelForm.maxQ" />
							</el-form-item>
							<el-form-item label="计划风量(m3/min)">
								<el-input v-model="tunnelForm.minQ" />
							</el-form-item>
							<el-form-item label="人工实测风量(m3/min)">
								<el-input v-model="tunnelForm.personS" />
							</el-form-item>
							<el-form-item label="人工实测时间">
								<el-input v-model="tunnelForm.personQTime" />
							</el-form-item>
							<el-form-item label="风阻(N·S2/m8)">
								<el-input v-model="tunnelForm.ventR" />
							</el-form-item>
							<el-form-item label="摩擦系数(N·s2/m4)">
								<el-input v-model="tunnelForm.ventFriction" />
							</el-form-item>
							<el-form-item label="局部风阻">
								<el-input v-model="tunnelForm.ventPartR" />
							</el-form-item>
							<el-form-item label="风路分支图区域">
								<el-select v-model="tunnelForm.windMapRegion" clearable>
									<el-option
										v-for="i in regionList"
										:key="i.value"
										:label="i.region"
										:value="i.region"
									/>
								</el-select>
							</el-form-item>
							<el-form-item label="风阻测定来源">
								<el-select v-model="tunnelForm.ventSource">
									<el-option
										v-for="i in vent_source"
										:key="i.value"
										:label="i.label"
										:value="i.value"
									/>
								</el-select>
							</el-form-item>
							<el-form-item label="人工测定风阻时间">
								<el-input v-model="tunnelForm.ventPersonTime" />
							</el-form-item>
						</el-form>
					</div>
					<div class="ven_sys_tunnel_body_l3 fullDom">
						<div class="normal_btn" @click="submitTunnelForm">保存</div>
						<div class="normal_btn" @click="closeTunnelHandle">取消</div>
					</div>
				</div>
			</border-box>
		</div>
		<!--切换编辑版本-->
		<EditTunnelVersion v-if="editVisible" v-model="editVisible" @change-version="changeVersion" />
		<!--    系统版本信息-->
		<div class="sys_version">
			<div class="fullDom">
				[当前系统三维图版本] <span>{{ versionForm.currentVersion }}</span>
			</div>
			<div class="fullDom">
				[当前编辑三维图版本] <span>{{ versionForm.currentEditedVersion }}</span>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/venManagement/venSystemManagement';
</style>
