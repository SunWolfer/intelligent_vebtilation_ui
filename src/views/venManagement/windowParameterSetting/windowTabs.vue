<script setup>
	import { dynamicWidth } from '@/utils/ruoyi'

	//	选中标签
	const chooseTab = ref(1)
	// 	标签列表
	const tabList = ref([
		{
			label: '开关量输出(DO)配置',
			value: 1,
		},
		{
			label: '开关量输入(DI)配置',
			value: 2,
		},
		{
			label: '模拟量输入(AI)配置',
			value: 3,
		},
		{
			label: '串口(RS485)配置',
			value: 4,
		},
	])
	// 	可显示区域
	const clipPath = computed(() => {
		const tabsLen = dynamicWidth(240)
		const tabsMargin = dynamicWidth(15)
		const borderLen = '3px'
		const otherBorder = `calc(100% - ${borderLen})`

		// 显示标签位置
		const positionR = chooseTab.value * tabsLen + (chooseTab.value - 1) * tabsMargin
		const positionL = (chooseTab.value - 1) * (tabsLen + tabsMargin)
		// 内标签
		const insideL = positionL + 3
		const insideR = positionR - 3
		const points =
			`0% 100%,` +
			`${insideL}px 100%,` +
			`${insideL}px ${borderLen},` +
			`${insideR}px ${borderLen},` +
			`${insideR}px 100%,` +
			`100% 100%,` +
			`100% ${otherBorder},` +
			`${positionR}px ${otherBorder},` +
			`${positionR}px 0,` +
			`${positionL}px 0, ` +
			`${positionL}px ${otherBorder},` +
			`0% ${otherBorder},` +
			`0% 100%`
		return `polygon(${points})`
	})

	const emits = defineEmits(['changeTab'])
	const changeTab = (data) => {
		chooseTab.value = data
		emits('changeTab', chooseTab.value)
	}
</script>

<template>
	<div class="tabs-bg">
		<div class="tabs-bg-body"></div>
		<template v-for="i in tabList">
			<div
				class="tabs-one c-center"
				@click="changeTab(i.value)"
				:class="i.value === chooseTab ? 'tabs-one-choose-text' : 'tabs-one-default-text'"
			>
				<span>{{ i.label }}</span>
			</div>
		</template>
	</div>
</template>

<style lang="scss" scoped>
	$tabsLen: vw(240);
	$borderLen: 4px;
	$otherBorder: calc(100% - $borderLen);

	.tabs-bg {
		position: relative;
		width: 100%;
		height: vh(45);
	}

	.tabs-bg-body {
		position: absolute;
		z-index: 1;
		width: 100%;
		height: 100%;
		background: linear-gradient(92deg, #2d77f3 30%, #21e8ff 50%, #2d77f3 50%);
		background-size: 200% 100%;
		animation: masked-animation 5s infinite linear;
		clip-path: v-bind(clipPath);
	}

	//标签
	.tabs-one {
		float: left;
		width: $tabsLen;
		height: 100%;

		&:nth-child(n + 3) {
			margin-left: vw(15);
		}
	}

	.tabs-one-default-text {
		background: rgba(19, 121, 200, 0);
		box-shadow: 0 0 vh(40) 0 rgba(0, 146, 255, 0.8) inset;
		border-radius: 6px;
		cursor: pointer;

		font-size: vw(18);
		font-family:
			Microsoft YaHei,
			serif;
		font-weight: 400;
		color: #ffffff;
	}

	.tabs-one-choose-text {
		font-family:
			Microsoft YaHei,
			serif;
		font-size: vw(20);
		font-weight: 400;
		color: #00ffff;

		background: linear-gradient(92deg, #01aaff 30%, #21e8ff 50%, #01aaff 70%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;

		-webkit-background-size: 200% 100%;
		-webkit-animation: masked-animation 3s infinite linear;
	}

	@keyframes masked-animation {
		0% {
			background-position: 0 0;
		}
		to {
			background-position: -200% 0;
		}
	}
</style>
