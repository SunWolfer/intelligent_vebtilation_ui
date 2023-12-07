<script setup>
	const props = defineProps({
		data: {
			type: Object,
			default: {},
		},
	})
	const iconMap = new Map([
		// 二氧化碳
		['0013', ['', '1']],
		// 粉尘
		['0014', ['mg/m3', '2']],
		// 风速
		['0002', ['m/s', '3']],
		// 瓦斯
		['0001', ['%CH4', '4']],
		// 环境温度
		['0003', ['', '5']],
		// 氧气
		['0012', ['', '6']],
		// 烟雾
		['1008', ['', '7']],
		// 一氧化碳
		['0004', ['ppm', '8']],
	])
	const sensorBgClass = (type) => {
		return iconMap.get(type)?.[1] ?? ''
	}
	const sensorBgUnit = (type) => {
		return iconMap.get(type)?.[0] ?? ''
	}
</script>

<template>
	<div class="three_label">
		<div :class="data.warnStatus !== '0' ? 'three_label_header_warn' : 'three_label_header'">
			<div :class="'dev_icon_' + sensorBgClass(data.type)"></div>
		</div>
		<div :class="data.warnStatus !== '0' ? 'three_label_content_warn' : 'three_label_content'">
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
						<span>{{ data.value + sensorBgUnit(data.type) }}</span>
					</template>
				</div>
			</div>
		</div>
		<div :class="data.warnStatus !== '0' ? 'three_label_footer_warn' : 'three_label_footer'"></div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_map';
	@mixin homeMap {
		width: vh(50);
		height: vh(50);
		background-size: 100% 100%;
	}
	@for $i from 1 through 8 {
		.dev_icon_#{$i} {
			@include homeMap;
			background-image: url('@/assets/images/sysFusionPerception/envPerception/dev_icon_#{$i}.png');
		}
	}
</style>
