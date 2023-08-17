<!--安监数据看板-->
<script setup>
	const queryParams = ref({
		pointName: '',
		pointType: '',
		pageNum: 1,
		pageSize: 10,
	})

	const iconMap = new Map([
		['1', ['', 'safe_icon_1']],
		['2', ['mg/m3', 'safe_icon_2']],
		['3', ['m/s', 'safe_icon_3']],
		['4', ['%CH4', 'safe_icon_4']],
		['5', ['', 'safe_icon_5']],
		['6', ['', 'safe_icon_6']],
		['7', ['', 'safe_icon_7']],
		['8', ['ppm', 'safe_icon_8']],
	])

	const total = ref(0)
	const dataList = ref([
		{
			name: '102040503上顺横掘进面',
			value: '0.01',
			type: '2',
			dateTime: '2023-06-30  09:07:00',
		},
	])
</script>

<template>
	<div class="safe_data_body">
		<div class="safe_data_body_top">
			<el-form :model="queryParams" inline>
				<el-form-item label="点位名称">
					<el-input v-model="queryParams.pointName" />
				</el-form-item>
				<el-form-item label="点位类型">
					<el-select v-model="queryParams.pointType"></el-select>
				</el-form-item>
				<el-form-item>
					<div class="normal_btn">查询</div>
				</el-form-item>
			</el-form>
		</div>

		<div class="safe_data_body_center">
			<template v-for="item in dataList">
				<border-box name="border1">
					<div class="safe_data_table_item">
						<div
							class="safe_data_table_item_icon c-center"
							:class="iconMap.get(item.type)[1]"
						></div>
						<div class="safe_data_table_item_top">
							<border-box name="border5">
								<div class="safe_item_title">{{ item.name }}</div>
							</border-box>
						</div>
						<div class="safe_data_table_item_center c-center">
							<div class="safe_item_value">{{ item.value }}</div>
							<div class="safe_item_unit">{{ iconMap.get(item.type)[0] }}</div>
						</div>
						<div class="safe_data_table_item_end c-center">{{ item.dateTime }}</div>
					</div>
				</border-box>
			</template>
		</div>
		<div class="c-center">
			<pagination
				v-show="total > 0"
				:total="total"
				v-model:page="queryParams.pageNum"
				v-model:limit="queryParams.pageSize"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/sysFusionPerception/safeSupeData';
</style>
