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
