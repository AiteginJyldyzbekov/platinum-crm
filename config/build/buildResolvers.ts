import { type BuildOptions } from './types/config'
import { type ResolveOptions } from 'webpack'

export function buildResolvers (options: BuildOptions): ResolveOptions {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    preferAbsolute: true,
    modules: [options.paths.src, 'node_modules'],
    mainFiles: ['index'],
    alias: {}
  }
}
