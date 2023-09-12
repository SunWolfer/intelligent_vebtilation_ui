// 巷道参数
import { getRoadInfo } from '@/api/api/naturalDisNetSolution'
import useDict from '@/hooks/useDict'
import { useLoading } from '@/hooks/useLoading'

export const useTunnelData = () => {
	/**
	 * 巷道信息字典
	 * vent_shape 巷道形状
	 * shore_type 巷道支护类型
	 * vent_type 巷道类型
	 * ven_air_direction 巷道好进回风类型
	 * vent_source 风阻测定来源
	 * need_cal_type 需风量计算类型
	 */
	const { vent_shape, shore_type, vent_type, ven_air_direction, vent_source, need_cal_type } =
		useDict(
			'vent_shape',
			'shore_type',
			'vent_type',
			'ven_air_direction',
			'vent_source',
			'need_cal_type',
		)
	// 可显示巷道参数列表
	const showTunnelData = ref(undefined)
	// 显示某巷道参数
	const showParam = async (name) => {
		const { loading } = useLoading('正在加载数据，请稍后')
		await getRoadInfo({
			code: name,
		})
			.then((res) => {
				if (res.code === 200) {
					showTunnelData.value = {
						...res.data,
						id: 'tunnel' + res.data.id,
						point: {
							x: res.data?.centerPointX,
							y: res.data?.centerPointY,
							z: res.data?.centerPointZ,
						},
					}
				}
				loading.close()
			})
			.catch(() => {
				loading.close()
			})
	}

	return {
		vent_shape,
		shore_type,
		vent_type,
		ven_air_direction,
		vent_source,
		need_cal_type,
		showTunnelData,
		showParam,
	}
}
