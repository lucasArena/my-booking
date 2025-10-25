import { BrowserRouter } from 'react-router-dom'
import { LayoutContainerComponent } from '@/presentation/components/Containers/Layout/LayoutContainer'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { enUS } from 'date-fns/locale'

export const ApplicationProviderComponent: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
      <BrowserRouter>
        <LayoutContainerComponent>{children}</LayoutContainerComponent>
      </BrowserRouter>
    </LocalizationProvider>
  )
}
