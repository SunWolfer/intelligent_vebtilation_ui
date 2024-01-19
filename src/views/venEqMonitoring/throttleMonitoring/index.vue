<script setup>
	import { throttleMonitoring } from '@/api/request/venEqMonitoring/throttleMonitoring'
	import WarnTableRecord from '@/views/components/warnTableRecord'
	import { useDict } from '@/hooks/useDict'
	import { selectDictLabel } from '@/utils/ruoyi'
	import { monitoring } from '@/api/request/venEqMonitoring/monitoring'
	import { useVideo } from '@/hooks/useVideo'

	const { defaultStatusList, queryParams, dataList, total, getList, toControlPage } =
		throttleMonitoring()
	const {
		warnStatusMap,
		chooseRow,
		videoVisible,
		showVideoVisible,
		warnDetailsVisible,
		showWarnDetailsVisible,
	} = monitoring()

	const { door_status, door_work_model, door_type, window_warn_status } = useDict(
		'door_status',
		'door_work_model',
		'door_type',
		'window_warn_status',
	)

	const { videoUrlList, videoListLength, resetUrl } = useVideo()

	resetUrl(chooseRow)
</script>

<template>
	<div class="ven_body">
		<div class="ven_body_top">
			<template v-for="(item, index) in defaultStatusList" :key="index">
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
			<template v-for="item in dataList" :key="item.id">
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
								<span>位置：{{ item.location }}</span>
								<span>IP地址：{{ item.ip }}</span>
								<span>风门类型：{{ selectDictLabel(door_type, item.type) }}</span>
								<span>A门：{{ selectDictLabel(door_status, item.doorStatusA) }}</span>
								<span>B门：{{ selectDictLabel(door_status, item.doorStatusB) }}</span>
								<span>当前模式：{{ selectDictLabel(door_work_model, item.workModel) }}</span>
							</div>
							<div class="fullDom ven_body_center_item_body_icon">
								<div class="ven_icon_control"></div>
								<span @click="toControlPage(item)">控制</span>
								<div class="ven_icon_monitor"></div>
								<span @click="showVideoVisible(item)">监控</span>
								<div class="ven_icon_warning"></div>
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
			v-if="videoVisible && videoListLength"
			v-model="videoVisible"
			:width="910 * videoListLength"
			:height="600"
			:title="chooseRow?.name"
		>
			<div class="line_video">
				<template v-for="i in videoUrlList" :key="i">
					<m-video type="fm" :video-path="i" />
				</template>
			</div>
		</dia-log>
		<!--    预警详情-->
		<WarnTableRecord
			v-if="warnDetailsVisible"
			v-model="warnDetailsVisible"
			:data-form="chooseRow"
			dev-type="door"
		/>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/venEqMonitoring/monitorAndControl';
</style>
