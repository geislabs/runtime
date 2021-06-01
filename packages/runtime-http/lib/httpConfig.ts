import { Events } from '@geislabs/runtime-event'
import { HttpEvent } from './httpEvents'
import { FetchFn } from './httpTypes'

export interface HttpConfig {
    events: Events<HttpEvent>
    fetchFn: FetchFn
}
