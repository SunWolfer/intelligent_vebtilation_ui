declare module '*.vue' {
	import { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}

// 环境变量 TypeScript的智能提示
declare interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string
	readonly VITE_APP_ENV: string
	readonly VITE_APP_USER: string
	readonly VITE_APP_PASSWORD: string
	readonly VITE_APP_MAP_URL: string
	readonly VITE_APP_SOCKETIP: string
	readonly VITE_APP_BASE_API: string
	readonly BASE_URL: string
}

declare global {
	interface ImportMeta {
		readonly env: ImportMetaEnv
	}
}
