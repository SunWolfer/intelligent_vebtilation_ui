export const useGushingAmount = () => {
	// 巷道风速
	const Vs = ref('')
	// 巷道测风点断面积
	const S = ref('')
	// 巷道实时风速
	const Qf = computed(() => {
		return 60 * Vs.value * S.value ?? 0
	})

	//   浓度
	const Cg = ref('')
	//   流量
	const Qs = computed(() => {
		return Cg.value * Qf.value ?? 0
	})
	return {
		Vs,
		S,
		Cg,
		Qs,
	}
}
