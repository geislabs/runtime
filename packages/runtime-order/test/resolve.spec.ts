import { resolve, Sortable, SortCyclicalError, SortMissingError } from '../lib'

describe('resolve', () => {
    test('simple', async () => {
        const nodeA: Sortable = { name: 'A' }
        const nodeB: Sortable = { name: 'B', depends: [nodeA] }
        const nodeC: Sortable = { name: 'C', depends: [nodeB] }
        expect(resolve([nodeB, nodeC, nodeA])).toStrictEqual({
            success: true,
            value: [nodeA, nodeB, nodeC],
        })
    })
    test('circular', async () => {
        const nodeA: Sortable = { name: 'A' }
        const nodeB: Sortable = { name: 'B', depends: [nodeA] }
        const nodeC: Sortable = { name: 'C', depends: [nodeB] }
        nodeA.depends = [nodeC]
        expect(resolve([nodeB, nodeC, nodeA])).toStrictEqual({
            success: false,
            error: new SortCyclicalError([nodeA, nodeC, nodeB, nodeA]),
        })
    })
    test('missing', async () => {
        const nodeA: Sortable = { name: 'A' }
        const nodeB: Sortable = { name: 'B', depends: [nodeA] }
        const nodeC: Sortable = { name: 'C', depends: [nodeB] }
        expect(resolve([nodeB, nodeC])).toStrictEqual({
            success: false,
            error: new SortMissingError('A'),
        })
    })
})
