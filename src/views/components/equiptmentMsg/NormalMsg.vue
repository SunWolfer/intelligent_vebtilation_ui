<script setup>
	import useEquipmentParams from '@/hooks/useEquipmentParams'
	import useEquipmentData from '@/hooks/useEquipmentData'
	import { deviceTypes } from '@/types/menuType'

	const props = defineProps({
		data: {
			type: Object,
			default: {},
		},
		index: {
			type: Number,
			default: 0,
		},
	})
	const { equipTypeImgClass } = useEquipmentData()

	const router = useRouter()

	const toChildMenu = () => {
		switch (props.data.devType) {
			case deviceTypes.DOOR:
				useEquipmentParams().setParams(props.data)
				router.push({ path: '/homeChild/homeAirDoor' })
				break
			case deviceTypes.WINDOW:
				useEquipmentParams().setParams(props.data)
				router.push({ path: '/homeChild/homeAirWindow' })
				break
			case deviceTypes.MAINFAN:
				useEquipmentParams().setParams(props.data)
				router.push({ path: '/venEqMonitoring/mainFan' })
				break
			case deviceTypes.LOCALFAN:
				useEquipmentParams().setParams(props.data)
				router.push({ path: '/venEqMonitoring/localFan' })
				break
			case deviceTypes.FULLWIND:
				useEquipmentParams().setParams(props.data)
				router.push({ path: '/accPerOfRomance/fullSecWindMeasurement' })
				break
		}
	}
</script>

<template>
	<div class="three_label">
		<div :class="data.warnStatus !== '0' ? 'three_label_header_warn' : 'three_label_header'">
			<div :class="'home_map_' + equipTypeImgClass(data.devType)"></div>
		</div>
		<div
			:class="data.warnStatus !== '0' ? 'three_label_content_warn' : 'three_label_content'"
			@click="toChildMenu"
		>
			<div class="three_label_content_bg">
				<div class="three_label_content_bg_text">
					<!--					预警-->
					<template v-if="data.warnStatus !== '0'">
						<svg-icon
							icon-class="warn"
							color="#ffffff"
							class-name="three_label_content_warn_svg"
						/><span>{{ data.warnName }}</span>
					</template>
					<template v-else>
						<span>{{ data.value }}</span>
					</template>
				</div>
			</div>
		</div>
		<div :class="data.warnStatus !== '0' ? 'three_label_footer_warn' : 'three_label_footer'"></div>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/assets/styles/three/sensor_icon';
	@import '@/assets/styles/home/home_map';
</style>
