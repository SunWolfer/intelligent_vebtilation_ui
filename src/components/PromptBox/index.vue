<script setup lang="ts">
	import { ElIcon, ElButton } from 'element-plus'
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
			<border-box name="Border2" :title="title">
				<div class="sd-dialog-border-content">
					<!--        关闭按钮-->
					<div class="sd-dialog-close" @click="closeDia">
						<el-icon>
							<Close />
						</el-icon>
					</div>
					<div class="sd-dialog-border-body">
						<div class="sd-closeTitle">
							<svg-icon
								v-if="icon"
								:icon-class="icon"
								class-name="el-icon"
							></svg-icon>
							{{ message }}
						</div>
						<div class="sd-closeBtn">
							<el-button class="ordinary-btn dia-btn" @click="submit"
								>{{ btn[0] }}
							</el-button>
							<el-button class="reset-btn dia-btn" @click="closeDia"
								>{{ btn[1] }}
							</el-button>
						</div>
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
	}

	.sd-dialog-content {
		position: relative;
		width: v-bind(getDiaWidth);
		height: v-bind(getDiaHeight);
		margin: vh(260) auto auto;
		text-align: center;

		.sd-dialog-border-body {
			.sd-closeTitle {
				position: absolute;
				font-size: vh(26);
				font-family: Adobe Heiti Std, serif;
				font-weight: normal;
				color: #fffffd;
				width: 100%;
				top: vh(30);

				.el-icon {
					font-size: vh(26);
					line-height: 44px;
					color: rgba(255, 186, 0, 1);
				}
			}

			.sd-closeBtn {
				position: absolute;
				bottom: vh(10);
				width: 100%;
				text-align: center;
			}
		}
	}

	.sd-dialog-border-content {
		position: relative;
		width: 100%;
		height: 100%;
		margin-top: 14px;

		.sd-dialog-border-body {
			position: relative;
			width: calc(100% - 140px);
			height: calc(100% - 80px);
			margin-left: 80px;
			margin-top: vh(60);
		}
	}

	.sd-dialog-close {
		position: absolute;
		width: 29px;
		height: 27px;
		border: 1px solid #2994f7;
		right: 16px;
		cursor: pointer;
		text-align: center;
		display: flex;

		.el-icon {
			margin: auto;
			color: #03bffc;
			font-size: 20px;
		}
	}

	.dia-btn {
		width: vw(105);
		height: vh(41);
	}
</style>
