import { config, plugin } from '../lib'
import { fetch, http } from './support'

describe('duplicates', () => {
    test('last one overrides', async () => {
        const instance = config({
            plugins: [
                { plugin: http, options: { status: 200 } },
                { plugin: fetch },
                { plugin: http, options: { status: 404 } },
            ],
        })
        const context = await instance.load()
        const response = await context.fetch('https://google.com/about')
        expect(response.status).toBe(404)
    })
    test('previous are ignored', async () => {
        const instance = config({
            plugins: [
                { plugin: http, options: { status: 404 } },
                { plugin: fetch },
                { plugin: http, options: { status: 200 } },
            ],
        })
        const context = await instance.load()
        const response = await context.fetch('https://google.com/about')
        expect(response.status).toBe(200)
    })
    test('duplicate logic handled for dependencies as well', async () => {
        const instance = config({
            plugins: [
                { plugin: http, options: { status: 404 } },
                {
                    plugin: plugin({
                        pluginName: 'fetch' as const,
                        depends: [http],
                        register({ http: instance }) {
                            return function (url: string) {
                                return instance.request({
                                    url,
                                })
                            }
                        },
                    }),
                },
                { plugin: http, options: { status: 200 } },
            ],
        })
        const context = await instance.load()
        const response = await context.fetch('https://google.com/about')
        expect(response.status).toBe(200)
    })
})
