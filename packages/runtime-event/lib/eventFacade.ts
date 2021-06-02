import { EventListenerOptions, fromEvent } from 'ix/asynciterable'
import { map } from 'ix/asynciterable/operators'
import { EventConfig } from './eventConfig'
import { Event, EventEmitter } from './eventTypes'

export class Events<TEvent extends Event<any>> implements EventEmitter<TEvent> {
    constructor(public config: EventConfig) {}

    emit<TKind extends TEvent['kind']>(
        eventName: TKind,
        payload: Extract<TEvent, { kind: TKind }>['payload']
    ) {
        this.config.emitter.emit(eventName, { payload })
    }

    on<TKind extends TEvent['kind']>(
        eventName: TKind,
        callback: (payload: Extract<TEvent, { kind: TKind }>['payload']) => void
    ) {
        this.config.emitter.on(eventName, (event) => callback(event.payload))
    }

    subscribe<TKind extends TEvent['kind']>(
        eventName: TKind,
        options: EventListenerOptions = {}
    ): AsyncIterable<Extract<TEvent, { kind: TKind }>['payload']> {
        return fromEvent<Extract<TEvent, { kind: TKind }>>(
            this.config.emitter,
            eventName,
            options
        ).pipe(map((event) => event.payload))
    }
}
