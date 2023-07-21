/**
 * @name  AutoRegistryComponents
 * @description 按需加载，自动引入组件
 */
import Components from 'unplugin-vue-components/vite'
export const AutoRegistryComponents = () => {
	return Components({
		dts: true,
		dirs: ['src/components'], // 按需加载的文件夹
	})
}
