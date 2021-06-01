import { Dependency } from './dependency'

export type Runtime<TDeps extends Dependency> = {
    /**
     * Register plugin
     */
    register: (callback: (runtime: Runtime<TDeps>) => void) => void
} & {
    [P in TDeps['name']]: Extract<TDeps, { name: P }>
}
