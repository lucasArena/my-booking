export interface IHttpClient {
  get<TRequest = Record<string, unknown>, TResponse = void>(
    url: string,
    params: TRequest,
    config?: unknown,
  ): Promise<TResponse>
  post<TRequest = Record<string, unknown>, TResponse = void>(
    url: string,
    data: TRequest,
    config?: unknown,
  ): Promise<TResponse>
  put<TRequest = Record<string, unknown>, TResponse = void>(
    url: string,
    data: TRequest,
    config?: unknown,
  ): Promise<TResponse>
  delete(url: string, config?: unknown): Promise<unknown>
}

export interface IHttpClientConstructor {
  baseURL: string
}
