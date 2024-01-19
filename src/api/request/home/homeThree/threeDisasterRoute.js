import { ClickEventTypes, DisasterTypes } from '@/types/menuType'
import useHomeMenu from '@/hooks/useHomeMenu'
import useEquipmentData from '@/hooks/useEquipmentData'
import { threeModel } from '@/store/modules/threeModel'
import { useThreeModelData } from '@/hooks/useThreeModelData'

export const threeDisasterRoute = (operateModel, intersectedPosition, intersected) => {
	const modelData = threeModel()
	const object = modelData.data
	const {
		disasterPreventionRoute,
		disasterLocation,
		disasterPosition,
		personLocation,
		personPosition,
	} = useEquipmentData()
	// 生成避灾路线点位
	const createdMoveModelPoints = (points, radius = 1) => {
		// 	点击位置起止点
		let positions = [points]
		for (let i = 0; i < disasterPreventionRoute.value.length; i++) {
			const data = disasterPreventionRoute.value[i].map((i) => i + '')
			for (let j = 1; j < data.length; j++) {
				if (object) {
					for (let k = 0; k < object.length; k++) {
						const item = object[k]
						if (item.nodeName === data[j]) {
							positions.push(item.nodePosition)
						}
					}
				}
			}
		}
		if (positions.length > 1) {
			const disasterRoutes = {
				points: positions,
				lineRadius: radius,
			}
			nextTick().then(() => {
				operateModel.value?.addDisPreRoute(disasterRoutes)
			})
		}
	}

	// 显示灾变地点
	const isShowDisaster = ref(false)

	// 刷新灾变层
	const refreshDisaster = async (nextFun) => {
		isShowDisaster.value = false
		await nextTick()
		isShowDisaster.value = true
		await nextTick()
		nextFun?.()
	}

	// 灾变层灾变地点
	const disasterWarn = ref(undefined)
	// 显示灾变人员
	const isShowDisasterPeople = ref(false)

	const refreshDisasterPeople = async (nextFun) => {
		isShowDisasterPeople.value = false
		await nextTick()
		isShowDisasterPeople.value = true
		await nextTick()
		nextFun?.()
	}
	// 灾变层人员显示列表
	const disasterPeopleList = ref([])

	// 点击类型
	const clickType = ref(ClickEventTypes.NORMAL)

	// 改变点击类型
	const changeClickType = (type) => {
		clickType.value = type
	}

	// 根据点击类型返回灾变地点样式
	const disasterClass = computed(() => {
		switch (disasterWarn.value.type) {
			case DisasterTypes.ONE:
				return 'disaster_warn_body'
			case DisasterTypes.TWO:
				return 'disaster_warn_gas'
			case DisasterTypes.THREE:
				return 'disaster_warn_dust'
			case DisasterTypes.FOUR:
				return 'disaster_warn_body'
			default:
				return ''
		}
	})

	// 灾变类型
	const disasterType = ref(DisasterTypes.ONE)
	// 改变灾变类型
	const changeDisasterType = (type) => {
		disasterType.value = type
		disasterWarn.value.type = type
	}

	// 灾变人员所在巷道
	const disasterPeople = reactive({
		obj: null,
		position: null,
	})

	watch(
		() => intersectedPosition.value,
		(val) => {
			if (!val) return
			// 点击类型为灾变地点
			if (clickType.value === ClickEventTypes.DISASTER) {
				disasterLocation.value = intersected.value.name
				disasterPosition.value = val
				disasterWarn.value = {
					id: Math.random(),
					point: val,
					type: disasterType.value,
				}
				refreshDisaster(() => {
					operateModel.value.myDisPreRoute.createdDisaster([disasterWarn.value])
				})
			}
			// 点击类型为人员位置
			if (clickType.value === ClickEventTypes.PERSONNEL) {
				personLocation.value = intersected.value.name
				personPosition.value = val
				disasterPeople.obj = intersected.value
				disasterPeople.position = intersectedPosition.value
				disasterPeopleList.value = []
				disasterPeopleList.value.push({
					id: Math.random(),
					point: val,
				})
				refreshDisasterPeople(() => {
					operateModel.value.myDisPreRoute.createdMark(disasterPeopleList.value)
				})
			}
		},
	)

	// 创建避灾路线
	const disasterRoute = () => {
		avoidDisaster.value = true
		clickType.value = ClickEventTypes.NORMAL
		operateModel.value.myDisPreRoute.cleanMoveModel(-1)
		createdMoveModelPoints?.(disasterPeople.position, modelData.multiple)
	}
	// 清除避灾路线相关
	const cleanDisasterRoute = () => {
		clickType.value = ClickEventTypes.NORMAL
		isShowDisaster.value = false
		isShowDisasterPeople.value = false
		disasterPeopleList.value = []
		disasterPosition.value = undefined
		disasterLocation.value = undefined
		disasterWarn.value = undefined
		personPosition.value = undefined
		personLocation.value = undefined
		disasterType.value = DisasterTypes.ONE
		disasterPeople.obj = null
		disasterPeople.position = null
		operateModel.value.myDisPreRoute.cleanMoveModel(-1)
		operateModel.value.myDisPreRoute.cleanDisasterMesh()
	}
	const { avoidDisaster, disaster } = useHomeMenu()
	// 监听避灾路线菜单显示清除避灾路线相关
	watch(
		() => avoidDisaster.value,
		(value) => {
			if (!value) cleanDisasterRoute()
		},
	)
	// 查询下一节点位置
	const { threeModelData } = useThreeModelData()
	// 灾害模拟相关
	//   创建灾害蔓延
	const createdDisasterSpread = () => {
		let startPoint = disasterWarn.value?.point
		const pointObj = disasterLocation.value.split('-')
		let endPoint = threeModelData.value.find((i) => {
			return i.nodeName === pointObj[1]
		}).nodePosition
		operateModel.value.myDisPreRoute.createdDisasterSpread(
			[
				startPoint,
				{
					...endPoint,
					y: endPoint.y + 3,
				},
			],
			modelData.multiple,
			disasterType.value,
		)

		isShowDisaster.value = false
		disasterWarn.value = undefined
		operateModel.value.myDisPreRoute.cleanDisasterMesh()
		clickType.value = ClickEventTypes.NORMAL
		disaster.value = true
	}

	// 清除灾害模拟
	const cleanDisasterPrevent = () => {
		clickType.value = ClickEventTypes.NORMAL
		isShowDisaster.value = false
		disasterPosition.value = undefined
		disasterLocation.value = undefined
		disasterWarn.value = undefined
		disasterType.value = DisasterTypes.ONE
		operateModel.value.myDisPreRoute.cleanMoveModel(-1)
		operateModel.value.myDisPreRoute.cleanDisasterSpread()
	}
	watch(
		() => disaster.value,
		(val) => {
			if (!val) cleanDisasterPrevent()
		},
	)

	return {
		isShowDisaster,
		disasterWarn,
		disasterClass,
		isShowDisasterPeople,
		disasterPeopleList,
		changeClickType,
		changeDisasterType,
		disasterRoute,
		cleanDisasterRoute,
		createdDisasterSpread,
		cleanDisasterPrevent,
	}
}
