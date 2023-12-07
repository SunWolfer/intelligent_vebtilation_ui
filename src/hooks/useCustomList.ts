export const useCustomList = (defaultData: any) => {
	const dataList = ref<any[]>([])

	//   新增列表行
	const addTableRow = () => {
		dataList.value.push({
			...defaultData,
			orderNum: dataList.value.length + 1,
		})
	}
	//   删除行
	const minusTableRow = (index: number) => {
		dataList.value.splice(index, 1)
	}
	//   下移
	const downRow = (index: number) => {
		if (index === dataList.value.length - 1) return
		let temp = dataList.value[index]
		dataList.value[index] = {
			...dataList.value[index + 1],
			orderNum: temp.orderNum++,
		}
		dataList.value[index + 1] = temp
	}
	//   上移
	const upRow = (index: number) => {
		if (index === 0) return
		let temp = dataList.value[index]
		dataList.value[index] = {
			...dataList.value[index - 1],
			orderNum: temp.orderNum--,
		}
		dataList.value[index - 1] = temp
	}

	return {
		dataList,
		addTableRow,
		minusTableRow,
		downRow,
		upRow,
	}
}
