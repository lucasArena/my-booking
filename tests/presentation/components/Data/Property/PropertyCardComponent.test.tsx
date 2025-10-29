import { render, screen } from '@testing-library/react'

import { PropertyCardComponent } from '@/presentation/components/Data/Property/Card/PropertyCardComponent'

const baseProps = {
  name: 'Cozy Cabin',
  description: 'A warm and inviting cabin in the woods.',
  img: 'https://example.com/cabin.jpg',
  location: 'Lake Tahoe, CA',
}

describe('PropertyCardComponent', () => {
  it('should render the property information', () => {
    render(<PropertyCardComponent {...baseProps} />)

    const image = screen.getByRole('img', { name: baseProps.name })
    const { name, description, location } = baseProps

    expect(image).toBeTruthy()
    expect(image.getAttribute('src')).toBe(baseProps.img)
    expect(screen.getByText(name)).toBeTruthy()
    expect(screen.getByText(description)).toBeTruthy()
    expect(screen.getByText(location)).toBeTruthy()
  })

  it('should render optional actions when provided', () => {
    render(
      <PropertyCardComponent
        {...baseProps}
        actions={<button type="button">Book now</button>}
      />,
    )

    expect(screen.getByRole('button', { name: 'Book now' })).toBeTruthy()
  })

  it('should hide actions section when no actions are provided', () => {
    render(<PropertyCardComponent {...baseProps} actions={undefined} />)

    expect(screen.queryByRole('button', { name: 'Book now' })).toBeNull()
  })
})
