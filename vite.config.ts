import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
	const env = loadEnv(mode, process.cwd())
	const { VITE_APP_ENV } = env
	return {
		// 部署生产环境和开发环境下的URL。
		base: VITE_APP_ENV === 'production' ? './' : '/',
		plugins: createVitePlugins(env, command === 'build'),
		resolve: {
			// https://cn.vitejs.dev/config/#resolve-alias
			alias: {
				'@': resolve(__dirname, './src'),
			},
			// https://cn.vitejs.dev/config/#resolve-extensions
			extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.scss', 'css'],
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
		// 预加载
		optimizeDeps: {
			include: [
				'@element-plus/icons-vue',
				'@vueuse/core',
				'axios',
				'echarts',
				'element-plus',
				'element-plus/es/locale/lang/zh-cn',
				'gsap',
				'js-base64',
				'js-cookie',
				'nprogress',
				'pinia',
				'pinia-plugin-persist',
				'three',
				'vue',
				'vue-router'
			]
		}
	}
})
