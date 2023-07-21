<script setup lang="ts">
	const props = defineProps({
		//开始值
		startVal: {
			type: Number,
			default: 0,
		},
		//结束值
		endVal: {
			type: Number,
			default: 0,
		},
		//动画持续时间
		duration: {
			type: Number,
			default: 2000,
		},
		//是否自动播放
		autoplay: {
			type: Boolean,
			default: true,
		},
		//小数点精度
		decimals: {
			type: Number,
			required: false,
			default: 0,
			validator(value: number) {
				return value >= 0
			},
		},
		//小数点显示
		decimal: {
			type: String,
			default: '.',
		},
		//数字分割
		separator: {
			type: String,
			default: ',',
		},
		// 前缀，用于显示之前的字符
		prefix: {
			type: String,
			default: '',
		},
		//后缀，用于显示之后的字符
		suffix: {
			type: String,
			default: '',
		},
		useEasing: {
			type: Boolean,
			default: true,
		},
		easingFn: {
			type: Function,
			default(t: number, b: number, c: number, d: number) {
				return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
			},
		},
	})

	const emits = defineEmits(['mounted', 'callback'])

	const state = reactive({
		localStartVal: props.startVal,
		displayValue: formatNumber(props.startVal),
		printVal: 0,
		paused: false,
		localDuration: props.duration,
		startTime: 0,
		timestamp: 0,
		remaining: 0,
		rAF: 0,
	})
	onMounted(() => {
		if (props.autoplay) {
			start()
		}
		emits('mounted')
	})

	const getCountDown = computed(() => props.startVal > props.endVal)
	watch([() => props.startVal, () => props.endVal], () => {
		if (props.autoplay) {
			start()
		}
	})
	//开始
	function start() {
		const { startVal, duration } = props
		state.localStartVal = startVal
		state.startTime = 0
		state.localDuration = duration
		state.paused = false
		state.rAF = requestAnimationFrame(count)
	}

	//暂停和启动
	function pauseResume() {
		if (state.paused) {
			resume()
			state.paused = false
		} else {
			pause()
			state.paused = true
		}
	}

	function pause() {
		cancelAnimationFrame(state.rAF)
	}

	function resume() {
		state.startTime = 0
		state.localDuration = +state.remaining
		state.localStartVal = +state.printVal
		requestAnimationFrame(count)
	}

	//重置
	function reset() {
		state.startTime = 0
		cancelAnimationFrame(state.rAF)
		state.displayValue = formatNumber(props.startVal)
	}

	//获取当前值
	function count(timestamp: number) {
		const { useEasing, easingFn, endVal } = props
		if (!state.startTime) state.startTime = timestamp
		state.timestamp = timestamp
		const progress = timestamp - state.startTime
		state.remaining = state.localDuration - progress
		if (useEasing) {
			if (unref(getCountDown)) {
				state.printVal =
					state.localStartVal -
					easingFn(
						progress,
						0,
						state.localStartVal - endVal,
						state.localDuration,
					)
			} else {
				state.printVal = easingFn(
					progress,
					state.localStartVal,
					endVal - state.localStartVal,
					state.localDuration,
				)
			}
		} else {
			if (unref(getCountDown)) {
				state.printVal =
					state.localStartVal -
					(state.localStartVal - endVal) * (progress / state.localDuration)
			} else {
				state.printVal =
					state.localStartVal +
					(endVal - state.localStartVal) * (progress / state.localDuration)
			}
		}
		if (unref(getCountDown)) {
			state.printVal = state.printVal < endVal ? endVal : state.printVal
		} else {
			state.printVal = state.printVal > endVal ? endVal : state.printVal
		}
		state.displayValue = formatNumber(state.printVal)
		if (progress < state.localDuration) {
			state.rAF = requestAnimationFrame(count)
		} else {
			emits('callback')
		}
	}

	function formatNumber(num: number | string) {
		const { decimals, decimal, separator, suffix, prefix } = props
		num = Number(num).toFixed(decimals)
		num += ''
		const x = num.split('.')
		let x1 = x[0]
		const x2 = x.length > 1 ? decimal + x[1] : ''
		const rgx = /(\d+)(\d{3})/
		if (separator) {
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + separator + '$2')
			}
		}
		return prefix + x1 + x2 + suffix
	}

	//重启
	function restart() {
		reset()
		start()
	}

	defineExpose({
		count,
		reset,
		resume,
		start,
		pauseResume,
		restart,
		displayValue: toRef(state, 'displayValue'),
	})
</script>

<template>
	<span>
		{{ state.displayValue }}
	</span>
</template>

<style lang="scss" scoped></style>
