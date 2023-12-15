import type { Meta, StoryObj } from '@storybook/react'
import LoginForm from './LoginForm'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'

const meta = {
  title: 'features/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  decorators: [StoreDecorator({
    loginForm: {
      email: '123', password: '234'
    }
  })]
} as Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: {},
  decorators: [StoreDecorator({
    loginForm: {
      email: '123', password: '234'
    }
  })]
}

export const Dark: Story = {
  args: {},
  decorators: [StoreDecorator({
    loginForm: {
      email: '123', password: '234'
    }
  })]
}

Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  loginForm: {
    email: '123', password: '234'
  }
})]

Light.decorators = [StoreDecorator({
  loginForm: {
    email: '123', password: '234'
  }
})]
