import { fireEvent, screen } from '@testing-library/react'
import { componentRender } from 'shared/lib/tests/componentRender/renderComponent'
import { Counter } from './Counter'

describe('Counter', () => {
  test('Test render', () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } }
    })
    expect(screen.getByTestId('value-title')).toHaveTextContent('10')
  })

  test('increment', () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } }
    })
    fireEvent.click(screen.getByTestId('increment-button'))
    expect(screen.getByTestId('value-title')).toHaveTextContent('11') // Проверка на увеличение на 1
  })

  test('decrement', () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } }
    })
    fireEvent.click(screen.getByTestId('decrement-button'))
    expect(screen.getByTestId('value-title')).toHaveTextContent('9') // Проверка на уменьшение на 1
  })
})
