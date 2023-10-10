<!--解算模拟-->
<script setup>
	import AfterCalculation from '@/views/windControlAssMaking/naturalDisNetSolution/afterCalculation.vue'
	import { useCommitForm } from '@/hooks/useForm'
	import { naturedCalculateSimulate, reloadDrawing } from '@/api/api/naturalDisNetSolution'
	import { fixedCalculateSimulate } from '@/api/api/onDemandAirDisNetSolution'
	import { dynamicHeight, dynamicWidth } from '@/utils/ruoyi'

	const props = defineProps({
		// 显示解算模拟弹窗
		imitateVisible: {
			type: Boolean,
			default: false,
		},
		// 操作步骤
		operationStepsList: {
			type: Array,
			default: () => {
				return []
			},
		},
		/**
		 * 解算模拟类型
		 * '1'自然分风
		 * ’2’按需分风
		 */
		calculatingType: {
			type: String,
			default: '1',
		},
		// 点击巷道code
		selectCode: {
			type: String,
			default: '',
		},
	})
	const emits = defineEmits([
		'update:imitateVisible',
		'update:operationStepsList',
		'showCalVisible',
		'cancelCalVisible',
		'getSelectionRows',
	])

	const TImitateVisible = computed({
		get() {
			return props.imitateVisible
		},
		set(val) {
			emits('update:imitateVisible', val)
		},
	})
	const TOperationStepsList = computed({
		get() {
			return props.operationStepsList
		},
		set(val) {
			emits('update:operationStepsList', val)
		},
	})

	// 可显示风路分支图
	const showWindBranch = ref(true)
	// 可显示通风网络图
	const showVentilationNetwork = ref(true)

	//   关闭解算模拟弹窗
	function cancelImitateVisible() {
		TImitateVisible.value = false
		TOperationStepsList.value = []
	}

	// 显示解算后界面
	const afterCalVisible = ref(false)
	// 解算后巷道列表
	const afterCalDataList = ref([])
	// 风路分支图列表
	const windBranchList = ref([])
	// 通风网络图默认生成
	const defaultNetWork = ref(true)
	// 通风网络图重新生成地址
	const reloadNetWorkUrl = ref('')
	//   开始模拟
	async function showAfterCalVisible() {
		if (props.calculatingType === '1') {
			await type1Calculating()
		} else if (props.calculatingType === '2') {
			await type2Calculating()
		}
	}

	// 自然分风解算模拟
	const type1Calculating = async () => {
		let commitFormList = []
		for (let i = 0; i < TOperationStepsList.value.length; i++) {
			const operationStep = TOperationStepsList.value[i]
			commitFormList.push({
				typeName: operationStep.commitType,
				children: [
					{
						code: operationStep.name,
						ventR: operationStep.value,
						startNode: operationStep?.startNode,
						endNode: operationStep?.endNode,
					},
				],
			})
		}
		// 判断是否重新生成通风网络图
		if (showVentilationNetwork.value) {
			const hasNewTunnelList = commitFormList.filter((i) => {
				return i.typeName === 'new'
			})
			defaultNetWork.value = hasNewTunnelList.length === 0
			if (!defaultNetWork.value) {
				await reloadNetWorkMap(hasNewTunnelList)
			}
		}

		await useCommitForm(naturedCalculateSimulate, {
			queryParams: commitFormList,
			afterReadyDataFun: (data) => {
				afterCalDataList.value = data.roads
				windBranchList.value = data.windBranch
				TImitateVisible.value = false
				afterCalVisible.value = true
				emits('showCalVisible', afterCalDataList.value)
			},
		})
	}
	// 按需分风解算模拟
	const type2Calculating = async () => {
		const commitFormList = TOperationStepsList.value.map((i) => {
			return {
				code: i.code,
				fixedQ: i.value,
			}
		})
		await useCommitForm(fixedCalculateSimulate, {
			queryParams: commitFormList,
			afterReadyDataFun: (data) => {
				const fixedList = data.fixed.map((i) => {
					return {
						...i,
						isFixed: true,
					}
				})
				afterCalDataList.value = [...fixedList, ...data.calculate]
				windBranchList.value = data.windBranch
				TImitateVisible.value = false
				afterCalVisible.value = true
				emits('showCalVisible', afterCalDataList.value)
			},
		})
	}
	// 重新加载通风网络图
	const reloadNetWorkMap = async (list) => {
		let newTunnel = []
		for (let i = 0; i < list.length; i++) {
			const children = list[i].children
			for (let j = 0; j < children.length; j++) {
				newTunnel.push({ ...children[j] })
			}
		}
		const res = await reloadDrawing({
			children: newTunnel,
			w: dynamicWidth(900),
			h: dynamicHeight(527),
		})
		if (res && res.msg) reloadNetWorkUrl.value = res.msg
	}
	//   关闭解算后界面
	function cancelAfterCalVisible() {
		afterCalVisible.value = false
		TOperationStepsList.value = []
		emits('cancelCalVisible')
	}
	//   表格行被点击
	const getSelectionRows = (row) => {
		emits('getSelectionRows', row)
	}
</script>

<template>
	<!--    解算模拟弹窗-->
	<dia-log
		v-if="TImitateVisible"
		v-model="TImitateVisible"
		title="解算模拟"
		:width="800"
		:height="520"
		has-bottom-btn
	>
		<template #default>
			<div class="imitate_body">
				<div class="imitate_body_border">
					<div class="imitate_body_border_body">
						<template v-for="(i, index) in TOperationStepsList">
							<div class="imitate_body_border_item">
								<div class="imitate_body_border_text_index">{{ index + 1 }}</div>
								<div class="imitate_body_border_text overText">{{ i.name }}</div>
								<div class="imitate_body_border_text overText">{{ i.label }}</div>
								<div class="imitate_body_border_text_bg"></div>
							</div>
						</template>
					</div>
				</div>
				<div class="imitate_body_branch">
					<div class="imitate_body_branch_item">
						<div class="imitate_body_branch_item_label">风路分支图</div>
						<el-checkbox v-model="showWindBranch"></el-checkbox>
					</div>
					<div class="imitate_body_branch_item">
						<div class="imitate_body_branch_item_label">通风网络图</div>
						<el-checkbox v-model="showVentilationNetwork"></el-checkbox>
					</div>
				</div>
			</div>
		</template>
		<template #bottom>
			<div class="home_reverse_wind_btn" @click="showAfterCalVisible">
				<div class="home_reverse_wind_btn_icon"></div>
				<span>开始模拟</span>
			</div>
			<div class="normal_btn" @click="cancelImitateVisible">取消</div>
		</template>
	</dia-log>
	<after-calculation
		v-if="afterCalVisible"
		v-model="afterCalVisible"
		:show-ventilation-network="showVentilationNetwork"
		:show-wind-branch="showWindBranch"
		:data-list="afterCalDataList"
		:wind-branch-list="windBranchList"
		:default-net-work="defaultNetWork"
		:reload-net-work-url="reloadNetWorkUrl"
		:select-code="selectCode"
		@cancel="cancelAfterCalVisible"
		@getSelectionRows="getSelectionRows"
	/>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/solvingSimulation';
</style>
