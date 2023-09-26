// 表格与模型互动
import { OperateModel } from '@/components/VueThree/IModelOperate'
import useThree from '@/hooks/useThree'
import threeModel from '@/store/modules/threeModel'
import type { TableInstance } from 'element-plus'
import { Object3D } from 'three'
import { Ref } from 'vue'

interface tunnelTable {
	code: string
	[key: string]: any
}
interface IThreeModelDOM {
	operateModel: OperateModel
	setSelectModel: (name: string) => void
	[key: string]: any
}
export const useInteraction = () => {
	const threeModelRef = ref<IThreeModelDOM>()
	// 获取中心点坐标
	const getCenterPoint = (p1: ICoordinates, p2: ICoordinates) => {
		const point: ICoordinates = {
			x: (p1.x + p2.x) / 2,
			y: (p1.y + p2.y) / 2,
			z: (p1.z + p2.z) / 2,
		}
		return point
	}
	// 相机移动固定参数
	const { cameraExcursion } = useThree()
	// 相机移动后位置
	const toPosition = (item: ICoordinates) => {
		return {
			x: item.x + cameraExcursion.value.x,
			y: item.y + cameraExcursion.value.y,
			z: item.z + cameraExcursion.value.z,
		}
	}
	// 巷道信息
	const IThreeModel: any = threeModel()
	const threeModelData = computed<IModelNode[]>(() => {
		return IThreeModel.data
	})
	// 相机移动点
	const cameraRemovePosition = ref<ICoordinates>({
		x: 0,
		y: 0,
		z: 0,
	})
	// 相机移动注视点
	const cameraRemoveLookAt = ref<ICoordinates>({
		x: 0,
		y: 0,
		z: 0,
	})
	//   表格DOM
	const tableRef = ref<TableInstance>()
	//   表格行被点击
	const getSelectionRows = (row: tunnelTable) => {
		const names = row.code.split('-')
		if (names.length <= 1) return;
		const chooseModel = threeModelData.value.find((i) => {
			return i.nodeName === names[0] && i.nextNode === names[1]
		})
		if (!chooseModel || !chooseModel.nodePosition || !chooseModel.nextNodePosition) return
		// 	相机注视点
		const center = getCenterPoint(chooseModel.nodePosition, chooseModel.nextNodePosition)
		cameraRemoveLookAt.value = center
		cameraRemovePosition.value = toPosition(center)
		threeModelRef.value?.setSelectModel(row.code)
		threeModelRef.value?.operateModel.traMovement(
			cameraRemovePosition.value,
			cameraRemoveLookAt.value,
			1,
		)
	}
	// 点击巷道code
	const selectCode = ref('')
	// 巷道被点击
	const getSelectionTunnel = (object: Object3D) => {
		if (!object) return
		selectCode.value = object.name
	}
	// 监听点击巷道code
	const watchCode = (list: Ref<tunnelTable[]>) => {
		watch(
			() => selectCode.value,
			(val) => {
				if (val) {
					positionTableRow?.(list.value,val)
				}
			},
		)
	}
	// 定位表格行
	const positionTableRow = (list: tunnelTable[],code:string) => {
		const index = list.findIndex((i) => i.code === code)
		if (index === -1) return
		tableRef.value?.setCurrentRow(list[index])
		// 获取行高
		const offSetTop =
			tableRef.value?.$el.getElementsByClassName('el-table__row')[index].offsetTop
		tableRef.value?.setScrollTop(offSetTop)
	}
	// 传入模型dom
	const watchDomRef = (domRef: Ref<IThreeModelDOM>) => {
		watch(() => domRef.value,(value) => {
			threeModelRef.value = value
		})
	}

	return {
		threeModelRef,
		tableRef,
		positionTableRow,
		getSelectionRows,
		selectCode,
		getSelectionTunnel,
		watchCode,
		watchDomRef
	}
}
