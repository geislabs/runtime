import { SortStatus } from './orderEnums'
import { Sortable } from './orderTypes'

export class SortError extends Error {
    constructor() {
        super()
        Object.setPrototypeOf(this, SortError.prototype)
    }
}

export class SortCyclicalError<T extends Sortable> extends Error {
    status: SortStatus.CIRCULAR
    constructor(public path: T[]) {
        super()
        this.status = SortStatus.CIRCULAR
        Object.setPrototypeOf(this, SortCyclicalError.prototype)
    }
}

export class SortMissingError extends Error {
    status: SortStatus.MISSING
    constructor(public key: string) {
        super(`dependency "${key}" not found`)
        this.status = SortStatus.MISSING
        Object.setPrototypeOf(this, SortMissingError.prototype)
    }
}

export type AnySortError<T extends Sortable> =
    | SortCyclicalError<T>
    | SortMissingError
