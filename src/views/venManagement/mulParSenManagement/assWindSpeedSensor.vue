<!--关联风速传感器-->
<script setup>
	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: false,
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
	const generateData = () => {
		const data = []
		for (let i = 1; i <= 15; i++) {
			data.push({
				key: i,
				label: `Option ${i}`,
			})
		}
		return data
	}

	const data = ref(generateData())
	const value = ref([])
</script>

<template>
	<dia-log
		v-model="showDiaLog"
		title="关联"
		:width="900"
		:height="540"
		has-bottom-btn
		:btn-list="['保存', '取消']"
	>
		<el-transfer
			v-model="value"
			:data="data"
			:titles="['关联风速传感器', '风速传感器']"
			:button-texts="['关联', '移除']"
			filterable
		/>
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
