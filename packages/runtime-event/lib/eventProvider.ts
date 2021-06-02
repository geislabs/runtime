import { EventEmitter as NodeEventEmitter } from 'events'
import { EventConfig } from './eventConfig'
import { Events } from './eventFacade'
import { Event, EventEmitter } from './eventTypes'

export function config<TEvent extends Event<any>>({
    emitter = new NodeEventEmitter(),
    ...config
}: Partial<EventConfig> = {}): EventEmitter<TEvent> {
    return new Events<TEvent>({ emitter, ...config })
}
