import PromptBox from '@/components/PromptBox/index.vue'
import { ElLoading, ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { createVNode, render } from 'vue'

let loadingInstance: { close: () => void }

export default {
	// 消息提示
	msg(content: string) {
		ElMessage.info(content)
	},
	// 错误消息
	msgError(content: string) {
		ElMessage.error(content)
	},
	// 成功消息
	msgSuccess(content: string) {
		ElMessage.success(content)
	},
	// 警告消息
	msgWarning(content: string) {
		ElMessage.warning(content)
	},
	// 弹出提示
	alert(content: string) {
		ElMessageBox.alert(content, '系统提示')
	},
	// 错误提示
	alertError(content: string) {
		ElMessageBox.alert(content, '系统提示', { type: 'error' })
	},
	// 成功提示
	alertSuccess(content: string) {
		ElMessageBox.alert(content, '系统提示', { type: 'success' })
	},
	// 警告提示
	alertWarning(content: string) {
		ElMessageBox.alert(content, '系统提示', { type: 'warning' })
	},
	// 通知提示
	notify(content: string) {
		ElNotification.info(content)
	},
	// 错误通知
	notifyError(content: string) {
		ElNotification.error(content)
	},
	// 成功通知
	notifySuccess(content: string) {
		ElNotification.success(content)
	},
	// 警告通知
	notifyWarning(content: string) {
		ElNotification.warning(content)
	},
	// 确认窗体
	confirm(content: string) {
		return new Promise<void>((resolve, reject) => {
			getCustomizeModel({
				title: '系统提示',
				message: content,
				icon: 'loginWarn',
				resolve: resolve,
				reject: reject,
			})
		})
	},
	// 提交内容
	prompt({
		title = '警告',
		message = '',
		confirmButtonText = '确定',
		cancelButtonText = '取消',
		width = 900,
		height = 400,
		icon = '',
	}) {
		return new Promise<void>((resolve, reject) => {
			getCustomizeModel({
				title: title,
				message: message,
				confirmButtonText: confirmButtonText,
				cancelButtonText: cancelButtonText,
				width: width,
				height: height,
				icon: icon,
				resolve: resolve,
				reject: reject,
			})
		})
	},
	// 打开遮罩层
	loading(content: string) {
		loadingInstance = ElLoading.service({
			lock: true,
			text: content,
			background: 'rgba(0, 0, 0, 0.7)',
		})
	},
	// 关闭遮罩层
	closeLoading() {
		loadingInstance.close()
	},
}

function getCustomizeModel({
	title = '警告',
	message = '',
	confirmButtonText = '确定',
	cancelButtonText = '取消',
	width = 900,
	height = 300,
	icon = '',
	resolve = (val: any) => {},
	reject = (reason?: any) => {},
}) {
	const _vm = createVNode(PromptBox, {
		title: title,
		message: message,
		btn: [confirmButtonText, cancelButtonText],
		width: width,
		height: height,
		icon: icon,
		ok,
		close,
	})
	const container = document.createElement('div')
	render(_vm, container)
	document.body.appendChild(container)

	// 销毁元素
	function destroyNodes() {
		document.body.removeChild(container)
	}
	// 定义close方法，通过props传递给组件
	function close() {
		destroyNodes()
		reject()
	}
	// 定义ok方法，通过props传递给组件
	function ok(val: any) {
		destroyNodes()
		resolve(val)
	}
}
