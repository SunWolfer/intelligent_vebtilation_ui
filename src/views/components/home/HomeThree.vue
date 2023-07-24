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
	import { threeDisasterRoute } from '@/api/request/home/homeThree/threeDisasterRoute'

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
		createdMoveModelPoints,
	} = useThree()
	// 监听反风，重绘风流
	const { reverseWind } = useHomeMenu()
	watch(
		() => reverseWind.value,
		(value) => {
			homeModelVisible.value?.addWind(value)
		},
	)
	// 避灾路线相关
	const {
		changeClickType,
		changeDisasterType,
		disasterRoute,
		isShowDisaster,
		disasterWarnList,
		disasterClass,
		isShowDisasterPeople,
		disasterPeopleList,
	} = threeDisasterRoute(operateModel, intersectedPosition, intersected, createdMoveModelPoints)

	defineExpose({
		operateModel,
		changeClickType,
		changeDisasterType,
		disasterRoute,
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
					<component :is="chooseTab(i.type)" :data="i" :index="index" />
				</div>
			</template>
			<!--      避灾路线相关-->
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
		left: vw(186.5);
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
