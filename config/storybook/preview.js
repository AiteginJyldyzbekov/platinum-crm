import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator'
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '../../src/app/providers/ThemeProvider'
import { RouteDecorator } from '../../src/shared/config/storybook/RouteDecorator/RouteDecorator'
import '../../src/shared/config/i18n/i18n'

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export const decorators = [
  StyleDecorator,
  ThemeDecorator(Theme.LIGHT),
  RouteDecorator()
]

export default preview
