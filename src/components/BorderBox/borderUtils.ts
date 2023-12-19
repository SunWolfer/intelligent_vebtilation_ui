import { addResizeListener, removeResizeListener } from '@/utils/border-box/resize-event'
import { deepCopy, deepMerge } from '@/utils/border-box/util'
import { ComputedRef, Ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

export function useAutoResize(afterResizeFun?: () => void) {
	const domRef = ref(null) // dorm容器，默认设置为domRef
	const status = reactive({
		width: 0,
		height: 0,
	})

	let __resizeHandler: Function | null = null
	function resize(resize = true): void {
		nextTick().then(() => {
			const dom: any = domRef.value
			status.width = dom ? dom.clientWidth : 0
			status.height = dom ? dom.clientHeight : 0

			if (!dom) {
				console.warn('无法获取dom节点!')
			} else if (!status.width || !status.height) {
				console.warn('组件宽度或高度为0px!')
			}
			if (typeof afterResizeFun === 'function' && resize) afterResizeFun()
		})
	}

	onMounted(() => {
		resize()
		__resizeHandler = useDebounceFn(resize, 100)
		addResizeListener(domRef.value, __resizeHandler)
	})
	onBeforeUnmount(() => {
		removeResizeListener(domRef.value, __resizeHandler)
	})
	return {
		domRef,
		...toRefs(status),
		resize,
	}
}

/**
 * border-hook
 * @param props
 * @param _defaultColor 默认颜色
 * @param afterResizeFun resize容器之后执行函数
 */
export function useBorderBox(
	props: any,
	_defaultColor: string[] = [],
	afterResizeFun?: () => void,
) {
	const { domRef, width, height, resize } = useAutoResize(afterResizeFun)
	const mergedColor = ref<any[]>([])
	const defaultColor = ref(_defaultColor)

	function mergeColor() {
		mergedColor.value = deepMerge(deepCopy(defaultColor.value), props.color || [])
	}

	watch(
		() => [props.color, props.reverse],
		() => {
			mergeColor()
		},
	)
	onMounted(() => {
		mergeColor()
	})
	return {
		domRef,
		width,
		height,
		resize,
		defaultColor,
		mergedColor,
		mergeColor,
	}
}

//获取动态点
export function getPoint([x, y]: any, [standardW, standardH]: any, [width, height]: any) {
	return [(x / standardW) * width.toFixed(3), (y / standardH) * height.toFixed(3)]
}
//获取路径
export function getPath(Point: ComputedRef<number[][]> | Ref<number[][]>) {
	return computed(() => {
		let path = ''
		for (let i = 0; i < Point.value.length; i++) {
			const item = Point.value[i]
			if (i === 0) path += 'M' + item.join(' ')
			path += ' L' + item.join(' ')
		}
		path = path ? (path += ' Z') : ''
		return path
	})
}
export function getPathNZ(Point: ComputedRef<number[][]> | Ref<number[][]>) {
	return computed(() => {
		let path = ''
		for (let i = 0; i < Point.value.length; i++) {
			const item = Point.value[i]
			if (i === 0) {
				path += 'M' + item.join(' ')
			} else {
				path += ' L' + item.join(' ')
			}
		}
		return path
	})
}
//获取点
export function getPoints(points: ComputedRef<number[][]> | Ref<number[][]>) {
	return computed(() => {
		return points.value.map((point: any[]) => point.join(',')).join(' ')
	})
}
