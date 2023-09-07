<!--火灾监测看板-->
<script setup>
	import { fireMonitoring } from '@/api/request/sysFusionPerception/fireMonitoring'

	const {
		tubeDataList,
		optList,
		dataForm1,
		dataForm2,
		beamTubeMonitoringData,
		chooseForm1Date,
		showLeftCharts,
		optFibTemMeaList,
		chooseForm2Date,
		showRightCharts,
		showRightCharts2,
	} = fireMonitoring()
</script>

<template>
	<div class="fire_body">
		<div class="fire_body_left">
			<border-box name="border2" title="束管监测" />
			<div class="fire_select">
				<el-form :model="dataForm1">
					<el-form-item label="区域">
						<el-select v-model="dataForm1.code">
							<el-option v-for="i in tubeDataList" :label="i.name" :value="i.code"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<div class="fire_left_l2">
				<template v-for="item in beamTubeMonitoringData">
					<div class="fire_left_l2_item">
						<div class="fire-text">{{ item.value }}</div>
						<span>{{ item.label }}</span>
					</div>
				</template>
			</div>
			<div class="fire_statistics">
				<div
					class="fire_statistics_item"
					@click="chooseForm1Date('1')"
					:class="dataForm1.timeType === '1' ? 'fire_statistics_active' : ''"
				>
					日统计
				</div>
				<div
					class="fire_statistics_item"
					@click="chooseForm1Date('2')"
					:class="dataForm1.timeType === '2' ? 'fire_statistics_active' : ''"
				>
					周统计
				</div>
				<div
					class="fire_statistics_item"
					@click="chooseForm1Date('3')"
					:class="dataForm1.timeType === '3' ? 'fire_statistics_active' : ''"
				>
					月统计
				</div>
			</div>
			<div v-if="showLeftCharts" id="fire-charts-1" class="fullDom"></div>
			<div v-if="showLeftCharts" id="fire-charts-2" class="fullDom"></div>
		</div>
		<div class="fire_body_right">
			<border-box name="border2" title="光纤测温" />
			<div class="fire_select">
				<el-form :model="dataForm2">
					<el-form-item label="通道">
						<el-select v-model="dataForm2.channel">
							<el-option v-for="i in optList" :label="i.channel" :value="i.channel"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<div class="fire_right_l2">
				<template v-for="item in optFibTemMeaList">
					<div class="fire_right_l2_item">
						<div class="fire_right_l2_item_label">{{ item.label }}</div>
						<div class="fire_right_l2_item_value">{{ item.value }}</div>
					</div>
				</template>
			</div>
			<div v-if="showRightCharts" id="fire-charts-3" class="fullDom"></div>
			<div style="grid-area: 5/1/6/2" class="fire_statistics">
				<div
					class="fire_statistics_item"
					@click="chooseForm2Date('1')"
					:class="dataForm2.timeType === '1' ? 'fire_statistics_active' : ''"
				>
					日统计
				</div>
				<div
					class="fire_statistics_item"
					@click="chooseForm2Date('2')"
					:class="dataForm2.timeType === '2' ? 'fire_statistics_active' : ''"
				>
					周统计
				</div>
				<div
					class="fire_statistics_item"
					@click="chooseForm2Date('3')"
					:class="dataForm2.timeType === '3' ? 'fire_statistics_active' : ''"
				>
					月统计
				</div>
			</div>
			<div v-if="showRightCharts2" id="fire-charts-4" class="fullDom"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/sysFusionPerception/fireMonitoring';
</style>
