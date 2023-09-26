<!--风窗风阻曲线-->
<script setup>
	import { isNull } from '@/utils/ruoyi'
	import { useWindowFormData } from '@/api/request/venManagement/windowCurveManagement/useWindowFormData'
	import { useCommitForm } from '@/hooks/useForm'
	import { saveVentrLine } from '@/api/api/windowWindResCurve'

	const props = defineProps({
		chooseRow: {
			type: Object,
			default: {
				devId: undefined,
				line: [],
			},
		},
		modelValue: {
			type: Boolean,
			default: false,
		},
		windowList: {
			type: Array,
			default: [],
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
	// 是否修改
	const updateData = computed(() => {
		return !isNull(props.chooseRow.devId)
	})

	const { queryParams, dataList, watchFormId } = useWindowFormData()

	const selections = ref([])
	const handleSelectionChange = (selection) => {
		selections.value = selection
	}

	//   新增列表行
	const addTableRow = () => {
		dataList.value.push({
			kaidu: '',
			fengzu: '',
		})
	}
	//   删除行
	const minusTableRow = () => {
		dataList.value = dataList.value.filter((item) => selections.value.indexOf(item) === -1)
	}
	// 初始化
	const initData = () => {
		if (props.chooseRow.devId) {
			title.value = '修改'
			const { devId, lines } = props.chooseRow
			queryParams.value = {
				devId: devId,
			}
			dataList.value = lines
		} else {
			title.value = '新增'
			watchFormId?.()
		}
	}
	// 判断列表是否有空值
	const singleList = computed(() => {
		let flag = true
		for (let i = 0; i < dataList.value.length; i++) {
			const data = dataList.value[i]
			for (const key in data) {
				if (isNull(data[key])) {
					flag = false
				}
			}
		}
		return flag
	})

	const submitForm = async () => {
		if (!queryParams.value.devId && !singleList.value) return
		await useCommitForm(saveVentrLine, {
			queryParams: {
				...queryParams.value,
				lines: dataList.value,
			},
			afterReadyDataFun: () => {
				emits('submit')
				showDiaLog.value = false
			},
		})
	}

	initData()
</script>

<template>
	<dia-log
		v-model="showDiaLog"
		:title="title"
		:width="1100"
		:height="600"
		has-bottom-btn
		:btn-list="['保存', '取消']"
		@submit="submitForm"
	>
		<div class="fullDom fan_curve_body">
			<div class="fullDom p-center">
				<el-form :model="queryParams" inline>
					<el-form-item label="风窗">
						<el-select :disabled="updateData" v-model="queryParams.devId" clearable>
							<el-option v-for="i in windowList" :label="i.name" :value="i.id"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<div class="fan_curve_body_l2">
				<div class="icon_add" @click="addTableRow"></div>
				<div class="icon_minus" @click="minusTableRow"></div>
			</div>
			<el-table :data="dataList" height="100%" border @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center" />
				<el-table-column label="开度" align="center" prop="kaidu">
					<template #default="scoped">
						<el-input v-model="scoped.row.kaidu" />
					</template>
				</el-table-column>
				<el-table-column label="风阻" align="center" prop="fengzu">
					<template #default="scoped">
						<el-input v-model="scoped.row.fengzu" />
					</template>
				</el-table-column>
			</el-table>
		</div>
	</dia-log>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/venManagement/fanCurve';
</style>
