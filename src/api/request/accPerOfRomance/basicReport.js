export const basicReport = () => {
	const chooseVersion = ref(0)

	// 版本列表
	const versionList = ref([
		{
			dateTime: '2023-07-01',
		},
		{
			dateTime: '2023-06-01',
		},
		{
			dateTime: '2023-05-01',
		},
		{
			dateTime: '2023-04-01',
		},
	])
	// 选择版本
	const setVersion = (index) => {
		chooseVersion.value = index
	}

	// 表单
	const dataForm = ref({
		value1: '111',
		value2: '1',
		value3: '1',
		value4: '1',
		value5: '1',
		value6: '1',
		value7: '1',
		value8: '1',
		value9: '1',
		value10: '1',
		value11: '1',
		value12: '1',
		value13: '1',
		value14: '1',
		value15: '1',
		value16: '1',
		value17: '1',
		value18: '1',
		value19: '1',
		value20: '1',
		value21: '1',
		value22: '1',
		value23: '1',
		value24: '1',
		value25: '1',
		value26: '1',
		value27: '1',
		value28: '1',
		value29: '1',
		value30: '1',
		value31: '1',
	})

	const halfTopDom1 = [
		{
			gridArea: `1/1/2/2`,
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '矿井产量（t/d）',
		},
		{
			gridArea: '2/1/3/2',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '1/2/2/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '矿井需要风量m3/min',
		},
		{
			gridArea: '2/2/3/3',
			isInput: true,
			formKey: 'value2',
		},
		{
			gridArea: '1/3/2/4',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '主井进风量m3 /min',
		},
		{
			gridArea: '2/3/3/4',
			isInput: true,
			formKey: 'value3',
		},
		{
			gridArea: '3/1/4/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '井下 工 作人数（人/班）',
		},
		{
			gridArea: '4/1/5/2',
			isInput: true,
			formKey: 'value4',
		},
		{
			gridArea: '3/2/4/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `矿井总进风量<br/>m3/min`,
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'value5',
		},
		{
			gridArea: '3/3/4/4',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `副井透风量<br/>m3/min`,
		},
		{
			gridArea: '4/3/5/4',
			isInput: true,
			formKey: 'value6',
		},
	]
	const halfTopDom2Left = [
		{
			gridArea: '1/1/2/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '矿井总回风量m3 /min',
		},
		{
			gridArea: '2/1/3/3',
			isInput: true,
			formKey: 'value7',
		},
		{
			gridArea: '3/1/4/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '中央风井',
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'value8',
		},
		{
			gridArea: '4/1/5/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '西翼风井',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'value9',
		},
	]
	const halfTopDom2Right = [
		{
			gridArea: '1/1/2/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '',
		},
		{
			gridArea: '1/2/2/4',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '配风情况',
		},
		{
			gridArea: '2/1/3/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '采煤',
		},
		{
			gridArea: '2/2/3/3',
			isInput: true,
			formKey: 'value9',
			bodyClass: 'table_border_bottom',
		},
		{
			gridArea: '2/3/3/4',
			bodyClass: 'table_item_body',
			isHtml: true,
			label: 'm3/min',
		},
		{
			gridArea: '3/1/4/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '掘进',
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'value10',
			bodyClass: 'table_border_bottom',
		},
		{
			gridArea: '3/3/4/4',
			bodyClass: 'table_item_body',
			isHtml: true,
			label: 'm3/min',
		},
		{
			gridArea: '4/1/5/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '碉室',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'value10',
			bodyClass: 'table_border_bottom',
		},
		{
			gridArea: '4/3/5/4',
			bodyClass: 'table_item_body',
			isHtml: true,
			label: 'm3/min',
		},
		{
			gridArea: '5/1/6/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '其他',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'value11',
			bodyClass: 'table_border_bottom',
		},
		{
			gridArea: '5/3/6/4',
			bodyClass: 'table_item_body',
			isHtml: true,
			label: 'm3/min',
		},
	]
	const halfTopDom3 = [
		{
			gridArea: '1/1/2/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '矿井有效风量率 %',
		},
		{
			gridArea: '2/1/3/2',
			isInput: true,
			formKey: 'value12',
		},
		{
			gridArea: '1/2/2/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '矿井综合阻力 Pa',
		},
		{
			gridArea: '2/2/3/3',
			isInput: true,
			formKey: 'value13',
		},
		{
			gridArea: '3/1/4/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '矿井有效风量m3/min',
		},
		{
			gridArea: '4/1/5/2',
			isInput: true,
			formKey: 'value14',
		},
		{
			gridArea: '3/2/4/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '矿井等积孔m2',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'value15',
		},
	]
	const halfTopDom4 = [
		{
			gridArea: '1/1/15/2',
			bodyClass: 'table_item_body',
			isHtml: true,
			label: `通<br/>防<br/>人<br/>员<br/>情<br/>况<br/>（人）`,
		},
		{
			gridArea: '1/2/2/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `在        册`,
		},
		{
			gridArea: '1/3/2/6',
			isInput: true,
			formKey: 'value16',
		},
		{
			gridArea: '2/2/3/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `区队管理`,
		},
		{
			gridArea: '2/3/3/6',
			isInput: true,
			formKey: 'value17',
		},
		{
			gridArea: '3/2/4/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `通风调度员`,
		},
		{
			gridArea: '3/3/4/6',
			isInput: true,
			formKey: 'value18',
		},
		{
			gridArea: '4/2/5/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `测风测尘员`,
		},
		{
			gridArea: '4/3/5/6',
			isInput: true,
			formKey: 'value19',
		},
		{
			gridArea: '5/2/6/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `监测监控`,
		},
		{
			gridArea: '5/3/6/6',
			isInput: true,
			formKey: 'value20',
		},
		{
			gridArea: '6/2/7/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `瓦检员`,
		},
		{
			gridArea: '6/3/7/6',
			isInput: true,
			formKey: 'value21',
		},
		{
			gridArea: '7/2/8/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `胶轮车司机`,
		},
		{
			gridArea: '7/3/8/6',
			isInput: true,
			formKey: 'value22',
		},
		{
			gridArea: '8/2/9/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `注氮机司机`,
		},
		{
			gridArea: '8/3/9/6',
			isInput: true,
			formKey: 'value23',
		},
		{
			gridArea: '9/2/10/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `仪器仪表维修工`,
		},
		{
			gridArea: '9/3/10/6',
			isInput: true,
			formKey: 'value24',
		},
		{
			gridArea: '10/2/11/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `束管分析工`,
		},
		{
			gridArea: '10/3/11/6',
			isInput: true,
			formKey: 'value25',
		},
		{
			gridArea: '11/2/12/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `风门维护工`,
		},
		{
			gridArea: '11/3/12/6',
			isInput: true,
			formKey: 'value26',
		},
		{
			gridArea: '12/2/13/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `水袋推护工`,
		},
		{
			gridArea: '12/3/13/6',
			isInput: true,
			formKey: 'value27',
		},
		{
			gridArea: '13/2/14/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `防尘工`,
		},
		{
			gridArea: '13/3/14/4',
			isInput: true,
			formKey: 'value28',
		},
		{
			gridArea: '13/4/14/5',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `注浆工`,
		},
		{
			gridArea: '13/5/14/6',
			isInput: true,
			formKey: 'value29',
		},
		{
			gridArea: '14/2/15/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `实习生`,
		},
		{
			gridArea: '14/3/15/4',
			isInput: true,
			formKey: 'value30',
		},
		{
			gridArea: '14/4/15/5',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `其    他`,
		},
		{
			gridArea: '14/5/15/6',
			isInput: true,
			formKey: 'value31',
		},
	]
	const halfTopDom5 = [
		{
			gridArea: '1/1/2/2',
			bodyClass: 'table_title_text_left',
			isHtml: true,
			label: `采煤工作面数`,
		},
		{
			gridArea: '1/2/2/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '2/1/3/2',
			bodyClass: 'table_title_text_left',
			isHtml: true,
			label: `备用工作面数`,
		},
		{
			gridArea: '2/2/3/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/1/4/2',
			bodyClass: 'table_title_text_left',
			isHtml: true,
			label: `回撤工作面`,
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/1/5/2',
			bodyClass: 'table_title_text_left',
			isHtml: true,
			label: `下行风面`,
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/1/6/2',
			bodyClass: 'table_title_text_left',
			isHtml: true,
			label: `风量不足`,
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '6/1/7/2',
			bodyClass: 'table_title_text_left',
			isHtml: true,
			label: `温度超限`,
		},
		{
			gridArea: '6/2/7/3',
			isInput: true,
			formKey: 'value1',
		},
	]
	const halfTopDom6 = [
		{
			gridArea: '1/1/2/2',
			bodyClass: 'table_title_text_left',
			isHtml: true,
			label: `掘进工作面数`,
		},
		{
			gridArea: '1/2/2/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '2/1/3/2',
			bodyClass: 'table_title_text_left',
			isHtml: true,
			label: `其中,三专两闭锁`,
		},
		{
			gridArea: '2/2/3/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/1/4/2',
			bodyClass: 'table_title_text_left',
			isHtml: true,
			label: `采掘侯电分开 `,
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/1/5/2',
			bodyClass: 'table_title_text_left',
			isHtml: true,
			label: `风量不足`,
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/1/6/2',
			bodyClass: 'table_title_text_left',
			isHtml: true,
			label: `温度超限`,
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '6/1/7/2',
			bodyClass: 'table_title_text_left',
			isHtml: true,
			label: `串联通风`,
		},
		{
			gridArea: '6/2/7/3',
			isInput: true,
			formKey: 'value1',
		},
	]
	const halfTopDom7 = [
		{
			gridArea: '1/1/2/8',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `局扇（台）`,
		},
		{
			gridArea: '2/1/3/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '型号',
		},
		{
			gridArea: '2/2/3/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '2x11kw',
		},
		{
			gridArea: '2/3/3/4',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '2x15kw',
		},
		{
			gridArea: '2/4/3/5',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '2x22kw',
		},
		{
			gridArea: '2/5/3/6',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '2x30kw',
		},
		{
			gridArea: '2/6/3/7',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '2x45kw',
		},
		{
			gridArea: '2/7/3/8',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '',
		},
		{
			gridArea: '3/1/4/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '在册',
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/3/4/4',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/4/4/5',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/5/4/6',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/6/4/7',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/7/4/8',
			bodyClass: 'table_item_body',
			isHtml: true,
			label: '',
		},
		{
			gridArea: '4/1/5/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '运行',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/3/5/4',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/4/5/5',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/5/5/6',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/6/5/7',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/7/5/8',
			bodyClass: 'table_item_body',
			isHtml: true,
			label: '',
		},
		{
			gridArea: '5/1/6/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '待修',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/3/6/4',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/4/6/5',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/5/6/6',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/6/6/7',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/7/6/8',
			bodyClass: 'table_item_body',
			isHtml: true,
			label: '',
		},
		{
			gridArea: '6/1/7/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '备用',
		},
		{
			gridArea: '6/2/7/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '6/3/7/4',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '6/4/7/5',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '6/5/7/6',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '6/6/7/7',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '6/7/7/8',
			bodyClass: 'table_item_body',
			isHtml: true,
			label: '',
		},
	]
	const halfTopDom8 = [
		{
			gridArea: '1/1/2/6',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '风 筒（m）',
		},
		{
			gridArea: '2/1/3/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '规格',
		},
		{
			gridArea: '2/2/3/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: 'Φ600mm',
		},
		{
			gridArea: '2/3/3/4',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: 'Φ800mm',
		},
		{
			gridArea: '2/4/3/5',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: 'Φ1000mm',
		},
		{
			gridArea: '2/5/3/6',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: 'Φ1600mm',
		},
		{
			gridArea: '3/1/4/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '在册',
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/3/4/4',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/4/4/5',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/5/4/6',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/1/5/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '使用',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/3/5/4',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/4/5/5',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/5/5/6',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/1/6/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '备用',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/3/6/4',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/4/6/5',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/5/6/6',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '6/1/7/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '厂家',
		},
		{
			gridArea: '6/2/7/6',
			isInput: true,
			formKey: 'value1',
		},
	]

	const halfBottomDom1 = [
		{
			gridArea: '1/1/2/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '光学瓦斯检定器(台)',
		},
		{
			gridArea: '2/1/3/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '在册',
		},
		{
			gridArea: '2/2/3/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/1/4/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '使用',
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/1/5/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '待修',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/1/6/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '备用',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'value1',
		},
	]
	const halfBottomDom2 = [
		{
			gridArea: '1/1/2/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '安全监控系统',
		},
		{
			gridArea: '2/1/3/2',
			bodyClass: 'table_title_text_left',
			isHtml: true,
			label: '型号',
		},
		{
			gridArea: '2/2/3/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/1/4/2',
			bodyClass: 'table_title_text_left',
			isHtml: true,
			label: '传感器在册',
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/1/5/2',
			bodyClass: 'table_title_text_left',
			isHtml: true,
			label: '使用',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/1/6/2',
			bodyClass: 'table_title_text_left',
			isHtml: true,
			label: '使用率',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'value1',
		},
	]
	const halfBottomDom3 = [
		{
			gridArea: '1/1/2/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '压缩氧自救器(台)',
		},
		{
			gridArea: '2/1/3/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '在册',
		},
		{
			gridArea: '2/2/3/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/1/4/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '使用',
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/1/5/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '待修',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/1/6/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '备用',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'value1',
		},
	]
	const halfBottomDom4 = [
		{
			gridArea: '1/1/2/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '便携甲烷氛警仅(台)',
		},
		{
			gridArea: '2/1/3/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '在册',
		},
		{
			gridArea: '2/2/3/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/1/4/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '使用',
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/1/5/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '待修',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/1/6/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '备用',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'value1',
		},
	]
	const halfBottomDom5 = [
		{
			gridArea: '1/1/2/4',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '排放瓦斯',
		},
		{
			gridArea: '2/1/3/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '地 点',
		},
		{
			gridArea: '2/2/3/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '浓度%',
		},
		{
			gridArea: '2/3/3/4',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '体积m3',
		},
		{
			gridArea: '3/1/4/2',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/3/4/4',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/1/5/2',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/3/5/4',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/1/6/2',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/3/6/4',
			isInput: true,
			formKey: 'value1',
		},
	]
	const halfBottomDom6 = [
		{
			gridArea: '1/1/2/4',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '瓦斯超限',
		},
		{
			gridArea: '2/1/3/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '地 点',
		},
		{
			gridArea: '2/2/3/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '次数',
		},
		{
			gridArea: '2/3/3/4',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '浓度%',
		},
		{
			gridArea: '3/1/4/2',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/3/4/4',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/1/5/2',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/3/5/4',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/1/6/2',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/3/6/4',
			isInput: true,
			formKey: 'value1',
		},
	]
	const halfBottomDom7 = [
		{
			gridArea: '1/1/2/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '风速超限',
		},
		{
			gridArea: '2/1/3/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '地 点',
		},
		{
			gridArea: '2/2/3/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '风速m/s',
		},
		{
			gridArea: '3/1/4/2',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/1/5/2',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/1/6/2',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'value1',
		},
	]
	const halfBottomDom8 = [
		{
			gridArea: '1/1/3/4',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '风井情况',
		},
		{
			gridArea: '3/1/7/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '风井名称',
		},
		{
			gridArea: '3/2/7/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `井上、下<br/>标高（m）`,
		},
		{
			gridArea: '3/3/7/4',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '断面积(m2)',
		},
		{
			gridArea: '7/1/9/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '中央风井',
		},
		{
			gridArea: '9/1/11/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '西翼风井',
		},

		{
			gridArea: '7/2/8/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '8/2/9/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '9/2/10/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '10/2/11/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '7/3/9/4',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '9/3/11/4',
			isInput: true,
			formKey: 'value1',
		},
	]
	const halfBottomDom9 = [
		{
			gridArea: '1/1/4/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: `主&emsp;要<br/>通风机<br/>编&emsp;号`,
		},
		{
			gridArea: '1/2/4/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '风机型号',
		},
		{
			gridArea: '4/1/5/2',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'value2',
		},
		{
			gridArea: '5/1/6/2',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'value1',
		},
	]
	const halfBottomDom10 = [
		{
			gridArea: '1/1/2/10',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '主通风机参数',
		},
		{
			gridArea: '2/1/4/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '转 速 r/min',
		},
		{
			gridArea: '2/2/4/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '风叶角度',
		},
		{
			gridArea: '2/3/4/4',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '风量 m3/min',
		},
		{
			gridArea: '2/4/4/5',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '负压pa',
		},
		{
			gridArea: '2/5/4/6',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '地面漏风m3/min',
		},
		{
			gridArea: '2/6/4/7',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '电机铭牌功率 (kw)',
		},
		{
			gridArea: '2/7/4/8',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '电机输出功率(kw)',
		},
		{
			gridArea: '2/8/4/9',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '轴功率(kw)',
		},
		{
			gridArea: '2/9/4/10',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '效率(%)',
		},
		{
			gridArea: '4/1/5/2',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/3/5/4',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/4/5/5',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/5/5/6',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/6/5/7',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/7/5/8',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/8/5/9',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/9/5/10',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/1/6/2',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/3/6/4',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/4/6/5',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/5/6/6',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/6/6/7',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/7/6/8',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/8/6/9',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/9/6/10',
			isInput: true,
			formKey: 'value1',
		},
	]
	const halfBottomDom11 = [
		{
			gridArea: '1/1/2/5',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '瓦斯积存',
		},
		{
			gridArea: '2/1/3/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '地点',
		},
		{
			gridArea: '2/2/3/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '次数',
		},
		{
			gridArea: '2/3/3/4',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '体积',
		},
		{
			gridArea: '2/4/3/5',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '最高浓度',
		},
		{
			gridArea: '3/1/4/2',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/3/4/4',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/4/4/5',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/1/5/2',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/3/5/4',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/4/5/5',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/1/6/2',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/3/6/4',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/4/6/5',
			isInput: true,
			formKey: 'value1',
		},
	]
	const halfBottomDom12 = [
		{
			gridArea: '1/1/2/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '盲 巷',
		},
		{
			gridArea: '2/1/3/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '发生地点',
		},
		{
			gridArea: '2/2/3/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '次数',
		},
		{
			gridArea: '3/1/4/2',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/1/5/2',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/1/6/2',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'value1',
		},
	]
	const halfBottomDom13 = [
		{
			gridArea: '1/1/2/7',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '永久设施(道) ',
		},
		{
			gridArea: '2/1/3/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '风门',
		},
		{
			gridArea: '2/2/3/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '2/3/3/4',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '密闭',
		},
		{
			gridArea: '2/4/3/5',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '2/5/3/6',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '风桥',
		},
		{
			gridArea: '2/6/3/7',
			isInput: true,
			formKey: 'value1',
		},
	]
	const halfBottomDom14 = [
		{
			gridArea: '1/1/2/9',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '临时设施(道)',
		},
		{
			gridArea: '2/1/3/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '风门',
		},
		{
			gridArea: '2/2/3/3',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '2/3/3/4',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '密闭',
		},
		{
			gridArea: '2/4/3/6',
			isInput: true,
			formKey: 'value1',
		},
		{
			gridArea: '2/6/3/7',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '风桥',
		},
		{
			gridArea: '2/7/3/9',
			isInput: true,
			formKey: 'value1',
		},
	]
	const halfBottomDom15 = [
		{
			gridArea: '1/1/2/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '其 它',
		},
		{
			gridArea: '2/1/3/2',
			isInput: true,
			formKey: 'value1',
		},
	]
	return {
		chooseVersion,
		versionList,
		setVersion,
		dataForm,
		halfTopDom1,
		halfTopDom2Left,
		halfTopDom2Right,
		halfTopDom3,
		halfTopDom4,
		halfTopDom5,
		halfTopDom6,
		halfTopDom7,
		halfTopDom8,
		halfBottomDom1,
		halfBottomDom2,
		halfBottomDom3,
		halfBottomDom4,
		halfBottomDom5,
		halfBottomDom6,
		halfBottomDom7,
		halfBottomDom8,
		halfBottomDom9,
		halfBottomDom10,
		halfBottomDom11,
		halfBottomDom12,
		halfBottomDom13,
		halfBottomDom14,
		halfBottomDom15,
	}
}
