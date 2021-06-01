import { config as createEvents, Event } from '@geislabs/runtime-event'
import { fs as memfs } from 'memfs'
import fetch from 'node-fetch'
import { RuntimeConfig } from './runtimeConfig'
import { Runtime } from './runtimeFacade'

export function runtime<TEvent extends Event>({
    fs = memfs,
    http = fetch,
    events = createEvents<TEvent>(),
    ...config
}: Partial<RuntimeConfig<TEvent>> = {}) {
    const instance = new Runtime({ fs, http, events, ...config })
    return instance
}
