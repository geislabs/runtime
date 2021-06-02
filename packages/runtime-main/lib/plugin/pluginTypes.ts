import { Dependency } from '../dependency'
import { Runtime } from '../runtimeTypes'

export interface Plugin<
    TName extends string,
    TDep extends Dependency = Dependency,
    TExports = unknown,
    TImports = unknown
> {
    name: TName
    imports?: TImports[]
    register: (runtime: Runtime<TDep>) => RegisterResult<TExports>
}

export type RegisterResult<TExports = unknown> =
    | void
    | TExports
    | [TExports, UnregisterFn]
    | Promise<RegisterResult>

export type UnregisterFn = () => Promise<void> | void
