import { Event } from '@geislabs/runtime-event'
import { RuntimeDeps } from './runtimeTypes'

export interface RuntimeConfig<TEvent extends Event>
    extends RuntimeDeps<TEvent> {}
