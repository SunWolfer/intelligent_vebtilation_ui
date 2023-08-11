<!--监测点布置决策-->
<script setup>
	import { decMakForLayoutOfMonPoints } from '@/api/request/windControlAssMaking/decMakForLayoutOfMonPoints'
	import LoadPlaneMap from '@/views/windControlAssMaking/windResAnaReport/loadPlaneMap.vue'

	const { queryForm, chooseVersion, versionList, setVersion } = decMakForLayoutOfMonPoints()
</script>

<template>
	<div class="dec_point">
		<div class="dec_point_left">
			<div class="dec_point_left_top">
				<border-box name="border2" title="CAD文件版本"></border-box>
			</div>
			<div class="dec_point_left_bottom">
				<template v-for="(item, index) in versionList">
					<div class="dec_point_left_bottom_icon">
						<div
							:class="
								chooseVersion === index
									? 'dec_point_left_icon_active'
									: 'dec_point_left_icon_default'
							"
						></div>
					</div>

					<div
						@click="setVersion(index)"
						:class="
							chooseVersion === index ? 'dec_point_left_bg_active' : 'dec_point_left_bg_default'
						"
					>
						{{ item.dateTime }}
					</div>
				</template>
			</div>
		</div>
		<div class="dec_point_header">
			<el-form :model="queryForm" inline>
				<el-form-item label="风门">
					<el-input v-model="queryForm.doorName" />
				</el-form-item>
				<el-form-item label="风窗">
					<el-input v-model="queryForm.windowName" />
				</el-form-item>
				<el-form-item label="风速传感器">
					<el-input v-model="queryForm.windName" />
				</el-form-item>
				<el-form-item label="测风站">
					<el-input v-model="queryForm.windStation" />
				</el-form-item>
				<el-form-item>
					<div class="normal_btn">布置总览</div>
				</el-form-item>
			</el-form>
		</div>
		<div class="dec_point_right">
			<load-plane-map />
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/decMakForLayoutOfMonPoints';
</style>
