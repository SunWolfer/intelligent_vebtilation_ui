import { ClickEventTypes, DisasterTypes } from '@/api/request/home/menuType'
import useCurrentInstance from '@/hooks/useCurrentInstance'
import useHomeMenu from '@/hooks/useHomeMenu'

export const threeDisasterRoute = (
	operateModel,
	intersectedPosition,
	intersected,
	createdMoveModelPoints,
) => {
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

	// 刷洗人员层
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
	const { avoidDisaster } = useHomeMenu()
	watch(
		() => avoidDisaster.value,
		(value) => {
			if (!value) cleanDisasterRoute()
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
	}
}
