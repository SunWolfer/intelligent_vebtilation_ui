<!--解算模拟-->
<script setup>
	import AfterCalculation from '@/views/windControlAssMaking/naturalDisNetSolution/afterCalculation.vue'
	import { useCommitForm } from '@/hooks/useForm'
	import { naturedCalculateSimulate } from '@/api/api/naturalDisNetSolution'

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
	})
	const emits = defineEmits([
		'update:imitateVisible',
		'update:operationStepsList',
		'showCalVisible',
		'cancelCalVisible',
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

	//   开始模拟
	async function showAfterCalVisible() {
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
		console.log(commitFormList)
		await useCommitForm(naturedCalculateSimulate, {
			queryParams: commitFormList,
			afterReadyDataFun: (data) => {
				TImitateVisible.value = false
				afterCalVisible.value = true
				emits('showCalVisible')
			},
		})
	}
	//   关闭解算后界面
	function cancelAfterCalVisible() {
		afterCalVisible.value = false
		TOperationStepsList.value = []
		emits('cancelCalVisible')
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
		@cancel="cancelAfterCalVisible"
	/>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/solvingSimulation';
</style>
