import { getDicts, listAllData } from '@/api/system/dict/data'
import useDictStore from '@/store/modules/dict'
/**
 * 获取字典数据
 */
export const useDict = (...args: string[]) => {
	const res = ref<{ [key: string]: any }>({})
	return (() => {
		args.forEach((dictType) => {
			res.value[dictType] = []
			const dicts = useDictStore().getDict(dictType)
			if (dicts) {
				res.value[dictType] = dicts
			} else {
				getDicts(dictType).then((resp: IApiResponseDataList) => {
					res.value[dictType] = resp.data.map((p: any) => ({
						label: p.dictLabel,
						value: p.dictValue,
						elTagType: p.listClass,
						elTagClass: p.cssClass,
					}))
					const dicts = useDictStore().getDict(dictType)
					!dicts && useDictStore().setDict(dictType, res.value[dictType])
				})
			}
		})
		return toRefs(res.value)
	})()
}

/**
 * 加载全部字典数据
 */
export const loadAllDict = async () => {
	const { data } = await listAllData()
	useDictStore().cleanDict()

	Object.keys(data).forEach((item) => {
		const itemDataList = data[item].map((p: any) => ({
			label: p.dictLabel,
			value: p.dictValue,
			elTagType: p.listClass,
			elTagClass: p.cssClass,
		}))
		useDictStore().setDict(item, itemDataList)
	})
}
