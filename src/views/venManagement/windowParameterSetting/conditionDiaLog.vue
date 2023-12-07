<!--当前状态弹窗-->
<script setup>
	import useSocket from '@/hooks/useSocket'
	import { readWindowStatus } from '@/api/api/windowParameterSetting'

	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: false,
		},
		chooseRow: {
			type: Object,
			default: {},
		},
		requestIp: {
			type: String,
			default: '',
		},
	})

	const emits = defineEmits(['update:modelValue'])
	const showDiaLog = computed({
		get() {
			return props.modelValue
		},
		set() {
			emits('update:modelValue', false)
		},
	})
	const dataForm = ref({})
	const { socketData, clientSocket, configStatus } = useSocket('configStatus')
	watch(configStatus, (value) => {
		dataForm.value = value
	})
	const initDataForm = async () => {
		await readWindowStatus({
			requestIp: props.requestIp,
		})
	}

	onMounted(() => {
		initDataForm()
		clientSocket?.(props.requestIp + '|configStatus')
	})
	onBeforeUnmount(() => {
		socketData.value?.close()
	})
</script>

<template>
	<dia-log v-model="showDiaLog" title="当前状态" :width="842" :height="412">
		<div class="more-top">
			<border-box name="border4" title="A风窗">
				<div class="more-border-1">
					<div class="more-border-text">
						当前工作模式：
						<span class="text-1">{{ dataForm.workModeA }}</span>
					</div>
					<div class="more-border-text">当前开度值(%)：{{ dataForm.openDegreeA }}</div>
				</div>
				<div class="more-border-1">
					<div class="more-border-text">风速当前值(m/s)：{{ dataForm.speedA }}</div>
					<div class="more-border-text">风量当前值(m3/min)：{{ dataForm.volumeA }}</div>
				</div>
				<div class="more-border-1">
					<div class="more-border-text">风压当前值(Pa)：{{ dataForm.pressureA }}</div>
				</div>
			</border-box>
		</div>
		<div class="more-top">
			<border-box name="border4" title="B风窗">
				<div class="more-border-1">
					<div class="more-border-text">
						当前工作模式：<span class="text-1">{{ dataForm.workModelB }}</span>
					</div>
					<div class="more-border-text">当前开度值(%)：{{ dataForm.openDegreeB }}</div>
				</div>
				<div class="more-border-1">
					<div class="more-border-text">风速当前值(m/s)：{{ dataForm.speedB }}</div>
					<div class="more-border-text">风量当前值(m3/min)：{{ dataForm.volumeB }}</div>
				</div>
				<div class="more-border-1">
					<div class="more-border-text">风压当前值(Pa)：{{ dataForm.pressureB }}</div>
				</div>
			</border-box>
		</div>
		<div class="border-line"></div>
		<div class="warn-type-text">
			<div class="more-border-text">
				报警状态：
				<span class="text-2">
					{{ dataForm.warnContent }}
				</span>
			</div>
		</div>
	</dia-log>
</template>

<style lang="scss" scoped>
	.more-top {
		width: 100%;
		height: vh(150);
	}
	.more-border-1 {
		width: vw(246);
		height: vh(77);
		background: #122959;
		border: 1px solid;
		border-image: linear-gradient(45deg, #00b4ff, #0152a4) 10 10;
		border-radius: 6px;
		margin: vh(30) auto 0 auto;
		padding: vh(5) vw(10);
	}
	.more-border-text {
		font-size: vw(16);
		font-family:
			Microsoft YaHei,
			serif;
		font-weight: 400;
		color: #ffffff;
		line-height: vh(30);
	}
	.border-line {
		width: vw(789);
		height: 1px;
		border: 1px dashed #00ffff;
		margin: auto;
	}
	.text-1 {
		color: rgba(0, 255, 255, 1);
	}
	.text-2 {
		color: rgba(255, 171, 0, 1);
	}
	.warn-type-text {
		position: relative;
		width: 100%;
		height: vh(30);
		padding: vh(10) vw(20);
	}
</style>
