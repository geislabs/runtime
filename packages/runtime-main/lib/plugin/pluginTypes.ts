import { Dependency } from '../dependency'
import { Runtime } from '../runtimeTypes'

export interface Plugin<TDep extends Dependency> {
    register: (runtime: Runtime<TDep>) => void
}
