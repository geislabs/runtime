import { config as createEvent, Dependency, Event, runtime } from '../lib'

type HttpEvent =
    | Event<'beforeRequest', { url: string }>
    | Event<'afterRequest', { url: string }>

export interface Http extends Dependency<'http', HttpEvent> {
    request: () => { status: number }
}

const http: Http = {
    name: 'http' as const,
    events: createEvent<HttpEvent>(),
    request: () => ({ status: 200 }),
}

const actual = runtime({
    dependencies: [http],
})

describe('register', () => {
    test('simple', () => {
        expect.hasAssertions()
        actual.register(({ http }) => {
            expect(http.request().status).toBe(200)
        })
    })
    test('events', () => {
        expect.hasAssertions()
        actual.register(({ http }) => {
            http.events.on('beforeRequest', () => undefined)
            expect(http.request().status).toBe(200)
        })
    })
})
