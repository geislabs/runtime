import { config as createEvent, runtime } from '../lib'

describe('provider', () => {
    test('simple', () => {
        const actual = runtime({
            dependencies: [{ name: 'http', events: createEvent() }],
        })
        expect(actual).toHaveProperty('http')
    })
})
