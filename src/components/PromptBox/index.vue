<script setup lang="ts">
	import { ElIcon } from 'element-plus'
	import { Close } from '@element-plus/icons-vue'
	import { dynamicHeight, dynamicWidth } from '@/utils/ruoyi'

	const props = defineProps({
		title: {
			type: String,
			default: '警告',
		},
		message: {
			type: String,
			default: '',
		},
		btn: {
			type: Array,
			default: ['确认', '取消'],
		},
		ok: {
			type: Function,
			required: true,
		},
		close: {
			type: Function,
			required: true,
		},
		width: {
			type: Number,
			default: 600,
		},
		height: {
			type: Number,
			default: 250,
		},
		icon: {
			type: String,
			default: '',
		},
	})

	const showDiaLog = ref(false)

	function closeDia() {
		showDiaLog.value = false
		props.close()
	}

	function submit() {
		props.ok()
	}

	onMounted(() => {
		showDiaLog.value = true
	})

	const getDiaWidth = computed(() => {
		return dynamicWidth(props.width) + 'px'
	})
	const getDiaHeight = computed(() => {
		return dynamicHeight(props.height) + 'px'
	})
</script>

<template>
	<div class="sd-dialog" v-if="showDiaLog">
		<div class="sd-dialog-content">
			<border-box name="border4" :title="title">
				<!--        关闭按钮-->
				<div class="sd-dialog-close" @click="closeDia">
					<el-icon>
						<Close />
					</el-icon>
				</div>
				<div class="sd-dialog-border-body">
					<div class="sd-closeTitle">
						<svg-icon v-if="icon" :icon-class="icon" class-name="el-icon"></svg-icon>
						{{ message }}
					</div>
					<div class="sd-closeBtn">
						<div class="normal_btn" @click="submit">{{ btn[0] }}</div>
						<div class="normal_2_btn" @click="closeDia">{{ btn[1] }}</div>
					</div>
				</div>
			</border-box>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.sd-dialog {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 20;
		background: rgba(0, 0, 0, 0.5);
		display: grid;
		place-content: center center;
	}

	.sd-dialog-content {
		position: relative;
		width: v-bind(getDiaWidth);
		height: v-bind(getDiaHeight);
		min-width: 560px;
		min-height: 330px;
		text-align: center;
		.sd-dialog-border-body {
			position: relative;
			width: 100%;
			height: 100%;
			display: grid;
			grid-template-columns: repeat(1, 1fr 2fr 1fr);
			grid-template-rows: auto vh(100);
			place-items: center center;
			grid-template-areas:
				'l1 l1 l1'
				'. l2 .';
			.sd-closeTitle {
				grid-area: l1;
				font-size: vh(26);
				font-family:
					Adobe Heiti Std,
					serif;
				font-weight: normal;
				color: #fffffd;
				width: 100%;
				.el-icon {
					font-size: vh(26);
					line-height: 44px;
					color: rgba(255, 186, 0, 1);
				}
			}
			.sd-closeBtn {
				grid-area: l2;
				width: 100%;
				height: 100%;
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				place-items: center center;
			}
		}
	}
	.sd-dialog-close {
		position: absolute;
		right: 25px;
		top: 45px;
		width: 12px;
		height: 11px;
		color: rgba(185, 220, 239, 1);
		cursor: pointer;
	}
</style>
