import { Event, EventEmitter } from '@geislabs/runtime-event'

export interface Dependency<
    TName extends string = string,
    TEvent extends Event<any> = any
> {
    name: TName
    events: TEvent extends Event<any> ? EventEmitter<TEvent> : unknown
}
