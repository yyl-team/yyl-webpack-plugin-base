const { YylWebpackPluginBase } = require('../../../')
const path = require('path')

const PLUGIN_NAME = 'iPlugin'

class IPlugin extends YylWebpackPluginBase {
  static getHooks(compilation) {
    return {}
  }
  static getName() {
    return PLUGIN_NAME
  }
  constructor(op) {
    super({
      ...op,
      name: PLUGIN_NAME
    })
  }
  async apply(compiler) {
    const { name } = this
    const { compilation, done } = await this.initCompilation(compiler)
    const logger = compilation.getLogger(name)
    const addMark = function (htmlStr) {
      return `${htmlStr}<!-- plugin mark -->`
    }
    logger.group(name)

    Object
      .keys(compilation.assets)
      .filter((x) => path.extname(x) === '.html')
      .forEach((key) => {
        const srcIndex = Object.keys(this.assetMap).map((key) => this.assetMap[key]).indexOf(key)

        this.updateAssets({
          compilation,
          oriDist: key,
          assetsInfo: {
            src: srcIndex === -1 ? undefined : assetMapKeys[srcIndex],
            source: Buffer.from(
              addMark(
                compilation.assets[key].source().toString()
              ),
              'utf-8'
            ),
            dist: key
          }
        })
        logger.info(`update ${key}`)
      })

    // - init assetMap
    logger.groupEnd()
    done()
  }
}

module.exports = IPlugin