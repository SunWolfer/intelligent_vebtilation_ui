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
	})

	const showVideoDialog = computed(() => {
		return props.videoPath
	})
</script>

<style scoped>
	.videoFull {
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>
