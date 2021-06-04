import { ProxyMapping } from './testTypes'

export interface HttpConfig {
    overrides?: Partial<Response>
}

export interface ProxyConfig {
    proxy: ProxyMapping
}
