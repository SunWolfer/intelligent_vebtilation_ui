<script setup>
	import { windowMore } from '@/api/api/airWindow'

	const props = defineProps({
		title: {
			type: String,
			default: '',
		},
		modelValue: {
			type: Boolean,
			default: false,
		},
		dataForm: {
			type: Object,
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

	const DIList = ref([])
	const AIList = ref([])
	// 查询更多
	const getDoorMore = async () => {
		const res = await windowMore({
			devId: props.dataForm.id,
		})
		if (res.code === 200) {
			DIList.value = res.data.DI
			AIList.value = res.data.AI
		}
	}

	onMounted(() => {
		getDoorMore()
	})

	function closeDia() {
		showDiaLog.value = false
	}
</script>

<template>
	<dia-log v-model="showDiaLog" :title="title" :width="1000" :height="430">
		<div class="air_more_body">
			<div class="air_more_body_title">DI</div>
			<div class="air_more_body_row">
				<template v-for="i in DIList">
					<div class="air_more_body_item">
						<div class="air_more_body_item_line">
							{{ i.diNum }}:<span :class="i.warnType === '预警' ? 'warn_text' : 'normal_text'">{{
								i.warnType
							}}</span>
						</div>
						<div class="air_more_body_item_line">传感器：{{ i.sensorType }}</div>
					</div>
				</template>
			</div>

			<div class="air_more_body_title">AI</div>
			<div class="air_more_body_row">
				<template v-for="i in AIList">
					<div class="air_more_body_item" style="grid-template-rows: repeat(3, 1fr)">
						<div class="air_more_body_item_line">
							{{ i.aiNum }}:<span :class="i.warnType === '预警' ? 'warn_text' : 'normal_text'">{{
								i.warnType
							}}</span>
						</div>
						<div class="air_more_body_item_line">监测值：{{ i.sensorValue }}</div>
						<div class="air_more_body_item_line">传感器：{{ i.sensorType }}</div>
					</div>
				</template>
			</div>
		</div>
	</dia-log>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_air_more';
</style>
