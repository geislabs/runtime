import type { Event, Events } from '@geislabs/runtime-event'
import type { interfaces } from 'inversify'
import autobind from 'autobind-decorator'
import { RuntimeContainer } from './runtimeContainer'
import { RuntimeDeps } from './runtimeTypes'
import { Http } from './http'
import { FileSystem } from './filesystem'

@autobind
export class Runtime<TEvent extends Event> {
    #container: RuntimeContainer

    public events: Events<TEvent>
    public http: Http
    public fs: FileSystem

    constructor(public config: RuntimeDeps<TEvent>) {
        this.#container = new RuntimeContainer()
        this.events = config.events
        this.fs = config.fs
        this.http = config.http
    }

    /**
     * Register a plugin
     * @param callback
     * @returns
     */
    register(callback: (runtime: this) => void | Promise<void>) {
        return callback(this)
    }

    /**
     * Rebind a dependency
     * @param identifier
     * @param value
     * @returns
     */
    rebind<T>(identifier: interfaces.ServiceIdentifier<T>, value: T) {
        return this.#container.rebind(identifier).toConstantValue(value)
    }
}
