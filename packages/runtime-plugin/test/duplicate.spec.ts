import { config } from '../lib'
import { fetch, http } from './support'

describe('duplicates', () => {
    test('last one overrides', async () => {
        const instance = config({
            plugins: [http({ status: 200 }), fetch(), http({ status: 404 })],
        })
        const context = await instance.load()
        const response = await context.fetch('https://google.com/about')
        expect(response.status).toBe(404)
    })
    test('previous are ignored', async () => {
        const instance = config({
            plugins: [http({ status: 404 }), fetch(), http({ status: 200 })],
        })
        const context = await instance.load()
        const response = await context.fetch('https://google.com/about')
        expect(response.status).toBe(200)
    })
})
