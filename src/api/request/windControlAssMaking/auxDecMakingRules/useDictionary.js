import { deviceTypes } from '@/types/menuType'
import { selectDictLabel } from '@/utils/ruoyi'

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
	// 格式化设备类型
	const formatterDevType = (item) => {
		return selectDictLabel(devType.value, item.devType)
	}

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
	// 格式化动作类型
	const formatterActionType = (item) => {
		return selectDictLabel(actionType(item.devType), item.actionType)
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
	// 格式化动作方向
	const formatterActionDirection = (item) => {
		return selectDictLabel(actionDirection(item.devType), item.actionDirection)
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
	// 格式化设备名称显示
	const formatterDoorType = (item) => {
		return (
			item.devName +
			(item.devType === deviceTypes.DOOR ? selectDictLabel(doorType.value, item.doorName) : '')
		)
	}

	return {
		devType,
		formatterDevType,
		actionType,
		formatterActionType,
		actionDirection,
		formatterActionDirection,
		doorType,
		formatterDoorType,
	}
}
