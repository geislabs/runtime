import { EventEmitter } from 'events'
import { EventConfig } from './eventConfig'
import { Events } from './eventFacade'
import { Event } from './eventTypes'

export function config<TEvent extends Event<any>>({
    emitter = new EventEmitter(),
    ...config
}: Partial<EventConfig> = {}) {
    return new Events<TEvent>({ emitter, ...config })
}
