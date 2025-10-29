import { render, screen } from '@testing-library/react'

import { MessageComponent } from '@/presentation/components/Feedback/Message/MessageComponent'

describe('NoDataStateComponent', () => {
  it('should display the provided message', () => {
    render(<MessageComponent message="Nothing to see here" />)

    const message = screen.getByText('Nothing to see here')

    expect(message).toBeTruthy()
    expect(message.textContent).toBe('Nothing to see here')
  })

  it('should render the call-to-action when provided', () => {
    render(
      <MessageComponent
        message="No properties available"
        cta={<button type="button">Search again</button>}
      />,
    )

    const button = screen.getByRole('button', { name: 'Search again' })

    expect(button).toBeTruthy()
    expect((button as HTMLButtonElement).type).toBe('button')
  })
})
