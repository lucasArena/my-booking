import { useContext } from 'react'

import { PropertyContext } from '@/presentation/components/Providers/Property/PropertyProviderComponent.rules'

export const usePropertyContext = () => {
  const context = useContext(PropertyContext)

  if (!context) {
    throw new Error(
      'usePropertyProviderComponent must be used within a PropertyProviderComponent',
    )
  }

  return context
}
