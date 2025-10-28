import type { IHttpClient } from '@/infra/HttpClient/HttpClient.types'
import type { PropertyGetAvailableServiceNamespace } from '@/services/Property/GetAvailable/PropertyGetAvailableService.types'

export class PropertyGetAvailableService {
  private httpClient: IHttpClient
  private static instance: PropertyGetAvailableService

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient
  }

  static getInstance(httpClient: IHttpClient) {
    if (!PropertyGetAvailableService.instance) {
      PropertyGetAvailableService.instance = new PropertyGetAvailableService(
        httpClient,
      )
    }

    return PropertyGetAvailableService.instance
  }

  async handle(
    params: PropertyGetAvailableServiceNamespace.TRequest,
  ): Promise<PropertyGetAvailableServiceNamespace.TResponse> {
    return await this.httpClient.get<
      PropertyGetAvailableServiceNamespace.TRequest,
      PropertyGetAvailableServiceNamespace.TResponse
    >('/properties/available', params)
  }
}
