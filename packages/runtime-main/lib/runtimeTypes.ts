import type { EventEmitter } from 'events'
import { FileSystem } from './filesystem'
import { Http } from './http'

export interface RuntimeDeps {
    fs: FileSystem
    http: Http
    event: EventEmitter
}
