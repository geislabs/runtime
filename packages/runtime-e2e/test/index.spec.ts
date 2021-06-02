import { config } from '@geislabs/runtime'

const plugins = config({
    plugins: [
        {
            name: 'value' as const,
            register() {
                return { get: () => 5 }
            },
        },
    ],
})

describe('e2e', () => {
    test('simple', async () => {
        const { value } = await plugins.load()
        expect(value.get()).toBe(5)
    })
})
