import { Plugin } from '../../lib'
import { HttpConfig } from './testConfig'
import { HttpEvent } from './testEvents'

export interface TestRequest {
    url: string
}

export interface TestResponse {
    status: number
    request: TestRequest
}

export interface TestHttpExports {
    request: (request: TestRequest) => Promise<TestResponse>
}

export interface HttpPlugin
    extends Plugin<'http', HttpConfig, TestHttpExports, never, HttpEvent> {}

export interface ProxyMapping {
    [key: string]: string
}
