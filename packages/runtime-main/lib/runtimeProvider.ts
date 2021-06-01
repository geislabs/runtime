import { config as createEvents } from '@geislabs/runtime-event'
import { Dependency } from './dependency'
import { RuntimeConfig } from './runtimeConfig'
import { buildRuntime } from './runtimeFactory'

export function runtime<TDep extends Dependency>({
    // @ts-expect-error
    events = createEvents(),
    dependencies = [],
    ...config
}: Partial<RuntimeConfig<TDep>> = {}) {
    return buildRuntime({ dependencies, ...config })
}
