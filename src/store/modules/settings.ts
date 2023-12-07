import defaultSettings from '@/settings'
import { useDynamicTitle } from '@/utils/dynamicTitle'

const { dynamicTitle } = defaultSettings
const localData = localStorage.getItem('layout-setting')
const storageSetting = localData ? JSON.parse(localData) : ''

export interface SettingsState {
	title: string
	theme: string
	dynamicTitle: string
	defaultRouteNum: number
	showNavigate: boolean
}

const useSettingsStore = defineStore('settings', {
	state: (): SettingsState => ({
		title: '',
		theme: storageSetting.theme || '#409EFF',
		dynamicTitle:
			storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle,
		// 一级菜单显示个数
		defaultRouteNum: 8,
		showNavigate: false, // 显示二级菜单
	}),
	actions: {
		// 设置网页标题
		setTitle(title: string) {
			this.title = title
			useDynamicTitle()
		},
		// 修改二级菜单显示状态
		updateNavigate(val: boolean) {
			this.showNavigate = val
		},
	},
})

export default useSettingsStore
