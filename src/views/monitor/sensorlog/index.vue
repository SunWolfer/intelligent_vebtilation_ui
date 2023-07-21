<script setup name="Sensorlog">
	import { listLog } from '@/api/monitor/sensorlog'
	import useDict from '@/hooks/useDict'
	import { parseTime } from '@/utils/ruoyi'
	import useList from '@/hooks/useList'
	const { proxy } = getCurrentInstance()

	const { offline_type } = useDict('offline_type')

	const {
		queryParams,
		dateRange,
		total,
		dataList,
		getList,
		handleQuery,
		resetQuery,
	} = useList({
		apiFun: listLog,
		params: {
			pageNum: 1,
			pageSize: 10,
			sensorName: undefined,
			offLine: undefined,
			createTimeFormat: undefined,
		},
	})

	function statusOffLine(row) {
		return proxy.selectDictLabel(offline_type.value, row.offLine)
	}
</script>

<template>
	<universal-body>
		<div class="public-form-box">
			<border-box name="Border6">
				<div class="public-form-box-content">
					<el-form
						:model="queryParams"
						ref="queryRef"
						:inline="true"
						label-width="auto"
					>
						<el-form-item label="名称" prop="sensorName">
							<el-input
								v-model="queryParams.sensorName"
								placeholder="请输入传感器名称"
								clearable
								@keyup.enter.native="handleQuery"
							/>
						</el-form-item>
						<el-form-item
							style="margin-bottom: 0px"
							label="状态"
							prop="offLine"
						>
							<el-select
								v-model="queryParams.offLine"
								placeholder="请选择状态"
								clearable
							>
								<el-option
									v-for="(item, index) in offline_type"
									:key="index"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="操作时间">
							<el-date-picker
								v-model="dateRange"
								value-format="YYYY-MM-DD"
								type="daterange"
								range-separator="-"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
							></el-date-picker>
						</el-form-item>
						<el-form-item>
							<el-button
								class="ordinary-btn"
								type="primary"
								icon="Search"
								@click="handleQuery"
								>搜索</el-button
							>
							<el-button class="reset-btn" icon="Refresh" @click="resetQuery"
								>重置</el-button
							>
						</el-form-item>
					</el-form>
				</div>
			</border-box>
		</div>
		<div class="public-no-area-box">
			<over-table :table-data="dataList">
				<template #tabColumn>
					<el-table-column
						label="传感器名称"
						align="center"
						prop="sensorName"
					/>
					<el-table-column
						label="状态"
						:min-width="80"
						align="center"
						prop="offLine"
						:formatter="statusOffLine"
					/>
					<el-table-column
						label="时间"
						align="center"
						prop="createTime"
						width="180"
					>
						<template #default="scope">
							<span>{{ parseTime(scope.row.createTime) }}</span>
						</template>
					</el-table-column>
				</template>
				<template #pagination>
					<pagination
						v-show="total > 0"
						:total="total"
						v-model:page="queryParams.pageNum"
						v-model:limit="queryParams.pageSize"
						@pagination="getList"
					/>
				</template>
			</over-table>
		</div>
	</universal-body>
</template>

<style lang="scss" scoped></style>
