<!--风机特性曲线新增修改-->
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
		rotationalSpeed: '',
		angle: '',
	})

	const selections = ref([])

	const handleSelectionChange = (selection) => {
		selections.value = selection
	}
	const dataList = ref([])

	//   新增列表行
	const addTableRow = () => {
		dataList.value.push({
			id: Math.random(),
		})
	}
	//   删除行
	const minusTableRow = () => {
		dataList.value = dataList.value.filter((item) => selections.value.indexOf(item) === -1)
	}
</script>

<template>
	<dia-log
		v-model="showDiaLog"
		:title="title"
		:width="1100"
		:height="600"
		has-bottom-btn
		:btn-list="['保存', '取消']"
	>
		<div class="fullDom fan_curve_body">
			<div class="fullDom c-center">
				<el-form :model="dataForm" inline>
					<el-form-item label="风机">
						<el-select class="fan_curve_input" v-model="dataForm.name"></el-select>
					</el-form-item>
					<el-form-item label="转速(r/min)">
						<el-select class="fan_curve_input" v-model="dataForm.rotationalSpeed"></el-select>
					</el-form-item>
					<el-form-item label="叶片角度">
						<el-select class="fan_curve_input" v-model="dataForm.angle"></el-select>
					</el-form-item>
				</el-form>
			</div>
			<div class="fan_curve_body_l2">
				<div class="icon_add" @click="addTableRow"></div>
				<div class="icon_minus" @click="minusTableRow"></div>
			</div>
			<el-table :data="dataList" height="100%" border @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center" />
				<el-table-column label="风量(m3/s)" align="center" prop="name">
					<template #default="scoped">
						<el-input v-model="scoped.row.name" />
					</template>
				</el-table-column>
				<el-table-column label="通风阻力(Pa)" align="center" prop="name">
					<template #default="scoped">
						<el-input v-model="scoped.row.name" />
					</template>
				</el-table-column>
				<el-table-column label="风机全压(Pa)" align="center" prop="name">
					<template #default="scoped"> <el-input v-model="scoped.row.name" /></template>
				</el-table-column>
				<el-table-column label="风机效率(%)" align="center" prop="name">
					<template #default="scoped"> <el-input v-model="scoped.row.name" /></template>
				</el-table-column>
				<el-table-column label="风机功率(kw)" align="center" prop="name">
					<template #default="scoped"> <el-input v-model="scoped.row.name" /></template>
				</el-table-column>
			</el-table>
		</div>
	</dia-log>
</template>

<style scoped lang="scss">
	.fan_curve_body {
		display: grid;
		grid-template-rows: vh(37) vh(33) 1fr;
		align-content: space-between;
	}
	.fan_curve_input {
		width: vw(143);
	}
	.fan_curve_body_l2 {
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
	.icon_minus {
		@include iconSty;
		background-image: url('@/assets/images/venManagement/patrol_minus.png');
	}
	:deep(.el-table) {
		.el-input {
			margin: 5px 10px;
			width: calc(100% - 20px);
		}
	}
</style>
