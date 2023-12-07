<!--关联多参传感器-->
<script setup>
	import { relevancy } from '@/api/api/mulParSenManagement'
	import useCurrentInstance from '@/hooks/useCurrentInstance'
	import { useCommitForm } from '@/hooks/useForm'
	import { relevancyWindList } from '@/api/api/windSpeedSenManagement'

	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: false,
		},
		chooseData: {
			type: Object,
			default: {
				id: 0,
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

	const data = ref([])
	const dataValue = ref([])

	const initDataList = async () => {
		const res = await relevancyWindList({
			id: props.chooseData.id,
		})
		if (res.code === 200) {
			data.value = res.data.multiParameterList
			dataValue.value = res.data.relevancyList.map((i) => i.id)
		}
	}
	const { proxy } = useCurrentInstance()
	const submitDataForm = async () => {
		if (dataValue.value.length > 1) {
			proxy.$modal.msg('关联传感器不能超过1个')
			return
		}
		await useCommitForm(relevancy, {
			queryParams: {
				multiParameterId: props.chooseData.id,
				windId: dataValue.value?.[0] ?? '',
				relevancyFlag: dataValue.value.length > 0 ? '1' : '0',
			},
		})
	}

	initDataList()
</script>

<template>
	<dia-log
		v-model="showDiaLog"
		title="关联多参传感器"
		:width="900"
		:height="540"
		has-bottom-btn
		:btn-list="['保存', '取消']"
		@submit="submitDataForm"
	>
		<el-transfer
			v-model="dataValue"
			:data="data"
			:props="{
				key: 'id',
				label: 'name',
			}"
			:titles="['多参传感器', '关联多参传感器']"
			:button-texts="['移除', '关联']"
			filterable
		>
		</el-transfer>
	</dia-log>
</template>

<style scoped lang="scss">
	:deep(.el-transfer) {
		padding: 0 vw(20);
		height: vh(312);
		.el-transfer-panel__body {
			.el-transfer-panel__list {
				height: calc(100% - #{vh(33)} - 30px);
			}
		}
	}
</style>
