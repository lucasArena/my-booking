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

  it('wraps children with the application providers', () => {
    render(
      <ApplicationProviderComponent>
        <span>App content</span>
      </ApplicationProviderComponent>,
    )

    expect(screen.getByText('App content')).toBeInTheDocument()
    expect(screen.getByTestId('layout-mock')).toBeInTheDocument()
    expect(layoutMock).toHaveBeenCalledWith(
      expect.objectContaining({ children: expect.anything() }),
    )
  })
})
