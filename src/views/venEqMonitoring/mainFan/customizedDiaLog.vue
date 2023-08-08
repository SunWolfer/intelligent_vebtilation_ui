<script setup>
	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: false,
		},
	})

	const emits = defineEmits(['update:modelValue', 'submit', 'cancel'])
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
	function submitForms() {
		emits('submit')
	}

	//   配置项列表
	const deployList = ref([
		{
			label: 'Uab(V)',
			isShow: true,
			sort: 1,
		},
		{
			label: 'la(V)',
			isShow: true,
			sort: 1,
		},
		{
			label: 'Ubc(V)',
			isShow: true,
			sort: 1,
		},
		{
			label: 'lb(V)',
			isShow: true,
			sort: 1,
		},
	])
</script>

<template>
	<dia-log
		v-model="showDiaLog"
		title="定制化"
		:width="1300"
		:height="800"
		:has-bottom-btn="true"
		@submit="submitForms"
		@cancel="closeDia"
	>
		<template #default>
			<div class="dia_body fullDom">
				<div class="dia_body_header">
					<div class="dia_title">一级电机</div>
					<div class="dia_option_btn">
						<border-box name="border7">
							<div class="dia_option_btn_body">复制二级电机显示</div>
						</border-box>
					</div>
				</div>
				<div class="dia_body_body_table">
					<div class="dia_body_body_table_header">
						<span>数据项</span>
						<span>展示</span>
						<span>排序</span>
						<span>数据项</span>
						<span>展示</span>
						<span>排序</span>
					</div>
					<div class="dia_body_body_table_body">
						<div class="dia_body_body_table_body_item">
							<template v-for="i in deployList">
								<span>{{ i.label }}</span>
								<el-checkbox v-model="i.isShow"></el-checkbox>
								<el-select v-model="i.sort">
									<el-option v-for="item in 15" :key="item" :value="item" :label="item"></el-option>
								</el-select>
							</template>
						</div>
					</div>
				</div>
				<div class="dia_body_header">
					<div class="dia_title">二级电机</div>
					<div class="dia_option_btn">
						<border-box name="border7">
							<div class="dia_option_btn_body">复制一级电机显示</div>
						</border-box>
					</div>
				</div>
				<div class="dia_body_body_table">
					<div class="dia_body_body_table_header">
						<span>数据项</span>
						<span>展示</span>
						<span>排序</span>
						<span>数据项</span>
						<span>展示</span>
						<span>排序</span>
					</div>
					<div class="dia_body_body_table_body">
						<div class="dia_body_body_table_body_item">
							<template v-for="i in deployList">
								<span>{{ i.label }}</span>
								<el-checkbox v-model="i.isShow"></el-checkbox>
								<el-select v-model="i.sort">
									<el-option v-for="item in 15" :key="item" :value="item" :label="item"></el-option>
								</el-select>
							</template>
						</div>
					</div>
				</div>
			</div>
		</template>
	</dia-log>
</template>

<style scoped lang="scss">
	.dia_body {
		display: grid;
		grid-template-columns: repeat(2, vw(555));
		grid-template-rows: vh(61) vh(510);
		align-items: center;
		grid-auto-flow: column;
		justify-content: space-between;
	}
	.dia_body_header {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		.dia_title {
			font-size: vh(26);
			font-family: YouSheBiaoTiHei, serif;
			font-weight: 400;
			color: rgba(255, 255, 255, 0.78);
			text-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);

			background: linear-gradient(180deg, #b8d6ff 0%, #2ba0ea 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
		.dia_option_btn {
			position: absolute;
			right: 0;
			top: 0;
			width: vw(190);
			height: vh(31);
			cursor: pointer;
			.dia_option_btn_body {
				position: relative;
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				padding-left: vw(30);
				font-size: vh(16);
				font-family:
					Adobe Heiti Std,
					serif;
				font-weight: normal;
				color: #19c3f7;
				&:before {
					position: absolute;
					content: '';
					width: vw(20);
					height: vh(20);
					background-image: url('@/assets/images/equipment/title_icon_03.png');
					background-size: 100% 100%;
					left: vw(10);
				}
			}
		}
	}
	.dia_body_body_table {
		position: relative;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-rows: vh(35) auto;
	}
	@mixin TableItem {
		display: grid;
		grid-template-columns: repeat(auto-fill, vw(118) vw(41) vw(113));

		justify-content: center;
		place-items: center;
	}
	.dia_body_body_table_header {
		width: 100%;
		height: 100%;
		background: #155095;
		font-size: vh(14);
		font-family:
			Microsoft YaHei,
			serif;
		font-weight: 400;
		color: #5fd1fe;
		@include TableItem;
	}
	.dia_body_body_table_body {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		padding-top: vh(14);
		.dia_body_body_table_body_item {
			height: 100%;
			@include TableItem;
			grid-template-rows: repeat(auto-fill, vh(24));
			grid-row-gap: vh(8);
			font-size: vh(14);
			font-family:
				Adobe Heiti Std,
				serif;
			font-weight: normal;
			color: #ffffff;
			.el-checkbox {
				margin-right: 0;
			}
			.el-select {
				width: 100%;
			}
		}
	}
</style>
