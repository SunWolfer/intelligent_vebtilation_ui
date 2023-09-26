// 3D巷道编辑
import { OperateModel } from '@/components/VueThree/IModelOperate'
import useEquipmentData from '@/hooks/useEquipmentData'
import { Ref } from 'vue'

export const useModel = (operateModel: Ref<OperateModel>) => {
	// 显示全部设备图标
	const { allTypeList } = useEquipmentData()

	const isReady = ref(false)
	watch(
		() => allTypeList.value,
		() => {
			isReady.value = false
			nextTick().then(() => {
				loadAllTypeList()
			})
		},
	)
	function loadAllTypeList() {
		isReady.value = true
		nextTick().then(() => {
			operateModel.value?.addWrapperLabels(allTypeList.value, 'uniqueCode')
		})
	}

	// 临时设备标签
	const temReady = ref(false)
	const temporaryLabelList = ref([])
	watch(
		() => temporaryLabelList.value,
		(val) => {
			temReady.value = false
			nextTick().then(() => {
				loadTemLabelList()
			})
		},
		{ deep: true },
	)
	const loadTemLabelList = () => {
		temReady.value = true
		nextTick().then(() => {
			operateModel.value?.addTemporaryLabelList(temporaryLabelList.value)
		})
	}

	return {
		isReady,
		allTypeList,
		loadAllTypeList,
		temReady,
		temporaryLabelList,
		loadTemLabelList,
	}
}
