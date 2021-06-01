import type { Http } from '@geislabs/runtime-http'
import type { FileSystem } from './filesystem'

export interface CreateRuntimeAttrs {
    fs: FileSystem
    http: Http
}
