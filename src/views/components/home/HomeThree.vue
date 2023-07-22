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
	import { ClickEventTypes } from '@/api/request/home/menuType'

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
		intersectedPosition,
	} = useThree()
	// 绘制风流
	const redrawingWind = (direction) => {
		homeModelVisible.value?.addWind(direction)
	}

	// 点击类型
	const clickType = ref(ClickEventTypes.NORMAL)

	watch(
		() => intersectedPosition.value,
		(val) => {
			// 点击类型为灾变地点
			if (clickType.value === ClickEventTypes.DISASTER) {
				operateModel.value.myDisPreRoute.createdDisaster(val, 960, 960)
			}
			// 点击类型为人员位置
			if (clickType.value === ClickEventTypes.PERSONNEL) {
				operateModel.value.myDisPreRoute.createdMark(val, 860, 1300)
			}
		},
	)
	// 改变点击类型
	const changeClickType = (type) => {
		clickType.value = type
	}
	// 改变灾变类型
	const changeDisasterType = (type) => {
		operateModel.value.myDisPreRoute.changeDisasterType(type)
	}

	defineExpose({
		operateModel,
		redrawingWind,
		changeClickType,
		changeDisasterType,
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
</style>
