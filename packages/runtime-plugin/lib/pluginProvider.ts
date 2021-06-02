import { config as createEvents } from '@geislabs/runtime-event'
import { PluginConfig } from './pluginConfig'
import { Plugins } from './pluginFacade'
import { Plugin } from './pluginTypes'

export function config<TPlugin extends Plugin<string>>({
    plugins = [],
    emitter = createEvents<
        TPlugin extends Plugin<string, any, any, infer TEvent> ? TEvent : never
    >(),
    ...config
}: Partial<PluginConfig<TPlugin>> = {}) {
    return new Plugins({ plugins, emitter, ...config })
}
