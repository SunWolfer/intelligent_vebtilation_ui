<!--可编辑版本弹窗-->
<script setup>
	import { useGainList } from '@/hooks/useGainList'
	import { getEditModelVersion } from '@/api/api/venSystemManagement'

	const props = defineProps({
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
	const emits = defineEmits(['update:modelValue', 'changeVersion'])
	const showDiaLog = computed({
		get() {
			return props.modelValue
		},
		set() {
			emits('update:modelValue', false)
		},
	})
	// 当前可编辑版本列表
	const { dataList } = useGainList({
		apiFun: getEditModelVersion,
	})
	//   设定版本列表
	const handleUpdate = (row) => {
		emits('changeVersion', row)
	}
</script>

<template>
	<dia-log title="版本列表" v-model="showDiaLog" v-if="showDiaLog">
		<el-table :data="dataList" height="100%">
			<el-table-column label="版本号" align="center" prop="version" />
			<el-table-column label="设定版本" align="center">
				<template #default="scope">
					<el-button type="primary" link @click="handleUpdate(scope.row)">设定</el-button>
				</template>
			</el-table-column>
		</el-table>
	</dia-log>
</template>

<style lang="scss" scoped></style>
