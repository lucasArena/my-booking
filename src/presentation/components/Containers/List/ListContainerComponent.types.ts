export interface IListContainerComponentProps<TData> {
  data: TData[]
  isLoading: boolean
  isError: boolean
  renderItem: (item: TData, index: number) => React.ReactNode
  renderLoading?: () => React.ReactNode
  renderError?: () => React.ReactNode
  renderEmpty?: () => React.ReactNode
}
