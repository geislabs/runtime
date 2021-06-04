import { config } from '../lib'
import { http } from './support'

describe('register', () => {
    test('simple', async () => {
        const instance = config({
            plugins: [{ plugin: http }],
        })
        const context = await instance.load()
        const response = await context.http.request({
            url: 'https://google.com/about',
        })
        expect(response.status).toBe(200)
    })
})
