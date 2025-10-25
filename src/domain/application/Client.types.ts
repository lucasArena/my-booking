export interface IClient<TRequest, TResponse> {
  handle: (request: TRequest) => TResponse
}
