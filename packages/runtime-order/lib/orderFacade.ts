import TopologicalSort from 'topological-sort'
import { buildError } from './errors/errorFactory'
import { AnySortResult, Sortable } from './orderTypes'

export function resolve<T extends Sortable>(sortables: T[]): AnySortResult<T> {
    const nodes = new Map<string, T>()
    try {
        for (const sortable of sortables) {
            nodes.set(sortable.name, sortable)
        }
        const sorter = new TopologicalSort<string, T>(nodes)
        for (const sortable of sortables) {
            for (const dependency of sortable.depends ?? []) {
                sorter.addEdge(sortable.name, dependency.name)
            }
        }
        const sorted = sorter.sort()
        const sortedKeys = [...sorted.keys()].reverse()
        return {
            success: true,
            value: sortedKeys.map((key) => nodes.get(key)!),
        }
    } catch (error) {
        const mapped = buildError(nodes, error)
        if (mapped) {
            return { success: false, error: mapped }
        }
        throw error
    }
}
