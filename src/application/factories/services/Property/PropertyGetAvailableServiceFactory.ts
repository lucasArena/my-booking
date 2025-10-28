import { HttpClientAxios } from '@/infra/HttpClient/HttpClientAxios'
import { PropertyGetAvailableService } from '@/services/Property/GetAvailable/PropertyGetAvailableService'

export const makePropertyGetAvailableServiceFactory = () => {
  const httpClient = HttpClientAxios.getInstance()

  return PropertyGetAvailableService.getInstance(httpClient)
}
