import vue from '@vitejs/plugin-vue'
import { PluginOption } from 'vite'

import createAutoImport from './auto-import'
import createSvgIcon from './svg-icon'
import createCompression from './compression'
import createSetupExtend from './setup-extend'
import { AutoRegistryComponents } from './component'
import createdProgress from './progress'
import eslintPlugin from './eslintPlugin'

export default function createVitePlugins(viteEnv: any, isBuild = false) {
	const vitePlugins: PluginOption[] = [vue()]
	vitePlugins.push(createAutoImport())
	vitePlugins.push(AutoRegistryComponents())
	vitePlugins.push(createSetupExtend())
	vitePlugins.push(createSvgIcon(isBuild))
	vitePlugins.push(createdProgress())
	vitePlugins.push(eslintPlugin())
	isBuild && vitePlugins.push(...createCompression(viteEnv))
	return vitePlugins
}
