<!--避灾路线模拟-->
<script setup>
	import HomeThree from '@/views/components/home/HomeThree.vue'
	import HomeDisPreRoute from '@/views/components/home/HomeDisPreRoute.vue'
	import { home } from '@/api/request/home'
	import { useThreeModelData } from '@/hooks/useThreeModelData'

	const { threeRef, setDisaster, setPersonnel, changeDisasterType, imitateRoute } = home()

	const { refreshModel } = useThreeModelData()
</script>

<template>
	<div class="fullDom">
		<HomeThree v-if="refreshModel" ref="threeRef" :optional-equipment="false" />

		<!--    避灾路线模拟-->
		<HomeDisPreRoute
			:dom-left="72"
			:dom-bottom="690"
			@set-disaster="setDisaster"
			@set-personnel="setPersonnel"
			@imitate-route="imitateRoute"
			@change-disaster-type="changeDisasterType"
		/>
	</div>
</template>

<style scoped lang="scss"></style>
