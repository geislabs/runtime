import { config as createEvents, Event } from '@geislabs/runtime-event'
import { config as createHttp, HttpEvent } from '@geislabs/runtime-http'
import { fs as memfs } from 'memfs'
import { RuntimeConfig } from './runtimeConfig'
import { Runtime } from './runtimeFacade'

export function runtime<TEvent extends Event<any> & HttpEvent>({
    fs = memfs,
    events = createEvents<TEvent>(),
    http = createHttp({ events }),
    ...config
}: Partial<RuntimeConfig<TEvent>> = {}) {
    const instance = new Runtime({ fs, http, events, ...config })
    return instance
}
