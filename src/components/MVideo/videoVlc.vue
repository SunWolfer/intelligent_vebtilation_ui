<script setup>
	const props = defineProps({
		videoPath: {
			type: String,
		},
	})
</script>

<template>
	<object type="application/x-vlc-plugin" class="videoFull">
		<param name="volume" value="0" />
		<param name="mrl" :value="videoPath" />
		<param name="autoplay" value="true" />
		<param name="loop" value="false" />
		<param name="fullscreen" value="false" />
	</object>
</template>

<style scoped lang="scss"></style>
