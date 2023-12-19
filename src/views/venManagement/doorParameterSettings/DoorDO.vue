<script setup>
	import useDict from '@/hooks/useDict'
	import { isNull } from '@/utils/ruoyi'

	const props = defineProps({
		dataFrom: {
			type: Object,
			default: () => {
				return {}
			},
		},
	})
	const emit = defineEmits(['update:dataFrom', 'setParam'])
	const controlForm = computed({
		get() {
			return props.dataFrom
		},
		set(val) {
			emit('update:dataFrom', val)
		},
	})

	const dataList = ref([
		{
			id: 1,
			label1: 'DO1：',
			value1: 'doDeviceType1',
		},
		{
			id: 2,
			label1: 'DO2：',
			value1: 'doDeviceType2',
		},
		{
			id: 3,
			label1: 'DO3：',
			value1: 'doDeviceType3',
		},
		{
			id: 4,
			label1: 'DO4：',
			value1: 'doDeviceType4',
		},
		{
			id: 5,
			label1: 'DO5：',
			value1: 'doDeviceType5',
		},
		{
			id: 6,
			label1: 'DO6：',
			value1: 'doDeviceType6',
		},
		{
			id: 7,
			label1: 'DO7：',
			value1: 'doDeviceType7',
		},
		{
			id: 8,
			label1: 'DO8：',
			value1: 'doDeviceType8',
		},
		{
			id: 9,
			label1: 'DO9：',
			value1: 'doDeviceType9',
		},
		{
			id: 10,
			label1: 'DO10：',
			value1: 'doDeviceType10',
		},
		{
			id: 11,
			label1: 'DO11：',
			value1: 'doDeviceType11',
		},
		{
			id: 12,
			label1: 'DO12：',
			value1: 'doDeviceType12',
		},
	])

	const { do_type_door } = useDict('do_type_door')

	const { proxy } = getCurrentInstance()
	const setParams = (...paramName) => {
		if (isNull(controlForm.value[paramName[0]])) {
			proxy.$modal.msgWarning('请选择DO')
			return
		}
		emit('setParam', ...paramName)
	}
</script>

<template>
	<div class="fullDom do_dom">
		<template v-for="obj in dataList" :key="obj.id">
			<div class="do_dom_item">
				<span>{{ obj.label1 }}</span>
				<el-select :teleported="false" filterable v-model="controlForm[obj.value1]" clearable>
					<el-option
						v-for="item in do_type_door"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					/>
				</el-select>
				<el-button class="add-btn" icon="Setting" @click="setParams(obj.value1)">设置</el-button>
			</div>
		</template>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/door/paramsSettingChild';
	.do_dom {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-column-gap: vw(20);
		grid-template-rows: repeat(3, vh(85));
		align-content: space-evenly;
	}
	.do_dom_item {
		@include tabsBorder;
		display: grid;
		align-items: center;
		grid-template-columns: vw(50) 1fr vw(100);
		grid-column-gap: vw(10);
		padding: 0 vw(15);
	}
</style>
