import compression from 'vite-plugin-compression'
import { PluginOption } from 'vite'

export default function createCompression(env: any) {
	const { VITE_BUILD_COMPRESS } = env
	const plugin: PluginOption[] = []
	if (VITE_BUILD_COMPRESS) {
		const compressList = VITE_BUILD_COMPRESS.split(',')
		if (compressList.includes('gzip')) {
			// http://doc.ruoyi.vip/ruoyi-vue/other/faq.html#使用gzip解压缩静态文件
			plugin.push(
				compression({
					verbose: true,
					ext: '.gz',
					deleteOriginFile: false,
				}),
			)
		}
		if (compressList.includes('brotli')) {
			plugin.push(
				compression({
					ext: '.br',
					algorithm: 'brotliCompress',
					deleteOriginFile: false,
				}),
			)
		}
	}
	return plugin
}
