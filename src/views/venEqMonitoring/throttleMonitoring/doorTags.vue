<script setup>
	import useCurrentInstance from '@/hooks/useCurrentInstance'
	import { addDoorTags, listTags } from '@/api/api/throttleManagement'
	import useDict from '@/hooks/useDict'
	import { selectDictLabel } from '@/utils/ruoyi'
	import { useCommitForm } from '@/hooks/useForm'
	import { windowTagSet } from '@/api/api/windWindowManagement'

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
		//   风门风窗
		tagsType: {
			type: String,
			default: 'door',
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

	const { CZLX, ITEM_SJLX } = useDict('CZLX', 'ITEM_SJLX')

	const formatterCZLX = (row) => {
		return selectDictLabel(CZLX.value, row.czlx)
	}
	const formatterSJLX = (row) => {
		return selectDictLabel(ITEM_SJLX.value, row.sjlx)
	}

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
				if (dataList.value[b].code === isSelectList.value[a]) {
					data.push(dataList.value[b])
				}
			}
		}
		return data
	})

	const initData = async () => {
		dataForm.value = props.chooseRow
		const { data } = await listTags({
			sblx: props.tagsType === 'door' ? '1' : '2',
			devId: dataForm.value.id,
		})
		let selectList = data.devTags.length > 0 ? data.devTags : data.tags
		selectList.forEach((i) => {
			data.tags.forEach((j) => {
				if (i.code === j.code) {
					j.addr = i.addr
					j.vark = i.vark
					j.varb = i.varb
					j.value = i.value
				}
			})
		})
		dataList.value = data.tags
		isSelectList.value = selectList.map((i) => {
			return i.code
		})
	}

	onMounted(() => {
		initData()
	})

	// 删除
	function deleteHandle(id, index) {
		isSelectList.value.splice(index, 1)
	}
	//   标签保存
	const saveTags = async () => {
		let rdata = selectedList.value.every((i) => {
			return i.addr !== null && i.addr !== undefined && i.addr !== ''
		})
		if (!rdata) {
			proxy.$notify({
				title: '警告',
				message: '列表内地址信息存在空值',
				type: 'warning',
			})
		} else {
			await useCommitForm(props.tagsType === '1' ? addDoorTags : windowTagSet, {
				queryParams: {
					devId: dataForm.value.id,
					tags: selectedList.value,
				},
				afterReadyDataFun: () => {
					showDiaLog.value = false
				},
			})
		}
	}
</script>

<template>
	<dia-log
		:title="title"
		v-model="showDiaLog"
		v-if="showDiaLog"
		:width="1400"
		:height="800"
		has-bottom-btn
		@submit="saveTags"
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
							:label="item.name"
							:value="item.code"
						/>
					</el-select>
				</el-form-item>
			</el-form>
			<el-table :data="selectedList" border height="100%">
				<el-table-column
					prop="name"
					align="center"
					min-width="100"
					:show-overflow-tooltip="true"
					label="标签名称"
				/>
				<el-table-column
					prop="code"
					align="center"
					min-width="100"
					:show-overflow-tooltip="true"
					label="标签编码"
				/>
				<el-table-column
					prop="sjlx"
					align="center"
					min-width="110"
					:show-overflow-tooltip="true"
					label="数据类型"
					:formatter="formatterSJLX"
				>
				</el-table-column>
				<el-table-column
					prop="czlx"
					align="center"
					min-width="110"
					label="操作类型"
					:formatter="formatterCZLX"
				>
				</el-table-column>
				<el-table-column
					prop="value"
					align="center"
					min-width="70"
					:show-overflow-tooltip="true"
					label="标签值"
				/>
				<el-table-column
					prop="addr"
					align="center"
					min-width="80"
					:show-overflow-tooltip="true"
					label="地址"
				>
					<template #default="scope">
						<el-input type="number" v-model="scope.row.addr" />
					</template>
				</el-table-column>
				<el-table-column
					prop="vark"
					align="center"
					min-width="80"
					:show-overflow-tooltip="true"
					label="系数"
				>
					<template #default="scope">
						<el-input type="number" v-model="scope.row.vark" />
					</template>
				</el-table-column>
				<el-table-column
					prop="varb"
					align="center"
					min-width="80"
					:show-overflow-tooltip="true"
					label="常量"
				>
					<template #default="scope">
						<el-input type="number" v-model="scope.row.varb" />
					</template>
				</el-table-column>
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
