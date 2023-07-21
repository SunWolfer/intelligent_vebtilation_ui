<script setup>
	import useThree from '@/hooks/useThree'
	import useEquipmentData from '@/hooks/useEquipmentData'

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
    redrawingWind
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
				<div v-for="i in showTypeList" :key="i.id" :id="i.id" class="three_label">
					<div :class="i.warnType !== '0' ? 'three_label_header_warn' : 'three_label_header'">
						<div :class="'home_map_' + i.type"></div>
					</div>
					<div :class="i.warnType !== '0' ? 'three_label_content_warn' : 'three_label_content'">
						<div class="three_label_content_bg">
							<div class="three_label_content_bg_text">
								<template v-if="i.warnType !== '0'">
									<svg-icon
										icon-class="warn"
										color="#ffffff"
										class-name="three_label_content_warn_svg"
									/><span>{{ i.warnMes }}</span>
								</template>
								<template v-else>{{ i.name }}</template>
							</div>
						</div>
					</div>
					<div :class="i.warnType !== '0' ? 'three_label_footer_warn' : 'three_label_footer'"></div>
				</div>
			</template>
		</model-generation>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_map';
</style>
