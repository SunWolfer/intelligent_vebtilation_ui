<script setup>
	import { localFan } from '@/api/request/venEqMonitoring/localFan'
	import CustomizedDiaLog from '@/views/venEqMonitoring/mainFan/customizedDiaLog.vue'
	import LoadLocalFan from '@/views/components/loadModel/loadLocalFan.vue'

	const {
		inShowList,
		toLast,
		showLast,
		toNext,
		showNext,
		customizedParametersList,
		customizedVisible,
		showCustomizedVisible,
	} = localFan()
</script>

<template>
	<div class="local_fan_body">
		<div class="local_fan_body_l1">
			<div class="local_fan_body_l1_t1" v-show="showLast" @click="toLast"></div>
			<div class="local_fan_body_l1_t2">
				<template v-for="item in inShowList">
					<div class="local_fan_body_l1_line"></div>
					<div class="local_fan_body_l1_item">
						<div
							class="local_fan_body_l1_item_c1"
							:class="
								item.type === 1
									? 'local_fan_body_l1_item_c1_warn'
									: 'local_fan_body_l1_item_c1_normal'
							"
						></div>
						<div class="local_fan_body_l1_item_l1">{{ item.name }}</div>
						<div class="local_fan_body_l1_item_l2">
							1#风机：<span :class="item.fan1 === 1 ? 'open_text' : 'close_text'">{{
								item.fan1 === 1 ? '开启' : '关闭'
							}}</span>
						</div>
						<div class="local_fan_body_l1_item_l2">
							2#风机：<span :class="item.fan1 === 1 ? 'open_text' : 'close_text'">{{
								item.fan2 === 1 ? '开启' : '关闭'
							}}</span>
						</div>
						<div class="local_fan_body_l1_item_l3">
							总功率(KW)：<span>{{ item.power }}</span>
						</div>
						<div class="local_fan_body_l1_item_l3">
							风量(m³/min)：<span>{{ item.airQuantity }}</span>
						</div>
						<div class="local_fan_body_l1_item_l3">
							风速(m/s)：<span>{{ item.windSpeed }}</span>
						</div>
					</div>
				</template>
			</div>
			<div class="local_fan_body_l1_t3" v-show="showNext" @click="toNext"></div>
		</div>
		<div class="local_fan_body_l2">
			<div class="main_fan_body_l1_top">
				<div class="top_icon"></div>
				<div class="top_btn_border">查看监控</div>
				<div class="top_warn_icon"></div>
				<div class="top_text">
					1#风机<span class="top_open_text">开启</span>2#风机<span class="top_close_text"
						>关闭</span
					>
				</div>
			</div>
			<div class="main_fan_body_l1_model">
				<load-local-fan />
			</div>
			<div class="main_fan_body_l1_btn">
				<div class="main_fan_body_l1_btn_item">风机特性曲线</div>
				<div class="main_fan_body_l1_btn_item">温振监测分析</div>
				<div class="main_fan_body_l1_btn_item">温振图谱分析</div>
				<div class="main_fan_body_l1_btn_item">操作记录</div>
				<div class="main_fan_body_l1_btn_item">预警记录</div>
			</div>
		</div>
		<div class="local_fan_body_l3">
			<border-box name="border2" title="1207局扇1环境感知"></border-box>
			<div class="local_fan_body_l3_l2">
				<div class="local_fan_body_l3_l2_icon_1"></div>
				<div class="local_fan_body_l3_l2_item">
					<div class="local_fan_body_l3_l2_item_value">0.22</div>
					<div class="local_fan_body_l3_l2_item_label">瓦斯(%CH4)</div>
				</div>
				<div class="local_fan_body_l3_l2_icon_2"></div>
				<div class="local_fan_body_l3_l2_item">
					<div class="local_fan_body_l3_l2_item_value">0.22</div>
					<div class="local_fan_body_l3_l2_item_label">瓦斯(%CH4)</div>
				</div>
				<div class="local_fan_body_l3_l2_icon_3"></div>
				<div class="local_fan_body_l3_l2_item">
					<div class="local_fan_body_l3_l2_item_value">0.22</div>
					<div class="local_fan_body_l3_l2_item_label">瓦斯(%CH4)</div>
				</div>
				<div class="local_fan_body_l3_l2_icon_4"></div>
				<div class="local_fan_body_l3_l2_item">
					<div class="local_fan_body_l3_l2_item_value">0.22</div>
					<div class="local_fan_body_l3_l2_item_label">瓦斯(%CH4)</div>
				</div>
			</div>
			<border-box name="border2" title="远程控制"></border-box>
			<div class="local_fan_body_l3_l4">频率风量关系图</div>
			<div class="local_fan_body_l3_l5">
				<div class="local_fan_body_l3_l5_item">
					<div class="local_fan_body_l3_l5_item_title">
						<div class="local_fan_body_l3_l5_item_title_icon"></div>
						<span>一号风机</span>
					</div>
					<div class="local_fan_body_l3_l5_item_body">
						频率(HZ)
						<el-input />
						<div class="normal_btn">设置</div>
					</div>
				</div>
				<div class="local_fan_body_l3_l5_item">
					<div class="local_fan_body_l3_l5_item_title">
						<div class="local_fan_body_l3_l5_item_title_icon"></div>
						<span>二号风机</span>
					</div>
					<div class="local_fan_body_l3_l5_item_body">
						频率(HZ)
						<el-input />
						<div class="normal_btn">设置</div>
					</div>
				</div>
			</div>
			<div class="local_fan_body_l3_l6">
				<div class="local_fan_body_l3_l6_title_1">一号风机</div>
				<div class="local_fan_body_l3_l6_btn_1"><span>一键启动</span></div>
				<div class="local_fan_body_l3_l6_btn_2"><span>一键停止</span></div>
				<div class="local_fan_body_l3_l6_btn_3"><span>一键倒机</span></div>
				<div class="local_fan_body_l3_l6_title_1">二号风机</div>
				<div class="local_fan_body_l3_l6_btn_1"><span>一键启动</span></div>
				<div class="local_fan_body_l3_l6_btn_2"><span>一键停止</span></div>
			</div>
		</div>
		<div class="local_fan_body_l4">
			<border-box name="border1" background-color="rgba(24, 25, 49, 0.71)">
				<div class="main_fan_customized">
					<div class="main_fan_customized_l1">
						<div class="main_fan_customized_title">
							<border-box name="border5">
								<div class="main_fan_customized_title_body">
									<div class="main_fan_customized_title_icon"></div>
									一号风机运行参数
								</div>
							</border-box>
						</div>
						<div class="main_fan_customized_btn">
							<border-box name="border7">
								<div class="main_fan_customized_btn_body" @click="showCustomizedVisible">
									<div class="main_fan_customized_btn_icon"></div>
									定制化
								</div>
							</border-box>
						</div>
					</div>
					<div class="main_fan_customized_l2">
						<div class="main_fan_customized_title">
							<span>一级电机</span>
						</div>
						<div class="main_fan_customized_body">
							<template v-for="(item, index) in customizedParametersList">
								<div
									class="customized_item"
									:class="Math.ceil((index + 1) / 2) % 2 === 0 ? 'item_bg' : 'item_bg_none'"
								>
									<div class="customized_label">{{ item.label }}</div>
									<div class="customized_value">{{ item.value + item.unit }}</div>
								</div>
							</template>
						</div>
					</div>
					<div class="main_fan_customized_l3">
						<div class="main_fan_customized_title">
							<span>二级电机</span>
						</div>
						<div class="main_fan_customized_body">
							<template v-for="(item, index) in customizedParametersList">
								<div
									class="customized_item"
									:class="Math.ceil((index + 1) / 2) % 2 === 0 ? 'item_bg' : 'item_bg_none'"
								>
									<div class="customized_label">{{ item.label }}</div>
									<div class="customized_value">{{ item.value + item.unit }}</div>
								</div>
							</template>
						</div>
					</div>
				</div>
			</border-box>
		</div>
		<div class="local_fan_body_l5">
			<border-box name="border1" background-color="rgba(24, 25, 49, 0.71)">
				<div class="main_fan_customized">
					<div class="main_fan_customized_l1">
						<div class="main_fan_customized_title">
							<border-box name="border5">
								<div class="main_fan_customized_title_body">
									<div class="main_fan_customized_title_icon"></div>
									二号风机运行参数
								</div>
							</border-box>
						</div>
						<div class="main_fan_customized_btn">
							<border-box name="border7">
								<div class="main_fan_customized_btn_body" @click="showCustomizedVisible">
									<div class="main_fan_customized_btn_icon"></div>
									定制化
								</div>
							</border-box>
						</div>
					</div>
					<div class="main_fan_customized_l2">
						<div class="main_fan_customized_title">
							<span>一级电机</span>
						</div>
						<div class="main_fan_customized_body">
							<template v-for="(item, index) in customizedParametersList">
								<div
									class="customized_item"
									:class="Math.ceil((index + 1) / 2) % 2 === 0 ? 'item_bg' : 'item_bg_none'"
								>
									<div class="customized_label">{{ item.label }}</div>
									<div class="customized_value">{{ item.value + item.unit }}</div>
								</div>
							</template>
						</div>
					</div>
					<div class="main_fan_customized_l3">
						<div class="main_fan_customized_title">
							<span>二级电机</span>
						</div>
						<div class="main_fan_customized_body">
							<template v-for="(item, index) in customizedParametersList">
								<div
									class="customized_item"
									:class="Math.ceil((index + 1) / 2) % 2 === 0 ? 'item_bg' : 'item_bg_none'"
								>
									<div class="customized_label">{{ item.label }}</div>
									<div class="customized_value">{{ item.value + item.unit }}</div>
								</div>
							</template>
						</div>
					</div>
				</div>
			</border-box>
		</div>
		<div class="local_fan_body_l6">
			<border-box name="border1" background-color="rgba(24, 25, 49, 0.71)">
				<div class="local_fan_body_l6_body">
					<div class="local_fan_body_l6_label">自动瓦斯排放</div>
					<div class="local_fan_body_l6_icon local_fan_body_l6_icon_open"></div>
					<div class="local_fan_body_l6_label">瓦斯电闭锁</div>
					<div class="local_fan_body_l6_icon local_fan_body_l6_icon_open"></div>
					<div class="local_fan_body_l6_label">风电闭锁</div>
					<div class="local_fan_body_l6_icon local_fan_body_l6_icon_close"></div>
				</div>
			</border-box>
		</div>
		<customized-dia-log v-if="customizedVisible" v-model="customizedVisible" />
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/venEqMonitoring/mainFan';
	@import '@/assets/styles/venEqMonitoring/localFan';
</style>
