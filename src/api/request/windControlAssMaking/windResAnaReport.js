import useList from "@/hooks/useList";
import {getVentList} from "@/api/api/windResAnaReport";

export const windResAnaReport = () => {
	//   通风阻力分析路线
	const windageRoute = ref([
		'副斜井',
		'井底停车场',
		'消防材料库',
		'950皮带',
		'1311皮带上山',
		'021301运',
		'021301回',
		'1213回风上山',
		'12层总回',
		'南风井',
	])

	// 通风阻力分析结论
	const windResAnalysisList = ref([
		'矿井总进风量：5859m3/min',
		'矿井总回风量：5859m3/min',
		'系统理论计算阻力值：306.309Pa；水柱计值：370 Pa；水柱计值：370Pa',
		' 系统气压计检测阻力值：340.95Pa',
		' 自然风压：-46.20Pa',
		' 相对误差：11.30%；',
		'矿井等级孔：6.43m2。 ',
	])
	
	return {
		windageRoute,
		windResAnalysisList,
	}
}
