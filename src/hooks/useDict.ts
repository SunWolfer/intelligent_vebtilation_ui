import { getDicts } from '@/api/system/dict/data'
import useDictStore from '@/store/modules/dict'

/**
 * 获取字典数据
 */
const useDict = (...args: string[]) => {
	const res = ref<{ [key: string]: any }>({})
	return (() => {
		args.forEach((dictType) => {
			res.value[dictType] = []
			const dicts = useDictStore().getDict(dictType)
			if (dicts) {
				res.value[dictType] = dicts
			} else {
				getDicts(dictType).then((resp) => {
					res.value[dictType] = resp.data.map((p: any) => ({
						label: p.dictLabel,
						value: p.dictValue,
						elTagType: p.listClass,
						elTagClass: p.cssClass,
					}))
					useDictStore().setDict(dictType, res.value[dictType])
				})
			}
		})
		return toRefs(res.value)
	})()
}

export default useDict
