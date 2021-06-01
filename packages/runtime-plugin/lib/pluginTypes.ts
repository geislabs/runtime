import type { Event } from '@geislabs/runtime-event'
import type { Http } from '@geislabs/runtime-http'

export interface PluginContext {
    http: Http
}

export type RuntimePlugin<TEvent extends Event<any> = never> = (
    runtime: PluginContext
) => void | Promise<void>
