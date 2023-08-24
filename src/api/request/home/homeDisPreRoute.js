import { DisasterTypes } from '@/api/request/menuType'
import useHomeMenu from '@/hooks/useHomeMenu'

export const homeDisPreRoute = (emits) => {
	// 灾变类型
	const disasterType = ref(DisasterTypes.ONE)
	// 改变灾变类型
	const changeDisaster = (type) => {
		disasterType.value = type
		emits('changeDisasterType', disasterType.value)
	}
	// 点击生成灾变地点
	const setDisaster = () => {
		emits('setDisaster', disasterType.value)
	}
	// 点击生成人员位置
	const setPersonnel = () => {
		emits('setPersonnel')
	}
	const { avoidDisaster } = useHomeMenu()
	// 点击模拟生成避灾路线
	const imitateRoute = () => {
		emits('imitateRoute')
	}
	// 退出
	const quit = () => {
		avoidDisaster.value = false
	}
	// 人员避灾路线
	const disasterRouteText = ref([
		{
			startLabel: '沿',
			specialLabel: '021306',
			lastLabel: '运逆风流方向迅速进行回撤',
		},
	])

	onBeforeUnmount(() => {
		quit()
	})
	return {
		changeDisaster,
		setDisaster,
		setPersonnel,
		imitateRoute,
		quit,
		disasterRouteText,
	}
}
