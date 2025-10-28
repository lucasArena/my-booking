import { render, screen } from '@testing-library/react'

import { MessageComponent } from '@/presentation/components/Feedback/Message/MessageComponent'

describe('NoDataStateComponent', () => {
  it('should display the provided message', () => {
    render(<MessageComponent message="Nothing to see here" />)

    expect(screen.getByText('Nothing to see here')).toBeInTheDocument()
  })

  it('should render the call-to-action when provided', () => {
    render(
      <MessageComponent
        message="No properties available"
        cta={<button type="button">Search again</button>}
      />,
    )

    expect(
      screen.getByRole('button', { name: 'Search again' }),
    ).toBeInTheDocument()
  })
})
