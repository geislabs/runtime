import { EventListenerOptions } from 'ix/asynciterable'

export interface Event<TKind extends string, TPayload = any> {
    kind: TKind
    payload: TPayload
}

export interface EventEmitter<TEvent extends Event<any>> {
    emit: <TKind extends TEvent['kind']>(
        eventName: TKind,
        payload: Extract<TEvent, { kind: TKind }>['payload']
    ) => void
    on: <TKind extends TEvent['kind']>(
        eventName: TKind,
        callback: (payload: Extract<TEvent, { kind: TKind }>['payload']) => void
    ) => void
    subscribe<TKind extends TEvent['kind']>(
        eventName: TKind,
        options?: EventListenerOptions
    ): AsyncIterable<Extract<TEvent, { kind: TKind }>['payload']>
}
