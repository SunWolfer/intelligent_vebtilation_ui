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

	const tabs = reactive([
		{
			name: '默认显示',
			domName: markRaw(DoorMsg),
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
	} = useThree()
	// 绘制风流
	const redrawingWind = (direction) => {
		homeModelVisible.value?.addWind(direction)
	}

	defineExpose({
		operateModel,
		redrawingWind,
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
				<template v-for="i in showTypeList" :key="i.id">
					<component :is="chooseTab(i.type)" :data="i" :id="i.id" />
				</template>
			</template>
		</model-generation>
	</div>
</template>

<style scoped lang="scss"></style>
