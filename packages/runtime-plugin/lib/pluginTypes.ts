import { Event, EventEmitter } from '@geislabs/runtime-event'
import { Sortable } from '@geislabs/runtime-order'

export type GetImports<TImport extends Plugin<string>> = {
    [P in TImport['name']]: Extract<TImport, { name: P }> extends Plugin<
        string,
        infer TExports,
        any,
        infer TEvent
    >
        ? TExports & GetDefaults<TEvent>
        : never
}

export type GetDefaults<TEvent extends Event<any, any>> = {
    events: EventEmitter<TEvent>
}

export type GetExports<TExports, TEvent extends Event<any, any>> = TExports &
    GetDefaults<TEvent>

export type Context<
    TImport extends Plugin<string>,
    TEvent extends Event<any, any>
> = GetImports<TImport> & GetDefaults<TEvent>

export interface Plugin<
    TName extends string,
    TExports = any,
    TImports extends Plugin<any, any, any, any> = any,
    TEvent extends Event<any, any> = Event<any, any>
> extends Sortable<TName, TImports> {
    name: TName
    depends?: TImports[]
    register: (context: Context<TImports, TEvent>) => RegisterResult<TExports>
}

export interface PluginInstance<
    TName extends string,
    TExports = any,
    TImports extends Plugin<any, any, any, any> = any,
    TEvent extends Event<any, any> = Event<any, any>
> extends Plugin<TName, TExports, TImports, TEvent>,
        EventEmitter<TEvent> {
    register: (
        context: Context<TImports, TEvent>
    ) => RegisterResult<TExports> & GetDefaults<TEvent>
}

export type RegisterResult<TExports = any> = TExports
export type UnregisterFn = () => Promise<void> | void
