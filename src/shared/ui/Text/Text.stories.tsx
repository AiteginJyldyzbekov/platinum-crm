import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { TextTheme, Text } from './Text'

const meta = {
  title: 'shared/Text',
  component: Text,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: 'Title lorem ipsum',
    text: 'text lorem ipsum'
  }
}

export const onlyText: Story = {
  args: { text: 'text lorem ipsum' }
}

export const onlyTitle: Story = {
  args: { title: 'Title lorem ipsum' }
}

export const PrimaryDark: Story = {
  args: {
    title: 'Title lorem ipsum',
    text: 'text lorem ipsum'
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const onlyTextDark: Story = {
  args: { text: 'text lorem ipsum' },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const onlyTitleDark: Story = {
  args: { title: 'Title lorem ipsum' },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Error: Story = {
  args: {
    title: 'Title lorem ipsum',
    text: 'text lorem ipsum',
    theme: TextTheme.ERROR
  }
}
