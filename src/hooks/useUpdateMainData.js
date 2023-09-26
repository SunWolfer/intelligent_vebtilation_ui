// 查询系统公共数据
import useEquipment from "@/store/modules/equipmentData";
import {useLoadThreeModel} from "@/hooks/useLoadThreeModel";

export const useUpdateMainData = () => {
  const { setThreeData } = useLoadThreeModel()
  const equipmentData = useEquipment()

//   加载设备信息
  const upDateEquipmentFun = () => {
    equipmentData.updateData()
  }
  // 加载模型&&设备信息
  const loadPubData = () => {
    upDateEquipmentFun?.()
    setThreeData?.()
  }

  return {
    setThreeData,
    upDateEquipmentFun,
    loadPubData
  }
}
