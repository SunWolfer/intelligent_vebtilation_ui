import useCurrentInstance from '@/hooks/useCurrentInstance'

export const usePermission = () => {
	const { proxy } = useCurrentInstance()

	const validateFun = (nextFun = async () => {}) => {
		proxy.$modal
			.permission()
			.then(async () => {
				await nextFun()
			})
			.catch(() => {})
	}

	const confirmFun = (nextFun = async () => {}) => {
		proxy.$modal
			.confirm('是否确认执行')
			.then(async () => {
				await nextFun()
			})
			.catch(() => {})
	}
	return {
		validateFun,
		confirmFun,
	}
}
