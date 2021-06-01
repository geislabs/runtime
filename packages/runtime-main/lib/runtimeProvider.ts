import { CreateRuntimeAttrs } from './runtimeAttrs'
import { buildRuntime } from './runtimeFactory'

export function runtime(attrs: CreateRuntimeAttrs) {
    return buildRuntime(attrs)
}
