import {
    AnySortError,
    SortCyclicalError,
    SortMissingError,
} from '../orderErrors'
import { Sortable } from '../orderTypes'
import { parseCyclicalPath, parseMissingPath } from './errorHelpers'

export function buildError<T extends Sortable>(
    nodes: Map<string, T>,
    error: Error
): AnySortError<T> | null {
    if (error.message.includes('forms circular dependency')) {
        const path = parseCyclicalPath(nodes, error.message)
        return new SortCyclicalError(path)
    }
    if (error.message.includes('key should exist')) {
        const path = parseMissingPath(error.message)
        return new SortMissingError(path)
    }
    return null
}
