import { ElLoading } from 'element-plus'

export const useLoading = () => {
	const loading = ElLoading.service({
		text: '正在处理，请稍候',
		background: 'rgba(0, 0, 0, 0.7)',
	})
	return {
		loading,
	}
}
