<!--预警等级管理-->
<script setup>
	import VentPower from '@/views/venManagement/eaWarnLevelManagement/VentPower.vue'
	import VentNetwork from '@/views/venManagement/eaWarnLevelManagement/VentNetwork.vue'
	import VentFacility from '@/views/venManagement/eaWarnLevelManagement/VentFacility.vue'
	import VentFusion from '@/views/venManagement/eaWarnLevelManagement/VentFusion.vue'

	// 选中项目
	const chooseDom = ref('1')
	//  预警等级列表
	const tabs = reactive([
		{
			name: '通风动力',
			domType: '1',
			domName: shallowRef(VentPower),
		},
		{
			name: '通风设施',
			domType: '2',
			domName: shallowRef(VentFacility),
		},
		{
			name: '通风网络',
			domType: '3',
			domName: shallowRef(VentNetwork),
		},
		{
			name: '通风融合',
			domType: '4',
			domName: shallowRef(VentFusion),
		},
	])
	// 加载组件
	const loadDom = computed(() => {
		return tabs.find((i) => i.domType === chooseDom.value).domName
	})

	// 改变加载项目
	const changeChooseDom = (type) => {
		if (type === chooseDom.value) return
		chooseDom.value = type
	}
</script>

<template>
	<div class="ea_warn_manage">
		<div class="cal_air_body_top_left">
			<template v-for="i in tabs" :key="i.domType">
				<div
					:class="i.domType === chooseDom ? 'cal_air_btn_1_active' : 'cal_air_btn_1'"
					@click="changeChooseDom(i.domType)"
				>
					<span>{{ i.name }}</span>
				</div>
			</template>
		</div>
		<div class="fullDom">
			<border-box name="border3">
				<div class="ea_warn_manage_child">
					<component :is="loadDom" />
				</div>
			</border-box>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/calOfAirDemand';
	@import '@/assets/styles/venManagement/eaWarnLevelManagement';
</style>
