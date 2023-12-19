<!--安监数据看板-->
<script setup>
	import { safeTypeDict } from '@/api/api/safeSupStaReport'
	import useList from '@/hooks/useList'
	import { listSafeSupeData, trendLine } from '@/api/api/safeSupeData'
	import useCurrentInstance from '@/hooks/useCurrentInstance'
	import { defaultLineChart } from '@/utils/echarts/defaultLineCharts'

	const iconMap = new Map([
		// 二氧化碳
		['0013', ['', 'safe_icon_1']],
		// 粉尘
		['0014', ['mg/m3', 'safe_icon_2']],
		// 风速
		['0002', ['m/s', 'safe_icon_3']],
		// 瓦斯
		['0001', ['%CH4', 'safe_icon_4']],
		// 环境温度
		['0003', ['', 'safe_icon_5']],
		// 氧气
		['0012', ['', 'safe_icon_6']],
		// 烟雾
		['1008', ['', 'safe_icon_7']],
		// 一氧化碳
		['0004', ['ppm', 'safe_icon_8']],
	])

	const { queryParams, total, dataList, handleQuery, getList } = useList({
		apiFun: listSafeSupeData,
		params: {
			name: '',
			type: '',
			pageNum: 1,
			pageSize: 20,
		},
	})

	// 点位类型
	const typeList = ref([])
	const getTypeList = async () => {
		const res = await safeTypeDict()
		if (!res) return
		typeList.value = res.data
	}
	getTypeList()

	const { proxy } = useCurrentInstance()

	//   历史曲线查询
	const hisVisible = ref(false)
	const hisHandle = async (item) => {
		hisVisible.value = true
		const res = await trendLine({
			code: item.code,
			type: item.type,
		})
		if (res.code === 200) {
			defaultLineChart({
				domId: 'hisLineChart',
				xData: res.data.lineX,
				yDataList: res.data.value,
				legends: res.data.names,
				colors: [['rgba(226, 58, 245, 1)', 'rgba(226, 58, 245, 0)']],
			})
		} else {
			proxy.$modal.msgError(res.msg)
			hisVisible.value = false
		}
	}
</script>

<template>
	<div class="safe_data_body">
		<div class="safe_data_body_top">
			<el-form :model="queryParams" inline>
				<el-form-item label="点位名称">
					<el-input v-model="queryParams.name" />
				</el-form-item>
				<el-form-item label="点位类型">
					<el-select v-model="queryParams.type" clearable>
						<el-option v-for="i in typeList" :key="i.type" :label="i.typeName" :value="i.type" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<div class="normal_btn" @click="handleQuery">查询</div>
				</el-form-item>
			</el-form>
		</div>

		<div class="safe_data_body_center">
			<template v-for="(item, dataIndex) in dataList" :key="'data' + dataIndex">
				<border-box name="border1">
					<div class="safe_data_table_item">
						<div
							class="safe_data_table_item_icon c-center pointer"
							:class="iconMap.get(item.type)?.[1]"
							@click="hisHandle(item)"
						></div>
						<div class="safe_data_table_item_top">
							<border-box name="border5">
								<div class="safe_item_title">{{ item.name }}</div>
							</border-box>
						</div>
						<div class="safe_data_table_item_center c-center">
							<div class="safe_item_value">{{ item.value }}</div>
							<div class="safe_item_unit">{{ iconMap.get(item.type)?.[0] }}</div>
						</div>
						<div class="safe_data_table_item_end c-center">{{ item.updateTime }}</div>
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
				@pagination="getList"
			/>
		</div>
		<dia-log v-if="hisVisible" v-model="hisVisible" title="数据查看" :width="1200" :height="600">
			<div class="fullDom" id="hisLineChart"></div>
		</dia-log>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/sysFusionPerception/safeSupeData';
</style>
