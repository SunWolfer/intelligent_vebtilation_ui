<script setup>
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
</script>

<template>
	<div class="three_label">
		<div :class="data.warnType !== '0' ? 'three_label_header_warn' : 'three_label_header'">
			<div :class="'home_map_' + data.type"></div>
		</div>
		<div :class="data.warnType !== '0' ? 'three_label_content_warn' : 'three_label_content'">
			<div class="three_label_content_bg">
				<div class="three_label_content_bg_text">
					<!--                预警-->
					<template v-if="data.warnType !== '0'">
						<svg-icon
							icon-class="warn"
							color="#ffffff"
							class-name="three_label_content_warn_svg"
						/><span>{{ data.warnMes }}</span>
					</template>
					<template v-else>{{ data.name }}</template>
				</div>
			</div>
		</div>
		<div :class="data.warnType !== '0' ? 'three_label_footer_warn' : 'three_label_footer'"></div>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/assets/styles/home/home_map';
</style>
