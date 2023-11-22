import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

const meta = {
  title: 'widget/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: {}
}

export const Dark: Story = {
  args: {}
}

Dark.decorators = [ThemeDecorator(Theme.DARK)]
