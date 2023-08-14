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

	// 是否漫游
	const roam = computed({
		get() {
			return home.roam
		},
		set(data) {
			home.updateRoam(data)
		},
	})
	// 是否反风
	const reverseWind = computed({
		get() {
			return home.reverseWind
		},
		set(data) {
			home.updateReverseWind(data)
		},
	})
	// 是否显示避灾
	const avoidDisaster = computed({
		get() {
			return home.avoidDisaster
		},
		set(data) {
			home.updateAvoidDisaster(data)
		},
	})
	// 是否显示灾害模拟
	const disaster = computed({
		get() {
			return home.disaster
		},
		set(data) {
			home.updateDisaster(data)
		},
	})

	// 控制首页除3D.预警提示外显示
	const dislodgeDom = computed(() => {
		return roam.value || reverseWind.value || avoidDisaster.value || disaster.value
	})

	const dislodgeDomStyle = computed(() => {
		let style = {}
		if (dislodgeDom.value) {
			style = {
				'pointer-events': 'none',
				opacity: 0,
			}
		}
		return style
	})
	//	控制预警提示
	const showWarn = computed(() => {
		return reverseWind.value || avoidDisaster.value || disaster.value
	})

	const warnStyle = computed(() => {
		let style = {}
		if (showWarn.value) {
			style = {
				'pointer-events': 'none',
				opacity: 0,
			}
		}
		return style
	})

	return {
		showMenus,
		dislodgeDom,
		dislodgeDomStyle,
		showWarn,
		warnStyle,
		roam,
		avoidDisaster,
		disaster,
		reverseWind,
	}
}

export default useHomeMenu
