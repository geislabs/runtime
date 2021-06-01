import { FileSystem } from './filesystem'
import { Http } from './http'

export interface CreateRuntimeAttrs {
    fs: FileSystem
    http: Http
}
