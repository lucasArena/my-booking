import { useState } from 'react'
import type { IFetch } from '@/presentation/hooks/UseFetch/UseFetch.types'

export const useFetch = <TRequest, TResponse>(
  client: IFetch<TRequest, Promise<TResponse>>,
) => {
  const [data, setData] = useState<TResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleFetch = async (request: TRequest) => {
    setError(null)
    setIsSuccess(false)

    try {
      setIsLoading(true)

      const response = await client.handle(request)

      setData(response)
      setIsSuccess(true)

      return response
    } catch (error) {
      const safeError = error as Error

      setError(
        safeError.message ??
          'Sorry, an unexpected error occurred. Please try again later.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetState = () => {
    setIsLoading(false)
    setIsSuccess(false)
    setError(null)
    setData(null)
  }

  return {
    data,
    isSuccess,
    isLoading,
    error,
    handleFetch,
    handleResetState,
  }
}
