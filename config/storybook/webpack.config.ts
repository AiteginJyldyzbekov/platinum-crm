import type webpack from 'webpack'
import path from 'path'
import { buildCssLoader } from '../build/loaders/buildCssLoader'
import { DefinePlugin, type RuleSetRule } from 'webpack'
import { type BuildPaths } from '../../config/build/types/config'

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src')
  }
  config.resolve.modules.push(paths.src)
  config.resolve.extensions.push('.ts', '.tsx')

  config.module.rules = config.module.rules.map((rule: RuleSetRule) =>
    (rule.test as RegExp)?.test('.svg')
      ? { ...rule, exclude: /assets.+\.svg$/ }
      : rule
  )

  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack']
  })
  config.module.rules.push(buildCssLoader(true))

  config.plugins.push(new DefinePlugin(
    { __IS_DEV__: true }
  ))

  return config
}
