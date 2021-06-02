import { Event, Events } from '@geislabs/runtime-event'
import { Plugin } from '../plugin'

export interface Dependency<TName extends string = string, TExports = unknown>
    extends Plugin<TName, never, TExports> {
    name: TName
}
