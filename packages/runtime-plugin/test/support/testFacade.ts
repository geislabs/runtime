import { URL } from 'url'
import { plugin } from '../../lib'
import { HttpEvent } from './testEvents'
import { TestHttpExports, TestRequest } from './testTypes'

export const http = ({ ...overrides }: Partial<Response> = {}) =>
    plugin<'http', TestHttpExports, any, HttpEvent>({
        name: 'http',
        register({ events }) {
            return {
                request: async (request: TestRequest) => {
                    events.emit('beforeRequest', request)
                    return { request, status: 200, ...overrides }
                },
            }
        },
    })

export const fetch = () =>
    plugin({
        name: 'fetch',
        depends: [http()],
        register({ http }) {
            return (url: string) => {
                return http.request({ url })
            }
        },
    })

export const proxy = ({
    proxy = {},
}: { proxy?: { [key: string]: string } } = {}) =>
    plugin({
        name: 'proxy',
        depends: [http()],
        register({ http }) {
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
