import { type StoryFn } from '@storybook/react'
import { useEffect } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import createAsyncCallback from '@loki/create-async-callback'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import isLokiRunning from '@loki/is-loki-running'

const delay = 1000

export const LokiDecorator = (StoryComponent: StoryFn) => {
  useEffect(() => {
    if (isLokiRunning()) {
      const onDone = createAsyncCallback()
      const timer = setTimeout(() => {
        onDone()
      }, delay)
      return () => { clearTimeout(timer) }
    }
    return undefined
  })
  return <StoryComponent />
}
