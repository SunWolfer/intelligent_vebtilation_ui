import CalWorkingFace from '@/views/windControlAssMaking/calOfAirDemand/CalWorkingFace.vue'
import CalHeadingFace from '@/views/windControlAssMaking/calOfAirDemand/CalHeadingFace.vue'
import CalOther from '@/views/windControlAssMaking/calOfAirDemand/CalOther.vue'

export const calOfAirDemand = () => {
	//   左侧选择项目列表
	const tabs = reactive([
		{
			name: '工作面',
			domType: '1',
			domName: shallowRef(CalWorkingFace),
		},
		{
			name: '掘进面',
			domType: '2',
			domName: shallowRef(CalHeadingFace),
		},
		{
			name: '其他',
			domType: '3',
			domName: shallowRef(CalOther),
		},
	])
	// 选中项目
	const chooseDom = ref('1')
	// 改变加载项目
	const changeChooseDom = (type) => {
		if (type === chooseDom.value) return
		chooseDom.value = type
	}
	// 加载组件
	const loadDom = computed(() => {
		return tabs.find((i) => i.domType === chooseDom.value).domName
	})

	// 配风巷道
	const tunnelList = ref([
		{
			name: '11202掘进面',
			airVolume: '111',
			type: '1',
			dateTime: '2023-6-28  15:15:20',
		},
	])

	//巷道名称
	const dataForm = ref({
		name: '',
	})
	// 预测工作面所需风量
	const requiredAirVolume = ref('')
	//   按气象预测
	const dataForm1 = ref({
		windSpeed: '',
		sectionalArea: '',
		heightCoefficient: '',
		lengthFactor: '',
		airVolume: '',
	})
	//   按风速进行验算(工作面)
	const dataForm2 = ref({
		maxArea: '',
		minArea: '',
		miningHeight: '',
		maxDistance: '',
		minDistance: '',
		airVolume: '',
	})
	//   按照瓦斯涌出预测
	const dataForm3 = ref({
		gasSensor: '',
		windSensor: '',
		sectionalArea: '',
		yield: '',
		gushingAmount: '',
		airVolumeCoefficient: '',
		airVolume: '',
	})
	//   按照二氧化碳涌出预测
	const dataForm4 = ref({
		carSensor: '',
		windSensor: '',
		sectionalArea: '',
		yield: '',
		carAmount: '',
		airVolumeCoefficient: '',
		airVolume: '',
	})
	//   按照工作人员数量预测
	const dataForm5 = ref({
		perLocation: '',
		maxPeoNum: '',
		airVolume: '',
	})
	//   按照炸药量预测
	const dataForm6 = ref({
		maxExpQuantity: '',
		airVolume: '',
	})
	// 按照风速进行验算(掘进面)
	const dataForm7 = ref({
		sectionalArea: '',
		hasGas: false,
		airVolume: '',
	})
	// 按照风速进行验算（其他）
	const dataForm8 = ref({
		sectionalArea: '',
		airVolume: '',
	})

	return {
		tabs,
		chooseDom,
		changeChooseDom,
		loadDom,
		tunnelList,
		dataForm,
		requiredAirVolume,
		dataForm1,
		dataForm2,
		dataForm3,
		dataForm4,
		dataForm5,
		dataForm6,
		dataForm7,
		dataForm8,
	}
}
