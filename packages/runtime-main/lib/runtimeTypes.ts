import { FileSystem } from './filesystem'
import { Http } from './http'

export interface RuntimeDeps {
    fs: FileSystem
    http: Http
}
