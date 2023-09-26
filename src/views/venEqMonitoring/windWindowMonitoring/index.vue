<script setup>
	import WarnTableRecord from '@/views/components/warnTableRecord'
	import { windWindowMonitoring } from '@/api/request/venEqMonitoring/windWindowMonitoring'
	import { monitoring } from '@/api/request/venEqMonitoring/monitoring'
	import useDict from '@/hooks/useDict'
	import { selectDictLabel } from '@/utils/ruoyi'

	const { defaultStatusList, queryParams, dataList, total, getList, toControlPage } =
		windWindowMonitoring()
	const {
		warnStatusMap,
		chooseRow,
		videoVisible,
		showVideoVisible,
		warnDetailsVisible,
		showWarnDetailsVisible,
	} = monitoring()
	const { window_type, window_status, window_work_model, window_warn_status } = useDict(
		'window_type',
		'window_status',
		'window_work_model',
		'window_warn_status',
	)
</script>

<template>
	<div class="ven_body">
		<div class="ven_body_top">
			<template v-for="item in defaultStatusList">
				<div :class="item.class">
					<div class="status_title">{{ item.label }}</div>
					<div class="status_value">{{ item.value }}</div>
					<div class="light_point">
						<decorator name="decorator1" :color="[item.pointColor]" />
					</div>
				</div>
			</template>
		</div>
		<div class="ven_body_center">
			<template v-for="item in dataList">
				<div class="ven_body_center_item">
					<border-box
						name="border6"
						:color="[warnStatusMap.get(item.warnStatus)]"
						background-color="rgba(11,41,91,0.6)"
						:title="selectDictLabel(window_warn_status, item.warnStatus)"
					>
						<div class="ven_body_center_item_body">
							<div class="fullDom ven_body_center_item_body_line">
								<span>名称：{{ item.name }}</span>
								<span>开度：{{ item.openDegreeNow }}</span>
								<span>位置：{{ item.location }}</span>
								<span>风量：{{ item.volume }}</span>
								<span>IP地址：{{ item.ip }}</span>
								<span>面积：{{ item.areaAll }}</span>
								<span>A/B风窗：{{ item.abTag }}</span>
								<span>状态：{{ selectDictLabel(window_status, item.status) }}</span>
								<span>当前模式：{{ selectDictLabel(window_work_model, item.workModel) }}</span>
								<span>类型：{{ selectDictLabel(window_type, item.type) }}</span>
							</div>
							<div class="fullDom ven_body_center_item_body_icon">
								<div class="ven_icon_control"></div>
								<span @click="toControlPage(item)">控制</span>
								<div class="ven_icon_monitor" />
								<span @click="showVideoVisible(item)">监控</span>
								<div class="ven_icon_warning" />
								<span @click="showWarnDetailsVisible(item)">预警</span>
							</div>
						</div>
					</border-box>
				</div>
			</template>
		</div>
		<div class="ven_body_bottom">
			<pagination
				:total="total"
				v-model:page="queryParams.pageNum"
				v-model:limit="queryParams.pageSize"
				@pagination="getList"
			/>
		</div>
		<!--    监控-->
		<dia-log
			v-if="videoVisible"
			v-model="videoVisible"
			:width="910"
			:height="663"
			:title="chooseRow?.name"
		>
			<m-video type="fc" :video-path="chooseRow.videoUrl"></m-video>
		</dia-log>
		<!--    预警详情-->
		<WarnTableRecord
			v-if="warnDetailsVisible"
			v-model="warnDetailsVisible"
			:data-form="chooseRow"
			dev-type="window"
		/>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/venEqMonitoring/monitorAndControl';
</style>
