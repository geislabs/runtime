import { Event } from '@geislabs/runtime-event'
import { CreatePluginAttrs } from './pluginAttrs'
import { Plugin } from './pluginTypes'

export function buildPlugin<
    TName extends string,
    TExports,
    TImports extends Plugin<string>,
    TEvent extends Event<any, any>
>(
    attrs: CreatePluginAttrs<TName, TExports, TImports, TEvent>
): Plugin<TName, TExports, TImports, TEvent> {
    return attrs
}
