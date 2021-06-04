import { EventEmitter } from '@geislabs/runtime-event'
import { resolve, SortStatus } from '@geislabs/runtime-order'
import { PluginCyclicalError, PluginNotFoundError } from '../pluginErrors'
import { Context, Plugin, PluginObject } from '../pluginTypes'

export async function buildContext<TPluginObject extends PluginObject<any>>(
    events: EventEmitter<
        TPluginObject extends PluginObject<infer TPlugin>
            ? TPlugin extends Plugin<string, any, any, infer TEvent>
                ? TEvent
                : never
            : never
    >,
    plugins: TPluginObject[]
): Promise<
    Context<
        TPluginObject['plugin'],
        TPluginObject extends PluginObject<infer TPlugin>
            ? TPlugin extends Plugin<string, any, any, infer TEvent>
                ? TEvent
                : never
            : never
    >
> {
    const unregisters: Array<() => Promise<void>> = []
    const initial = Promise.resolve({
        events,
        _dispose: () => {
            Promise.all(unregisters.map((unregister) => unregister()))
        },
    } as any)
    const sortResult = resolve(
        plugins.map((plugin) => ({ ...plugin.plugin, options: plugin.options }))
    )
    if (!sortResult.success) {
        if (sortResult.error.status === SortStatus.CIRCULAR) {
            throw new PluginCyclicalError(sortResult.error.path)
        }
        if (sortResult.error.status === SortStatus.MISSING) {
            throw new PluginNotFoundError(sortResult.error.key)
        }
        throw sortResult.error
    }
    return sortResult.value.reduce(async (accpromise, plugin) => {
        const acc = await accpromise
        const result = await plugin.register(acc, plugin.options ?? {})
        if (Array.isArray(result)) {
            const [unregister, pluginExports] = result
            unregisters.push(unregister)
            return {
                ...acc,
                [plugin.name]: Object.assign(pluginExports, { events }),
            }
        }
        return {
            ...acc,
            [plugin.name]: result
                ? Object.assign(result, { events })
                : undefined,
        }
    }, initial)
}
