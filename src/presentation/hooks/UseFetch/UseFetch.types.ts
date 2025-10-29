export interface IFetch<TRequest, TResponse> {
  handle: (request: TRequest) => TResponse
}
