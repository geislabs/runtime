import { FileSystem } from './filesystem'
import { Http } from './http'

export interface Runtime {
    fs: FileSystem
    http: Http
}
