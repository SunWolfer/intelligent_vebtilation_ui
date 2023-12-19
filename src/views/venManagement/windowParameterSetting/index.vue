<!--风窗参数设置-->
<script setup>
	import GradualTitle from '@/views/components/gradualTitle'
	import WindowTabs from './windowTabs.vue'
	import TabsFirst from './tabsFirst.vue'
	import TabsSecond from './tabsSecond.vue'
	import TabsThird from './tabsThird.vue'
	import TabsFourth from './tabsFourth.vue'
	import WindowControlForm from './windowControlForm.vue'
	import {
		calibrate,
		infoList,
		reFactory,
		restart,
		sendReadConfigOrder,
		testWarn,
		windowParams,
	} from '@/api/api/windowParameterSetting'
	import ConditionDiaLog from './conditionDiaLog.vue'
	import ControllerItem from '@/views/components/ControllerItem/index.vue'
	import { parameterSettings } from '@/api/request/doorParameterSettings/parameterSettings'

	const { proxy } = getCurrentInstance()

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
			domName: markRaw(TabsFirst),
		},
		{
			name: '开关量输入(DI)配置',
			value: 2,
			domName: markRaw(TabsSecond),
		},
		{
			name: '模拟量输入(AI)配置',
			value: 3,
			domName: markRaw(TabsThird),
		},
		{
			name: '串口(RS485)配置',
			value: 4,
			domName: markRaw(TabsFourth),
		},
	])
	const tabDom = computed(() => {
		return tabs.find((i) => i.value === chooseTab.value).domName
	})

	const setChoose = async (row) => {
		chooseController?.(row, sendReadConfigOrder, 'config')
	}
	// 当前状态
	const examine = ref(false)

	// 设置
	const setParams = async (data) => {
		const { msg } = await windowParams(data)
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
	// 自动标校
	const calibrateVisible = ref(false)
	// 自动标校表单
	const calibrateFormRef = ref(null)
	const calibrateForm = ref({
		abTag: 'A',
		ip: '',
	})
	const calibrateRules = ref({
		abTag: [{ required: true, message: 'A/B窗选择不能为空', trigger: 'blur' }],
	})
	// 自动标校选择
	const calibrateSelect = ref(['A', 'B'])
	const initCalibrate = () => {
		calibrateVisible.value = true
	}

	// 自动标校提交
	const calibrateSubmit = async () => {
		await calibrateFormRef.value?.validate(async (valid) => {
			if (valid) {
				const { msg } = await calibrate({
					ip: chooseLi.value,
					abTag: calibrateForm.value.abTag,
				})
				proxy.$modal.msgSuccess(msg)
				calibrateVisible.value = false
			}
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

	// 通用报警测试
	const alarmTestRef = ref(null)
	const alarmTest = ref(false)
	const alarmTestForm = ref({
		ip: '',
		warnTime: 0,
	})
	const alarmTestRules = ref({
		warnTime: [
			{
				required: true,
				message: '报警时长不能为空',
				trigger: 'blur',
			},
			{
				pattern: /^[+]{0,1}(\d+)$/,
				message: '报警时长为正整数',
				trigger: 'blur',
			},
		],
	})
	const initAlarmText = () => {
		alarmTest.value = true
	}
	const submitAlarmText = () => {
		alarmTestRef.value.validate(async (valid) => {
			if (valid) {
				const { msg } = await testWarn({
					ip: chooseLi.value,
					warnTime: alarmTestForm.value.warnTime,
				})
				proxy.$modal.msgSuccess(msg)
				alarmTest.value = false
			}
		})
	}

	queryControllerList?.(infoList)
	onMounted(() => {
		resetForm?.()
		clientSocket?.('controllerList|config')
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
				<window-control-form :data-from="networkForm" @set-param="controlSetParams" />
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
						<el-button class="add-btn" @click="initAlarmText">
							<template #icon>
								<svg-icon icon-class="button01" />
							</template>
							通用报警测试
						</el-button>
						<el-button class="light-blue-btn" @click="initRestart">
							<template #icon>
								<svg-icon icon-class="button02" />
							</template>
							重启设备
						</el-button>
						<el-button class="derive-btn" @click="initCalibrate">
							<template #icon>
								<svg-icon icon-class="button03" />
							</template>
							自动标校
						</el-button>
						<el-button class="delete-btn" @click="initReFactory">
							<template #icon>
								<svg-icon icon-class="button04" />
							</template>
							恢复出厂
						</el-button>
					</div>
				</div>
			</div>
		</border-box>
		<!--		控制器-->
		<ControllerItem :data-list="controllerList" :choose-data="chooseLi" @set-choose="setChoose" />
		<!--		当前状态-->
		<span class="window-condition-setting" @click="examine = true">当前状态</span>
		<dia-log
			v-if="alarmTest"
			v-model="alarmTest"
			title="通用报警测试"
			:width="500"
			:height="216"
			:has-bottom-btn="true"
			@submit="submitAlarmText"
		>
			<el-form ref="alarmTestRef" :model="alarmTestForm" :rules="alarmTestRules">
				<el-form-item label="报警时长：" prop="warnTime">
					<el-input v-model="alarmTestForm.warnTime" />
				</el-form-item>
			</el-form>
		</dia-log>
		<!--    自动标校-->
		<dia-log
			v-if="calibrateVisible"
			v-model="calibrateVisible"
			title="自动标校"
			:width="500"
			:height="216"
			:has-bottom-btn="true"
			@submit="calibrateSubmit"
		>
			<el-form ref="calibrateFormRef" :model="calibrateForm" :rules="calibrateRules">
				<el-form-item label="A/B风窗：" prop="abTag">
					<el-select v-model="calibrateForm.abTag" filterable :teleported="false">
						<el-option v-for="i in calibrateSelect" :key="i" :label="i" :value="i" />
					</el-select>
				</el-form-item>
			</el-form>
		</dia-log>
		<condition-dia-log
			v-if="examine"
			v-model="examine"
			:request-ip="chooseLi"
			:choose-row="networkForm"
		/>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/assets/styles/door/doorParameterSettings';
</style>
