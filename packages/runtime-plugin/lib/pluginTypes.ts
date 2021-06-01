import type { Event } from '@geislabs/runtime-event'
import type { Runtime } from '@geislabs/runtime-base'

export type RuntimePlugin<TEvent extends Event = never> = (
    runtime: Runtime<TEvent>
) => void | Promise<void>
