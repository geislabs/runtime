export interface Event<TKind extends string = string, TPayload = unknown> {
    kind: TKind
    payload: TPayload
}

export interface EventEmitter<TEvent extends Event> {
    emit: (event: TEvent) => void
    on: (
        eventName: TEvent['kind'],
        callback: (payload: TEvent['payload']) => void
    ) => void
}
