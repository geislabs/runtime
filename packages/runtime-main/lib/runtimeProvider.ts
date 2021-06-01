import { config as createEvents, Event } from '@geislabs/runtime-event'
import { Runtime, RuntimeConfig } from '@geislabs/runtime-base'
import { fs as memfs } from 'memfs'
import fetch from 'node-fetch'

export function runtime<TEvent extends Event>({
    fs = memfs,
    http = fetch,
    events = createEvents<TEvent>(),
    ...config
}: Partial<RuntimeConfig<TEvent>> = {}) {
    const instance = new Runtime({ fs, http, events, ...config })
    return instance
}
