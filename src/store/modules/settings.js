import defaultSettings from '@/settings'
import { useDynamicTitle } from '@/utils/dynamicTitle'

const { dynamicTitle } = defaultSettings

const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || ''

const useSettingsStore = defineStore('settings', {
	state: () => ({
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
		setTitle(title) {
			this.title = title
			useDynamicTitle()
		},
		// 修改二级菜单显示状态
		updateNavigate(val) {
			this.showNavigate = val
		},
	},
})

export default useSettingsStore
