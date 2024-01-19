<script setup>
	import useSocket from '@/hooks/useSocket'
	import {
		readControlRegisterOrder,
		setControlRegisterOrder,
	} from '@/api/api/doorParameterSettings'
	import { useDict } from '@/hooks/useDict'
	import { isNull } from '@/utils/ruoyi'

	const props = defineProps({
		ip: {
			type: String,
			default: '',
		},
		modelValue: {
			type: Boolean,
			default: false,
		},
	})
	const emits = defineEmits(['update:modelValue'])
	// 控制弹窗显示
	const showDiaLog = computed({
		get() {
			return props.modelValue
		},
		set() {
			emits('update:modelValue', false)
		},
	})
	// 下拉选择字典
	const {
		linkageStatus,
		lockStatus,
		lockRestrictStatus,
		door_work_model,
		have_status,
		power_clear,
		power_recover,
	} = useDict(
		'linkageStatus',
		'lockStatus',
		'lockRestrictStatus',
		'door_work_model',
		'have_status',
		'power_clear',
		'power_recover',
	)
	const { proxy } = getCurrentInstance()
	// 	控制寄存器表单
	const controlRegisterForm = ref({
		ip: props.ip,
		linkageStatus: null,
		lockStatus: null,
		lockRestrictAuto: null,
		lockRestrictHand: null,
		lockRestrictRemote: null,
		openTimeOutA: null,
		closeTimeOutA: null,
		openTimeOutB: null,
		closeTimeOutB: null,
		powerAutoClear: null,
		workModel: null,
		powerAutoRecover: null,
		register13: null,
		register14: null,
		register15: null,
		register16: null,
		register17: null,
		register18: null,
		register19: null,
		register20: null,
		register21: null,
		register22: null,
		register23: null,
		register24: null,
		register25: null,
		register26: null,
		register27: null,
		register28: null,
		register29: null,
		register30: null,
		register31: null,
		register32: null,
	})
	// 重置表单
	const resetForm = () => {
		for (const key in controlRegisterForm.value) {
			controlRegisterForm.value[key] = null
		}
	}
	// 验证空值
	const validator1 = (val) => {
		return !isNull(val)
	}
	// 验证正整数
	const validator2 = (val) => {
		return /^[+]{0,1}(\d+)$/.test(val)
	}
	// 下发控制寄存器列表
	const controlRegisterList = ref([
		{
			label: '联动',
			hasSelect: false,
			key: 'linkageStatus',
			type: 'select',
			options: [],
			rules: [{ validator: validator1, message: '联动不能为空' }],
		},
		{
			label: '闭锁',
			hasSelect: false,
			key: 'lockStatus',
			type: 'select',
			options: [],
			rules: [{ validator: validator1, message: '闭锁不能为空' }],
		},
		{
			label: '闭锁限制自动',
			hasSelect: false,
			key: 'lockRestrictAuto',
			type: 'select',
			options: [],
			rules: [{ validator: validator1, message: '闭锁限制自动不能为空' }],
		},
		{
			label: '闭锁限制手动',
			hasSelect: false,
			key: 'lockRestrictHand',
			type: 'select',
			options: [],
			rules: [{ validator: validator1, message: '闭锁限制手动不能为空' }],
		},
		{
			label: '闭锁限制远程',
			hasSelect: false,
			key: 'lockRestrictRemote',
			type: 'select',
			options: [],
			rules: [{ validator: validator1, message: '闭锁限制远程不能为空' }],
		},
		{
			label: 'A门开门超时故障',
			hasSelect: false,
			key: 'openTimeOutA',
			type: 'select',
			options: [],
			rules: [{ validator: validator1, message: 'A门开门超时故障不能为空' }],
		},
		{
			label: 'A门关门超时故障',
			hasSelect: false,
			key: 'closeTimeOutA',
			type: 'select',
			options: [],
			rules: [{ validator: validator1, message: 'A门关门超时故障不能为空' }],
		},
		{
			label: 'B门开门超时故障',
			hasSelect: false,
			key: 'openTimeOutB',
			type: 'select',
			options: [],
			rules: [{ validator: validator1, message: 'B门开门超时故障不能为空' }],
		},
		{
			label: 'B门关门超时故障',
			hasSelect: false,
			key: 'closeTimeOutB',
			type: 'select',
			options: [],
			rules: [{ validator: validator1, message: 'B门关门超时故障不能为空' }],
		},
		{
			label: '上电自动清除故障',
			hasSelect: false,
			key: 'powerAutoClear',
			type: 'select',
			options: [],
			rules: [{ validator: validator1, message: '上电自动清除故障不能为空' }],
		},
		{
			label: '工作模式',
			hasSelect: false,
			key: 'workModel',
			type: 'select',
			options: [],
			rules: [{ validator: validator1, message: '工作模式不能为空' }],
		},
		{
			label: '上电自动恢复模式',
			hasSelect: false,
			key: 'powerAutoRecover',
			type: 'select',
			options: [],
			rules: [{ validator: validator1, message: '上电自动恢复模式不能为空' }],
		},
		{
			label: 'A门传感器故障',
			hasSelect: false,
			key: 'register13',
			type: 'select',
			options: [],
			rules: [{ validator: validator2, message: 'A门传感器故障只能输入正整数' }],
		},
		{
			label: 'B门传感器故障',
			hasSelect: false,
			key: 'register14',
			type: 'select',
			options: [],
			rules: [{ validator: validator2, message: 'B门传感器故障只能输入正整数' }],
		},
		{
			label: '15',
			hasSelect: false,
			key: 'register15',
			type: 'input',
			options: [],
			rules: [{ validator: validator2, message: '15只能输入正整数' }],
		},
		{
			label: '16',
			hasSelect: false,
			key: 'register16',
			type: 'input',
			options: [],
			rules: [{ validator: validator2, message: '16只能输入正整数' }],
		},
		{
			label: '17',
			hasSelect: false,
			key: 'register17',
			type: 'input',
			options: [],
			rules: [{ validator: validator2, message: '17只能输入正整数' }],
		},
		{
			label: '18',
			hasSelect: false,
			key: 'register18',
			type: 'input',
			options: [],
			rules: [{ validator: validator2, message: '18只能输入正整数' }],
		},
		{
			label: '19',
			hasSelect: false,
			key: 'register19',
			type: 'input',
			options: [],
			rules: [{ validator: validator2, message: '19只能输入正整数' }],
		},
		{
			label: '20',
			hasSelect: false,
			key: 'register20',
			type: 'input',
			options: [],
			rules: [{ validator: validator2, message: '20只能输入正整数' }],
		},
		{
			label: '21',
			hasSelect: false,
			key: 'register21',
			type: 'input',
			options: [],
			rules: [{ validator: validator2, message: '21只能输入正整数' }],
		},
		{
			label: '22',
			hasSelect: false,
			key: 'register22',
			type: 'input',
			options: [],
			rules: [{ validator: validator2, message: '22只能输入正整数' }],
		},
		{
			label: '23',
			hasSelect: false,
			key: 'register23',
			type: 'input',
			options: [],
			rules: [{ validator: validator2, message: '23只能输入正整数' }],
		},
		{
			label: '24',
			hasSelect: false,
			key: 'register24',
			type: 'input',
			options: [],
			rules: [{ validator: validator2, message: '24只能输入正整数' }],
		},
		{
			label: '25',
			hasSelect: false,
			key: 'register25',
			type: 'input',
			options: [],
			rules: [{ validator: validator2, message: '25只能输入正整数' }],
		},
		{
			label: '26',
			hasSelect: false,
			key: 'register26',
			type: 'input',
			options: [],
			rules: [{ validator: validator2, message: '26只能输入正整数' }],
		},
		{
			label: '27',
			hasSelect: false,
			key: 'register27',
			type: 'input',
			options: [],
			rules: [{ validator: validator2, message: '27只能输入正整数' }],
		},
		{
			label: '28',
			hasSelect: false,
			key: 'register28',
			type: 'input',
			options: [],
			rules: [{ validator: validator2, message: '28只能输入正整数' }],
		},
		{
			label: '29',
			hasSelect: false,
			key: 'register29',
			type: 'input',
			options: [],
			rules: [{ validator: validator2, message: '29只能输入正整数' }],
		},
		{
			label: '30',
			hasSelect: false,
			key: 'register30',
			type: 'input',
			options: [],
			rules: [{ validator: validator2, message: '30只能输入正整数' }],
		},
		{
			label: '31',
			hasSelect: false,
			key: 'register31',
			type: 'input',
			options: [],
			rules: [{ validator: validator2, message: '31只能输入正整数' }],
		},
		{
			label: '32',
			hasSelect: false,
			key: 'register32',
			type: 'input',
			options: [],
			rules: [{ validator: validator2, message: '32只能输入正整数' }],
		},
	])
	// 验证寄存器表单
	const verifyForm = () => {
		let passVerify = true
		const selectList = controlRegisterList.value.filter((i) => i.hasSelect)
		for (let i = 0; i < selectList.length; i++) {
			const obj = selectList[i]
			for (let j = 0; j < obj.rules.length; j++) {
				// 	正则校验
				const validatorObj = obj.rules[j]
				if (!validatorObj.validator(controlRegisterForm.value[obj.key])) {
					proxy.$modal.msg(validatorObj.message)
					passVerify = false
					return
				}
			}
		}
		return passVerify
	}
	// 设置控制器列表内下拉选择值
	const setControlListValue = (key, list) => {
		for (let i = 0; i < controlRegisterList.value.length; i++) {
			if (controlRegisterList.value[i].key === key) {
				controlRegisterList.value[i].options = list
				return
			}
		}
	}
	// 联动
	watchEffect(() => {
		setControlListValue('linkageStatus', linkageStatus.value)
	})
	// 闭锁
	watchEffect(() => {
		setControlListValue('lockStatus', lockStatus.value)
	})
	// 闭锁限制自动、手动、远程
	watchEffect(() => {
		setControlListValue('lockRestrictAuto', lockRestrictStatus.value)
		setControlListValue('lockRestrictHand', lockRestrictStatus.value)
		setControlListValue('lockRestrictRemote', lockRestrictStatus.value)
	})
	// 无有
	watchEffect(() => {
		setControlListValue('openTimeOutA', have_status.value)
		setControlListValue('closeTimeOutA', have_status.value)
		setControlListValue('openTimeOutB', have_status.value)
		setControlListValue('closeTimeOutB', have_status.value)
		setControlListValue('register13', have_status.value)
		setControlListValue('register14', have_status.value)
	})
	// 工作模式
	watchEffect(() => {
		setControlListValue('workModel', door_work_model.value)
	})
	// 上电自动清除故障
	watchEffect(() => {
		setControlListValue('powerAutoClear', power_clear.value)
	})
	// 上电自动恢复字典
	watchEffect(() => {
		setControlListValue('powerAutoRecover', power_recover.value)
	})
	// socket连接
	const { socketData, clientSocket, dataRes } = useSocket('controlRegister')
	watch(
		() => dataRes.controlRegister,
		(value) => {
			controlRegisterForm.value = value
		},
	)

	// 读取
	const readMsg = async () => {
		socketData.value?.close()

		clientSocket?.(props.ip + '|config|door')

		proxy.$modal.loading('正在下发命令')
		setTimeout(() => {
			proxy.$modal.closeLoading()
		}, 5000)

		await readControlRegisterOrder({
			ip: props.ip,
		})
			.then(({ msg }) => {
				proxy.$modal.msg(msg)
			})
			.finally(() => {
				proxy.$modal.closeLoading()
			})
	}
	// 	下发
	const sendMsg = async () => {
		if (!verifyForm()) return

		const selectList = controlRegisterList.value.filter((i) => i.hasSelect)
		let sendForm = {
			ip: props.ip,
		}
		for (let i = 0; i < selectList.length; i++) {
			sendForm[selectList[i].key] = controlRegisterForm.value[selectList[i].key]
		}
		await setControlRegisterOrder(sendForm).then(({ msg }) => {
			proxy.$modal.msg(msg)
		})
	}

	onBeforeUnmount(() => {
		resetForm?.()
		socketData.value?.close()
	})
</script>

<template>
	<dia-log title="控制寄存器设置" v-model="showDiaLog" :width="1150" :height="490">
		<div class="dia_voice">
			<div class="dia_voice_title">
				<el-button class="light-blue-btn" @click="readMsg">
					<template #icon>
						<svg-icon icon-class="button05" />
					</template>
					读取
				</el-button>
				<el-button class="derive-btn" @click="sendMsg">
					<template #icon>
						<svg-icon icon-class="button06" />
					</template>
					下发
				</el-button>
			</div>
			<div class="dia_voice_body">
				<template v-for="(item, itemIndex) in controlRegisterList" :key="itemIndex">
					<div class="dia_voice_body_item">
						<div class="dia_voice_body_item_line">
							<span>{{ item.label }}</span>
							<el-checkbox v-model="item.hasSelect" label="下发" />
						</div>
						<div class="fullDom">
							<template v-if="item.type === 'select'">
								<el-select v-model="controlRegisterForm[item.key]" :teleported="false">
									<el-option
										v-for="i in item.options"
										:key="i.value"
										:label="i.label"
										:value="i.value"
									/>
								</el-select>
							</template>
							<template v-else-if="item.type === 'input'">
								<el-input v-model="controlRegisterForm[item.key]" />
							</template>
						</div>
					</div>
				</template>
			</div>
		</div>
	</dia-log>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/door/diaSetting';
	.dia_voice_body {
		height: 100%;
		overflow-y: auto;
		display: grid;
		grid-template-columns: repeat(auto-fill, vw(260));
		justify-content: space-between;
		grid-template-rows: repeat(auto-fill, vh(90));
		grid-auto-rows: vh(90);
		grid-row-gap: vh(10);
	}
	.dia_voice_body_item {
		.fullDom {
			display: flex;
			align-items: center;
		}
	}
	.dia_voice_body_item_line {
		span {
			font-size: vw(14);
		}
	}
</style>
