import { fs as memfs } from 'memfs'
import fetch from 'node-fetch'
import { RuntimeConfig } from './runtimeConfig'
import { Runtime } from './runtimeFacade'

export function runtime({
    fs = memfs,
    http = fetch,
    ...config
}: Partial<RuntimeConfig> = {}) {
    const instance = new Runtime({ fs, http, ...config })
    return instance
}
