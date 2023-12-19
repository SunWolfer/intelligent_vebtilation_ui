<script setup>
	import useCurrentInstance from '@/hooks/useCurrentInstance'
	import { useCommitForm } from '@/hooks/useForm'
	import { setWindDevParam } from '@/api/api/windMeaStaManagement'

	const { proxy } = useCurrentInstance()
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
			default: () => {
				return {}
			},
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
		length1: undefined,
		length2: undefined,
		surface: undefined,
		setTimea: undefined,
		setTimeb: undefined,
	})
	const rules = ref({
		length1: [{ required: true, message: '面对面距离不能为空', trigger: 'blur' }],
		length2: [{ required: true, message: '基线距离不能为空', trigger: 'blur' }],
		surface: [{ required: true, message: '断面积不能为空', trigger: 'blur' }],
		setTimea: [{ required: true, message: 'A柱运行时间不能为空', trigger: 'blur' }],
		setTimeb: [{ required: true, message: 'B柱运行时间不能为空', trigger: 'blur' }],
	})

	const submitForm = async () => {
		await useCommitForm(setWindDevParam, {
			queryParams: dataForm.value,
			afterReadyDataFun: () => {
				showDiaLog.value = false
			},
		})
	}
	onMounted(() => {
		dataForm.value = props.chooseRow
	})
</script>

<template>
	<dia-log :title="title" :height="500" v-model="showDiaLog" has-bottom-btn @submit="submitForm">
		<el-form
			:model="dataForm"
			:rules="rules"
			class="table_page_form"
			label-width="auto"
			label-position="left"
		>
			<el-form-item label="面对面距离" prop="length1">
				<el-input v-model="dataForm.length1" />
			</el-form-item>
			<el-form-item label="基线距离" prop="length2">
				<el-input v-model="dataForm.length2" />
			</el-form-item>
			<el-form-item label="断面积" prop="surface">
				<el-input v-model="dataForm.surface" /> </el-form-item
			><el-form-item label="A柱运行时间" prop="setTimea">
				<el-input v-model="dataForm.setTimea" /> </el-form-item
			><el-form-item label="B柱运行时间" prop="setTimeb">
				<el-input v-model="dataForm.setTimeb" />
			</el-form-item>
		</el-form>
	</dia-log>
</template>

<style lang="scss" scoped></style>
