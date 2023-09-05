<template>
	<div v-if="showVideoDialog" :ref="'video' + domid" :id="'video' + domid" class="fullDom">
		<object
			type="application/x-vlc-plugin"
			:ref="`liveplayer_` + domid"
			:id="`liveplayer_` + domid"
			class="videoFull"
		>
			<param name="volume" value="0" />
			<param name="mrl" :value="videoPath" />
			<param name="autoplay" value="true" />
			<param name="loop" value="false" />
			<param name="fullscreen" value="false" />
		</object>
	</div>
	<div v-else class="fullDom" :class="videoDefaultBg"></div>
</template>

<script setup>
	const props = defineProps({
		domid: {
			type: String,
			default() {
				return 'xg'
			},
		},
		videoPath: {
			type: String,
		},
		type: {
			type: String,
			default: '',
		},
	})

	const showVideoDialog = computed(() => {
		return props.videoPath
	})

	const videoBgUrl = new Map([
		['fm', 'default_fm_video'],
		['fc', 'default_fc_video'],
		['cfz', 'default_cfz_video'],
		['fj', 'default_fj_video'],
		['js', 'default_js_video'],
	])
	const videoDefaultBg = computed(() => {
		return videoBgUrl.get(props.type) ?? ''
	})
</script>

<style scoped>
	.videoFull {
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>
