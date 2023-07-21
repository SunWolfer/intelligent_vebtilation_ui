import ResizeObserver from 'resize-observer-polyfill'
import isServer from './isServer'

/* istanbul ignore next */
const resizeHandler = function (entries: any) {
	for (const entry of entries) {
		const listeners = entry.target.__resizeListeners__ || []
		if (listeners.length) {
			listeners.forEach((fn: () => void) => {
				fn()
			})
		}
	}
}

/* istanbul ignore next */
export const addResizeListener = function (element: any | null, fn: Function) {
	if (isServer || !element) return
	if (!element.__resizeListeners__) {
		element.__resizeListeners__ = []
		element.__ro__ = new ResizeObserver(resizeHandler)
		element.__ro__.observe(element)
	}
	element.__resizeListeners__.push(fn)
}

/* istanbul ignore next */
export const removeResizeListener = function (element: any | null, fn: Function | null) {
	if (!element || !element.__resizeListeners__) return
	element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1)
	if (!element.__resizeListeners__.length) {
		element.__ro__.disconnect()
	}
}
