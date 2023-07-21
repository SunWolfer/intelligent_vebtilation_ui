export const home = () => {
	// 3D图Dom
	const threeRef = ref(null)
	// 移动镜头
	const moveCamera = (toPosition, toLookAt, time = 1, nextFun = () => {}) => {
		threeRef.value?.operateModel.traMovement(toPosition, toLookAt, time, nextFun)
	}
	// 创建风网解算文字
	const loadText = (fontList) => {
		threeRef.value?.operateModel.created3DFont(fontList)
	}
	// 重绘风流
	const redrawingWind = (direction) => {
		threeRef.value?.redrawingWind(direction)
	}

	return {
		threeRef,
		moveCamera,
		loadText,
		redrawingWind
	}
}
