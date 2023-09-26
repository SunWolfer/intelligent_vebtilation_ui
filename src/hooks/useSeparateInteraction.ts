// 表格与模型分离时互动
import { OperateModel } from '@/components/VueThree/IModelOperate'

interface tunnelTable {
	code: string
	[key: string]: any
}
interface IThreeModelDOM {
	operateModel: OperateModel
	setSelectModel: (name: string) => void
	[key: string]: any
}
export const useSeparateInteraction = (threeModelRef: IThreeModelDOM) => {}
