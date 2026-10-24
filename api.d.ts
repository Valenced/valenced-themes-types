import type { ThemesApi } from '@valenced/themes-api/types'

declare module '@valenced/plugins/types' {
	interface PreInitPluginApi<
		O extends PluginApiExtensionsOptions = PluginApiExtensionsOptions,
	> {
		themes: ThemesApi
	}
}
