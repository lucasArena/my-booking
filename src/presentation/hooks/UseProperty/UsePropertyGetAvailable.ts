import { useFetch } from '@/presentation/hooks/UseFetch/UseFetch'
import { makePropertyGetAvailableServiceFactory } from '@/application/factories/services/Property/PropertyGetAvailableServiceFactory'

export const usePropertyGetAvailable = () => {
  return useFetch(makePropertyGetAvailableServiceFactory())
}
