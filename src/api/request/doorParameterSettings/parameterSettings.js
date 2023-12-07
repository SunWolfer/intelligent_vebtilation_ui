import useSocket from '@/hooks/useSocket'
import { isNull } from '@/utils/ruoyi'

export const parameterSettings = () => {
	//网络设置表单
	const networkFormRef = ref(null)
	const networkForm = ref({
		serverIp: '',
		controllerIp: '',
		controllerGatewayIp: '',
		serverPort: '',
		controllerSubnetMask: '',
	})
	// 	网络设置表单验证
	const networkFormRules = ref({
		serverIp: [
			{
				required: true,
				message: '上位机IP不能为空',
				trigger: 'blur',
			},
		],
		controllerIp: [
			{
				required: true,
				message: '控制器IP不能为空',
				trigger: 'blur',
			},
		],
		controllerGatewayIp: [
			{
				required: true,
				message: '网关IP不能为空',
				trigger: 'blur',
			},
		],
		serverPort: [
			{
				required: true,
				message: '上位机端口不能为空',
				trigger: 'blur',
			},
		],
		controllerSubnetMask: [
			{
				required: true,
				message: '子网掩码不能为空',
				trigger: 'blur',
			},
		],
	})

	// 	表单重置
	const resetForm = () => {
		for (const networkFormKey in networkForm.value) {
			networkForm.value[networkFormKey] = null
		}
	}

	// 控制器
	// 	控制器列表
	const chooseLi = ref('0')
	const controllerList = ref([])

	watch(
		() => controllerList.value,
		(val) => {
			let chooseRow = val.filter((i) => {
				return i.ip === chooseLi.value
			})
			if (chooseRow.length === 0) {
				resetForm()
				chooseLi.value = '0'
				return
			}
			if (chooseRow[0]?.onlineStatus === '0') {
				resetForm()
				chooseLi.value = '0'
			}
		},
		{ deep: true },
	)
	// 查询控制器列表
	const queryControllerList = async (apiFun = (params) => {}) => {
		const { data } = await apiFun()
		if (data && data.length > 0) {
			controllerList.value = data
		}
	}

	// socket连接
	const { socketData, clientSocket, dataRes } = useSocket('controllerList', 'config')
	const {
		socketData: socketResData,
		clientSocket: clientSocketData,
		dataRes: dataResData,
	} = useSocket('config')

	watch(
		() => dataRes.controllerList,
		(val) => {
			controllerList.value = val
		},
	)
	watch(
		() => dataResData.config,
		(val) => {
			if (isNull(chooseLi.value)) return
			networkForm.value = val
		},
	)

	const { proxy } = getCurrentInstance()
	// 选择控制器
	const chooseController = async (row, nextFun, clientName) => {
		if (row?.onlineStatus === '1') {
			resetForm()
			chooseLi.value = row.ip
			socketResData.value?.close()
			clientSocketData?.(chooseLi.value + '|' + clientName)

			proxy.$modal.loading('正在下发命令')
			setTimeout(() => {
				proxy.$modal.closeLoading()
			}, 5000)

			if (typeof nextFun === 'function') {
				await nextFun({
					ip: row.ip,
				})
					.then(({ msg }) => {
						proxy.$modal.msgSuccess(msg)
					})
					.finally(() => {
						proxy.$modal.closeLoading()
					})
			}
		}
	}

	// 	改变标签
	const chooseTab = ref(1)
	const changeTab = (data) => {
		chooseTab.value = data
	}

	onBeforeUnmount(() => {
		socketData.value?.close()
		socketResData.value?.close()
	})

	return {
		networkFormRef,
		networkForm,
		networkFormRules,
		resetForm,
		chooseLi,
		controllerList,
		queryControllerList,
		chooseController,
		chooseTab,
		changeTab,
		clientSocket,
	}
}
