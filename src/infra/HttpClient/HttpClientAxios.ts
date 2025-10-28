import type {
  IHttpClient,
  IHttpClientConstructor,
} from '@/infra/HttpClient/HttpClient.types'
import Axios from 'axios'

export class HttpClientAxios implements IHttpClient {
  private static instance: HttpClientAxios
  private axiosInstance

  constructor(config?: IHttpClientConstructor) {
    this.axiosInstance = Axios.create({
      baseURL: config?.baseURL,
    })
  }

  static getInstance(config?: IHttpClientConstructor) {
    if (!HttpClientAxios.instance) {
      HttpClientAxios.instance = new HttpClientAxios(config)
    }

    return HttpClientAxios.instance
  }

  async get<TRequest = Record<string, unknown>, TResponse = void>(
    url: string,
    params: TRequest,
  ): Promise<TResponse> {
    const response = await this.axiosInstance.get(url, { params })

    return response.data
  }
  post<TRequest, TResponse>(url: string, data: TRequest): Promise<TResponse> {
    return this.axiosInstance.post(url, data)
  }
  put<TRequest, TResponse>(url: string, data: TRequest): Promise<TResponse> {
    return this.axiosInstance.put(url, data)
  }
  delete(url: string): Promise<unknown> {
    return this.axiosInstance.delete(url)
  }
}
