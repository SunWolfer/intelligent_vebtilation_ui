<!--通风基础报表-->
<script setup>
	import { basicReport } from '@/api/request/accPerOfRomance/basicReport'
	import TabelItem from '@/views/accPerOfRomance/basicReport/tabelItem.vue'
	import { reportInfo } from '@/api/api/basicReport'

	const {
		initData,
		addStatus,
		resetForm,
		chooseVersion,
		versionList,
		setVersion,
		dataForm,
		addHandle,
		saveHandle,
		deleteHandle,
		exportHandle,
		halfTopDom1,
		halfTopDom2Left,
		halfTopDom2Right,
		halfTopDom3,
		halfTopDom4,
		halfTopDom5,
		halfTopDom6,
		halfTopDom7,
		halfTopDom8,
		halfBottomDom1,
		halfBottomDom2,
		halfBottomDom3,
		halfBottomDom4,
		halfBottomDom5,
		halfBottomDom6,
		halfBottomDom7,
		halfBottomDom8,
		halfBottomDom9,
		halfBottomDom10,
		halfBottomDom11,
		halfBottomDom12,
		halfBottomDom13,
		halfBottomDom14,
		halfBottomDom15,
	} = basicReport()

	const copyForm = ref({
		reportTime: '',
	})
	watch(
		() => addStatus.value,
		(val) => {
			if (!val) copyForm.value.reportTime = ''
		},
	)
	const chooseCopyData = async (val) => {
		if (!val) {
			resetForm?.()
			return
		}
		const res = await reportInfo({
			reportTime: val,
		})
		if (!res) return
		dataForm.value = {
			...res.data,
			reportTime: dataForm.value.reportTime,
		}
	}

	onMounted(async () => {
		await initData?.()
	})
</script>

<template>
	<div class="bas_report_body">
		<div class="bas_report_body_c1_l1 pointer" @click="addHandle">新增</div>
		<div class="bas_report_body_c1_l2">
			<div class="bas_report_c1_l2_top">
				<border-box name="border2" title="通风基础报表"></border-box>
			</div>
			<div class="bas_report_c1_l2_bottom">
				<template v-for="(item, index) in versionList">
					<div class="bas_report_c1_l2_bottom_icon">
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
						{{ item?.reportTime }}
					</div>
				</template>
			</div>
		</div>
		<div class="bas_report_body_c2_l1">
			<div class="bas_c2_l1_icon">{{ dataForm?.reportTime }}</div>
			<div class="normal_btn" @click="saveHandle">{{ addStatus ? '新增' : '保存' }}</div>
			<template v-if="!addStatus">
				<div class="normal_3_btn" @click="deleteHandle">删除</div>
				<div class="normal_4_btn" @click="exportHandle">导出</div>
			</template>
			<template v-else>
				<div class="bas_c2_l1_select p-center">
					<span>复制报表</span>
					<el-select v-model="copyForm.reportTime" @change="chooseCopyData" clearable>
						<el-option
							v-for="i in versionList"
							:label="i.reportTime"
							:value="i.reportTime"
						></el-option>
					</el-select>
				</div>
			</template>
		</div>
		<div class="bas_report_body_c2_l2">
			<div class="bas_table_half_top">
				<div class="bas_table_half_top_dom1">
					<tabel-item :data-form="dataForm" :data-list="halfTopDom1" />
				</div>
				<div class="bas_table_half_top_dom2">
					<div class="bas_table_half_top_dom2_left">
						<tabel-item :data-form="dataForm" :data-list="halfTopDom2Left" />
					</div>
					<div class="bas_table_half_top_dom2_right">
						<tabel-item :data-form="dataForm" :data-list="halfTopDom2Right" />
					</div>
				</div>
				<div class="bas_table_half_top_dom3">
					<tabel-item :data-form="dataForm" :data-list="halfTopDom3" />
				</div>
				<div class="bas_table_half_top_dom4">
					<tabel-item :data-form="dataForm" :data-list="halfTopDom4" />
				</div>
				<div class="bas_table_half_top_dom5">
					<tabel-item :data-form="dataForm" :data-list="halfTopDom5" />
				</div>
				<div class="bas_table_half_top_dom6">
					<tabel-item :data-form="dataForm" :data-list="halfTopDom6" />
				</div>
				<div class="bas_table_half_top_dom7">
					<tabel-item :data-form="dataForm" :data-list="halfTopDom7" />
				</div>
				<div class="bas_table_half_top_dom8">
					<tabel-item :data-form="dataForm" :data-list="halfTopDom8" />
				</div>
			</div>
			<div class="bas_table_half_bottom">
				<div class="bas_table_half_bottom_dom1">
					<tabel-item :data-form="dataForm" :data-list="halfBottomDom1" />
				</div>
				<div class="bas_table_half_bottom_dom2">
					<tabel-item :data-form="dataForm" :data-list="halfBottomDom2" />
				</div>
				<div class="bas_table_half_bottom_dom3">
					<tabel-item :data-form="dataForm" :data-list="halfBottomDom3" />
				</div>
				<div class="bas_table_half_bottom_dom4">
					<tabel-item :data-form="dataForm" :data-list="halfBottomDom4" />
				</div>
				<div class="bas_table_half_bottom_dom5">
					<tabel-item :data-form="dataForm" :data-list="halfBottomDom5" />
				</div>
				<div class="bas_table_half_bottom_dom6">
					<tabel-item :data-form="dataForm" :data-list="halfBottomDom6" />
				</div>
				<div class="bas_table_half_bottom_dom7">
					<tabel-item :data-form="dataForm" :data-list="halfBottomDom7" />
				</div>
				<div class="bas_table_half_bottom_dom8">
					<tabel-item :data-form="dataForm" :data-list="halfBottomDom8" />
				</div>
				<div class="bas_table_half_bottom_dom9">
					<tabel-item :data-form="dataForm" :data-list="halfBottomDom9" />
				</div>
				<div class="bas_table_half_bottom_dom10">
					<tabel-item :data-form="dataForm" :data-list="halfBottomDom10" />
				</div>
				<div class="bas_table_half_bottom_dom11">
					<tabel-item :data-form="dataForm" :data-list="halfBottomDom11" />
				</div>
				<div class="bas_table_half_bottom_dom12">
					<tabel-item :data-form="dataForm" :data-list="halfBottomDom12" />
				</div>
				<div class="bas_table_half_bottom_dom13">
					<tabel-item :data-form="dataForm" :data-list="halfBottomDom13" />
				</div>
				<div class="bas_table_half_bottom_dom14">
					<tabel-item :data-form="dataForm" :data-list="halfBottomDom14" />
				</div>
				<div class="bas_table_half_bottom_dom15">
					<tabel-item :data-form="dataForm" :data-list="halfBottomDom15" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/accPerOfRomance/basicReport';
</style>
