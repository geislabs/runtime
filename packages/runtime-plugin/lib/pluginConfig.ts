import { EventEmitter } from '@geislabs/runtime-event'
import { Plugin, PluginObject } from './pluginTypes'

// export interface PluginConfig<TPlugin extends Plugin<string>> {
//     emitter: EventEmitter<
//         TPlugin extends Plugin<string, any, any, infer TEvent> ? TEvent : never
//     >
//     plugins: PluginObject<TPlugin>[]
// }

export interface PluginConfig<TPluginObject extends PluginObject<any>> {
    emitter: EventEmitter<
        TPluginObject extends PluginObject<infer TPlugin>
            ? TPlugin extends Plugin<string, any, any, infer TEvent>
                ? TEvent
                : never
            : never
    >
    plugins: TPluginObject[]
}
