<!--自然分风网络解算-->
<script setup>
	import LoadWindControlEditModel from '@/views/components/loadModel/loadWindControlEditModel.vue'
	import { naturalDisNetSolution } from '@/api/request/windControlAssMaking/naturalDisNetSolution'
	import { EditType } from '@/components/VueThree/types/editType'
	import SolvingSimulation from '@/views/components/windControlAssMaking/solvingSimulation.vue'
	import { useThreeModelData } from '@/hooks/useThreeModelData'
	import { useInteraction } from '@/hooks/useInteraction'

	const {
		modelRef,
		showAirDisNetwork,
		chooseMenu,
		changeChooseMenu,
		windowVisible,
		showWindowVisibleVisible,
		confirmWindow,
		windowForm,
		windowConfirm,
		windowCancel,
		showImitateVisible,
		resetModel,
		imitateVisible,
		operationStepsList,
		showAfterCalVisible,
		cancelAirDisNetwork,
		tunnelVisible,
		tunnelHandle,
		tunnelForm,
		tunnelConfirm,
		tunnelCancel,
		confirmTunnel,
		fontList,
	} = naturalDisNetSolution()
	const { refreshModel } = useThreeModelData()

	const { getSelectionRows, selectCode, getSelectionTunnel, watchDomRef } = useInteraction()
	watchDomRef?.(modelRef)
</script>

<template>
	<div class="fullDom">
		<load-wind-control-edit-model
			ref="modelRef"
			v-if="refreshModel"
			:font-list="fontList"
			:edit-type="chooseMenu"
			:confirm-add-window="confirmWindow"
			:confirm-add-tunnel="confirmTunnel"
			@add-window="showWindowVisibleVisible"
			@readyConnect="tunnelHandle"
			@choose-tunnel="getSelectionTunnel"
		/>
		<!--    自然分风网络测算-->
		<div class="natural_top" v-show="showAirDisNetwork">
			<border-box name="border3">
				<div class="natural_top_body">
					<div class="natural_top_body_c1">
						<div class="natural_top_body_c1_title">自然分风网络解算</div>
						<div class="natural_top_body_c1_bottom">
							<div
								:class="chooseMenu === EditType.CONNECT ? 'btn_border_1_active' : 'btn_border_1'"
								@click="changeChooseMenu(EditType.CONNECT)"
							>
								连接
							</div>
							<div
								:class="chooseMenu === EditType.DELETE ? 'btn_border_1_active' : 'btn_border_1'"
								@click="changeChooseMenu(EditType.DELETE)"
							>
								删除
							</div>
						</div>
					</div>
					<div class="natural_top_body_c2">
						<div class="top_img"></div>
						<div
							:class="chooseMenu === EditType.DOOR ? 'btn_border_1_active' : 'btn_border_1'"
							@click="changeChooseMenu(EditType.DOOR)"
						>
							风门
						</div>
					</div>
					<div class="natural_top_body_c3">
						<div class="top_img"></div>
						<div
							:class="chooseMenu === EditType.WINDOW ? 'btn_border_1_active' : 'btn_border_1'"
							@click="changeChooseMenu(EditType.WINDOW)"
						>
							风窗
						</div>
					</div>
					<div class="natural_top_body_c4">
						<div class="top_img"></div>
						<div
							:class="chooseMenu === EditType.WALL ? 'btn_border_1_active' : 'btn_border_1'"
							@click="changeChooseMenu(EditType.WALL)"
						>
							密闭墙
						</div>
					</div>
					<div class="natural_top_body_c5"></div>
					<div class="natural_top_body_c6">
						<div class="normal_btn" @click="resetModel">重置</div>
					</div>
					<div class="natural_top_body_c7">
						<div class="normal_2_btn" @click="showImitateVisible">解算模拟</div>
					</div>
				</div>
			</border-box>
		</div>

		<!--    风窗确认弹窗-->
		<dia-log
			v-if="windowVisible"
			v-model="windowVisible"
			title="添加风窗"
			:width="800"
			:height="420"
			has-bottom-btn
			@submit="windowConfirm"
			@cancel="windowCancel"
		>
			<div class="window_form_body">
				<div class="window_form_body_label">风阻</div>
				<el-input-number v-model="windowForm.windage"></el-input-number>
				<div class="window_form_body_unit">N·s2/m8</div>
			</div>
		</dia-log>
		<!--    连接巷道确认弹窗-->
		<dia-log
			v-if="tunnelVisible"
			v-model="tunnelVisible"
			title="连接巷道"
			:width="800"
			:height="420"
			has-bottom-btn
			@submit="tunnelConfirm"
			@cancel="tunnelCancel"
		>
			<div class="window_form_body">
				<div class="window_form_body_label">风阻</div>
				<el-input-number v-model="tunnelForm.windage"></el-input-number>
				<div class="window_form_body_unit">N·s2/m8</div>
			</div>
		</dia-log>
		<!--    解算模拟-->
		<solving-simulation
			v-model:imitate-visible="imitateVisible"
			v-model:operation-steps-list="operationStepsList"
			@show-cal-visible="showAfterCalVisible"
			@cancel-cal-visible="cancelAirDisNetwork"
			@getSelectionRows="getSelectionRows"
			:select-code="selectCode"
		/>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/naturalDisNetSolution';
</style>
