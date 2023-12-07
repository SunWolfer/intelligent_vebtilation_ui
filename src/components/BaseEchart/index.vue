<script setup lang="ts">
	import echarts, { type ECOption } from '@/utils/echarts'
	import { useDebounceFn } from '@vueuse/core'
	import { type EChartsType } from 'echarts/core'
	import { Ref } from 'vue'

	interface Props {
		option: ECOption | undefined
		theme?: Object | string | null
		loading?: boolean // 受控
		onMouseover?: (...args: any[]) => any
		onMouseout?: (...args: any[]) => any
	}

	const props = withDefaults(defineProps<Props>(), {
		theme: null,
		loading: false,
	})

	const chartRef: Ref<HTMLElement | null> = ref(null)
	const chartInstance = ref<EChartsType>()

	const draw = () => {
		if (chartInstance.value) {
			props.option && chartInstance.value.setOption(props.option, { notMerge: true })
		}
	}

	const init = () => {
		if (!chartRef.value) return

		// 校验 Dom 节点上是否已经挂载了 ECharts 实例，只有未挂载时才初始化
		chartInstance.value = echarts.getInstanceByDom(chartRef.value)
		if (!chartInstance.value) {
			chartInstance.value = markRaw(
				echarts.init(chartRef.value, props.theme, {
					renderer: 'canvas',
				}),
			)

			// 绑定鼠标事件：
			if (props.onMouseover) {
				chartInstance.value.on('mouseover', (event: Object) => {
					props.onMouseover?.(event, chartInstance.value, props.option)
				})
			}
			if (props.onMouseout) {
				chartInstance.value.on('mouseout', (event: Object) => {
					props.onMouseout?.(event, chartInstance.value, props.option)
				})
			}

			draw()
		}
	}

	// 窗口自适应并开启过渡动画
	const resize = () => {
		if (chartInstance.value) {
			chartInstance.value.resize({ animation: { duration: 300 } })
		}
	}

	// 自适应防抖优化
	const debouncedResize = useDebounceFn(resize, 500, { maxWait: 800 })

	// 对父组件暴露获取 ECharts 实例的方法，可直接通过实例调用原生函数
	defineExpose({
		getInstance: () => chartInstance.value,
		resize,
		draw,
	})

	watch(props, () => {
		draw()
	})

	// 展示 loading 动画
	watch(
		() => props.loading,
		(loading) => {
			loading ? chartInstance.value?.showLoading() : chartInstance.value?.hideLoading()
		},
	)

	onMounted(() => {
		init()
		window.addEventListener('resize', debouncedResize)
	})

	onBeforeUnmount(() => {
		// 容器被销毁之后，销毁实例，避免内存泄漏
		chartInstance.value?.dispose()
		window.removeEventListener('resize', debouncedResize)
	})
</script>

<template>
	<div ref="chartRef" class="fullDom" />
</template>

<style scoped lang="scss"></style>
