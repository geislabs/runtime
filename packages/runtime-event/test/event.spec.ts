import { config, Event } from '../lib'

type TestEvent = Event<'one', 1> | Event<'two', 2>

describe('event', () => {
    test('simple', () => {
        expect.assertions(2)
        const event = config<TestEvent>()
        event.on('one', (value) => expect(value).toBe(1))
        event.on('two', (value) => expect(value).toBe(2))
        event.emit('one', 1)
        event.emit('two', 2)
    })
})
