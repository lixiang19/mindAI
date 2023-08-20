import { last } from 'lodash-es'
import pluginMap from '../plugins'
export default class ChatPlugin {
  plugins: string[]
  runPluginType: CharacterType['runPluginType']
  selectPluginType: CharacterType['selectPluginType']
  constructor(characterInfo: CharacterType) {
    this.plugins = characterInfo.plugins || []
    this.selectPluginType = characterInfo.selectPluginType || 'first'
    this.runPluginType = characterInfo.runPluginType || 'select'
  }
  selectPlugins(messages: Messages, context: string) {
    // 选择插件
    if (this.selectPluginType === 'startsWith') {
      const message = last(messages)
      const { content } = message
      if (content.startsWith('http')) {
        return 'urlRead'
      } else if (content.startsWith('?') || content.startsWith('？')) {
        return 'bingSearch'
      } else if (content.startsWith('!') || content.startsWith('！')) {
        return 'parsingPage'
      } else {
        return null
      }
    } else {
      return this.plugins[0]
    }
  }
  async runPlugin(messages: Messages, context: string) {
    if (this.plugins.length === 0) {
      return messages
    }
    if (this.runPluginType === 'select') {
      const pluginName = this.selectPlugins(messages, context)
      if (pluginName) {
        const plugin = pluginMap[pluginName]
        const pluginInstance = new plugin()
        messages[messages.length - 1] = await pluginInstance.preUserMessage(
          messages[messages.length - 1]
        )
        return messages
      } else {
        return messages
      }
    } else {
      for (const pluginName of this.plugins) {
        const plugin = pluginMap[pluginName]
        const pluginInstance = new plugin()
        messages[messages.length - 1] = await pluginInstance.preUserMessage(
          messages[messages.length - 1]
        )
      }
      return messages
    }
  }
}
