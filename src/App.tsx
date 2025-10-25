import React from 'react'
import { ToastContainer } from 'react-toastify'

import { ApplicationProviderComponent } from '@/presentation/components/Providers/Application/ApplicationProviderComponent.tsx'
import { RoutesConfig } from '@/application/routes/Routes.tsx'
import { PropertyProviderComponent } from '@/presentation/components/Providers/Property/PropertyProviderComponent.tsx'

export const App: React.FC = () => (
  <ApplicationProviderComponent>
    <PropertyProviderComponent>
      <RoutesConfig />
    </PropertyProviderComponent>

    <ToastContainer />
  </ApplicationProviderComponent>
)
