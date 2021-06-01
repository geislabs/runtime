import type { Event } from '@geislabs/runtime-event'
import type { Response } from 'node-fetch'
import type { Request } from './httpTypes'

export interface BeforeRequestEvent extends Event<'beforeRequest', Request> {}
export interface AfterRequestEvent extends Event<'afterRequest', Request> {}
export interface AfterResponseEvent extends Event<'afterResponse', Response> {}

export type HttpEvent =
    | BeforeRequestEvent
    | AfterRequestEvent
    | AfterResponseEvent
