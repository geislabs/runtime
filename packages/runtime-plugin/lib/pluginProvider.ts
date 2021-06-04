import { config as createEvents } from '@geislabs/runtime-event'
import { PluginConfig } from './pluginConfig'
import { Plugins } from './pluginFacade'
import { Plugin, PluginObject } from './pluginTypes'

export function config<TPluginObject extends PluginObject<any>>({
    plugins = [],
    emitter = createEvents<
        TPluginObject extends PluginObject<infer TPlugin>
            ? TPlugin extends Plugin<string, any, any, infer TEvent>
                ? TEvent
                : never
            : never
    >(),
    ...config
}: Partial<PluginConfig<TPluginObject>> = {}) {
    return new Plugins({ plugins, emitter, ...config })
}
