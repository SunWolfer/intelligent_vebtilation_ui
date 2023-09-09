<script setup>
	import useCurrentInstance from '@/hooks/useCurrentInstance'
	import { boardParamAll, setBoardParam } from '@/api/api/windMeaStaManagement'
	import { useCommitForm } from '@/hooks/useForm'

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
		id: 0,
	})

	// 选择器已选择数据
	const isSelectList = ref([])
	// 全部数据
	const dataList = ref([])

	// 已选择数据
	const selectedList = computed(() => {
		let data = []
		for (let a = 0; a < isSelectList.value.length; a++) {
			for (let b = 0; b < dataList.value.length; b++) {
				if (dataList.value[b].propertyCode === isSelectList.value[a]) {
					data.push({
						...dataList.value[b],
						orderNum: a + 1,
					})
				}
			}
		}
		return data
	})

	const initData = async () => {
		dataForm.value = props.chooseRow
		const { data } = await boardParamAll({
			devId: dataForm.value.id,
		})
		dataList.value = data.all
		isSelectList.value = data.check.map((i) => {
			return i.propertyCode
		})
	}
	// 删除
	function deleteHandle(id, index) {
		isSelectList.value.splice(index, 1)
	}

	async function saveParams() {
		await useCommitForm(setBoardParam, {
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
	<dia-log
		:title="title"
		v-model="showDiaLog"
		v-if="showDiaLog"
		has-bottom-btn
		@submit="saveParams"
	>
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
							:value="item.propertyCode"
						/>
					</el-select>
				</el-form-item>
			</el-form>
			<el-table :data="selectedList" border height="100%">
				<el-table-column prop="orderNum" align="center" label="顺序" />
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
