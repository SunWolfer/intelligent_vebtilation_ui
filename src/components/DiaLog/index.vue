<script setup lang="ts">
	import { dynamicHeight, dynamicWidth } from '@/utils/ruoyi'

	const props = defineProps({
		title: {
			type: String,
			default: '',
		},
		modelValue: {
			type: Boolean,
			default: false,
		},
		width: {
			type: Number,
			default: 1052,
		},
		height: {
			type: Number,
			default: 619,
		},
		hasBottomBtn: {
			type: Boolean,
			default: false,
		},
		btnList: {
			type: Array,
			default: ['确定', '取消'],
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

	const getDiaWidth = computed(() => {
		return dynamicWidth(props.width) + 'px'
	})
	const getDiaHeight = computed(() => {
		return dynamicHeight(props.height) + 'px'
	})
	const diaLogDom = ref(null)

	function submitForms() {
		emits('submit')
	}
</script>

<template>
	<div class="os-dialog" v-if="showDiaLog">
		<div
			class="os-dialog-content animate__animated animate__fast animate__bounceIn"
			ref="diaLogDom"
		>
			<border-box name="border2" :title="title" background-color="#162f62">
				<div class="os-dialog-border-content">
					<!--        关闭按钮-->
					<div class="os-dialog-close" @click="closeDia">
						<el-icon>
							<Close />
						</el-icon>
					</div>
					<div class="os-dialog-border-body">
						<div
							:class="
								hasBottomBtn ? 'os-dialog-border-body-content-btn' : 'os-dialog-border-body-content'
							"
						>
							<slot></slot>
						</div>
						<div v-if="hasBottomBtn" class="os-dialog-border-body-btn">
							<div style="position: relative; width: 100%; height: 100%">
								<slot name="btn">
									<el-button class="ordinary-btn dia-btn" type="primary" @click="submitForms"
										>{{ btnList[0] }}
									</el-button>
									<el-button class="reset-btn dia-btn" @click="closeDia"
										>{{ btnList[1] }}
									</el-button>
								</slot>
							</div>
						</div>
					</div>
				</div>
			</border-box>
		</div>
	</div>
</template>

<style lang="scss">
	.os-dialog {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 20;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.os-dialog-content {
		position: absolute;
		width: v-bind(getDiaWidth);
		height: v-bind(getDiaHeight);
		align-self: center;
		justify-content: center;
		display: flex;

		.os-dialog-border-body-content {
			position: relative;
			width: 100%;
			height: 100%;
			min-height: 150px;
			padding: 0 10px 20px 10px;
		}

		.os-dialog-border-body-content-btn {
			position: relative;
			width: 100%;
			height: calc(100% - 50px);
			min-height: 150px;
			padding: 10px 10px 20px 10px;
		}

		.os-dialog-border-body-btn {
			position: relative;
			width: 100%;
			height: 50px;
			text-align: center;
			align-self: center;
			justify-content: center;
			display: flex;
			margin-bottom: vh(40);
		}
	}

	.os-dialog-border-content {
		position: relative;
		width: 100%;
		height: 100%;
		margin-top: 14px;

		.os-dialog-border-body {
			position: relative;
			width: 100%;
			height: calc(100% - 40px);
			margin-top: 40px;
		}
	}

	.os-dialog-close {
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
