import { Runtime, runtime } from '../lib'

describe('register', () => {
    test('simple', () => {
        expect.hasAssertions()
        const actual = runtime()
        actual.register((runtime) => {
            expect(runtime).toBeInstanceOf(Runtime)
        })
    })
})
