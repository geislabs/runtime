import type { Events } from '@geislabs/runtime-event'
import type { HttpEvent } from './httpEvents'
import fetch, { RequestInit, Response } from 'node-fetch'

export type FetchFn = typeof fetch

export interface Http {
    events: Events<HttpEvent>
    request: (request: Request) => Promise<Response>
}

export interface Request extends RequestInit {
    url: string
}
