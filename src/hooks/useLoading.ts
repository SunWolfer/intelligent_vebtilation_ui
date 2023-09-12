import { ElLoading } from 'element-plus'

export const useLoading = (text = '正在处理，请稍候') => {
	const loading = ElLoading.service({
		text: text,
		background: 'rgba(0, 0, 0, 0.7)',
	})
	return {
		loading,
	}
}
