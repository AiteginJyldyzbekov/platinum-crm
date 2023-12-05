import { StoryFn } from "@storybook/react";
import { useEffect } from "react";
// @ts-ignore
import createAsyncCallback from "@loki/create-async-callback";
// @ts-ignore
import isLokiRunning from "@loki/is-loki-running"

const delay = 1000

export const LokiDecorator = (StoryComponent: StoryFn) => {
    useEffect(() => {
        if (isLokiRunning()) {
            const onDone = createAsyncCallback()
            const timer = setTimeout(() => {
                onDone()
            }, delay)
            return () => clearTimeout(timer)
        }
        return undefined
    })
    return <StoryComponent />
}