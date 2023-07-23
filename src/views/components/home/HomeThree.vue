<script setup>
	import useThree from '@/hooks/useThree'
	import useEquipmentData from '@/hooks/useEquipmentData'
	import NormalMsg from '@/views/components/equiptmentMsg/NormalMsg'
	import DoorMsg from '@/views/components/equiptmentMsg/DoorMsg.vue'
	import useHomeMenu from '@/hooks/useHomeMenu'
	import WindowMsg from '@/views/components/equiptmentMsg/WindowMsg.vue'
	import DuoshenMsg from '@/views/components/equiptmentMsg/DuoshenMsg.vue'
	import FullSectionMsg from '@/views/components/equiptmentMsg/FullSectionMsg.vue'
	import MainFanMsg from '@/views/components/equiptmentMsg/MainFanMsg.vue'
	import LocalFanMsg from '@/views/components/equiptmentMsg/LocalFanMsg.vue'
	import WindSpeedMsg from '@/views/components/equiptmentMsg/WindSpeedMsg.vue'
	import { ClickEventTypes, DisasterTypes } from '@/api/request/home/menuType'
	import useCurrentInstance from '@/hooks/useCurrentInstance'

	const tabs = reactive([
		{
			name: '默认显示',
			domName: markRaw(NormalMsg),
		},
		{
			name: '风门漫游',
			domName: markRaw(DoorMsg),
		},
		{
			name: '风窗漫游',
			domName: markRaw(WindowMsg),
		},
		{
			name: '风速传感器漫游',
			domName: markRaw(WindSpeedMsg),
		},
		{
			name: '多参传感器漫游',
			domName: markRaw(DuoshenMsg),
		},
		{
			name: '全断面断风漫游',
			domName: markRaw(FullSectionMsg),
		},
		{
			name: '主扇漫游',
			domName: markRaw(MainFanMsg),
		},
		{
			name: '局扇漫游',
			domName: markRaw(LocalFanMsg),
		},
	])
	const { roam } = useHomeMenu()

	const chooseTab = (type) => {
		if (!roam.value) {
			return tabs[0].domName
		}
		switch (type) {
			case '1':
				return tabs[1].domName
			case '2':
				return tabs[2].domName
			case '3':
				return tabs[3].domName
			case '4':
				return tabs[4].domName
			case '5':
				return tabs[5].domName
			case '6':
				return tabs[6].domName
			case '7':
				return tabs[7].domName
		}
	}

	const { showTypeList } = useEquipmentData()

	const isReady = ref(false)
	watch(
		() => showTypeList.value,
		(val) => {
			isReady.value = false
			nextTick().then(() => {
				isReady.value = true
				nextTick(() => {
					createdLabelList?.(val)
				})
			})
		},
	)

	const {
		homeModelVisible,
		otherThreeMod,
		cameraPosition,
		controlsOptions,
		lights,
		onLoad,
		onModel,
		onClick,
		dblclick,
		readyCamera,
		createdLabelList,
		operateModel,
		intersected,
		intersectedPosition,
		cleanMove,
		createdMoveModelPoints,
	} = useThree()
	// 绘制风流
	const redrawingWind = (direction) => {
		homeModelVisible.value?.addWind(direction)
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
		cleanMove?.()
		createdMoveModelPoints?.(startPoint, disasterPeople.position, 400)
	}
	// 清除避灾路线相关
	const cleanDisasterRoute = () => {
		cleanMove?.()
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

	defineExpose({
		operateModel,
		redrawingWind,
		changeClickType,
		changeDisasterType,
		disasterRoute,
		cleanDisasterRoute,
	})
</script>

<template>
	<div class="fullDom">
		<model-generation
			ref="homeModelVisible"
			:other-three-mod="otherThreeMod"
			:cameraPosition="cameraPosition"
			:lights="lights"
			:camera-size="10"
			:backgroundAlpha="0"
			:controlsOptions="controlsOptions"
			:choose-group="true"
			@load="onLoad"
			@onModel="onModel"
			@click="onClick"
			@dblclick="dblclick"
			@ready-camera="readyCamera"
		>
			<template #label v-if="isReady">
				<div
					v-for="(i, index) in showTypeList"
					:key="i.id"
					:id="i.id"
					:class="roam ? 'label_bg_roam' : 'label_bg'"
				>
					<component :is="chooseTab(i.type)" :data="i" />
				</div>
			</template>
			<template #warn>
				<template v-if="isShowDisaster">
					<div v-for="i in disasterWarnList" :key="i.id" :id="i.id" class="disaster_warn">
						<div :class="disasterClass(i.type)"></div>
					</div>
				</template>

				<template v-if="isShowDisasterPeople">
					<div v-for="i in disasterPeopleList" :key="i.id" :id="i.id" class="disaster_start"></div>
				</template>
			</template>
		</model-generation>
	</div>
</template>

<style scoped lang="scss">
	.label_bg {
		position: absolute;
		left: vh(77);
		top: vh(-50);
	}
	.label_bg_roam {
		position: absolute;
		top: vh(-150);
		left: vw(191);
	}
	.disaster_start {
		position: absolute;
		width: vh(43);
		height: vh(65);
		top: vh(-32.5);
		background-image: url('@/assets/images/home/home_dis_pre_route/start_mark.png');
		background-size: 100% 100%;
	}
	.disaster_warn {
		position: absolute;
		width: vh(40);
		height: vh(40);
		top: vh(-20);
	}
	.disaster_warn_body {
		position: relative;
		width: 100%;
		height: 100%;
		background-image: url('@/assets/images/home/home_dis_pre_route/fire.gif');
		background-size: 100% 100%;
	}
</style>
