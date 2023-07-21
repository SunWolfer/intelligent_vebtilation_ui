/*
 * @Author: ZHY
 * @Date: 2023-02-27 10:31:09
 * @LastEditors: ZHY
 * @LastEditTime: 2023-03-03 11:32:35
 * @FilePath: \wind_management_ts\vite\plugins\svg-icon.ts
 * @Description:
 * Copyright (c) 2023 by Wujiahuo/bzlrobot, All Rights Reserved.
 */
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default function createSvgIcon(isBuild: any) {
	return createSvgIconsPlugin({
		iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
		symbolId: 'icon-[dir]-[name]',
		// svgoOptions: isBuild
	})
}
