<!--巡检路线新增修改-->
<script setup>
	import { useGainList } from '@/hooks/useGainList'
	import {
		addPath,
		getDeviceByType,
		getDeviceType,
		getPath,
		updatePath,
	} from '@/api/api/patrolRouteManagement'
	import { isNull } from '@/utils/ruoyi'
	import { useCommitForm } from '@/hooks/useForm'

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
	const title = ref('')

	const dataForm = ref({
		name: '',
		orderNum: '',
	})

	// 设备类型
	const { dataList: devTypeList } = useGainList({
		apiFun: getDeviceType,
	})
	// 改变设备类型
	const changeDevType = async (row) => {
		row.devId = ''
		row.devChildren = await getDevChildren(row.devType)
	}
	// 根据设备类型查询设备
	const getDevChildren = async (devType) => {
		const { data } = await getDeviceByType({
			devType: devType,
		})
		return data
	}
	// 选择设备
	const chooseDevData = (row) => {
		const chooseData = row.devChildren.find((i) => {
			return i.id === row.devId
		})
		row.devLocation = chooseData?.location
		row.devName = chooseData?.name
	}

	const dataList = ref([])

	//   新增列表行
	const addTableRow = () => {
		dataList.value.push({
			orderNum: dataList.value.length + 1,
			devId: '',
			devType: '',
			devName: '',
			devLocation: '',
			// 设备列表
			devChildren: [],
		})
	}
	//   删除行
	const minusTableRow = (index) => {
		dataList.value.splice(index, 1)
	}
	//   下移
	const downRow = (index) => {
		if (index === dataList.value.length - 1) return
		let temp = dataList.value[index]
		dataList.value[index] = {
			...dataList.value[index + 1],
			orderNum: temp.orderNum++,
		}
		dataList.value[index + 1] = temp
	}
	//   上移
	const upRow = (index) => {
		if (index === 0) return
		let temp = dataList.value[index]
		dataList.value[index] = {
			...dataList.value[index - 1],
			orderNum: temp.orderNum--,
		}
		dataList.value[index - 1] = temp
	}

	const initData = async () => {
		if (props.chooseRow.id) {
			title.value = '修改'
			const res = await getPath(props.chooseRow.id)
			dataForm.value = props.chooseRow
			dataList.value = res.data
		} else {
			title.value = '新增'
		}
	}

	//   提交
	const submitForm = async () => {
		if (
			isNull(dataForm.value.name) ||
			isNull(dataForm.value.orderNum) ||
			dataList.value.length === 0
		)
			return
		if (props.chooseRow.id) {
			await useCommitForm(updatePath, {
				queryParams: {
					...dataForm.value,
					children: dataList.value,
				},
				afterReadyDataFun: () => {
					emits('submit')
					showDiaLog.value = false
				},
			})
		} else {
			await useCommitForm(addPath, {
				queryParams: {
					...dataForm.value,
					children: dataList.value,
				},
				afterReadyDataFun: () => {
					emits('submit')
					showDiaLog.value = false
				},
			})
		}
	}

	initData()
</script>

<template>
	<dia-log
		v-if="showDiaLog"
		v-model="showDiaLog"
		:title="title"
		:width="900"
		:height="520"
		has-bottom-btn
		:btn-list="['保存', '取消']"
		@submit="submitForm"
	>
		<div class="fullDom route_body">
			<div class="fullDom c-center">
				<el-form :model="dataForm" inline>
					<el-form-item label="巡检路线名称">
						<el-input class="route_body_input" v-model="dataForm.name"></el-input>
					</el-form-item>
					<el-form-item label="排序">
						<el-input class="route_body_input" v-model="dataForm.orderNum"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="route_body_l2">
				<div class="icon_add" @click="addTableRow"></div>
			</div>
			<el-table :data="dataList" height="100%" border>
				<el-table-column label="序号" align="center" prop="orderNum" />
				<el-table-column label="设备类型" align="center" prop="devType">
					<template #default="scoped">
						<el-select v-model="scoped.row.devType" @change="changeDevType(scoped.row)" clearable>
							<el-option
								v-for="item in devTypeList"
								:label="item.dictLabel"
								:value="item.dictValue"
							></el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column label="设备名称" align="center" prop="devName">
					<template #default="scoped">
						<el-select v-model="scoped.row.devId" @change="chooseDevData(scoped.row)" clearable>
							<el-option
								v-for="i in scoped.row.devChildren"
								:label="i.name"
								:value="i.id"
							></el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column label="设备位置" align="center" prop="devLocation" />
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
