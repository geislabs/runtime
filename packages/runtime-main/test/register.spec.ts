import { config as createEvent, runtime } from '../lib'

describe('register', () => {
    test('simple', () => {
        expect.hasAssertions()
        const actual = runtime({
            dependencies: [
                {
                    name: 'http' as const,
                    events: createEvent(),
                    request: () => ({ status: 200 }),
                },
            ],
        })
        actual.register(({ http }) => {
            expect(http.request().status).toBe(200)
        })
    })
})
