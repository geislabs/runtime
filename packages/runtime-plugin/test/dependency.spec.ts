import { config } from '../lib'
import { PluginCyclicalError, PluginNotFoundError } from '../lib/pluginErrors'
import { fetch, http } from './support'

describe('dependency', () => {
    test('simple', async () => {
        const instance = config({
            plugins: [http(), fetch()],
        })
        const context = await instance.load()
        const response = await context.fetch('https://google.com/about')
        expect(response.status).toBe(200)
    })
    test('ordering', async () => {
        const instance = config({
            plugins: [fetch(), http()],
        })
        const context = await instance.load()
        const response = await context.fetch('https://google.com/about')
        expect(response.status).toBe(200)
    })
    test('missing', async () => {
        const instance = config({
            plugins: [fetch()],
        })
        await expect(instance.load()).rejects.toThrow(PluginNotFoundError)
    })
    test('circular', async () => {
        const instance = config({
            plugins: [
                { ...http(), depends: [fetch()] },
                // @ts-expect-error
                { ...fetch(), depends: [http()] },
            ],
        })
        await expect(instance.load()).rejects.toThrow(PluginCyclicalError)
    })
})
