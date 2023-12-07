<!--条屏语音信息设置-->
<script setup>
	import useSocket from '@/hooks/useSocket'
	import { readScreenMsgOrder, setScreenMsgOrder } from '@/api/api/doorParameterSettings'

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

	// 条屏语音信息列表
	const screenMsgList = ref([])
	const initScreenMsgList = () => {
		for (let i = 0; i < 32; i++) {
			screenMsgList.value.push({
				index: i + 1,
				hasSelect: false,
				msg: '',
			})
		}
	}

	// socket连接
	const { socketData, clientSocket, dataRes } = useSocket('screenMsg')
	watch(
		() => dataRes.screenMsg,
		(value) => {
			for (let i = 0; i < value?.length; i++) {
				const obj = value[i]
				const index = screenMsgList.value.findIndex((i) => i.index === obj.index)
				if (index === -1) continue
				screenMsgList.value[index] = {
					...obj,
					hasSelect: false,
				}
			}
		},
	)
	const { proxy } = getCurrentInstance()
	// 	读取条屏语音信息
	const readMsg = async () => {
		socketData.value?.close()

		clientSocket?.(props.ip + '|config|door')

		proxy.$modal.loading('正在下发命令')
		setTimeout(() => {
			proxy.$modal.closeLoading()
		}, 5000)

		await readScreenMsgOrder({
			ip: props.ip,
		})
			.then(({ msg }) => {
				proxy.$modal.msg(msg)
			})
			.finally(() => {
				proxy.$modal.closeLoading()
			})
	}
	// 	下发条屏语音信息
	const sendMsg = async () => {
		const selectList = screenMsgList.value.filter((i) => i.hasSelect)
		if (!selectList.length) return
		if (!judgmentSorting()) return
		await setScreenMsgOrder({
			ip: props.ip,
			msgList: selectList,
		}).then(({ msg }) => {
			proxy.$modal.msg(msg)
		})
	}
	const judgmentSorting = () => {
		let chooseIndexBoolean = true
		// 已选择数据
		const selectList = screenMsgList.value.filter((i) => i.hasSelect)
		// 	已选择序号
		const indexList = selectList.map((i) => i.index)
		if (indexList[0] !== 1 || indexList.length !== indexList[indexList.length - 1]) {
			chooseIndexBoolean = false
			proxy.$modal.msgWarning('请从第一个开始下发！并且中间不能为空！')
		}
		return chooseIndexBoolean
	}
	initScreenMsgList?.()
	onBeforeUnmount(() => {
		socketData.value?.close()
	})
</script>

<template>
	<dia-log title="条屏语音信息设置" v-model="showDiaLog" :width="1150" :height="490">
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
				<template v-for="item in screenMsgList">
					<div class="dia_voice_body_item">
						<div class="dia_voice_body_item_line">
							<span>{{ item.index }}</span>
							<el-checkbox v-model="item.hasSelect" label="下发" />
						</div>
						<div class="fullDom">
							<el-input v-model="item.msg" type="textarea"></el-input>
						</div>
					</div>
				</template>
			</div>
		</div>
	</dia-log>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/door/diaSetting';
</style>
