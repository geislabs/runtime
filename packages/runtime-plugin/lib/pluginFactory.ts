import { Event } from '@geislabs/runtime-event'
import { CreatePluginAttrs } from './pluginAttrs'
import { Plugin, PluginSchema } from './pluginTypes'

export function buildPlugin<
    TName extends string,
    TConfig extends PluginSchema,
    TExports,
    TImports extends Plugin<string>,
    TEvent extends Event<any, any>
>(
    attrs: CreatePluginAttrs<TName, TConfig, TExports, TImports, TEvent>
): Plugin<TName, TConfig, TExports, TImports, TEvent> {
    return { ...attrs, name: attrs.pluginName }
}
