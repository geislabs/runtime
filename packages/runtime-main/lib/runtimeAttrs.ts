import { Dependency } from './dependency'

export interface CreateRuntimeAttrs<TDeps extends Dependency> {
    dependencies: TDeps[]
}
