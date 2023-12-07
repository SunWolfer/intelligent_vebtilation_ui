import { deviceTypes } from '@/types/menuType'

export const useDictionary = () => {
	// 设备类型
	const devType = ref([
		{
			label: '风窗',
			value: deviceTypes.WINDOW,
		},
		{
			label: '风门',
			value: deviceTypes.DOOR,
		},
		{
			label: '局扇',
			value: deviceTypes.LOCALFAN,
		},
	])
	//   动作类型开度
	const actionTypeOpen = ref([
		{
			label: '开度',
			value: '0',
		},
	])
	// 动作类型频率
	const actionTypeFrequency = ref([
		{
			label: '频率',
			value: '0',
		},
	])
	//动作类型
	const actionType = (devTypeData) => {
		return devTypeData === deviceTypes.LOCALFAN ? actionTypeFrequency.value : actionTypeOpen.value
	}

	// 动作方向开度
	const actionDirectionOpen = ref([
		{
			label: '开',
			value: '0',
		},
		{
			label: '关',
			value: '1',
		},
	])
	// 动作方向频率
	const actionDirectionFrequency = ref([
		{
			label: '增大',
			value: '0',
		},
		{
			label: '减小',
			value: '1',
		},
	])
	// 动作方向
	const actionDirection = (devTypeData) => {
		return devTypeData === deviceTypes.LOCALFAN
			? actionDirectionFrequency.value
			: actionDirectionOpen.value
	}

	// 风门
	const doorType = ref([
		{
			label: 'A门',
			value: '0',
		},
		{
			label: 'B门',
			value: '1',
		},
	])

	return {
		devType,
		actionType,
		actionDirection,
		doorType,
	}
}
