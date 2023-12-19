<!--风流短路控制-->
<script setup>
	import LoadAirShortPlaneMap from '@/views/catAidedDecMaking/airShortCirControl/loadAirShortPlaneMap.vue'
	import { airShortCirControl } from '@/api/request/catAidedDecMaking/airShortCirControl'
	import { PrefixZero } from '@/utils/ruoyi'

	const { dataForm, modelActive, changeModel } = airShortCirControl()
</script>

<template>
	<div class="air_short_body">
		<div class="air_short_body_l1_c1">
			<load-air-short-plane-map />
		</div>
		<div class="air_short_body_l1_c2">
			<border-box name="border1">
				<div class="air_short_body_l1_c2_body">
					<div class="air_l1_c2_title">风门位置：</div>
					<div class="air_l1_c2_form_1">
						<div class="air_l1_c2_form_line">
							A门开
							<div class="light_1"></div>
						</div>
						<div class="air_l1_c2_form_line">
							A门关
							<div class="light_2"></div>
						</div>
						<div class="air_l1_c2_form_line">
							B门开
							<div class="light_1"></div>
						</div>
						<div class="air_l1_c2_form_line">
							B门开
							<div class="light_2"></div>
						</div>
					</div>
					<div class="air_l1_c2_line"></div>
					<div class="air_l1_c2_form_1">
						<div class="air_l1_c2_form_line">
							<span>IP地址</span>
							<span>138.168.2.225</span>
						</div>
						<div class="air_l1_c2_form_line">
							通讯状态
							<div class="light_4"></div>
						</div>
					</div>
					<div class="air_l1_c2_line"></div>
					<div class="air_l1_c2_form_1">
						<div class="air_l1_c2_form_line">
							A门开启中
							<div class="light_4"></div>
						</div>
						<div class="air_l1_c2_form_line">
							A门关闭中
							<div class="light_4"></div>
						</div>
						<div class="air_l1_c2_form_line">
							B门开启中
							<div class="light_4"></div>
						</div>
						<div class="air_l1_c2_form_line">
							B门关闭中
							<div class="light_4"></div>
						</div>
					</div>
				</div>
			</border-box>
		</div>
		<div class="air_short_body_l1_c3">
			<border-box name="border1" />
		</div>
		<div class="air_short_body_l2_c3">
			<border-box name="border1" />
		</div>
		<!--    参数设定-->
		<div class="air_short_body_l3_c1">
			<border-box name="border1">
				<div class="border1_body">
					<div class="border1_body_title">
						<border-box name="border5">
							<div class="set_btn_default"><span>参数设定</span></div>
						</border-box>
					</div>
					<div class="fullDom">
						<div class="air_l3_c1_line">
							<span>A开门时间</span>
							<el-input />
							<span>秒</span>
						</div>
						<div class="air_l3_c1_line">
							<span>A关门时间</span>
							<el-input />
							<span>秒</span>
						</div>
						<div class="air_l3_c1_line">
							<span>B开门时间</span>
							<el-input />
							<span>秒</span>
						</div>
						<div class="air_l3_c1_line">
							<span>B关门时间</span>
							<el-input />
							<span>秒</span>
						</div>
					</div>
				</div>
			</border-box>
		</div>
		<!--    模式切换-->
		<div class="air_short_body_l3_c2">
			<border-box name="border1">
				<div class="border1_body">
					<div class="border1_body_title">
						<border-box name="border5">
							<div class="set_btn_default"><span>模式切换</span></div>
						</border-box>
					</div>
					<div class="fullDom">
						<div class="item_bg"></div>
						<div v-if="modelActive" class="item_active" :class="modelActive"></div>
						<!-- 手动 -->
						<div class="item_text item_text_route_an_60" @click="changeModel('1')">
							<div class="item_text_dec">
								<decorator2
									title="manual手动"
									:color="['#81bde3', dataForm.doorMode === '1' ? '#010000' : '#81bde3']"
								/>
							</div>
						</div>
						<!-- 远程 -->
						<div class="item_text" @click="changeModel('3')">
							<div class="item_text_dec">
								<decorator2
									title="remote远程"
									:color="['#81bde3', dataForm.doorMode === '3' ? '#010000' : '#81bde3']"
								/>
							</div>
						</div>
						<!-- 自动 -->
						<div class="item_text item_text_route_60" @click="changeModel('2')">
							<div class="item_text_dec">
								<decorator2
									title="auto自动"
									:color="['#81bde3', dataForm.doorMode === '2' ? '#010000' : '#81bde3']"
								/>
							</div>
						</div>
						<div class="item_bottom_line"></div>
						<div class="item_small_bg"></div>
						<div v-if="modelActive" class="item_needle" :class="modelActive"></div>
					</div>
				</div>
			</border-box>
		</div>
		<!--    远程控制-->
		<div class="air_short_body_l3_c3">
			<border-box name="border1">
				<div class="border1_body">
					<div class="border1_body_title">
						<border-box name="border5">
							<div class="set_btn_default"><span>远程控制</span></div>
						</border-box>
					</div>
					<div class="fullDom">
						<div class="air_l3_c3_body">
							<div class="air_l3_c3_btn_1"><span>A远程开门</span></div>
							<div class="air_l3_c3_btn_2"><span>A远程关门</span></div>
							<div class="air_l3_c3_btn_1"><span>B远程开门</span></div>
							<div class="air_l3_c3_btn_2"><span>B远程关门</span></div>
							<div class="air_l3_c3_line"></div>
							<div class="air_l3_c3_btn_3">
								<span>关闭中</span>
								<div class="air_l3_c3_btn_4">一键开启</div>
							</div>
						</div>
					</div>
				</div>
			</border-box>
		</div>
		<div class="air_short_body_l3_c4">
			<border-box name="border1">
				<div class="air_l3_c4_body">
					<div class="air_l3_c4_label">1#开门用时</div>
					<div class="air_l3_c4_clock">{{ PrefixZero('15.12', 5) }}<span>秒</span></div>
					<div class="air_l3_c4_label">2#开门用时</div>
					<div class="air_l3_c4_clock"></div>
					<div class="air_l3_c4_label">1#关门用时</div>
					<div class="air_l3_c4_clock"></div>
					<div class="air_l3_c4_label">2#关门用时</div>
					<div class="air_l3_c4_clock"></div>
				</div>
			</border-box>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/catAidedDecMaking/airShortCirControl';
</style>
