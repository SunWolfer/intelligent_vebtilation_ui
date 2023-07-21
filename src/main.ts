import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 中文语言
import 'element-plus/dist/index.css'

import '@/assets/styles/index.scss' // global css
import 'animate.css'

import App from './App.vue'
import store from './store'
import router from './router/index'
import directive from './directive/index' // directive

import '@/assets/styles/element-ui.scss'
// 注册指令
import plugins from '@/plugins/index' // plugins

// svg图标
import 'virtual:svg-icons-register'
import elementIcons from '@/components/SvgIcon/svgicon'

import './permission' // permission control

import {
	parseTime,
	addDateRange,
	handleTree,
	selectDictLabel,
	selectDictLabels,
	oldDownload,
} from '@/utils/ruoyi'

const app = createApp(App)

app.config.globalProperties.global = 'ws://127.0.0.1:8080'
// 全局方法挂载
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.selectDictLabels = selectDictLabels
app.config.globalProperties.oldDownload = oldDownload

app.use(router)
app.use(store)
app.use(plugins)
app.use(elementIcons)

directive(app)

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
	locale: zhCn,
})

app.mount('#app')
