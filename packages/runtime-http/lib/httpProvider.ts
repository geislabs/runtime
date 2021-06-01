import fetch from 'node-fetch'
import { HttpConfig } from './httpConfig'
import { NodeHttp } from './httpFacade'

export function config({
    fetchFn = fetch,
    ...config
}: Partial<HttpConfig> & Pick<HttpConfig, 'events'>) {
    return new NodeHttp({ fetchFn, ...config })
}
