import { Events } from '@geislabs/runtime-event'
import { Dependency } from './dependency'

export interface RuntimeConfig<TDeps extends Dependency> {
    events: TDeps extends Dependency<any, infer TEvent> ? Events<TEvent> : never
    dependencies: TDeps[]
}
