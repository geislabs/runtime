import { CreateRuntimeAttrs } from './runtimeAttrs'
import { Runtime } from './runtimeTypes'

export function buildRuntime({ ...attrs }: CreateRuntimeAttrs): Runtime {
    return { ...attrs }
}
