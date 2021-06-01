import { Event, Events } from '@geislabs/runtime-event'

export interface Dependency<
    TName extends string = string,
    TEvent extends Event<any> = any
> {
    name: TName
    events: Events<TEvent>
}
