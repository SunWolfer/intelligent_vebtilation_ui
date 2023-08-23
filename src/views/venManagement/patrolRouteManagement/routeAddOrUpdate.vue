<!--巡检路线新增修改-->
<script setup>
	const props = defineProps({
		chooseRow: {
			type: Object,
			default: {
				id: undefined,
			},
		},
		modelValue: {
			type: Boolean,
			default: false,
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

	//   标题
	const title = computed(() => {
		return props.chooseRow.id ? '修改' : '新增'
	})

	const dataForm = ref({
		name: '',
		index: '',
	})

	const selectOptions = ref([
		{
			label: '1',
			value: '1',
		},
		{
			label: '2',
			value: '2',
		},
		{
			label: '3',
			value: '3',
		},
		{
			label: '4',
			value: '5',
		},
	])

	const dataList = ref([])

	//   新增列表行
	const addTableRow = () => {
		dataList.value.push({})
	}
	//   删除行
	const minusTableRow = (index) => {
		dataList.value.splice(index, 1)
	}
	//   下移
	const downRow = (index) => {
		if (index === dataList.value.length - 1) return
		let temp = dataList.value[index]
		dataList.value[index] = dataList.value[index + 1]
		dataList.value[index + 1] = temp
	}
	//   上移
	const upRow = (index) => {
		if (index === 0) return
		let temp = dataList.value[index]
		dataList.value[index] = dataList.value[index - 1]
		dataList.value[index - 1] = temp
	}
</script>

<template>
	<dia-log
		v-model="showDiaLog"
		:title="title"
		:width="900"
		:height="520"
		has-bottom-btn
		:btn-list="['保存', '取消']"
	>
		<div class="fullDom route_body">
			<div class="fullDom c-center">
				<el-form :model="dataForm" inline>
					<el-form-item label="巡检路线名称">
						<el-input class="route_body_input" v-model="dataForm.name"></el-input>
					</el-form-item>
					<el-form-item label="排序">
						<el-input class="route_body_input" v-model="dataForm.index"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="route_body_l2">
				<div class="icon_add" @click="addTableRow"></div>
			</div>
			<el-table :data="dataList" height="100%" border>
				<el-table-column label="序号" align="center" type="index" />
				<el-table-column label="设备类型" align="center" prop="type">
					<template #default="scoped">
						<el-select v-model="scoped.row.type">
							<el-option
								v-for="item in selectOptions"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column label="设备名称" align="center" prop="name">
					<template #default="scoped">
						<el-select v-model="scoped.row.name"></el-select>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template #default="scoped">
						<div class="icon_line">
							<div class="icon_down" @click="downRow(scoped.$index)"></div>
							<div class="icon_up" @click="upRow(scoped.$index)"></div>
							<div class="icon_minus" @click="minusTableRow(scoped.$index)"></div>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</dia-log>
</template>

<style scoped lang="scss">
	.route_body {
		display: grid;
		grid-template-rows: vh(37) vh(33) 1fr;
		align-content: space-between;
	}
	.route_body_input {
		width: vw(185);
	}
	.route_body_l2 {
		display: flex;
		justify-content: end;
		align-items: center;
	}
	@mixin iconSty {
		width: vw(33);
		height: vh(33);
		background-size: 100% 100%;
		cursor: pointer;
	}
	.icon_add {
		@include iconSty;
		background-image: url('@/assets/images/venManagement/patrol_add.png');
	}

	.icon_line {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(3, vw(33));
		justify-content: center;
		align-items: center;
	}

	.icon_minus {
		@include iconSty;
		background-image: url('@/assets/images/venManagement/patrol_minus.png');
	}
	@mixin iconDown {
		width: vw(20);
		height: vh(24);
		background-size: 100% 100%;
		cursor: pointer;
	}
	.icon_down {
		@include iconDown;
		background-image: url('@/assets/images/venManagement/down_ok.png');
	}
	.icon_up {
		@include iconDown;
		background-image: url('@/assets/images/venManagement/upward_ok.png');
	}
</style>
