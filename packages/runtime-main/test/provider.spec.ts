import { runtime } from '../lib'

describe('provider', () => {
    test('simple', () => {
        const actual = runtime()
        expect(actual).toHaveProperty('http')
        expect(actual).toHaveProperty('fs')
    })
})
