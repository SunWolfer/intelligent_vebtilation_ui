<script setup>
	import FirstStep from './FirstStep/index.vue'
	import SecondStep from './SecondStep/index.vue'
	import ThirdStep from './ThirdStep/index.vue'
	import FourthStep from './FourthStep/index.vue'
	const tabs = reactive([
		{
			name: '待执行',
			domType: '1',
			domName: markRaw(FirstStep),
		},
		{
			name: '执行中',
			domType: '2',
			domName: markRaw(SecondStep),
		},
		{
			name: '执行完成',
			domType: '3',
			domName: markRaw(ThirdStep),
		},
		{
			name: '已取消',
			domType: '4',
			domName: markRaw(FourthStep),
		},
	])
	const chooseDom = ref('1')
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
			<template v-for="i in tabs">
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
					<component :is="loadDom"></component>
				</div>
			</border-box>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/calOfAirDemand';
	@import '@/assets/styles/venManagement/eaWarnLevelManagement';
</style>
