export class DependencyError extends Error {
    constructor() {
        super()
        Object.setPrototypeOf(this, DependencyError.prototype)
    }
}
