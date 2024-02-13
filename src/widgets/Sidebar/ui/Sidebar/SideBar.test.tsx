import { screen } from '@testing-library/react'
import { componentRender } from 'shared/lib/tests/componentRender/renderComponent'
import {
  Sidebar
} from 'widgets/Sidebar/ui/Sidebar/Sidebar'

describe('Sidebar', () => {
  test('Test render', () => {
    componentRender(<Sidebar />)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })
})
