import { Event } from '@geislabs/runtime-event'
import { Plugin, Context, RegisterResult } from './pluginTypes'

export interface CreatePluginAttrs<
    TName extends string,
    TExports,
    TImports extends Plugin<string>,
    TEvent extends Event<any> = Event<any>
> {
    name: TName
    depends?: TImports[]
    register: (context: Context<TImports, TEvent>) => RegisterResult<TExports>
}
