import { Plugin } from './pluginTypes'

export class PluginError extends Error {
    constructor(message?: string) {
        super(message)
        Object.setPrototypeOf(this, PluginError.prototype)
    }
}

export class PluginCyclicalError extends PluginError {
    constructor(public path: Plugin<any>[]) {
        super(`plugin "${path[0]?.name}" has circular dependencies`)
        Object.setPrototypeOf(this, PluginCyclicalError.prototype)
    }
}

export class PluginNotFoundError extends PluginError {
    constructor(public pluginName: string) {
        super(`plugin "${pluginName}" not found`)
        Object.setPrototypeOf(this, PluginNotFoundError.prototype)
    }
}
