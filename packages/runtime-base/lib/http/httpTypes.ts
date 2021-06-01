import type fetch from 'node-fetch'

export type FetchFn = typeof fetch

export interface Http extends FetchFn {}
