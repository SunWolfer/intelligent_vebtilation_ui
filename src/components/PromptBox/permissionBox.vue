<!--风机权限认证弹窗-->
<script setup lang="ts">
	import { getCodeImg, permissionControl } from '@/api/login'
	import { dynamicHeight, dynamicWidth } from '@/utils/ruoyi'
	import { Close } from '@element-plus/icons-vue'
	import { ElIcon, ElForm, ElFormItem, ElInput } from 'element-plus'
	import type { FormInstance, FormRules } from 'element-plus'

	const props = defineProps({
		title: {
			type: String,
			default: '控制权限认证',
		},
		message: {
			type: String,
			default: '',
		},
		btn: {
			type: Array,
			default: ['提交', '取消'],
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

	const getDiaWidth = computed(() => {
		return dynamicWidth(props.width) + 'px'
	})
	const getDiaHeight = computed(() => {
		return dynamicHeight(props.height) + 'px'
	})

	const formRef = ref<FormInstance>()

	interface RuleForm {
		username: string
		password: string
		code: string
		uuid: string
	}

	const dataForm = ref<RuleForm>({
		username: '',
		password: '',
		code: '',
		uuid: '',
	})
	const rules = reactive<FormRules<RuleForm>>({
		username: [{ required: true, trigger: 'blur', message: '请输入授权人账号' }],
		password: [{ required: true, trigger: 'blur', message: '请输入授权人密码' }],
		code: [{ required: true, trigger: 'change', message: '请输入验证码' }],
	})
	const codeUrl = ref('')

	const showDiaLog = ref(false)

	function closeDia() {
		showDiaLog.value = false
		props.close()
	}

	function submitForms() {
		formRef.value?.validate(async (valid: boolean) => {
			if (valid) {
				const res = await permissionControl(dataForm.value)
				if (res.code === 200) {
					props.ok()
				} else {
					getCode()
				}
			}
		})
	}
	function getCode() {
		getCodeImg().then((res: any) => {
			codeUrl.value = 'data:image/gif;base64,' + res?.img
		})
	}

	onMounted(() => {
		showDiaLog.value = true
		getCode()
	})
</script>

<template>
	<div class="os-dialog" v-if="showDiaLog">
		<div class="os-dialog-content animate__animated animate__faster animate__zoomInDown">
			<border-box name="border8" :title="title">
				<div class="os-dialog-close" @click="closeDia">
					<el-icon>
						<Close />
					</el-icon>
				</div>
				<div class="os-dialog-content_type_2">
					<div class="content_type_2_header">
						<el-form
							ref="formRef"
							:model="dataForm"
							:rules="rules"
							label-width="auto"
							class="permission_form"
						>
							<el-form-item prop="username" label="授权人账号">
								<el-input
									v-model="dataForm.username"
									type="text"
									placeholder="授权人账号"
									autocomplete="off"
								>
								</el-input>
							</el-form-item>
							<el-form-item prop="password" label="授权人密码">
								<el-input
									v-model="dataForm.password"
									type="password"
									placeholder="授权人密码"
									autocomplete="new-password"
								>
								</el-input>
							</el-form-item>
							<el-form-item prop="code" label="验证码" class="per_form_input">
								<el-input v-model="dataForm.code" auto-complete="off" placeholder="验证码">
								</el-input>
								<img :src="codeUrl" @click="getCode" class="per-code-img" alt="" />
							</el-form-item>
						</el-form>
					</div>
					<div class="content_type_2_bottom">
						<div class="normal_btn" @click="submitForms">{{ btn[0] }}</div>
						<div class="normal_2_btn" @click="closeDia">{{ btn[1] }}</div>
					</div>
				</div>
			</border-box>
		</div>
	</div>
</template>

<style scoped lang="scss">
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
		min-width: 560px;
		min-height: 330px;
	}
	.os-dialog-content_type_1 {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.os-dialog-content_type_2 {
		position: relative;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr 2fr 1fr;
		grid-template-rows: 1fr vh(100);
		grid-template-areas:
			'l1 l1 l1'
			'. l2 .';
	}
	.content_type_2_header {
		grid-area: l1;
		position: relative;
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}
	.content_type_2_bottom {
		grid-area: l2;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		justify-content: center;
		place-items: center center;
	}
	//  关闭按钮
	.os-dialog-close {
		position: absolute;
		right: 25px;
		top: 45px;
		width: 12px;
		height: 11px;
		color: rgba(185, 220, 239, 1);
		cursor: pointer;
	}
	.permission_form {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-rows: repeat(3, vw(40));
		grid-template-columns: vw(400);
		grid-row-gap: vh(23);
		justify-content: center;
		align-content: center;
	}
	:deep(.el-form) {
		.el-form-item {
			.el-form-item__label {
				font-size: vw(26);
				font-family: YouSheBiaoTiHei, serif;
				font-weight: 400;
				color: rgba(255, 255, 255, 0.78);

				background: linear-gradient(0deg, #4691f7 0%, #2bc9ea 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
		}
	}
	:deep(.el-input) {
		height: vw(40);
		overflow: hidden;
	}
	.per_form_input {
		:deep(.el-form-item__content) {
			gap: vw(10);
			.el-input {
				width: calc(100% - #{vw(110)});
			}
		}
	}
	.per-code-img {
		display: inline-flex;
		width: vw(99);
		height: vw(40);
	}
</style>
