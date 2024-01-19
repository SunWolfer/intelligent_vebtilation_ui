<script setup>
	import { useVModel } from '@vueuse/core'
	import { useDict } from '@/hooks/useDict'

	const props = defineProps({
		data: {
			type: Object,
			default: () => {
				return {}
			},
		},
	})
	const emits = defineEmits(['update:data'])

	const dataForm = useVModel(props, 'data', emits)

	// 颜色下拉
	const { door_msg_color } = useDict('door_msg_color')

	const formRef = ref(null)

	// 验证正整数
	const validator2 = (rule, value, callback) => {
		if (!/^[+]{0,1}(\d+)$/.test(value)) {
			callback(new Error('声音只能输入正整数'))
		} else {
			callback()
		}
	}
	const rules = reactive({
		msg: [{ required: true, message: '语音内容不能为空', trigger: 'blur' }],
		color: [{ required: true, message: '颜色不能为空', trigger: 'change' }],
		voice: [
			{ required: true, message: '声音不能为空', trigger: 'blur' },
			{ validator: validator2, trigger: 'blur' },
		],
	})

	watch(
		() => dataForm.value.hasSelect,
		(val) => {
			if (!val) return
			formRef.value?.validate((valid) => {
				if (!valid) {
					dataForm.value.hasSelect = false
				}
			})
		},
	)
</script>

<template>
	<div class="dia_voice_body_item">
		<div class="dia_voice_body_item_line">
			<span>{{ dataForm.index }}</span>
			<el-checkbox v-model="dataForm.hasSelect" label="下发" />
		</div>
		<div class="fullDom">
			<el-form
				ref="formRef"
				:model="dataForm"
				:rules="rules"
				label-width="auto"
				class="dia_voice_body_dom"
			>
				<el-form-item label="语音内容：" prop="msg">
					<el-input v-model="dataForm.msg" />
				</el-form-item>
				<el-form-item label="颜色：" prop="color">
					<el-select v-model="dataForm.color">
						<el-option
							v-for="i in door_msg_color"
							:label="i.label"
							:value="i.value"
							:key="i.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="声音：" prop="voice">
					<el-input v-model="dataForm.voice" />
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/door/diaSetting';
</style>
