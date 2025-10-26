import { render, screen } from '@testing-library/react'

import { NoDataStateComponent } from '@/presentation/components/Feedback/NoData/NoDataStateComponent'

describe('NoDataStateComponent', () => {
  it('should display the provided message', () => {
    render(<NoDataStateComponent message="Nothing to see here" />)

    expect(screen.getByText('Nothing to see here')).toBeInTheDocument()
  })

  it('should render the call-to-action when provided', () => {
    render(
      <NoDataStateComponent
        message="No properties available"
        cta={<button type="button">Search again</button>}
      />,
    )

    expect(
      screen.getByRole('button', { name: 'Search again' }),
    ).toBeInTheDocument()
  })
})
