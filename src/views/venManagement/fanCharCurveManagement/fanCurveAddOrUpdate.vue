<!--风机特性曲线新增修改-->
<script setup>
	import { isNull } from '@/utils/ruoyi'
	import { useCommitForm } from '@/hooks/useForm'
	import { saveFanLine } from '@/api/api/fanCharCurveManagement'
	import { useFanFormData } from '@/api/request/venManagement/fanCharCurveManagement/useFanFormData'

	const props = defineProps({
		chooseRow: {
			type: Object,
			default: {
				devId: undefined,
				// 	转速
				zhuansu: '',
				// 	角度
				jiaodu: '',
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
	// 是否修改
	const updateData = computed(() => {
		return !isNull(props.chooseRow.devId)
	})
	const {
		queryParams,
		fanList,
		rotationalSpeedList,
		bladeAngleList,
		single,
		handleMonitor,
		handleSingle,
		dataList,
	} = useFanFormData()

	const selections = ref([])

	const handleSelectionChange = (selection) => {
		selections.value = selection
	}

	//   新增列表行
	const addTableRow = () => {
		dataList.value.push({
			fengliang: '',
			xiaolv: '',
			gonglv: '',
			quanya: '',
			tongfengzuli: '',
		})
	}
	//   删除行
	const minusTableRow = () => {
		dataList.value = dataList.value.filter((item) => selections.value.indexOf(item) === -1)
	}
	const initData = () => {
		if (props.chooseRow.devId) {
			title.value = '修改'
			const { devId, zhuansu, jiaodu, lines } = props.chooseRow
			queryParams.value = {
				devId: devId,
				zhuansu: zhuansu,
				jiaodu: jiaodu,
			}
			dataList.value = lines
		} else {
			title.value = '新增'
			handleMonitor?.()
			handleSingle?.()
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
		if (!single.value && !singleList.value) return
		await useCommitForm(saveFanLine, {
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
		v-if="showDiaLog"
		v-model="showDiaLog"
		:title="title"
		:width="1100"
		:height="600"
		has-bottom-btn
		:btn-list="['保存', '取消']"
		@submit="submitForm"
	>
		<div class="fullDom fan_curve_body">
			<div class="fullDom c-center">
				<el-form :model="queryParams" inline>
					<el-form-item label="风机">
						<el-select
							clearable
							:disabled="updateData"
							class="fan_curve_input"
							v-model="queryParams.devId"
						>
							<el-option v-for="i in fanList" :label="i.name" :value="i.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="转速(r/min)">
						<el-select
							clearable
							:disabled="updateData"
							class="fan_curve_input"
							v-model="queryParams.zhuansu"
						>
							<el-option
								v-for="i in rotationalSpeedList"
								:label="i.zhuansu"
								:value="i.zhuansu"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="叶片角度">
						<el-select
							clearable
							:disabled="updateData"
							class="fan_curve_input"
							v-model="queryParams.jiaodu"
						>
							<el-option v-for="i in bladeAngleList" :value="i" :label="i"></el-option>
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
				<el-table-column label="风量(m3/s)" align="center" prop="name">
					<template #default="scoped">
						<el-input v-model="scoped.row.fengliang" />
					</template>
				</el-table-column>
				<el-table-column label="通风阻力(Pa)" align="center" prop="name">
					<template #default="scoped">
						<el-input v-model="scoped.row.tongfengzuli" />
					</template>
				</el-table-column>
				<el-table-column label="风机全压(Pa)" align="center" prop="name">
					<template #default="scoped"> <el-input v-model="scoped.row.quanya" /></template>
				</el-table-column>
				<el-table-column label="风机效率(%)" align="center" prop="name">
					<template #default="scoped"> <el-input v-model="scoped.row.xiaolv" /></template>
				</el-table-column>
				<el-table-column label="风机功率(kw)" align="center" prop="name">
					<template #default="scoped"> <el-input v-model="scoped.row.gonglv" /></template>
				</el-table-column>
			</el-table>
		</div>
	</dia-log>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/venManagement/fanCurve';
</style>
