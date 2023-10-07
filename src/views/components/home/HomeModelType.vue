<!--模式切换-->
<script setup>
	import { useThreeModelData } from '@/hooks/useThreeModelData'
	import { dynamicHeight, dynamicWidth } from '@/utils/ruoyi'

	const props = defineProps({
		right: {
			type: Number,
			default: 0,
		},
		top: {
			type: Number,
			default: 0,
		},
	})
	const domStyle = computed(() => {
		return {
			right: dynamicWidth(props.right) + 'px',
			top: dynamicHeight(props.top) + 'px',
		}
	})

	const typeList = [
		{
			label: '经典模式',
			value: '2',
			iconClass: 'home_model_type_item_icon1',
		},
		{
			label: '科技模式',
			value: '1',
			iconClass: 'home_model_type_item_icon2',
		},
	]

	//   查询模型信息
	const { modelType, changeType } = useThreeModelData()
</script>

<template>
	<div class="home_model_type" :style="domStyle">
		<div v-for="i in typeList" class="home_model_type_item">
			<span
				class="pointer"
				:class="modelType === i.value ? 'text_active' : 'text_default'"
				@click="changeType(i.value)"
				>{{ i.label }}</span
			>
			<div :class="i.iconClass"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/three/model_type';
</style>
