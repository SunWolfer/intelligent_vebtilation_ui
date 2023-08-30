export const homeVisualAngle = () => {
	//  显示风路分支图
	const checkedWindPath = ref(true)
	//   显示通风网络图
	const checkedVenNetwork = ref(true)

	return {
		checkedWindPath,
		checkedVenNetwork,
	}
}
