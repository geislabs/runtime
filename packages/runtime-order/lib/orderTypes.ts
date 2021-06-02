import { AnySortError } from './orderErrors'

export interface Sortable<
    TName extends string = string,
    TSortable extends Sortable<string, any> = Sortable<string, any>
> {
    name: TName
    depends?: TSortable[]
}

export interface SortSuccessResult<T extends Sortable> {
    success: true
    value: T[]
}

export interface SortFailedResult<T extends Sortable> {
    success: false
    error: AnySortError<T>
}

export type AnySortResult<T extends Sortable> =
    | SortSuccessResult<T>
    | SortFailedResult<T>
