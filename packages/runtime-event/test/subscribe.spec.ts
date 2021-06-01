import { config, Event } from '../lib'

type TestEvent = Event<'test', number>

describe('subscribe', () => {
    test('simple', async () => {
        expect.hasAssertions()
        const event = config<TestEvent>()
        const source = event.subscribe('test', { once: true })
        event.emit({ kind: 'test', payload: 1 })
        event.emit({ kind: 'test', payload: 2 })
        event.emit({ kind: 'test', payload: 3 })
        const it = source[Symbol.asyncIterator]()
        const { value: value1 } = await it.next()
        const { value: value2 } = await it.next()
        const { value: value3 } = await it.next()
        expect(value1).toBe(1)
        expect(value2).toBe(2)
        expect(value3).toBe(3)
    })
})
