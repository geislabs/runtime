import { Event } from '@geislabs/runtime-event'
import { TestRequest } from './testTypes'

export interface BeforeRequest extends Event<'beforeRequest', TestRequest> {}
export type HttpEvent = BeforeRequest
