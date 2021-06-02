import { Sortable } from '../orderTypes'

/**
 * @example "Node A forms circular dependency: A -> C -> B -> A"
 */
export function parseCyclicalPath<T extends Sortable>(
    nodes: Map<string, T>,
    message: string
) {
    const [, offender, path] =
        message.match(/Node (.+) forms circular dependency: (.+)/) ?? []
    const split = path.split(' -> ')
    return split.map((key) => nodes.get(key)!)
}

/**
 * @example "Target node with A key should exist"
 */
export function parseMissingPath(message: string) {
    const [, nodeName] =
        message.match(/Target node with (.+) key should exist/) ?? []
    return nodeName
}
