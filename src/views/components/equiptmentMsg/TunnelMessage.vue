<script setup>
	import { useTunnelData } from '@/hooks/useTunnelData'

	const props = defineProps({
		intersected: {
			type: Object,
			default: () => {
				return {}
			},
		},
		operateModel: {
			type: Object,
		},
	})

	const { showTunnelData, showParam } = useTunnelData()
	// 监听点击对象，返回可显示巷道参数列表
	watch(
		() => props.intersected,
		(val) => {
			val && showParam?.(val?.name)
		},
	)
	watch(
		() => showTunnelData.value,
		(val) => {
			if (val) {
				val && reloadTunnel()
			} else {
				cleanLabelList()
			}
		},
	)
	// 重加载巷道信息
	const isTunnelReady = ref(false)
	function reloadTunnel() {
		isTunnelReady.value = false
		nextTick(() => {
			isTunnelReady.value = true
			nextTick(() => {
				props.operateModel?.addOtherLabelList([showTunnelData.value])
			})
		})
	}
	//   清除巷道信息
	function cleanLabelList() {
		isTunnelReady.value = false
		nextTick(() => {
			props.operateModel?.addOtherLabelList([])
		})
	}

	onBeforeUnmount(() => {
		cleanLabelList()
	})
</script>

<template>
	<div v-if="isTunnelReady" class="tunnel" :key="showTunnelData.id" :id="showTunnelData.id">
		<div class="tunnel_bg">
			<div class="tunnel_bg_title">{{ showTunnelData.name }}</div>
			<div class="tunnel_bg_line">
				[巷道编号]
				<span class="tunnel_bg_line_value overText">{{ showTunnelData.code }}</span>
			</div>
			<div class="tunnel_bg_line">
				[ 巷道周长(m) ]
				<span class="tunnel_bg_line_value">{{ showTunnelData.circumference }}</span>
			</div>
			<div class="tunnel_bg_line">
				[巷道断面积(㎡)]
				<span class="tunnel_bg_line_value">{{ showTunnelData.surface }}</span>
			</div>
			<div class="tunnel_bg_line">
				[ 巷道长度(m) ]
				<span class="tunnel_bg_line_value">{{ showTunnelData.length }}</span>
			</div>
			<div class="tunnel_bg_line">
				[巷道形状]
				<span class="tunnel_bg_line_value">{{}}</span>
			</div>
			<div class="tunnel_bg_line">
				[ 支护类型]
				<span class="tunnel_bg_line_value"> 锚喷</span>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.tunnel {
		position: absolute;
		left: 0;
		top: vh(-70);
	}
	.tunnel_bg {
		width: vw(392);
		height: vh(169);
		background-image: url('@/assets/images/tunnel_bg.png');
		background-size: 100% 100%;
		display: grid;
		padding: vh(18) vw(22) vh(45) vw(22);
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: vh(16) repeat(3, vh(14));
		align-content: space-between;
		align-items: center;
	}
	.tunnel_bg_title {
		font-size: vh(16);
		font-family:
			Adobe Heiti Std,
			serif;
		font-weight: normal;
		color: #ffffff;
		grid-column-end: 3;
	}
	.tunnel_bg_line {
		width: 100%;
		font-size: vh(14);
		font-family:
			Adobe Heiti Std,
			serif;
		font-weight: normal;
		color: #4bc8fc;
		.tunnel_bg_line_value {
			color: #ffffff;
		}
	}
</style>
