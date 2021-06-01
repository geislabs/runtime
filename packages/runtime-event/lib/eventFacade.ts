import { EventListenerOptions, fromEvent } from 'ix/asynciterable'
import { map } from 'ix/asynciterable/operators'
import { EventConfig } from './eventConfig'
import { Event, EventEmitter } from './eventTypes'

export class Events<TEvent extends Event> implements EventEmitter<TEvent> {
    constructor(public config: EventConfig) {}

    emit(event: TEvent) {
        this.config.emitter.emit(event.kind, event)
    }

    on<TName extends TEvent['kind']>(
        eventName: TName,
        callback: (payload: Extract<TEvent, { kind: TName }>['payload']) => void
    ) {
        this.config.emitter.on(eventName, (event) => callback(event.payload))
    }

    subscribe<TName extends TEvent['kind']>(
        eventName: TName,
        options: EventListenerOptions = {}
    ): AsyncIterable<Extract<TEvent, { kind: TName }>['payload']> {
        return fromEvent<Extract<TEvent, { kind: TName }>>(
            this.config.emitter,
            eventName,
            options
        ).pipe(map((event) => event.payload))
    }
}
