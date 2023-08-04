<script setup>
	import WarnTable from '@/views/components/venEqMonitoring/warnTable.vue'
	import { windWindowMonitoring } from '@/api/request/venEqMonitoring/windWindowMonitoring'

	const {
		defaultStatusList,
		warnStatusMap,
		queryParams,
		dataList,
		total,
		getList,
		toControlPage,
		chooseRow,
		videoVisible,
		showVideoVisible,
		warnDetailsVisible,
		showWarnDetailsVisible,
	} = windWindowMonitoring()
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
						title="111"
					>
						<div class="ven_body_center_item_body">
							<div class="fullDom ven_body_center_item_body_line">
								<span>名称：</span>
								<span>开度：</span>
								<span>位置：</span>
								<span>风量：</span>
								<span>IP地址：</span>
								<span>面积：</span>
								<span>A/B风窗：</span>
								<span>状态：</span>
								<span>当前模式：</span>
								<span>类型：</span>
							</div>
							<div class="fullDom ven_body_center_item_body_icon">
								<div class="ven_icon_control"></div>
								<span @click="toControlPage">控制</span>
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
		></dia-log>
		<!--    预警详情-->
		<warn-table v-if="warnDetailsVisible" v-model="warnDetailsVisible" :choose-row="chooseRow" />
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/venEqMonitoring/monitorAndControl';
</style>
