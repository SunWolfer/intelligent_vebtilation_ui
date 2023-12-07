<script setup>
	const props = defineProps({
		videoPath: {
			type: String,
		},
	})
	const videoId = Math.random() + new Date().getTime() + ''
	let webRtcServer
	const initVideo = () => {
		webRtcServer = new WebRtcStreamer(videoId, window.SITE_CONFIG.webrtcServer)
		webRtcServer.connect(props.videoPath, null, 'rtptransport=tcp')
	}
	onMounted(() => {
		initVideo()
	})
	onBeforeUnmount(() => {
		webRtcServer.disconnect()
	})
</script>

<template>
	<video :id="videoId" class="fullDom" muted autoplay loop controls></video>
</template>

<style scoped lang="scss"></style>
