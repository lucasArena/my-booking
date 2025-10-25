import {
  PropertyContext,
  usePropertyProviderComponent,
} from '@/presentation/components/Providers/Property/PropertyProviderComponent.rules'

export const PropertyProviderComponent: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const rules = usePropertyProviderComponent()

  return (
    <PropertyContext.Provider value={rules}>
      {children}
    </PropertyContext.Provider>
  )
}
