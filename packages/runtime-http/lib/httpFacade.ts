import { Events } from '@geislabs/runtime-event'
import { HttpConfig } from './httpConfig'
import { HttpEvent } from './httpEvents'
import { Http, Request } from './httpTypes'

export class NodeHttp implements Http {
    public events: Events<HttpEvent>
    constructor(public config: HttpConfig) {
        this.events = config.events
    }
    async request(request: Request) {
        this.config.events.emit('beforeRequest', request)
        const { url, ...init } = request
        const promise = this.config.fetchFn(url, init)
        this.config.events.emit('afterRequest', request)
        const response = await promise
        this.config.events.emit('afterResponse', response)
        return response
    }
}
