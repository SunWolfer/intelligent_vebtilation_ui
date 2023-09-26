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
	import { deviceTypes } from '@/api/request/menuType'
  import {EditType} from "@/components/VueThree/types/editType";
  import TunnelMessage
    from "@/views/components/equiptmentMsg/TunnelMessage.vue";
  import {homeMenu} from "@/api/request/home/homeMenu";

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
		switch (type) {
			case deviceTypes.DOOR:
				return tabs[1].domName
			case deviceTypes.WINDOW:
				return tabs[2].domName
			case deviceTypes.WINDSENSOR:
				return tabs[3].domName
			case deviceTypes.MULTIPARAMETE:
				return tabs[4].domName
			case deviceTypes.FULLWIND:
				return tabs[5].domName
			case deviceTypes.MAINFAN:
				return tabs[6].domName
			case deviceTypes.LOCALFAN:
				return tabs[7].domName
		}
	}

	const { showTypeList, equipmentPathList } = useEquipmentData()

	const isReady = ref(false)

	watch(
		() => roam.value,
		(val) => {
			if (val) {
				nextFun(equipmentPathList.value)
			} else {
				nextFun(showTypeList.value)
			}
		},
	)

	watch(
		() => showTypeList.value,
		(val) => {
			nextFun(val)
		},
	)

	const nextFun = (list) => {
		isReady.value = false
		nextTick().then(() => {
			isReady.value = true
			nextTick(() => {
				createdLabelList?.(list, 'uniqueCode')
			})
		})
	}

	const {
		homeModelVisible,
		otherThreeMod,
		controlsOptions,
		lights,
		onLoad,
		onModel,
		onClick,
		dblclick,
		createdLabelList,
		operateModel,
		intersected,
		intersectedPosition,
	} = useThree()

  const readyCamera = () => {
    operateModel.value?.createdImgPlane()
    if (showTypeList.value) {
      nextFun?.(showTypeList.value)
    }
  }

  const emits = defineEmits(['chooseTunnel'])

  watch(() => intersected.value, (val) => {
    val && emits('chooseTunnel', val)
  })

	const { reverseWind } = useHomeMenu()
	// 监听反风，重绘风流
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
		createdDisasterSpread,
	} = threeDisasterRoute(operateModel, intersectedPosition, intersected)

	// 设置选中
	function setSelectModel(name) {
		homeModelVisible.value?.setSelectObject(name)
	}

	defineExpose({
		operateModel,
		setSelectModel,
		changeClickType,
		changeDisasterType,
		disasterRoute,
		createdDisasterSpread,
	})
  const {showTunnelMesVisible} = homeMenu()
</script>

<template>
	<div class="fullDom">
		<model-generation
			ref="homeModelVisible"
			:other-three-mod="otherThreeMod"
			:lights="lights"
			:camera-size="0.1"
			:backgroundAlpha="0"
			:controlsOptions="controlsOptions"
			:choose-group="true"
			@load="onLoad"
			@onModel="onModel"
			@onClick="onClick"
			@onDblclick="dblclick"
			@ready-camera="readyCamera"
		>
			<template #label v-if="isReady">
				<template v-if="roam">
					<div
						v-for="(i, index) in equipmentPathList"
						:key="i.uniqueCode"
						:id="i.uniqueCode"
						class="label_bg_roam"
					>
						<component :is="chooseTab(i.devType)" :data="i" :index="index" />
					</div>
				</template>
				<template v-else>
					<div
						v-for="(i, index) in showTypeList"
						:key="i.uniqueCode"
						:id="i.uniqueCode"
						class="label_bg"
					>
						<normal-msg :data="i" :index="index" />
					</div>
				</template>
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
      <template #default>
        <tunnel-message
          v-if="!showTunnelMesVisible"
          :intersected="intersected"
          :operate-model="operateModel"
        />
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
		top: vh(-180);
		left: vw(228);
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
		left: 0;
	}
	.disaster_warn_body {
		position: relative;
		width: 100%;
		height: 100%;
		background-image: url('@/assets/images/home/home_dis_pre_route/fire.gif');
		background-size: 100% 100%;
	}
</style>
