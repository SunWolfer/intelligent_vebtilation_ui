<!--需风量计算-->
<script setup>
	import { calOfAirDemand } from '@/api/request/windControlAssMaking/calOfAirDemand'

	const { tabs, chooseDom, changeChooseDom, loadDom, tunnelList } = calOfAirDemand()
</script>

<template>
	<div class="cal_air_body">
		<div class="cal_air_body_top">
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
				<component :is="loadDom"></component>
			</div>
		</div>
		<div class="cal_air_body_center">配风巷道</div>
		<div class="cal_air_body_end">
			<el-table :data="tunnelList" height="100%" border>
				<el-table-column label="配风巷道" align="center" prop="name" />
				<el-table-column label="需风量(m3/min)" align="center" prop="airVolume" />
				<el-table-column label="预测类型" align="center" prop="type" />
				<el-table-column label="预测时间" align="center" prop="dateTime" />
				<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
					<template #default="scope">
						<el-button type="primary" link icon="Delete">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/calOfAirDemand';
</style>
