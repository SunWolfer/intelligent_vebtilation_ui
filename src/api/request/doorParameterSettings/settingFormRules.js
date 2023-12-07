export const settingFormRules = () => {
	// 校验数字范围
	const checkNum = (minNum, maxNum, rule, value, callback) => {
		if (value < minNum || value > maxNum) {
			return callback(new Error(`范围为${minNum}-${maxNum}`))
		} else {
			callback()
		}
	}

	// 校验正整数
	const positiveInteger = (rule, value, callback) => {
		const reg = /^[+]{0,1}(\d+)$/
		if (!reg.test(value)) {
			return callback(new Error('请输入正整数'))
		} else {
			callback()
		}
	}
	// 	0-65535
	const checkNum_0 = (rule, value, callback) => {
		checkNum(0, 65535, rule, value, callback)
	}
	// 	1-65535
	const checkNum_1 = (rule, value, callback) => {
		checkNum(1, 65535, rule, value, callback)
	}
	// 	10-65535
	const checkNum_10 = (rule, value, callback) => {
		checkNum(10, 65535, rule, value, callback)
	}
	// 	60-65535
	const checkNum_60 = (rule, value, callback) => {
		checkNum(60, 65535, rule, value, callback)
	}
	// 1-30
	const checkNum_1_30 = (rule, value, callback) => {
		checkNum(1, 30, rule, value, callback)
	}
	// 0-100
	const checkNum_0_100 = (rule, value, callback) => {
		checkNum(0, 100, rule, value, callback)
	}
	return {
		checkNum_0,
		checkNum_1,
		checkNum_10,
		checkNum_60,
		checkNum_1_30,
		checkNum_0_100,
		positiveInteger,
	}
}
