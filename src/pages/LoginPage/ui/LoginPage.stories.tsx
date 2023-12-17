import type { Meta, StoryObj } from '@storybook/react'
import { LoginPage } from './LoginPage'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'

const meta = {
  title: 'pages/LoginPage',
  component: LoginPage,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta<typeof LoginPage>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: {
    decorators: [
      [StoreDecorator({
        loginForm: { email: '123', password: 'asd' }
      })]
    ]
  }
}

export const Dark: Story = {
  args: {
    decorators: [
      [StoreDecorator({
        loginForm: { email: '123', password: 'asd' }
      })]
    ]
  }
}

Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  loginForm: { email: '123', password: '123' }
})]
Light.decorators = [StoreDecorator({
  loginForm: { email: '123', password: '123' }
})]
