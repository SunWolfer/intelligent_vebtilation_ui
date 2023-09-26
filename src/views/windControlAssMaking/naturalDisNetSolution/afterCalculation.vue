<script setup>
	import HomeWindBranch from '@/views/components/home/HomeWindBranch.vue'
	import HomeVenNetwork from '@/views/components/home/HomeVenNetwork.vue'
	import { useInteraction } from '@/hooks/useInteraction'

	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: false,
		},
		// 解算列表
		dataList: {
			type: Array,
			default: [],
		},
		// 显示风路分支图
		showWindBranch: {
			type: Boolean,
			default: true,
		},
		// 风路分支图列表
		windBranchList: {
			type: Array,
			default: [],
		},
		// 显示通风网络图
		showVentilationNetwork: {
			type: Boolean,
			default: true,
		},
		//   通风网络图默认生成
		defaultNetWork: {
			type: Boolean,
			default: true,
		},
		//   通风网络图新路径
		reloadNetWorkUrl: {
			type: String,
			default: '',
		},
		// 点击巷道code
		selectCode: {
			type: String,
			default: '',
		},
	})

	const emits = defineEmits(['update:modelValue', 'cancel', 'getSelectionRows'])
	const showDiaLog = computed({
		get() {
			return props.modelValue
		},
		set() {
			emits('update:modelValue', false)
		},
	})
	function closeDia() {
		showDiaLog.value = false
		emits('cancel')
	}
	const cellStyle = (data) => {
		let cell = ''
		let numData = parseFloat(data)
		if (numData > 1 && numData <= 5) {
			cell = 'orange_cell'
		} else if (numData > 5 && numData <= 10) {
			cell = 'powder_cell'
		} else if (numData > 10) {
			cell = 'red_cell'
		}
		return cell
	}
	// 点击巷道code
	const afTunnelCode = ref('')
	//   表格点击
	const getSelectionRows = (row) => {
		afTunnelCode.value = row.code
		emits('getSelectionRows', row)
	}
	const { tableRef, positionTableRow } = useInteraction()
	//   巷道被点击
	watch(
		() => props.selectCode,
		(val) => {
			if (val) {
				afTunnelCode.value = val
				positionTableRow?.(props.dataList, val)
			}
		},
	)

	//   风路分支图被点击
	const chooseFullData = (row) => {
		positionTableRow?.(props.dataList, row.code)
		emits('getSelectionRows', row)
	}
</script>

<template>
	<div class="after_cal_body">
		<div class="after_cal_body_top">
			<border-box name="border3" background-color="rgba(15, 46, 81, 0.78)">
				<div class="after_cal_body_top_body">
					<div class="after_cal_body_top_body_top">
						<span>解算结果:</span>
						<div class="red_piece"></div>
						<span>{{ `>10%` }}</span>
						<div class="powder_piece"></div>
						<span>5%-10%</span>
						<div class="orange_piece"></div>
						<span>1%-5%</span>
					</div>
					<div class="after_cal_body_table">
						<el-table
							ref="tableRef"
							:data="dataList"
							height="100%"
							border
							highlight-current-row
							@row-click="getSelectionRows"
						>
							<el-table-column label="巷道" align="center" prop="name">
								<template #default="scope">
									<div
										class="fullDom"
										:style="{ backgroundColor: scope.row?.isFixed ? '#87B827' : 'transparent' }"
									>
										<span style="color: #ffffff">
											{{ scope.row.name }}
										</span>
									</div>
								</template>
							</el-table-column>
							<el-table-column label="解算风量(m³/min)" align="center" prop="airVolume">
							</el-table-column>
							<el-table-column label="解算前风量(m³/min)" align="center" prop="oldAirVolume">
								<template #default="scope">
									<span class="full_table_cell_bg" :class="cellStyle(scope.row.calBeforeDeviation)">{{
										scope.row.oldAirVolume
									}}</span>
								</template>
							</el-table-column>
							<el-table-column label="实时风量(m³/min)" align="center" prop="windSensorAirVolume">
							</el-table-column>
							<el-table-column
								label="目标风量(m³/min)"
								align="center"
								prop="minQ"
							></el-table-column>
							<el-table-column label="人工实测风量(m³/min)" align="center" prop="personQ">
								<template #default="scope">
									<span class="full_table_cell_bg" :class="cellStyle(scope.row.personQ)">{{
										scope.row.personQ
									}}</span>
								</template>
							</el-table-column>
							<el-table-column
								label="解算风速(m/s)"
								align="center"
								prop="windSpeed"
							></el-table-column>
							<el-table-column label="风阻" align="center" prop="ventR"></el-table-column>
							<el-table-column
								label="解算风压(Pa)"
								align="center"
								prop="airPressure"
							></el-table-column>
						</el-table>
					</div>
				</div>
			</border-box>
		</div>
		<!--    风路分支图-->
		<div class="after_cal_body_left" v-if="showWindBranch">
			<home-wind-branch
				:default-list="false"
				:list="windBranchList"
				@choose-wind-full="chooseFullData"
				:select-code="afTunnelCode"
			/>
		</div>
		<!--    通风网络图-->
		<div class="after_cal_body_right" v-if="showVentilationNetwork">
			<home-ven-network :default-net-work="defaultNetWork" :reload-url="reloadNetWorkUrl" />
		</div>
		<div class="after_quit_btn">
			<div class="after_quit_btn_item" @click="closeDia"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.after_cal_body {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 1;
		left: 0;
		top: 0;
		padding: 0 vw(71);
		pointer-events: none;
		display: grid;
		grid-template-columns: vw(500) auto vw(974);
		grid-template-rows: vh(300) vh(572);
		grid-row-gap: vh(17);
		grid-template-areas:
			'header header header'
			'left . right';
	}
	.after_cal_body_top {
		grid-area: header;
		width: 100%;
		height: 100%;
		pointer-events: auto;
	}
	.after_cal_body_table {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.after_cal_body_top_body {
		position: relative;
		width: 100%;
		height: 100%;
		padding: vh(30) vw(62) vh(30) vw(62);
		display: grid;
		grid-template-rows: vh(42) vh(194);
	}
	.after_cal_body_top_body_top {
		display: flex;

		font-size: vw(12);
		font-family:
			Microsoft YaHei,
			serif;
		font-weight: 400;
		color: #ffffff;
	}

	.after_cal_body_left {
		grid-area: left;
		pointer-events: auto;
	}
	.after_cal_body_right {
		grid-area: right;
	}
	.after_quit_btn {
		position: absolute;
		bottom: vh(52);
		right: vw(72);
		.after_quit_btn_item {
			position: relative;
			width: vh(98);
			height: vh(98);
			background-image: url('@/assets/images/home/home_reverse_wind/back.gif');
			background-size: 100% 100%;
			cursor: pointer;
			pointer-events: auto;
			&:after {
				position: absolute;
				content: '退出';
				width: 100%;
				height: vh(45);
				text-align: center;
				font-size: vw(20);
				font-family:
					Adobe Heiti Std,
					serif;
				font-weight: normal;
				color: #ffffff;
				line-height: vh(45);
				top: 100%;
			}
		}
	}

	.full_table_cell_bg {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	.red_cell {
		background: #fe0000;
	}
	.powder_cell {
		background: #ff01d5;
	}
	.orange_cell {
		background: #ff7f00;
	}

	@mixin Piece {
		width: vw(67);
		height: vh(18);
		margin: 0 vw(5) 0 vw(10);
	}
	.red_piece {
		@include Piece;
		background: #fe0000;
	}
	.powder_piece {
		@include Piece;
		background: #ff01d5;
	}
	.orange_piece {
		@include Piece;
		background: #ff7f00;
	}
</style>
