import { buildContext } from './context/contextFactory'
import { PluginConfig } from './pluginConfig'
import { PluginObject } from './pluginTypes'

export class Plugins<TPluginObject extends PluginObject<any>> {
    constructor(public config: PluginConfig<TPluginObject>) {}
    async load() {
        return buildContext<TPluginObject>(
            this.config.emitter,
            this.config.plugins
        )
    }
}
