const useInterceptList = (list: any[], maxIndex: number) => {
	//   起始步数
	const startStep = ref(0)

	//   可显示列表
	const inShowList = computed(() => {
		return list.filter((i, index) => {
			return index >= startStep.value && index < maxIndex + startStep.value
		})
	})

	// 数组长度
	const listLength = computed(() => {
		return list.length
	})

	// 显示上一步DOM
	const showLast = computed(() => {
		return startStep.value > 0
	})
	// 上一步
	const toLast = () => {
		startStep.value = startStep.value - 1
	}

	// 显示下一步DOM
	const showNext = computed(() => {
		return startStep.value + maxIndex < listLength.value
	})
	// 下一步
	const toNext = () => {
		startStep.value = startStep.value + 1
	}
	watch(
		() => list,
		() => {
			startStep.value = 0
		},
	)

	return {
		startStep,
		inShowList,
		toLast,
		showLast,
		toNext,
		showNext,
	}
}

export default useInterceptList
