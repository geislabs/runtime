import type { Event, Events } from '@geislabs/runtime-event'
import { FileSystem } from './filesystem'
import { Http } from './http'

export interface RuntimeDeps<TEvent extends Event = Event> {
    fs: FileSystem
    http: Http
    events: Events<TEvent>
}
