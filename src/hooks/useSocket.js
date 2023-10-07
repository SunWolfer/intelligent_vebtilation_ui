import ReconnectingWebSocket from 'reconnecting-websocket'
export const useSocket = (key, nextFun = () => {}) => {
	const socketIP = import.meta.env.VITE_APP_SOCKETIP
	// socket链接地址
	const webSocketUrl = `${socketIP}/WebSocketServer/${key}|${new Date()}`
	const socketData = ref()

	const clientSocket = () => {
		if (!key) return
		if (typeof WebSocket == 'undefined') {
			console.log('您的浏览器不支持WebSocket')
		} else {
			socketData.value = new ReconnectingWebSocket(webSocketUrl)
			socketData.value.onopen = function () {
				console.log('Socket 已打开')
			}
			socketData.value.onmessage = (msg) => {
				if (msg.data !== '连接成功') {
					console.log(msg)
					let dataMsg = JSON.parse(msg.data)
					nextFun(dataMsg.data)
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
		clientSocket,
		socketData,
	}
}
