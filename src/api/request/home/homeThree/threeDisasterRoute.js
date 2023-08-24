import { ClickEventTypes, DisasterTypes } from '@/api/request/menuType'
import useCurrentInstance from '@/hooks/useCurrentInstance'
import useHomeMenu from '@/hooks/useHomeMenu'
import useEquipmentData from '@/hooks/useEquipmentData'
import { IModels } from '@/components/VueThree/models'

export const threeDisasterRoute = (operateModel, intersectedPosition, intersected) => {
	const object = IModels
	const { disasterPreventionRoute } = useEquipmentData()
	// 生成避灾路线点位
	const createdMoveModelPoints = (startNode, points, radius = 4) => {
		// 	点击位置起止点
		let positions = [points]
		for (let i = 0; i < disasterPreventionRoute.value.length; i++) {
			const data = disasterPreventionRoute.value[i]
			const index = data.indexOf(startNode)
			if (index !== -1) {
				for (let j = index; j < data.length; j++) {
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
	const refreshDisaster = (nextFun) => {
		isShowDisaster.value = false
		nextTick(() => {
			isShowDisaster.value = true
			nextTick(() => {
				nextFun?.()
			})
		})
	}

	// 灾变层灾变地点显示列表
	const disasterWarnList = ref([])
	// 显示灾变人员
	const isShowDisasterPeople = ref(false)

	const refreshDisasterPeople = (nextFun) => {
		isShowDisasterPeople.value = false
		nextTick(() => {
			isShowDisasterPeople.value = true
			nextTick(() => {
				nextFun?.()
			})
		})
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
	const disasterClass = (type) => {
		switch (type) {
			case DisasterTypes.ONE:
				return 'disaster_warn_body'
			case DisasterTypes.TWO:
				return 'disaster_warn_body'
			case DisasterTypes.THREE:
				return 'disaster_warn_body'
			case DisasterTypes.FOUR:
				return 'disaster_warn_body'
			default:
				return ''
		}
	}

	// 灾变类型
	const disasterType = ref(DisasterTypes.ONE)
	// 改变灾变类型
	const changeDisasterType = (type) => {
		disasterType.value = type
	}

	// 灾变人员所在巷道
	const disasterPeople = reactive({
		obj: null,
		position: null,
	})

	watch(
		() => intersectedPosition.value,
		(val) => {
			// 点击类型为灾变地点
			if (clickType.value === ClickEventTypes.DISASTER) {
				disasterWarnList.value = []
				disasterWarnList.value.push({
					id: Math.random(),
					point: val,
					type: disasterType.value,
				})
				refreshDisaster(() => {
					operateModel.value.myDisPreRoute.createdDisaster(disasterWarnList.value)
				})
			}
			// 点击类型为人员位置
			if (clickType.value === ClickEventTypes.PERSONNEL) {
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

	const { proxy } = useCurrentInstance()
	// 创建避灾路线
	const disasterRoute = () => {
		if (!disasterWarnList.value.length) {
			proxy.$modal.msgWarning('请选择灾变地点')
			return
		}
		if (!disasterPeopleList.value.length) {
			proxy.$modal.msgWarning('请选择人员位置')
			return
		}
		// 生成起点
		const pointObj = disasterPeople.obj.name.split('-')
		if (pointObj.length < 2) {
			proxy.$modal.msgWarning('人员地点请选择巷道')
			return
		}
		avoidDisaster.value = true
		clickType.value = ClickEventTypes.NORMAL
		const startPoint = pointObj[1]
		operateModel.value.myDisPreRoute.cleanMoveModel(-1)
		createdMoveModelPoints?.(startPoint, disasterPeople.position, 400)
	}
	// 清除避灾路线相关
	const cleanDisasterRoute = () => {
		clickType.value = ClickEventTypes.NORMAL
		isShowDisaster.value = false
		isShowDisasterPeople.value = false
		disasterPeopleList.value = []
		disasterWarnList.value = []
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

	// 灾害模拟相关
	//   创建灾害蔓延
	const createdDisasterSpread = () => {
		if (!disasterWarnList.value.length) {
			proxy.$modal.msgWarning('请选择灾变地点')
			return
		}

		let startPoint = disasterWarnList.value[0].point
		let endPoint = {
			x: -4902.90625,
			y: 96500,
			z: -14248.630859375,
		}
		operateModel.value.myDisPreRoute.createdDisasterSpread(
			[startPoint, endPoint],
			80,
			disasterType.value,
		)
		createdDisasterPreventionRoute()

		isShowDisaster.value = false
		disasterWarnList.value = []
		operateModel.value.myDisPreRoute.cleanDisasterMesh()
		clickType.value = ClickEventTypes.NORMAL
		disaster.value = true
	}

	//   创建灾害模拟避灾路线
	const createdDisasterPreventionRoute = () => {
		createdMoveModelPoints?.(
			'143',
			{
				x: -4221.058428933942,
				y: 96870.74612915481,
				z: -14285.663893880277,
			},
			400,
		)
	}

	// 清除灾害模拟
	const cleanDisasterPrevent = () => {
		clickType.value = ClickEventTypes.NORMAL
		isShowDisaster.value = false
		disasterWarnList.value = []
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
		disasterWarnList,
		disasterClass,
		isShowDisasterPeople,
		disasterPeopleList,
		changeClickType,
		changeDisasterType,
		disasterRoute,
		cleanDisasterRoute,
		createdDisasterSpread,
	}
}
