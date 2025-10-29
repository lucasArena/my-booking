import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { ApplicationProviderComponent } from '@/presentation/components/Providers/Application/ApplicationProviderComponent'

const layoutMock = vi.fn(({ children }: React.PropsWithChildren) => (
  <div data-testid="layout-mock">{children}</div>
))

vi.mock('@/presentation/components/Containers/Layout/LayoutContainer', () => ({
  LayoutContainerComponent: (props: React.PropsWithChildren) =>
    layoutMock(props),
}))

describe('ApplicationProviderComponent', () => {
  beforeEach(() => {
    layoutMock.mockClear()
  })

  it('should wrap children with the application providers', () => {
    render(
      <ApplicationProviderComponent>
        <span>App content</span>
      </ApplicationProviderComponent>,
    )

    const content = screen.getByText('App content')
    const layout = screen.getByTestId('layout-mock')

    expect(content).toBeTruthy()
    expect(layout).toBeTruthy()
    expect(layoutMock).toHaveBeenCalledWith(
      expect.objectContaining({ children: expect.anything() }),
    )
  })
})
