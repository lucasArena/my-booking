import { render, screen } from '@testing-library/react'
import { vi, type Mock } from 'vitest'

import { LayoutContainerComponent } from '@/presentation/components/Containers/Layout/LayoutContainer'
import type { IAppBarContainerComponentProps } from '@/presentation/components/Containers/AppBar/AppBarContainerComponent.types'

const mocks = vi.hoisted(() => {
  const useMediaQuery = vi.fn()
  const mobileAppBar = vi.fn(({ pages }: IAppBarContainerComponentProps) => (
    <div data-testid="mobile-app-bar">
      {pages.map(page => page.label).join(',')}
    </div>
  ))
  const webAppBar = vi.fn(({ pages }: IAppBarContainerComponentProps) => (
    <div data-testid="web-app-bar">
      {pages.map(page => page.label).join(',')}
    </div>
  ))

  return {
    useMediaQuery,
    mobileAppBar,
    webAppBar,
  }
})

vi.mock('@mui/material', async () => {
  const actual =
    await vi.importActual<typeof import('@mui/material')>('@mui/material')

  return {
    ...actual,
    useMediaQuery: mocks.useMediaQuery,
  }
})

vi.mock(
  '@/presentation/components/Containers/AppBar/Mobile/AppBarMobileContainerComponent',
  () => ({ AppBarMobileContainerComponent: mocks.mobileAppBar }),
)

vi.mock(
  '@/presentation/components/Containers/AppBar/Web/AppBarWebContainerComponent',
  () => ({ AppBarWebContainerComponent: mocks.webAppBar }),
)

const {
  useMediaQuery: useMediaQueryMock,
  mobileAppBar: mobileAppBarMock,
  webAppBar: webAppBarMock,
} = mocks

const extractPages = (mock: Mock): IAppBarContainerComponentProps['pages'] => {
  const props = mock.mock.calls[0]?.[0] as
    | IAppBarContainerComponentProps
    | undefined

  return props?.pages ?? []
}

describe('LayoutContainerComponent', () => {
  beforeEach(() => {
    useMediaQueryMock.mockReset()
    mobileAppBarMock.mockClear()
    webAppBarMock.mockClear()
  })

  it('renders the mobile app bar when the viewport is mobile', () => {
    useMediaQueryMock.mockReturnValue(true)

    render(
      <LayoutContainerComponent>
        <div>Content</div>
      </LayoutContainerComponent>,
    )

    expect(screen.getByTestId('mobile-app-bar')).toHaveTextContent(
      'My bookings',
    )
    expect(screen.queryByTestId('web-app-bar')).not.toBeInTheDocument()
    const pages = extractPages(mobileAppBarMock)
    expect(pages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: 'My bookings', path: '/my-bookings' }),
      ]),
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders the web app bar when the viewport is desktop', () => {
    useMediaQueryMock.mockReturnValue(false)

    render(
      <LayoutContainerComponent>
        <div>Other content</div>
      </LayoutContainerComponent>,
    )

    expect(screen.getByTestId('web-app-bar')).toHaveTextContent('My bookings')
    expect(screen.queryByTestId('mobile-app-bar')).not.toBeInTheDocument()
    const pages = extractPages(webAppBarMock)
    expect(pages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: 'My bookings', path: '/my-bookings' }),
      ]),
    )
    expect(screen.getByText('Other content')).toBeInTheDocument()
  })
})
