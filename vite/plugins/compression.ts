/*
 * @FilePath: \wind_management_ts\vite\plugins\compression.ts
 * @Author: ZHY
 * @Date: 2023-01-31 11:30:12
 * @LastEditors: ZHY
 * @LastEditTime: 2023-03-03 11:32:01
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
import compression from 'vite-plugin-compression'

export default function createCompression(env: any) {
	const { VITE_BUILD_COMPRESS } = env
	const plugin = []
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
