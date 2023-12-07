import { isNum, PositiveNum } from '@/utils/ruoyi'
import type { FormInstance, FormRules } from 'element-plus'

/**
 * 风窗参数设定表单验证
 */
export const useCheckWindowForm = () => {
	interface RuleForm {
		openDegreeAdjust?: number
		volumeAdjust?: number
		pressureAdjust?: number
		areaAdjust?: number
	}

	const ruleFormRef = ref<FormInstance>()

	const ruleForm = ref<RuleForm>({})

	const checkTime = (_rule: any, value: any, callback: any) => {
		if (value < 0 || value > 100) {
			return callback(new Error('范围为0-100'))
		} else {
			callback()
		}
	}

	const rules = reactive<FormRules<RuleForm>>({
		openDegreeAdjust: [
			{
				required: true,
				message: '开度不能为空',
				trigger: 'blur',
			},
			{
				pattern: /^[+]{0,1}(\d+)$/,
				message: '开度为正整数',
				trigger: 'blur',
			},
			{ validator: checkTime, trigger: 'blur' },
		],
		volumeAdjust: [
			{
				required: true,
				message: '风量不能为空',
				trigger: 'blur',
			},
			{
				pattern: isNum,
				message: '风量为大于等于0的数',
				trigger: 'blur',
			},
		],
		pressureAdjust: [
			{
				required: true,
				message: '风压不能为空',
				trigger: 'blur',
			},
			{
				pattern: isNum,
				message: '风压为大于等于0的数',
				trigger: 'blur',
			},
		],
		areaAdjust: [
			{
				required: true,
				message: '面积不能为空',
				trigger: 'blur',
			},
			{
				pattern: PositiveNum,
				message: '面积为大于等于0的数',
				trigger: 'blur',
			},
		],
	})

	const submitForm = (key: string, nextFun = () => {}) => {
		ruleFormRef.value?.validateField(key, (fields) => {
			if (fields) {
				nextFun()
			}
		})
	}

	return {
		ruleFormRef,
		rules,
		submitForm,
		ruleForm,
	}
}
