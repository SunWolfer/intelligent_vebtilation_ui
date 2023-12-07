import ReconnectingWebSocket from 'reconnecting-websocket'

export interface ISocketData {
	type: string
	data: any
}
const useSocket = (...args: string[]) => {
	const socketData = ref<ReconnectingWebSocket>()
	const socketIP = window.SITE_CONFIG.socketip
	const dataMsg = ref<ISocketData | undefined>()
	const dataRes = reactive({})
	args.forEach((dictType) => {
		dataRes[dictType] = {}
	})
	const clientSocket = (clientName: string) => {
		const nowTime = new Date()
		if (typeof WebSocket == 'undefined') {
			console.log('您的浏览器不支持WebSocket')
		} else {
			socketData.value = new ReconnectingWebSocket(
				`${socketIP}/WebSocketServer/${clientName}|${nowTime}`,
			)
			socketData.value.onopen = function () {
				console.log('Socket 已打开')
			}
			socketData.value.onmessage = (msg) => {
				if (msg.data !== '连接成功') {
					dataMsg.value = JSON.parse(msg.data) ?? {}
					args.forEach((dictType) => {
						if (dataMsg.value?.type === dictType) {
							dataRes[dictType] = dataMsg.value?.data
						}
					})
				}
			}
			socketData.value.onclose = function () {
				console.log('Socket已关闭')
			}
			socketData.value.onerror = function () {
				console.log('Socket发生了错误')
			}
		}
	}
	return {
		socketData,
		clientSocket,
		dataMsg,
		dataRes,
		...toRefs(dataRes),
	}
}

export default useSocket
