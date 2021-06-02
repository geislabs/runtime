import { buildContext } from './context/contextFactory'
import { PluginConfig } from './pluginConfig'
import { Plugin } from './pluginTypes'

export class Plugins<TPlugin extends Plugin<string>> {
    constructor(public config: PluginConfig<TPlugin>) {}
    async load() {
        return buildContext<TPlugin>(this.config.emitter, this.config.plugins)
    }
}
