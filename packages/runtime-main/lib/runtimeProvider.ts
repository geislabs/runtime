import { fs as memfs } from 'memfs'
import fetch from 'node-fetch'
import { EventEmitter } from 'events'
import { RuntimeConfig } from './runtimeConfig'
import { Runtime } from './runtimeFacade'

export function runtime({
    fs = memfs,
    http = fetch,
    event = new EventEmitter(),
    ...config
}: Partial<RuntimeConfig> = {}) {
    const instance = new Runtime({ fs, http, event, ...config })
    return instance
}
