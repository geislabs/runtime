import { Plugin } from '../plugin'
import { Runtime } from '../runtimeTypes'
import { Context } from './contextTypes'

export function buildContext<TPlugin extends Plugin<string, any, any>>(
    // @ts-expect-error
    runtime: Runtime<any, any>,
    plugins: TPlugin[]
): Promise<Context<TPlugin>> {
    const unregisters: Array<() => Promise<void>> = []
    const initial = Promise.resolve({
        _dispose: () => {
            Promise.all(unregisters.map((unregister) => unregister()))
        },
    } as Context<TPlugin>)
    return plugins.reduce(async (accpromise, plugin) => {
        const acc = await accpromise
        const result = await plugin.register(runtime)
        if (Array.isArray(result)) {
            const [unregister, exports] = result
            unregisters.push(unregister)
            return { ...acc, [plugin.name]: exports }
        }
        return { ...acc, [plugin.name]: result }
    }, initial)
}
