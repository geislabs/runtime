import type { Event, Events } from '@geislabs/runtime-event'
import type { Http } from '@geislabs/runtime-http'
import { FileSystem } from './filesystem'

export interface RuntimeDeps<TEvent extends Event<any> = Event<any>> {
    fs: FileSystem
    http: Http
    events: Events<TEvent>
}
