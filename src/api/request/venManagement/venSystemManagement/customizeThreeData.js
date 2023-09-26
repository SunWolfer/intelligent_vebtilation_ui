import {
	getNowSysVersion,
	getRoadInfoByTag,
	getRoadwayModelByTagType,
	updateModelColor,
} from '@/api/api/venSystemManagement'
import { useLoading } from '@/hooks/useLoading'
import { addVentWay, updateVentWay } from '@/api/api/roadwayManagement'
import { useCommitForm } from '@/hooks/useForm'

export const customizeThreeData = () => {
	// 三维图数据
	const customizeData = ref([])
	// 自定义三维图最大节点值
	const customizeMaxNodeNum = ref(0)
	// 显示三维图数据
	const readyThreeModel = ref(false)
	// 刷新三维图数据
	const refreshThreeData = () => {
		readyThreeModel.value = false
		nextTick().then(() => {
			readyThreeModel.value = true
		})
	}
	// 监听三维图数据
	watch(
		() => customizeData.value,
		() => {
			refreshThreeData()
		},
	)
	// 版本表单
	const dataForm = reactive({
		tag: '',
		// 三维图当前版本
		currentVersion: '',
		// 三维图当前编辑版本
		currentEditedVersion: '',
		// 	模式
		type: '2',
	})
	// 查询当前系统版本
	const getSysVersion = async () => {
		const { data } = await getNowSysVersion()
		dataForm.currentVersion = data.version
		dataForm.currentEditedVersion = data.version
		dataForm.tag = data.tag
		await queryThreeModelData()
	}
	// 查询当前三维模型信息
	const queryThreeModelData = async () => {
		const { loading } = useLoading('正在加载模型数据，请稍候')
		await getRoadwayModelByTagType({
			tag: dataForm.tag,
			type: dataForm.type,
		})
			.then((res) => {
				customizeData.value = res.data.model
				customizeMaxNodeNum.value = parseInt(res.data.maxCode)
				loading.close()
			})
			.catch(() => {
				loading.close()
			})
	}

	// 显示巷道信息弹窗
	const tunnelVisible = ref(false)
	// 巷道信息表单
	const tunnelForm = ref({
		id: undefined,
		name: '',
		code: '',
	})
	const confirmList = ref([
		{
			label: '是',
			value: '1',
		},
		{
			label: '否',
			value: '0',
		},
	])
	const showParam = async (name) => {
		const { data } = await getRoadInfoByTag({
			tag: dataForm.tag,
			code: name,
		})
		if (data) tunnelForm.value = data
	}
	// 选中巷道
	const chooseTunnelData = ref(undefined)
	// 点击位置
	const intersectedPosition = ref(undefined)
	const tunnelHandle = async (intersected, position) => {
		tunnelVisible.value = true
		tunnelForm.value.code = intersected.name
		chooseTunnelData.value = intersected
		intersectedPosition.value = position
		await showParam?.(intersected.name)
	}
	const chooseTunnel = (intersected, position) => {
		chooseTunnelData.value = intersected
		intersectedPosition.value = position
	}

	// 保存巷道信息
	const submitTunnelForm = async () => {
		if (tunnelForm.value.id) {
			await useCommitForm(updateVentWay, {
				queryParams: tunnelForm.value,
			})
		} else {
			await useCommitForm(addVentWay, {
				queryParams: tunnelForm.value,
			})
		}
	}
	// 关闭巷道弹窗
	const closeTunnelHandle = () => {
		tunnelVisible.value = false
	}

	// 切换可编辑版本
	const editVisible = ref(false)
	const handleEdit = () => {
		editVisible.value = true
	}
	// 切换编辑版本
	const changeVersion = async (data) => {
		dataForm.currentEditedVersion = data.version
		dataForm.tag = data.tag
		await queryThreeModelData()
	}

	// 改变巷道颜色
	const tunnelColor = ref('#4ed9ff')
	const handleColor = async () => {
		if (!chooseTunnelData.value) return
		await useCommitForm(updateModelColor, {
			queryParams: {
				code: chooseTunnelData.value.name,
				tag: dataForm.tag,
				color: tunnelColor.value,
			},
			afterReadyDataFun: () => {
				queryThreeModelData?.()
			},
		})
	}

	return {
		getSysVersion,
		queryThreeModelData,
		customizeData,
		customizeMaxNodeNum,
		readyThreeModel,
		editVisible,
		handleEdit,
		dataForm,
		tunnelVisible,
		tunnelForm,
		confirmList,
		tunnelHandle,
		submitTunnelForm,
		closeTunnelHandle,
		tunnelColor,
		chooseTunnel,
		handleColor,
		changeVersion,
		chooseTunnelData,
		intersectedPosition,
	}
}
