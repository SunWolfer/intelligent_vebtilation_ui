<!--开关量输出(DO)配置-->
<script setup>
	import useDict from '@/hooks/useDict'
	import { isNull } from '@/utils/ruoyi'
	const { do_type, do_control } = useDict('do_type', 'do_control')
	const props = defineProps({
		dataFrom: {
			type: Object,
			default: {},
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
			label2: ' 控制源：',
			value2: 'doControlSource1',
		},
		{
			id: 2,
			label1: 'DO2：',
			value1: 'doDeviceType2',
			label2: ' 控制源：',
			value2: 'doControlSource2',
		},
		{
			id: 3,
			label1: 'DO3：',
			value1: 'doDeviceType3',
			label2: ' 控制源：',
			value2: 'doControlSource3',
		},
		{
			id: 4,
			label1: 'DO4：',
			value1: 'doDeviceType4',
			label2: ' 控制源：',
			value2: 'doControlSource4',
		},
		{
			id: 5,
			label1: 'DO5：',
			value1: 'doDeviceType5',
			label2: ' 控制源：',
			value2: 'doControlSource5',
		},
		{
			id: 6,
			label1: 'DO6：',
			value1: 'doDeviceType6',
			label2: ' 控制源：',
			value2: 'doControlSource6',
		},
		{
			id: 7,
			label1: 'DO7：',
			value1: 'doDeviceType7',
			label2: ' 控制源：',
			value2: 'doControlSource7',
		},
		{
			id: 8,
			label1: 'DO8：',
			value1: 'doDeviceType8',
			label2: ' 控制源：',
			value2: 'doControlSource8',
		},
		{
			id: 9,
			label1: 'DO9：',
			value1: 'doDeviceType9',
			label2: ' 控制源：',
			value2: 'doControlSource9',
		},
		{
			id: 10,
			label1: 'DO10：',
			value1: 'doDeviceType10',
			label2: ' 控制源：',
			value2: 'doControlSource10',
		},
		{
			id: 11,
			label1: 'DO11：',
			value1: 'doDeviceType11',
			label2: ' 控制源：',
			value2: 'doControlSource11',
		},
		{
			id: 12,
			label1: 'DO12：',
			value1: 'doDeviceType12',
			label2: ' 控制源：',
			value2: 'doControlSource12',
		},
	])

	const isDisable = (val) => {
		return !['6', '7', '8', '10', '11', '12', '14', '15', '16'].includes(val)
	}

	function changeChoose(val) {
		controlForm.value[val.value2] = ''
	}

	const { proxy } = getCurrentInstance()
	const setParams = (...paramName) => {
		if (isNull(controlForm.value[paramName[0]])) {
			proxy.$modal.msgWarning('请选择DO')
			return
		}
		if (!isDisable(controlForm.value[paramName[0]]) && isNull(controlForm.value[paramName[1]])) {
			proxy.$modal.msgWarning('请选择控制源')
			return
		}
		emit('setParam', ...paramName)
	}
</script>

<template>
	<div class="fullDom tab_first">
		<template v-for="i in dataList">
			<div class="tab_first_item">
				<span>{{ i.label1 }}</span>
				<el-select filterable v-model="controlForm[i.value1]" clearable @change="changeChoose(i)">
					<el-option
						v-for="item in do_type"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
				<span>{{ i.label2 }}</span>
				<el-select
					filterable
					v-model="controlForm[i.value2]"
					clearable
					:disabled="isDisable(controlForm[i.value1])"
				>
					<el-option
						v-for="item in do_control"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
				<div class="fullDom c-center tab_first_item_full_line">
					<div class="form-setting-img" @click="setParams(i.value1, i.value2)"></div>
				</div>
			</div>
		</template>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/assets/styles/door/paramsSettingChild';
	.tab_first {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-column-gap: vw(40);
		grid-template-rows: repeat(3, vh(116));
		align-content: space-evenly;
	}
	.tab_first_item {
		@include tabsBorder;
		display: grid;
		align-items: center;
		grid-template-columns: vw(70) 1fr vw(65);
		grid-column-gap: vw(12);
		grid-template-rows: repeat(2, 1fr);
		padding: 0 vw(15);
		grid-template-areas:
			'. . A'
			'. . A';
		span {
			justify-self: end;
		}
	}
	.tab_first_item_full_line {
		grid-area: A;
	}
</style>
