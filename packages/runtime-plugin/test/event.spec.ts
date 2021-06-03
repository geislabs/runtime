import { config } from '../lib'
import { http, fetch, proxy } from './support'

describe('event', () => {
    test('listen', async () => {
        const instance = config({
            plugins: [
                http(),
                fetch(),
                proxy({ proxy: { 'google.com': 'localhost:4000' } }),
            ],
        })
        const context = await instance.load()
        const response = await context.fetch('https://google.com/about')
        expect(response.request.url).toBe('https://localhost:4000/about')
    })
})
