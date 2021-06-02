import { EventEmitter } from '@geislabs/runtime-event'
import { Plugin } from './pluginTypes'

export interface PluginConfig<TPlugin extends Plugin<string>> {
    emitter: EventEmitter<
        TPlugin extends Plugin<string, any, any, infer TEvent> ? TEvent : never
    >
    plugins: TPlugin[]
}
