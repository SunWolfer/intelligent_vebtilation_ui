export const monitoring = () => {
	const doorColors = ['#01bfff', '#00ff00', '#ffff00', '#ff9b00', '#ff0057', '#ff00c6', '#7803ec']

	const warnStatusMap = new Map([
		['0', '#01bfff'],
		['1', '#ffff00'],
		['2', '#ff9b00'],
		['3', '#ff0057'],
		['4', '#ff00c6'],
		['5', '#7803ec'],
	])

	// 选中项
	const chooseRow = ref(undefined)
	// 显示监控
	const videoVisible = ref(false)
	const showVideoVisible = (data) => {
		chooseRow.value = data
		videoVisible.value = true
	}
	// 显示预警详情
	const warnDetailsVisible = ref(false)
	const showWarnDetailsVisible = (data) => {
		chooseRow.value = data
		warnDetailsVisible.value = true
	}

	return {
		doorColors,
		warnStatusMap,
		chooseRow,
		videoVisible,
		showVideoVisible,
		warnDetailsVisible,
		showWarnDetailsVisible,
	}
}
