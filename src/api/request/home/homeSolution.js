export const homeSolution = () => {
	// 显示风量
	const checkedWind = ref(false)
	// 显示风阻
	const checkedWindAge = ref(false)
	// 显示风压
	const checkedWindPressure = ref(false)

	return {
		checkedWind,
		checkedWindAge,
		checkedWindPressure,
	}
}
