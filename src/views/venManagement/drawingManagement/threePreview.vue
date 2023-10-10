<!--三维图预览-->
<script setup>
	import { customizeThreeData } from '@/api/request/venManagement/venSystemManagement/customizeThreeData'
	import LoadVenSysManModel from '@/views/components/loadModel/loadVenSysManModel.vue'

	const { customizeData, customizeMaxNodeNum, readyThreeModel, dataForm, queryThreeModelData } =
		customizeThreeData()

	const route = useRoute()
	const initMap = () => {
		dataForm.tag = route.query.tag
		dataForm.type = '2'
		queryThreeModelData?.()
	}

	const typeList = [
		{
			label: '经典模式',
			value: '2',
			iconClass: 'home_model_type_item_icon2',
		},
		{
			label: '科技模式',
			value: '1',
			iconClass: 'home_model_type_item_icon1',
		},
	]
	// 切换模式
	const changeType = (type) => {
		dataForm.type = type
		queryThreeModelData?.()
	}
	const router = useRouter()
	const quit = () => {
		router.back()
	}

	onMounted(() => {
		initMap()
	})
</script>

<template>
	<div class="fullDom">
		<load-ven-sys-man-model
			ref="modelRef"
			v-if="readyThreeModel"
			:customize-data="customizeData"
			:customize-max-node-num="customizeMaxNodeNum"
		/>
		<div class="home_model_type">
			<div v-for="i in typeList" class="home_model_type_item">
				<span
					class="pointer"
					:class="dataForm.type === i.value ? 'text_active' : 'text_default'"
					@click="changeType(i.value)"
					>{{ i.label }}</span
				>
				<div :class="i.iconClass"></div>
			</div>
		</div>
		<div class="reverse_wind_ing_bottom">
			<div class="reverse_wind_ing_bottom_1" @click="quit"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/three/model_type';
	.home_model_type {
		right: vw(20);
		top: 0;
	}
	.reverse_wind_ing_bottom {
		position: absolute;
		bottom: vh(52);
		right: vw(72);
	}
	.reverse_wind_ing_bottom_1 {
		position: relative;
		width: vh(98);
		height: vh(98);
		background-image: url('@/assets/images/home/home_reverse_wind/back.gif');
		background-size: 100% 100%;
		cursor: pointer;
		pointer-events: auto;
		&:after {
			position: absolute;
			content: '退出';
			width: 100%;
			height: vh(45);
			text-align: center;
			font-size: vw(20);
			font-family:
				Adobe Heiti Std,
				serif;
			font-weight: normal;
			color: #ffffff;
			line-height: vh(45);
			top: 100%;
		}
	}
</style>
