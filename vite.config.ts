/*
 * @FilePath: vite.config.ts
 * @Author: ZHY
 * @Date: 2023-01-31 11:22:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-31 13:20:52
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
	const env = loadEnv(mode, process.cwd())
	const { VITE_APP_ENV } = env
	return {
		// 部署生产环境和开发环境下的URL。
		// 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
		// 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
		base: VITE_APP_ENV === 'production' ? '/' : '/',
		plugins: createVitePlugins(env, command === 'build'),
		resolve: {
			// https://cn.vitejs.dev/config/#resolve-alias
			alias: {
				// 设置别名
				'@': path.resolve(__dirname, './src'),
			},
			// https://cn.vitejs.dev/config/#resolve-extensions
			extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.scss'],
		},
		// vite 相关配置
		server: {
			port: 9000,
			host: true,
			open: true,
			proxy: {
				// https://cn.vitejs.dev/config/#server-proxy
				'/dev-api': {
					target: 'http://127.0.0.1:8083/intelligent_ventilation',
					changeOrigin: true,
					rewrite: (p) => p.replace(/^\/dev-api/, ''),
				},
			},
		},
		//fix:error:stdin>:7356:1: warning: "@charset" must be the first rule in the file
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "@/assets/styles/utils.scss";',
				},
			},
			postcss: {
				plugins: [
					{
						postcssPlugin: 'internal:charset-removal',
						AtRule: {
							charset: (atRule) => {
								if (atRule.name === 'charset') {
									atRule.remove()
								}
							},
						},
					},
				],
			},
		},
		// 打包配置
		build: {
			minify: 'terser',
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
				},
			},
			rollupOptions: {
				output: {
					chunkFileNames: 'static/js/[name]-[hash].js',
					entryFileNames: 'static/js/[name]-[hash].js',
					assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
					manualChunks(id) {
						if (id.includes('node_modules')) {
							return id.toString().split('node_modules/')[1].split('/')[0].toString()
						}
					},
				},
			},
		},
	}
})
