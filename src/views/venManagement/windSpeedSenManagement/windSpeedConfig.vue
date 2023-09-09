<script setup>
	import { useCommitForm } from '@/hooks/useForm'
	import { setSensor } from '@/api/api/windSpeedSenManagement'

	const props = defineProps({
		title: {
			type: String,
			default: '',
		},
		modelValue: {
			type: Boolean,
			default: false,
		},
		chooseRow: {
			type: Object,
			default: {},
		},
	})
	const emits = defineEmits(['update:modelValue'])
	const showDiaLog = computed({
		get() {
			return props.modelValue
		},
		set() {
			emits('update:modelValue', false)
		},
	})
	const dataForm = ref({
		id: undefined,
		length1: undefined,
		length2: undefined,
		surface: undefined,
	})
	const rules = ref({
		length1: [{ required: true, message: '面对面距离不能为空', trigger: 'blur' }],
		length2: [{ required: true, message: '基线距离不能为空', trigger: 'blur' }],
		surface: [{ required: true, message: '断面积不能为空', trigger: 'blur' }],
	})

	onMounted(() => {
		dataForm.value = props.chooseRow
	})
	const submitForm = async () => {
		await useCommitForm(setSensor, {
			queryParams: dataForm.value,
			afterReadyDataFun: () => {
				showDiaLog.value = false
			},
		})
	}
</script>

<template>
	<dia-log
		:title="title"
		v-model="showDiaLog"
		v-if="showDiaLog"
		:height="500"
		has-bottom-btn
		@submit="submitForm"
	>
		<el-form
			:model="dataForm"
			:rules="rules"
			class="table_page_form"
			label-width="auto"
			label-position="left"
		>
			<el-form-item label="面对面距离" prop="length1">
				<el-input v-model="dataForm.length1"></el-input>
			</el-form-item>
			<el-form-item label="基线距离" prop="length2">
				<el-input v-model="dataForm.length2"></el-input>
			</el-form-item>
			<el-form-item label="断面积" prop="surface">
				<el-input v-model="dataForm.surface"></el-input>
			</el-form-item>
		</el-form>
	</dia-log>
</template>

<style lang="scss" scoped></style>
