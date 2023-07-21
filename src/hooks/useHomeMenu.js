import useHome from '@/store/modules/home'

const useHomeMenu = () => {
	const home = useHome()

	// 已显示功能
	const showMenus = computed({
		get() {
			return home.showMenus
		},
		set(val) {
			home.updateShowMenus(val)
		},
	})
	//   点击位置
	const clickEvent = computed({
		get() {
			return home.clickMenuDom
		},
		set(val) {
			home.updateClickMenuDom(val)
		},
	})
	// v-show控制首页除3D.预警提示外显示
	const dislodgeDom = computed({
		get() {
			return home.dislodgeDom
		},
		set(val) {
			home.updateDislodgeDom(val)
		}
	})

	const dislodgeDomStyle = computed(() => {
		let style = {}
		if (!dislodgeDom.value) {
			style = {
				'pointer-events': 'none',
				'opacity': 0
			}}
		return style
	})
	//	v-show控制预警提示
	const showWarn = computed({
		get() {
			return home.showWarn
		},
		set(val) {
			home.updateShowWarn(val)
		}
	})

	const warnStyle = computed(() => {
		let style = {}
		if (!showWarn.value) {
			style = {
				'pointer-events': 'none',
				'opacity': 0
			}}
		return style
	})

	return {
		showMenus,
		clickEvent,
		dislodgeDom,
		dislodgeDomStyle,
		showWarn,
		warnStyle
	}
}

export default useHomeMenu
