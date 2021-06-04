import { Event } from '@geislabs/runtime-event'
import { z } from 'zod'
import { Plugin, Context, RegisterResult } from './pluginTypes'

export interface CreatePluginAttrs<
    TName extends string,
    TSchema extends z.Schema<any>,
    TExports,
    TImports extends Plugin<string>,
    TEvent extends Event<any> = Event<any>
> {
    pluginName: TName
    depends?: TImports[]
    options?: TSchema
    register: (
        context: Context<TImports, TEvent>,
        options: z.infer<TSchema>
    ) => RegisterResult<TExports>
}
