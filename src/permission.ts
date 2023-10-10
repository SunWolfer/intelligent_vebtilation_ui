import usePermissionStore from '@/store/modules/permission'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'
import { getToken } from '@/utils/auth'
import { isReLogin } from '@/utils/request'
import { isHttp } from '@/utils/validate'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router/index'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/bind', '/noLoadingLogin']

router.beforeEach((to: any, from, next) => {
	NProgress.start()
	if (getToken()) {
		to.meta.title && useSettingsStore().setTitle(to.meta.title)
		/* has token*/
		if (to.path === '/login') {
			next({ path: '/' })
			NProgress.done()
		} else {
			if (useUserStore().roles.length === 0) {
				isReLogin.show = true
				// 判断当前用户是否已拉取完user_info信息
				useUserStore()
					.getInfo()
					.then(() => {
						isReLogin.show = false
						usePermissionStore()
							.generateRoutes()
							.then((accessRoutes: any) => {
								// 根据roles权限生成可访问的路由表
								accessRoutes.forEach((route: any) => {
									if (!isHttp(route.path)) {
										router.addRoute(route) // 动态添加可访问路由表
									}
								})
								next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
							})
					})
					.catch((err) => {
						useUserStore()
							.logOut()
							.then(() => {
								ElMessage.error(err)
								next({ path: '/' })
							})
					})
			} else {
				next()
			}
		}
	} else {
		// 没有token
		if (whiteList.indexOf(to.path) !== -1) {
			// 在免登录白名单，直接进入
			next()
		} else {
			next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
			NProgress.done()
		}
	}
})

router.afterEach(() => {
	NProgress.done()
})
