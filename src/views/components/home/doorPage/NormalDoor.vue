<script setup lang="ts">
	import LoadDoorModel from '@/views/components/loadModel/LoadDoorModel.vue'

	defineProps({
		dataForm: {
			type: Object,
			default: {},
		},
		playmod: {
			type: String,
			default: '',
		},
		videoUrl1: {
			type: String,
			default: '',
		},
		videoUrl2: {
			type: String,
			default: '',
		},
	})
</script>

<template>
	<div class="home_air_door_body_c1">
		<div class="home_air_door_body_c1_c1">
			<load-door-model :data-form="dataForm" :playmod="playmod" />
		</div>
		<border-box name="border1" background-color="rgba(24, 25, 49, 0.54)">
			<m-video type="fm" :video-path="videoUrl1" :domid="'mDevicePlayer1'" />
		</border-box>
		<border-box name="border1" background-color="rgba(24, 25, 49, 0.54)">
			<m-video type="fm" :video-path="videoUrl2" :domid="'mDevicePlayer2'" />
		</border-box>
	</div>
</template>

<style scoped lang="scss">
	.home_air_door_body_c1 {
		display: grid;
		grid-template-columns: 1fr vw(512);
		grid-template-rows: 1fr 1fr;
		.home_air_door_body_c1_c1 {
			grid-row-start: 1;
			grid-row-end: 3;
		}
	}
</style>
