<!--风门参数设置-->
<script setup>
	import GradualTitle from '@/views/components/gradualTitle/index.vue'
	import { parameterSettings } from '@/api/request/doorParameterSettings/parameterSettings'
	import DoorControlForm from './DoorControlForm.vue'
	import WindowTabs from '@/views/venManagement/windowParameterSetting/windowTabs.vue'
	import DoorDO from './DoorDO.vue'
	import DoorDI from './DoorDI.vue'
	import DoorAI from './DoorAI.vue'
	import DoorRS from './DoorRS.vue'
	import ControllerItem from '@/views/components/ControllerItem/index.vue'
	import {
		getControllerList,
		sendReadConfigOrder,
		setConfigOrder,
		reFactory,
		restart,
	} from '@/api/api/doorParameterSettings'
	import BarScreenVoiceSettings from './BarScreenVoiceSettings.vue'
	import ControlRegisterSettings from './ControlRegisterSettings.vue'

	const {
		networkFormRef,
		networkForm,
		networkFormRules,
		chooseLi,
		controllerList,
		queryControllerList,
		chooseController,
		chooseTab,
		changeTab,
		clientSocket,
		resetForm,
	} = parameterSettings()
	const tabs = reactive([
		{
			name: '开关量输出(DO)配置',
			value: 1,
			domName: markRaw(DoorDO),
		},
		{
			name: '开关量输入(DI)配置',
			value: 2,
			domName: markRaw(DoorDI),
		},
		{
			name: '模拟量输入(AI)配置',
			value: 3,
			domName: markRaw(DoorAI),
		},
		{
			name: '串口(RS485)配置',
			value: 4,
			domName: markRaw(DoorRS),
		},
	])
	const tabDom = computed(() => {
		return tabs.find((i) => i.value === chooseTab.value).domName
	})

	const { proxy } = getCurrentInstance()

	// 	设置
	const setParams = async (data) => {
		const { msg } = await setConfigOrder(data)
		proxy.$modal.msgSuccess(msg)
	}
	// 网络设置
	const netWorkSetParams = () => {
		networkFormRef.value.validate((valid) => {
			if (valid) {
				setParams({
					requestIp: chooseLi.value,
					serverIp: networkForm.value.serverIp,
					controllerGatewayIp: networkForm.value.controllerGatewayIp,
					serverPort: networkForm.value.serverPort,
					controllerSubnetMask: networkForm.value.controllerSubnetMask,
					controllerIp: networkForm.value.controllerIp,
				})
			}
		})
	}
	// 调控设置
	const controlSetParams = (...params) => {
		const form = ref({
			requestIp: chooseLi.value,
		})
		params.forEach((data) => {
			form.value[data] = networkForm.value[data]
		})
		setParams(form.value)
	}

	// 	选择控制器
	const setChoose = async (row) => {
		chooseController?.(row, sendReadConfigOrder, 'config|door')
	}
	// 恢复出厂
	const initReFactory = async () => {
		proxy.$modal
			.prompt({
				title: '提示',
				message: '是否确认恢复出厂',
			})
			.then(async () => {
				const { msg } = await reFactory({
					ip: chooseLi.value,
				})
				proxy.$modal.msgSuccess(msg)
			})
	}

	// 重启设备
	const initRestart = async () => {
		proxy.$modal
			.prompt({
				title: '提示',
				message: '是否确认重启设备',
			})
			.then(async () => {
				const { msg } = await restart({
					ip: chooseLi.value,
				})
				proxy.$modal.msgSuccess(msg)
			})
	}
	//条屏语音信息弹窗
	const barScreenVoiceVisible = ref(false)
	const handleBarScreenVoiceVisible = () => {
		barScreenVoiceVisible.value = true
	}
	//控制寄存器设置
	const controlRegisterVisible = ref(false)
	const handleControlRegisterVisible = () => {
		controlRegisterVisible.value = true
	}

	queryControllerList?.(getControllerList)
	onMounted(() => {
		resetForm?.()
		clientSocket?.('controllerList|config|door')
	})
</script>

<template>
	<div class="parameter_setting">
		<border-box class="fullDom" name="border11" :color="['#0857a8', '#25d2f5']">
			<div class="setting_body">
				<div class="padding-left-12 setting_net_form">
					<gradual-title title="网络设置" />
				</div>
				<div class="padding-left-12 setting_net_form">
					<el-form
						ref="networkFormRef"
						:model="networkForm"
						label-width="auto"
						:rules="networkFormRules"
						class="setting_net_form_item"
					>
						<el-form-item label="上位机IP：" prop="serverIp">
							<el-input v-model="networkForm.serverIp" />
						</el-form-item>
						<el-form-item label="控制器IP：" prop="controllerIp">
							<el-input v-model="networkForm.controllerIp" />
						</el-form-item>
						<el-form-item label="网关IP：" prop="controllerGatewayIp">
							<el-input v-model="networkForm.controllerGatewayIp" />
						</el-form-item>
						<el-form-item label="上位机端口：" prop="serverPort">
							<el-input v-model="networkForm.serverPort" />
						</el-form-item>
						<el-form-item label="子网掩码：" prop="controllerSubnetMask">
							<el-input v-model="networkForm.controllerSubnetMask" />
						</el-form-item>
						<el-form-item label=" ">
							<el-button class="add-btn" icon="Setting" @click="netWorkSetParams">设置</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="padding-left-12">
					<gradual-title title="调控设置" />
				</div>
				<DoorControlForm :data-from="networkForm" @set-param="controlSetParams" />
				<div class="padding-left-12">
					<!--				多窗口-->
					<window-tabs @change-tab="changeTab" />
				</div>
				<div class="padding-left-12 fullDom">
					<component :is="tabDom" :data-from="networkForm" @set-param="controlSetParams" />
				</div>
				<div class="padding-left-12 setting_sys_btn fullDom">
					<gradual-title title="系统设置" />
					<div class="fullDom c-center">
						<el-button class="add-btn" icon="Setting" @click="handleBarScreenVoiceVisible">
							条屏语音信息设置
						</el-button>
						<el-button class="add-btn" icon="Setting" @click="handleControlRegisterVisible">
							控制寄存器设置
						</el-button>
						<el-button class="light-orange-btn" @click="initRestart">
							<template #icon>
								<svg-icon icon-class="button02" />
							</template>
							重启设备
						</el-button>
						<el-button class="delete-btn" @click="initReFactory">
							<template #icon> <svg-icon icon-class="button04" /> </template>恢复出厂
						</el-button>
					</div>
				</div>
			</div>
		</border-box>
		<!--		控制器-->
		<ControllerItem :data-list="controllerList" :choose-data="chooseLi" @set-choose="setChoose" />
		<!--			条屏语音信息设置-->
		<BarScreenVoiceSettings
			v-if="barScreenVoiceVisible"
			v-model="barScreenVoiceVisible"
			:ip="chooseLi"
		/>
		<!--			控制寄存器设置-->
		<ControlRegisterSettings
			v-if="controlRegisterVisible"
			v-model="controlRegisterVisible"
			:ip="chooseLi"
		/>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/door/doorParameterSettings';
</style>
