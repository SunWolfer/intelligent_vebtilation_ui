<!--一键测风弹窗-->
<script setup>
	import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'
	import { useSocket } from '@/hooks/useSocket'
	import { parseTime } from '@/utils/ruoyi'
	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: false,
		},
		dataList: {
			type: Array,
			default: [],
		},
	})
	const emits = defineEmits(['update:modelValue'])
	const diaVisible = computed({
		get() {
			return props.modelValue
		},
		set(val) {
			emits('update:modelValue', val)
		},
	})
	//   测风列表
	const windList = ref([])
	// 初始化测风列表
	const initWindList = () => {
		windList.value = props.dataList.map((i) => {
			return {
				...i,
				realWindDataList: [],
			}
		})
		console.log(props.dataList)
	}
	onMounted(() => {
		initWindList?.()
		clientSocket?.()
		timeout?.()
	})
	// 接收时间
	const receiveTime = ref(0)
	const receiveTimeInterval = ref(0)
	// 计算接收是否超时
	const timeout = () => {
		clearInterval(receiveTimeInterval.value)
		receiveTimeInterval.value = setInterval(() => {
			receiveTime.value++
			if (receiveTime.value > 5) {
				diaVisible.value = false
			}
		}, 1000)
	}
	//   处理socket返回数据
	function dealWithData(data) {
		receiveTime.value = 0
		timeout?.()
		windList.value.forEach((i) => {
			if (i.id === data.id && i.ipAddr === data.ipAddr) {
				i.realWindDataList.push({
					value: data.windSpeed,
					time: parseTime(new Date()),
				})
			}
		})
	}

	const { clientSocket } = useSocket('fullwind|CollectAll', dealWithData)

	onBeforeMount(() => {
		clearInterval(receiveTimeInterval.value)
	})
</script>

<template>
	<dia-log v-model="diaVisible" :width="1500" :height="800" title="一键测风">
		<div class="mea_wind">
			<div class="mea_wind_item_bg" v-for="i in windList">
				<span>实时测风数据</span>
				<span>{{ i.name }}</span>
				<div class="full_body_l2_item_text_body">
					<vue3-seamless-scroll :list="i.realWindDataList" :step="0.5" :count="1">
						<div v-for="i in i.realWindDataList">
							<div>风速：{{ i.value }} m/s</div>
							<div>时间：{{ i.time }}</div>
						</div>
					</vue3-seamless-scroll>
				</div>
			</div>
		</div>
	</dia-log>
</template>

<style scoped lang="scss">
	.mea_wind {
		position: relative;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		display: grid;
		grid-template-columns: repeat(3, vw(405));
		justify-content: space-between;
		grid-row-gap: vh(10);
	}
	.mea_wind_item_bg {
		width: vw(405);
		height: vh(228);
		background-image: url('@/assets/images/accPerOfRomance/cfz_screenbg.png');
		background-size: 100% 100%;
		padding: vh(25) vw(20) vh(10) vw(20);

		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: vh(40) vh(26) vh(120);
		align-items: center;
		justify-content: center;
		span {
			font-size: vw(18);
			font-family:
				Source Han Sans CN,
				serif;
			font-weight: bold;
			color: #f50b0c;
			&:nth-child(1) {
				font-size: vw(30);
				justify-self: center;
			}
			&:nth-child(2) {
				font-size: vw(14);
				justify-self: center;
			}
		}
	}
	.full_body_l2_item_text_body {
		width: 100%;
		height: 100%;
		overflow: hidden;
		font-size: vw(18);
		font-family:
			Source Han Sans CN,
			serif;
		font-weight: bold;
		color: #f50b0c;
	}
</style>
