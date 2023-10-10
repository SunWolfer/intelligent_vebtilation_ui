<!--通风网络图-->
<script setup>
	// 查询通风网络图
	import { netWorkDrawing } from '@/api/api/home'

	const props = defineProps({
		defaultNetWork: {
			type: Boolean,
			default: true,
		},
		reloadUrl: {
			type: String,
			default: '',
		},
	})

	const netWorkRef = ref(null)
	const hlUrl = ref('')
	const getNetworkPath = async () => {
		const w = netWorkRef.value?.offsetWidth
		const h = netWorkRef.value?.offsetHeight
		const res = await netWorkDrawing({
			w: w,
			h: h,
		})
		if (res && res.msg) hlUrl.value = res.msg
	}
	onMounted(() => {
		if (props.defaultNetWork) {
			getNetworkPath()
		} else {
			hlUrl.value = props.reloadUrl
		}
	})
</script>

<template>
	<div class="fullDom ven_network_body">
		<span class="other_title"> <border-box name="border2" title="通风网络图"></border-box></span>
		<div ref="netWorkRef" class="fullDom">
			<iframe v-if="hlUrl" :src="hlUrl" style="width: 100%; height: 100%" />
		</div>
	</div>
</template>

<style scoped lang="scss">
	.ven_network_body {
		background: rgba(12, 41, 70, 0.85);
		border-radius: 10px;
		padding: 0 vw(30) 0 vw(44);
		display: grid;
		grid-template-rows: vh(45) 1fr;
	}
	.nodeSty {
		position: absolute;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: aqua;
		color: black;
		text-align: center;
		line-height: 20px;
		cursor: pointer;
		user-select: none;
	}
</style>
