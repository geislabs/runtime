import { config as createEvents } from '@geislabs/runtime-event'
import { config } from '../lib'

describe('event', () => {
    test('before request', async () => {
        const mock = jest.fn() as any
        const events = createEvents()
        const http = config({ events, fetchFn: mock })
        http.events.on('beforeRequest', (request) => {
            request.url = request.url.replace(/google\.com/, 'localhost:4000')
        })
        await http.request({ url: 'https://google.com/about' })
        expect(mock).toHaveBeenCalledWith('https://localhost:4000/about', {})
    })
})
