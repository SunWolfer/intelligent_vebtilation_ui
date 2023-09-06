<script setup>
	import ModelDxf from '@/components/VueThree/model-dxf.vue'
	const indoorFileUrl = import.meta.env.BASE_URL + 'file/api-cw750-details.dxf'
</script>

<template>
	<div class="fullDom">
		<model-dxf :src="indoorFileUrl" :backgroundAlpha="0"></model-dxf>
	</div>
</template>

<style scoped lang="scss"></style>
