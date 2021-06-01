import { config, Event } from '../lib'

type TestEvent = Event<'test', true>

describe('events', () => {
    test('simple', () => {
        expect.hasAssertions()
        const event = config<TestEvent>()
        event.on('test', (value) => expect(value).toBe(true))
        event.emit({ kind: 'test', payload: true })
    })
})
