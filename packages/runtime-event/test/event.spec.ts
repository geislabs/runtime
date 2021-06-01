import { config, Event } from '../lib'

type TestEvent = Event<'test', true>

describe('event', () => {
    test('simple', () => {
        expect.hasAssertions()
        const event = config<TestEvent>()
        event.on('test', (value) => expect(value).toBe(true))
        event.emit('test', true)
    })
})
