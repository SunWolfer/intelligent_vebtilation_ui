import {
	addReportBase,
	delReportBase,
	listBasicReport,
	reportInfo,
	updateReportBase,
} from '@/api/api/basicReport'
import { parseTime } from '@/utils/ruoyi'
import { useCommitForm } from '@/hooks/useForm'
import { download } from '@/utils/request'

export const basicReport = () => {
	const chooseVersion = ref(0)

	// 版本列表
	const versionList = ref([])

	// 查询版本信息
	const getList = async () => {
		const res = await listBasicReport()
		if (!res) return
		versionList.value = res.data
		chooseVersion.value = 0
	}

	// 选择版本
	const setVersion = (index) => {
		chooseVersion.value = index
		addStatus.value = false
		getFormInfo()
	}

	// 表单
	const dataForm = ref({})

	// 查询表单信息
	const getFormInfo = async () => {
		const res = await reportInfo({
			reportTime: versionList.value[chooseVersion.value].reportTime,
		})
		if (!res) return
		dataForm.value = res.data
	}

	const initData = async () => {
		resetForm?.()
		await getList?.()
		await getFormInfo?.()
	}

	// 判断是否新增
	const addStatus = ref(false)
	// 新增按钮
	const addHandle = () => {
		chooseVersion.value = -1
		addStatus.value = true
		resetForm?.()
	}
	// 新增表单
	const addForm = async () => {
		await useCommitForm(addReportBase, {
			queryParams: dataForm.value,
			afterReadyDataFun: () => {
				initData()
			},
		})
	}
	// 修改表单
	const updateForm = async () => {
		await useCommitForm(updateReportBase, {
			queryParams: dataForm.value,
			afterReadyDataFun: () => {
				initData()
			},
		})
	}

	// 保存按钮
	const saveHandle = async () => {
		if (addStatus.value) {
			await addForm()
		} else {
			await updateForm()
		}
	}
	// 删除表单
	const deleteHandle = async () => {
		await useCommitForm(delReportBase, {
			queryParams: dataForm.value.reportTime,
			afterReadyDataFun: () => {
				initData()
			},
		})
	}
	// 导出表单
	const exportHandle = async () => {
		await download(
			'/api/report/base/export',
			{ reportTime: dataForm.value.reportTime },
			`通风基础报表${new Date().getTime()}.xlsx`,
		)
	}

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
			formKey: 'kjcl',
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
			formKey: 'kjxfl',
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
			formKey: 'zjzjfl',
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
			formKey: 'jxgzrs',
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
			formKey: 'kjzjfl',
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
			formKey: 'fjtfl',
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
			formKey: 'kjzhfl',
		},
		{
			gridArea: '3/1/4/2',
			bodyClass: 'table_title_text',
			isInput: true,
			formKey: 'fjmc1',
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'fjfl1',
		},
		{
			gridArea: '4/1/5/2',
			bodyClass: 'table_title_text',
			isInput: true,
			formKey: 'fjmc2',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'fjfl2',
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
			formKey: 'cmpfqk',
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
			formKey: 'jjpfqk',
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
			formKey: 'dspfqk',
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
			formKey: 'qtpfqk',
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
			formKey: 'kjyxfll',
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
			formKey: 'kjzhzl',
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
			formKey: 'kjyxfl',
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
			formKey: 'kjzjk',
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
			formKey: 'tfryzc',
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
			formKey: 'tfryqdgl',
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
			formKey: 'tfrytfddy',
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
			formKey: 'tfrycfccy',
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
			formKey: 'tfryjcjk',
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
			formKey: 'tfrywjy',
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
			formKey: 'tfryjlcsj',
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
			formKey: 'tfryzdjsj',
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
			formKey: 'tfryyqybxwg',
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
			formKey: 'tfrysgfxg',
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
			formKey: 'tfryfmwhg',
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
			formKey: 'tfrysdthg',
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
			formKey: 'tfryfcg',
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
			formKey: 'tfryzjg',
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
			formKey: 'tfrysxs',
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
			formKey: 'tfryqt',
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
			formKey: 'cmgzms',
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
			formKey: 'bygzms',
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
			formKey: 'hcgzms',
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
			formKey: 'xxfm',
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
			formKey: 'gzmflbz',
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
			formKey: 'gzmwdcx',
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
			formKey: 'jjgzms',
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
			formKey: 'szlbs',
		},
		{
			gridArea: '3/1/4/2',
			bodyClass: 'table_title_text_left',
			isHtml: true,
			label: `采掘供电分开 `,
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'cjgdfk',
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
			formKey: 'jjmflbz',
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
			formKey: 'jjmwdcx',
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
			formKey: 'jjmcltf',
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
			isInput: true,
			formKey: 'jsxh1',
		},
		{
			gridArea: '2/3/3/4',
			bodyClass: 'table_title_text',
			isInput: true,
			formKey: 'jsxh2',
		},
		{
			gridArea: '2/4/3/5',
			bodyClass: 'table_title_text',
			isInput: true,
			formKey: 'jsxh3',
		},
		{
			gridArea: '2/5/3/6',
			bodyClass: 'table_title_text',
			isInput: true,
			formKey: 'jsxh4',
		},
		{
			gridArea: '2/6/3/7',
			bodyClass: 'table_title_text',
			isInput: true,
			formKey: 'jsxh5',
		},
		{
			gridArea: '2/7/3/8',
			bodyClass: 'table_title_text',
			isInput: true,
			formKey: 'jsxh6',
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
			formKey: 'jszc1',
		},
		{
			gridArea: '3/3/4/4',
			isInput: true,
			formKey: 'jszc2',
		},
		{
			gridArea: '3/4/4/5',
			isInput: true,
			formKey: 'jszc3',
		},
		{
			gridArea: '3/5/4/6',
			isInput: true,
			formKey: 'jszc4',
		},
		{
			gridArea: '3/6/4/7',
			isInput: true,
			formKey: 'jszc5',
		},
		{
			gridArea: '3/7/4/8',
			isInput: true,
			label: 'jszc6',
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
			formKey: 'jsyx1',
		},
		{
			gridArea: '4/3/5/4',
			isInput: true,
			formKey: 'jsyx2',
		},
		{
			gridArea: '4/4/5/5',
			isInput: true,
			formKey: 'jsyx3',
		},
		{
			gridArea: '4/5/5/6',
			isInput: true,
			formKey: 'jsyx4',
		},
		{
			gridArea: '4/6/5/7',
			isInput: true,
			formKey: 'jsyx5',
		},
		{
			gridArea: '4/7/5/8',
			isInput: true,
			label: 'jsyx6',
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
			formKey: 'jsdx1',
		},
		{
			gridArea: '5/3/6/4',
			isInput: true,
			formKey: 'jsdx2',
		},
		{
			gridArea: '5/4/6/5',
			isInput: true,
			formKey: 'jsdx3',
		},
		{
			gridArea: '5/5/6/6',
			isInput: true,
			formKey: 'jsdx4',
		},
		{
			gridArea: '5/6/6/7',
			isInput: true,
			formKey: 'jsdx5',
		},
		{
			gridArea: '5/7/6/8',
			isInput: true,
			label: 'jsdx6',
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
			formKey: 'jsby1',
		},
		{
			gridArea: '6/3/7/4',
			isInput: true,
			formKey: 'jsby2',
		},
		{
			gridArea: '6/4/7/5',
			isInput: true,
			formKey: 'jsby3',
		},
		{
			gridArea: '6/5/7/6',
			isInput: true,
			formKey: 'jsby4',
		},
		{
			gridArea: '6/6/7/7',
			isInput: true,
			formKey: 'jsby5',
		},
		{
			gridArea: '6/7/7/8',
			isInput: true,
			label: 'jsby6',
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
			isInput: true,
			formKey: 'ftgg1',
		},
		{
			gridArea: '2/3/3/4',
			bodyClass: 'table_title_text',
			isInput: true,
			formKey: 'ftgg2',
		},
		{
			gridArea: '2/4/3/5',
			bodyClass: 'table_title_text',
			isInput: true,
			formKey: 'ftgg3',
		},
		{
			gridArea: '2/5/3/6',
			bodyClass: 'table_title_text',
			isInput: true,
			formKey: 'ftgg4',
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
			formKey: 'ftzc1',
		},
		{
			gridArea: '3/3/4/4',
			isInput: true,
			formKey: 'ftzc2',
		},
		{
			gridArea: '3/4/4/5',
			isInput: true,
			formKey: 'ftzc3',
		},
		{
			gridArea: '3/5/4/6',
			isInput: true,
			formKey: 'ftzc4',
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
			formKey: 'ftsy1',
		},
		{
			gridArea: '4/3/5/4',
			isInput: true,
			formKey: 'ftsy2',
		},
		{
			gridArea: '4/4/5/5',
			isInput: true,
			formKey: 'ftsy3',
		},
		{
			gridArea: '4/5/5/6',
			isInput: true,
			formKey: 'ftsy4',
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
			formKey: 'ftby1',
		},
		{
			gridArea: '5/3/6/4',
			isInput: true,
			formKey: 'ftby2',
		},
		{
			gridArea: '5/4/6/5',
			isInput: true,
			formKey: 'ftby3',
		},
		{
			gridArea: '5/5/6/6',
			isInput: true,
			formKey: 'ftby4',
		},
		{
			gridArea: '6/1/7/2',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '厂家',
		},
		{
			gridArea: '6/2/7/3',
			isInput: true,
			formKey: 'ftcj1',
		},
		{
			gridArea: '6/3/7/4',
			isInput: true,
			formKey: 'ftcj2',
		},
		{
			gridArea: '6/4/7/5',
			isInput: true,
			formKey: 'ftcj3',
		},
		{
			gridArea: '6/5/7/6',
			isInput: true,
			formKey: 'ftcj4',
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
			formKey: 'gxwszc',
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
			formKey: 'gxwssy',
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
			formKey: 'gxwsdx',
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
			formKey: 'gxwsby',
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
			formKey: 'ajxtxh',
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
			formKey: 'ajcgqzc',
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
			formKey: 'ajcgqsy',
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
			formKey: 'ajcgqsyl',
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
			formKey: 'ysyzc',
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
			formKey: 'ysysy',
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
			formKey: 'ysydx',
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
			formKey: 'ysyby',
		},
	]
	const halfBottomDom4 = [
		{
			gridArea: '1/1/2/3',
			bodyClass: 'table_title_text',
			isHtml: true,
			label: '便携甲烷报警仪(台)',
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
			formKey: 'jwbjyzc',
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
			formKey: 'jwbjysy',
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
			formKey: 'jwbjydx',
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
			formKey: 'jwbjyby',
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
			formKey: 'wspfdd1',
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'wspfnd1',
		},
		{
			gridArea: '3/3/4/4',
			isInput: true,
			formKey: 'wspftj1',
		},
		{
			gridArea: '4/1/5/2',
			isInput: true,
			formKey: 'wspfdd2',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'wspfnd2',
		},
		{
			gridArea: '4/3/5/4',
			isInput: true,
			formKey: 'wspftj2',
		},
		{
			gridArea: '5/1/6/2',
			isInput: true,
			formKey: 'wspfdd3',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'wspfnd3',
		},
		{
			gridArea: '5/3/6/4',
			isInput: true,
			formKey: 'wspftj3',
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
			formKey: 'wscxdd1',
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'wscxcs1',
		},
		{
			gridArea: '3/3/4/4',
			isInput: true,
			formKey: 'wscxnd1',
		},
		{
			gridArea: '4/1/5/2',
			isInput: true,
			formKey: 'wscxdd2',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'wscxcs2',
		},
		{
			gridArea: '4/3/5/4',
			isInput: true,
			formKey: 'wscxnd2',
		},
		{
			gridArea: '5/1/6/2',
			isInput: true,
			formKey: 'wscxdd3',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'wscxcs3',
		},
		{
			gridArea: '5/3/6/4',
			isInput: true,
			formKey: 'wscxnd3',
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
			formKey: 'fscxdd1',
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'fscxfs1',
		},
		{
			gridArea: '4/1/5/2',
			isInput: true,
			formKey: 'fscxdd2',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'fscxfs2',
		},
		{
			gridArea: '5/1/6/2',
			isInput: true,
			formKey: 'fscxdd3',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'fscxfs3',
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
			isInput: true,
			formKey: 'fjmc1',
		},
		{
			gridArea: '9/1/11/2',
			bodyClass: 'table_title_text',
			isInput: true,
			formKey: 'fjmc2',
		},
		{
			gridArea: '7/2/8/3',
			isInput: true,
			formKey: 'fjbgs1',
		},
		{
			gridArea: '8/2/9/3',
			isInput: true,
			formKey: 'fjbgx1',
		},
		{
			gridArea: '9/2/10/3',
			isInput: true,
			formKey: 'fjbgs2',
		},
		{
			gridArea: '10/2/11/3',
			isInput: true,
			formKey: 'fjbgx2',
		},
		{
			gridArea: '7/3/9/4',
			isInput: true,
			formKey: 'fjdmj1',
		},
		{
			gridArea: '9/3/11/4',
			isInput: true,
			formKey: 'fjdmj2',
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
			formKey: 'ztfjbh1',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'ztfjxh1',
		},
		{
			gridArea: '5/1/6/2',
			isInput: true,
			formKey: 'ztfjbh2',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'ztfjxh2',
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
			formKey: 'ztfjzs1',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'ztfjfyjd1',
		},
		{
			gridArea: '4/3/5/4',
			isInput: true,
			formKey: 'ztfjfl1',
		},
		{
			gridArea: '4/4/5/5',
			isInput: true,
			formKey: 'ztfjfy1',
		},
		{
			gridArea: '4/5/5/6',
			isInput: true,
			formKey: 'ztfjdmlf1',
		},
		{
			gridArea: '4/6/5/7',
			isInput: true,
			formKey: 'ztfjmpgl1',
		},
		{
			gridArea: '4/7/5/8',
			isInput: true,
			formKey: 'ztfjscgl1',
		},
		{
			gridArea: '4/8/5/9',
			isInput: true,
			formKey: 'ztfjzgl1',
		},
		{
			gridArea: '4/9/5/10',
			isInput: true,
			formKey: 'ztfjxl1',
		},
		{
			gridArea: '5/1/6/2',
			isInput: true,
			formKey: 'ztfjzs2',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'ztfjfyjd2',
		},
		{
			gridArea: '5/3/6/4',
			isInput: true,
			formKey: 'ztfjfl2',
		},
		{
			gridArea: '5/4/6/5',
			isInput: true,
			formKey: 'ztfjfy2',
		},
		{
			gridArea: '5/5/6/6',
			isInput: true,
			formKey: 'ztfjdmlf2',
		},
		{
			gridArea: '5/6/6/7',
			isInput: true,
			formKey: 'ztfjmpgl2',
		},
		{
			gridArea: '5/7/6/8',
			isInput: true,
			formKey: 'ztfjscgl2',
		},
		{
			gridArea: '5/8/6/9',
			isInput: true,
			formKey: 'ztfjzgl2',
		},
		{
			gridArea: '5/9/6/10',
			isInput: true,
			formKey: 'ztfjxl2',
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
			formKey: 'wsjcdd1',
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'wsjccs1',
		},
		{
			gridArea: '3/3/4/4',
			isInput: true,
			formKey: 'wsjctj1',
		},
		{
			gridArea: '3/4/4/5',
			isInput: true,
			formKey: 'wsjcnd1',
		},
		{
			gridArea: '4/1/5/2',
			isInput: true,
			formKey: 'wsjcdd2',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'wsjccs2',
		},
		{
			gridArea: '4/3/5/4',
			isInput: true,
			formKey: 'wsjctj2',
		},
		{
			gridArea: '4/4/5/5',
			isInput: true,
			formKey: 'wsjcnd2',
		},
		{
			gridArea: '5/1/6/2',
			isInput: true,
			formKey: 'wsjcdd3',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'wsjccs3',
		},
		{
			gridArea: '5/3/6/4',
			isInput: true,
			formKey: 'wsjctj3',
		},
		{
			gridArea: '5/4/6/5',
			isInput: true,
			formKey: 'wsjcnd3',
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
			formKey: 'mhdd1',
		},
		{
			gridArea: '3/2/4/3',
			isInput: true,
			formKey: 'mhcs1',
		},
		{
			gridArea: '4/1/5/2',
			isInput: true,
			formKey: 'mhdd2',
		},
		{
			gridArea: '4/2/5/3',
			isInput: true,
			formKey: 'mhcs2',
		},
		{
			gridArea: '5/1/6/2',
			isInput: true,
			formKey: 'mhdd3',
		},
		{
			gridArea: '5/2/6/3',
			isInput: true,
			formKey: 'mhcs3',
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
			formKey: 'yjssfm',
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
			formKey: 'yjssmb',
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
			formKey: 'yjssfq',
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
			formKey: 'lsssfm',
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
			formKey: 'lsssmb',
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
			formKey: 'lsssfq',
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
			formKey: 'qt',
		},
	]

	// 重置表单
	const resetForm = () => {
		dataForm.value = {
			reportTime: parseTime(new Date(), '{y}-{m}-{d}'),
			kjcl: null,
			jxgzrs: null,
			kjxfl: null,
			kjzjfl: null,
			zjzjfl: null,
			fjtfl: null,
			kjzhfl: null,
			fjmc1: null,
			fjfl1: null,
			fjbgs1: null,
			fjbgx1: null,
			fjdmj1: null,
			fjmc2: null,
			fjfl2: null,
			fjbgs2: null,
			fjbgx2: null,
			fjdmj2: null,
			cmpfqk: null,
			jjpfqk: null,
			dspfqk: null,
			qtpfqk: null,
			kjyxfll: null,
			kjyxfl: null,
			kjzhzl: null,
			kjzjk: null,
			tfryzc: null,
			tfryqdgl: null,
			tfrytfddy: null,
			tfrycfccy: null,
			tfryjcjk: null,
			tfrywjy: null,
			tfryjlcsj: null,
			tfryzdjsj: null,
			tfryyqybxwg: null,
			tfrysgfxg: null,
			tfryfmwhg: null,
			tfrysdthg: null,
			tfryfcg: null,
			tfryzjg: null,
			tfrysxs: null,
			tfryqt: null,
			cmgzms: null,
			bygzms: null,
			hcgzms: null,
			xxfm: null,
			gzmflbz: null,
			gzmwdcx: null,
			jjgzms: null,
			szlbs: null,
			cjgdfk: null,
			jjmflbz: null,
			jjmwdcx: null,
			jjmcltf: null,
			jsxh1: null,
			jszc1: null,
			jsyx1: null,
			jsdx1: null,
			jsby1: null,
			jsxh2: null,
			jszc2: null,
			jsyx2: null,
			jsdx2: null,
			jsby2: null,
			jsxh3: null,
			jszc3: null,
			jsyx3: null,
			jsdx3: null,
			jsby3: null,
			jsxh4: null,
			jszc4: null,
			jsyx4: null,
			jsdx4: null,
			jsby4: null,
			jsxh5: null,
			jszc5: null,
			jsyx5: null,
			jsdx5: null,
			jsby5: null,
			jsxh6: null,
			jszc6: null,
			jsyx6: null,
			jsdx6: null,
			jsby6: null,
			ftgg1: null,
			ftzc1: null,
			ftsy1: null,
			ftby1: null,
			ftcj1: null,
			ftgg2: null,
			ftzc2: null,
			ftsy2: null,
			ftby2: null,
			ftcj2: null,
			ftgg3: null,
			ftzc3: null,
			ftsy3: null,
			ftby3: null,
			ftcj3: null,
			ftgg4: null,
			ftzc4: null,
			ftsy4: null,
			ftby4: null,
			ftcj4: null,
			gxwszc: null,
			gxwssy: null,
			gxwsdx: null,
			gxwsby: null,
			ajxtxh: null,
			ajcgqzc: null,
			ajcgqsy: null,
			ajcgqsyl: null,
			ysyzc: null,
			ysysy: null,
			ysydx: null,
			ysyby: null,
			jwbjyzc: null,
			jwbjysy: null,
			jwbjydx: null,
			jwbjyby: null,
			wspfdd1: null,
			wspfnd1: null,
			wspftj1: null,
			wspfdd2: null,
			wspfnd2: null,
			wspftj2: null,
			wspfdd3: null,
			wspfnd3: null,
			wspftj3: null,
			wscxdd1: null,
			wscxcs1: null,
			wscxnd1: null,
			wscxdd2: null,
			wscxcs2: null,
			wscxnd2: null,
			wscxdd3: null,
			wscxcs3: null,
			wscxnd3: null,
			fscxdd1: null,
			fscxfs1: null,
			fscxdd2: null,
			fscxfs2: null,
			fscxdd3: null,
			fscxfs3: null,
			wsjcdd1: null,
			wsjccs1: null,
			wsjctj1: null,
			wsjcnd1: null,
			wsjcdd2: null,
			wsjccs2: null,
			wsjctj2: null,
			wsjcnd2: null,
			wsjcdd3: null,
			wsjccs3: null,
			wsjctj3: null,
			wsjcnd3: null,
			mhdd1: null,
			mhcs1: null,
			mhdd2: null,
			mhcs2: null,
			mhdd3: null,
			mhcs3: null,
			ztfjbh1: null,
			ztfjxh1: null,
			ztfjzs1: null,
			ztfjfyjd1: null,
			ztfjfl1: null,
			ztfjfy1: null,
			ztfjdmlf1: null,
			ztfjmpgl1: null,
			ztfjscgl1: null,
			ztfjzgl1: null,
			ztfjxl1: null,
			ztfjbh2: null,
			ztfjxh2: null,
			ztfjzs2: null,
			ztfjfyjd2: null,
			ztfjfl2: null,
			ztfjfy2: null,
			ztfjdmlf2: null,
			ztfjmpgl2: null,
			ztfjscgl2: null,
			ztfjzgl2: null,
			ztfjxl2: null,
			yjssfm: null,
			yjssmb: null,
			yjssfq: null,
			lsssfm: null,
			lsssmb: null,
			lsssfq: null,
			qt: null,
		}
	}

	return {
		initData,
		addStatus,
		getList,
		chooseVersion,
		versionList,
		setVersion,
		dataForm,
		resetForm,
		getFormInfo,
		saveHandle,
		deleteHandle,
		addHandle,
		exportHandle,
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
