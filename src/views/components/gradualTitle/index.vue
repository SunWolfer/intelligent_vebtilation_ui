<script setup>
	const props = defineProps({
		title: {
			type: String,
			default: '',
		},
		hasLine: {
			type: Boolean,
			default: true,
		},
	})
</script>

<template>
	<div class="gradual-text">
		<div class="gradient-text-label">{{ title }}</div>
		<div v-if="hasLine" class="gradient-text-line"></div>
	</div>
</template>

<style lang="scss" scoped>
	@mixin gradualText {
		font-family:
			Microsoft YaHei,
			serif;
		font-size: vh(24);
		font-weight: 600;
		color: #00ffff;
		line-height: vh(36);

		background: linear-gradient(92deg, #01aaff 30%, #00eaff 50%, #01aaff 70%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;

		-webkit-background-size: 200% 100%;
		-webkit-animation: masked-animation 4s infinite linear;
	}

	//渐变字
	.gradual-text {
		display: inline-block;
	}
	.gradient-text-label {
		@include gradualText;
	}

	.gradient-text-line {
		width: 100%;
		height: 2px;
		background-image: linear-gradient(to right, #0072ff, rgba(62, 214, 255, 1));
		animation: beFlexLine 4s infinite linear;
	}

	@keyframes masked-animation {
		0% {
			background-position: 0 0;
		}
		to {
			background-position: -200% 0;
		}
	}
	@keyframes beFlexLine {
		0% {
			width: 0;
		}
		100% {
			width: 100%;
		}
	}
</style>
