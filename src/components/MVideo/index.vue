<template>
	<div v-if="showVideoDialog" class="fullDom">
		<component :is="chooseTabs" :videoPath="videoPath" />
	</div>
	<div v-else class="fullDom">
		<div class="fullDom" :class="videoDefaultBg"></div>
	</div>
</template>

<script setup>
	import videoVlc from './videoVlc.vue'
	import videoWebrtc from './videoWebrtc.vue'
	const props = defineProps({
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

	const tabs = reactive([
		{
			name: 'vlc',
			domName: markRaw(videoVlc),
		},
		{
			name: 'webrtc',
			domName: markRaw(videoWebrtc),
		},
	])

	const chooseTabs = computed(() => {
		return window.SITE_CONFIG.videoMode === 'webrtc' ? tabs[1].domName : tabs[0].domName
	})
</script>

<style scoped lang="scss">
	.fullDom {
		padding: 12px;
	}
</style>
