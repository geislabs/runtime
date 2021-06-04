import { URL } from 'url'
import { plugin } from '../../lib'
import { HttpPlugin, TestRequest } from './testTypes'
import { z } from 'zod'

export const http: HttpPlugin = {
    name: 'http',
    register({ events }, { ...overrides }) {
        return {
            request: async (request: TestRequest) => {
                events.emit('beforeRequest', request)
                return { request, status: 200, ...overrides }
            },
        }
    },
}

export const fetch = plugin({
    name: 'fetch',
    depends: [http],
    register({ http }) {
        return (url: string) => {
            return http.request({ url })
        }
    },
})

export const proxy = plugin({
    name: 'proxy',
    depends: [http],
    options: z.object({
        proxy: z.record(z.string()),
    }),
    register({ http }, options) {
        const { proxy = {} } = options
        http.events.on('beforeRequest', (request) => {
            const url = new URL(request.url)
            const target = proxy[url.hostname]
            if (target) {
                const [hostname, port] = target.split(':')
                url.hostname = hostname
                url.port = port
                request.url = url.toString()
            }
        })
    },
})
