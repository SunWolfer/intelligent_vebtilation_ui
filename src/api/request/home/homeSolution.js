export const homeSolution = () => {
	// 显示风量
	const checkedWind = ref(true)
	// 显示风阻
	const checkedWindAge = ref(true)
	// 显示风压
	const checkedWindPressure = ref(true)

	return {
		checkedWind,
		checkedWindAge,
		checkedWindPressure,
	}
}
