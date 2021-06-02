import { Dependency } from '../dependency'
import { Plugin } from '../plugin'

export type Context<TPlugin extends Plugin<string, any, any>> = {
    [P in TPlugin['name']]: Extract<TPlugin, { name: P }> extends Plugin<
        string,
        any,
        infer TExports
    >
        ? TExports
        : never
} & { _dispose: () => Promise<void> }

export type PluginContext<TDep extends Dependency<string, any>> = {
    [P in TDep['name']]: Extract<TDep, { name: P }>
}
