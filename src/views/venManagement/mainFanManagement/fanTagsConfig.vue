<script setup>
	import useCurrentInstance from '@/hooks/useCurrentInstance'
	import { paramAll, setParam } from '@/api/api/mainFanManagement'
	import { useCommitForm } from '@/hooks/useForm'
	import useDict from '@/hooks/useDict'

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
			default: {},
		},
		fanType: {
			type: String,
			default: 'mainfan',
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

	const { dev_as_type, electric_machine_type } = useDict('dev_as_type', 'electric_machine_type')

	const dataForm = ref({
		id: 0,
	})
	// 全部数据
	const dataList = ref([])
	//   已选择数据
	const isSelectList = ref([])

	// 已选择数据
	const selectedList = computed(() => {
		let data = []
		for (let a = 0; a < isSelectList.value.length; a++) {
			for (let b = 0; b < dataList.value.length; b++) {
				if (
					dataList.value[b].propertyCode +
						dataList.value[b].devAs +
						dataList.value[b].electricMachine ===
					isSelectList.value[a]
				) {
					data.push(dataList.value[b])
				}
			}
		}
		return data
	})

	const initData = async () => {
		dataForm.value = props.chooseRow
		const { data } = await paramAll({
			devId: dataForm.value.id,
			fanType: props.fanType === 'mainfan' ? '1' : '2',
		})
		dataList.value = data.all
		isSelectList.value = data.check.map((i) => {
			return i.propertyCode + i.devAs + i.electricMachine
		})
	}

	// 删除
	function deleteHandle(id, index) {
		isSelectList.value.splice(index, 1)
	}

	const submitForm = async () => {
		await useCommitForm(setParam, {
			queryParams: {
				devId: dataForm.value.id,
				paramList: selectedList.value,
			},
			afterReadyDataFun: () => {
				showDiaLog.value = false
			},
		})
	}

	onMounted(() => {
		initData()
	})
</script>

<template>
	<dia-log :title="title" v-model="showDiaLog" has-bottom-btn @submit="submitForm">
		<div class="door_tags">
			<el-form :model="dataForm">
				<el-form-item>
					<el-select
						v-model="isSelectList"
						style="width: 300px"
						multiple
						collapse-tags
						placeholder="请选择"
					>
						<el-option
							v-for="item in dataList"
							:key="item.id"
							:label="item.propertyName"
							:value="item.propertyCode + item.devAs + item.electricMachine"
						/>
					</el-select>
				</el-form-item>
			</el-form>
			<el-table :data="selectedList" border height="100%">
				<el-table-column
					prop="devAs"
					align="center"
					min-width="100"
					:show-overflow-tooltip="true"
					label="风机"
				>
					<template #default="scope">
						<el-select disabled v-model="scope.row.devAs" clearable>
							<el-option v-for="i in dev_as_type" :label="i.label" :value="i.value"></el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column
					prop="electricMachine"
					align="center"
					min-width="100"
					:show-overflow-tooltip="true"
					label="电机"
				>
					<template #default="scope">
						<el-select disabled v-model="scope.row.electricMachine" clearable>
							<el-option
								v-for="i in electric_machine_type"
								:label="i.label"
								:value="i.value"
							></el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column
					prop="propertyName"
					align="center"
					min-width="100"
					:show-overflow-tooltip="true"
					label="标签名称"
				/>
				<el-table-column
					prop="propertyCode"
					align="center"
					min-width="100"
					:show-overflow-tooltip="true"
					label="标签编码"
				/>
				<el-table-column
					prop="propertyUnit"
					align="center"
					min-width="100"
					:show-overflow-tooltip="true"
					label="标签单位"
				/>
				<el-table-column align="center" width="100" label="操作">
					<template #default="scope">
						<el-button link @click="deleteHandle(scope.row.id, scope.$index)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</dia-log>
</template>

<style lang="scss" scoped>
	.door_tags {
		position: relative;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-rows: vh(40) 1fr;
	}
</style>
