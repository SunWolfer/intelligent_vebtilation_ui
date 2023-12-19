<script setup>
	import { homeAirWindow } from '@/api/request/home/homeAirWindow'
	import HomeAirWindowMore from '@/views/components/home/HomeAirWindowMore.vue'
	import WindowHisRecord from '@/views/venEqMonitoring/windWindowMonitoring/windowHisRecord.vue'

	const {
		dataList,
		dataForm,
		dataFormB,
		changeWindow,
		moreVisible,
		moreVisibleHandle,
		chooseTabs,
		hisRecordHandle,
		hisRecordVisible,
	} = homeAirWindow()
</script>

<template>
	<div class="fullDom">
		<component
			:is="chooseTabs"
			:formA="dataForm"
			:formB="dataFormB"
			:dataList="dataList"
			@more-visible-handle="moreVisibleHandle"
			@change-window="changeWindow"
			@his-record-handle="hisRecordHandle"
		/>
		<!--    操作记录-->
		<WindowHisRecord v-if="hisRecordVisible" v-model="hisRecordVisible" :data-form="dataForm" />
		<!--    更多弹窗-->
		<home-air-window-more
			v-if="moreVisible"
			v-model="moreVisible"
			:title="dataForm.name"
			:data-form="dataForm"
		/>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_air_window';
</style>
