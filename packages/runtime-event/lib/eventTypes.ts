export interface Event<TKind extends string, TPayload = unknown> {
    kind: TKind
    payload: TPayload
}

export interface EventEmitter<TEvent extends Event<any>> {
    emit: <TName extends string>(
        eventName: Extract<TEvent, { kind: TName }>['kind'],
        payload: Extract<TEvent, { kind: TName }>['payload']
    ) => void
    on: <TName extends string>(
        eventName: Extract<TEvent, { kind: TName }>['kind'],
        callback: (payload: Extract<TEvent, { kind: TName }>['payload']) => void
    ) => void
}
