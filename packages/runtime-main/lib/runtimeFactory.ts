import { Dependency } from './dependency'
import { CreateRuntimeAttrs } from './runtimeAttrs'
import { Runtime } from './runtimeTypes'

export function buildRuntime<TDeps extends Dependency>(
    attrs: CreateRuntimeAttrs<TDeps>
): Runtime<TDeps> {
    const runtime = attrs.dependencies.reduce(
        (acc, dep) => ({ ...acc, [dep.name]: dep }),
        {
            register: (callback) => {
                callback(runtime)
            },
        } as Runtime<TDeps>
    )
    return runtime
}
