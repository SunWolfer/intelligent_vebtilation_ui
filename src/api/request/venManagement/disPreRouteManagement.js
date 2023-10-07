import {
	deleteEscape,
	escapeExitList,
	getEscapePaths,
	removeEscapePaths,
	saveEscapeExit,
	saveEscapePaths,
	updateEscapePaths,
} from '@/api/api/disPreRouteManagement'
import { useGainList } from '@/hooks/useGainList'
import { useCommitForm } from '@/hooks/useForm'

export const disPreRouteManagement = () => {
	const { dataList: exitList, queryDataList: queryExitDataList } = useGainList({
		apiFun: escapeExitList,
		afterReadyDataFun: () => {
			for (let i = 0; i < exitList.value.length; i++) {
				exitList.value[i].point = {
					x: i.pointX,
					y: i.pointY,
					z: i.pointZ,
				}
			}
		},
	})

	// 新增安全出口
	const handleAddExit = async (data) => {
		await useCommitForm(saveEscapeExit, {
			queryParams: data,
			afterReadyDataFun: () => {
				queryExitDataList?.()
			},
		})
	}
	// 删除安全出口
	const handleDeleteExit = async (index) => {
		const data = exitList.value[index]
		if (data.id) {
			await useCommitForm(deleteEscape, {
				queryParams: exitList.value[index].id,
				afterReadyDataFun: () => {
					queryExitDataList?.()
				},
			})
		} else {
			exitList.value.splice(index, 1)
		}
	}

	//   查询避灾路线
	const { dataList: routeList, queryDataList: queryRouteDataList } = useGainList({
		apiFun: getEscapePaths,
	})
	// 添加临时避灾路线
	const handleAddRouteTemp = (name) => {
		routeList.value.push({
			node: name,
			routeDesc: '',
		})
	}
	// 新增避灾路线
	const handleRouteData = async (data) => {
		if (data.id) {
			await useCommitForm(updateEscapePaths, {
				queryParams: data,
				afterReadyDataFun: () => {
					queryRouteDataList?.()
				},
			})
		} else {
			await useCommitForm(saveEscapePaths, {
				queryParams: data,
				afterReadyDataFun: () => {
					queryRouteDataList?.()
				},
			})
		}
	}
	//删除避灾路线
	const handleDeleteRoute = async (index) => {
		const data = routeList.value[index]
		if (data.id) {
			await useCommitForm(removeEscapePaths, {
				queryParams: data,
				afterReadyDataFun: () => {
					queryRouteDataList?.()
				},
			})
		} else {
			routeList.value.splice(index, 1)
		}
	}

	return {
		exitList,
		handleAddExit,
		handleDeleteExit,
		routeList,
		handleAddRouteTemp,
		handleRouteData,
		handleDeleteRoute,
	}
}
