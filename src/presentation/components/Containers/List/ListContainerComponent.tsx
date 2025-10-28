import type { IListContainerComponentProps } from '@/presentation/components/Containers/List/ListContainerComponent.types'

export const ListContainerComponent = <TData,>({
  renderItem,
  data,
  isLoading,
  isError,
  renderError,
  renderLoading,
  renderEmpty,
}: IListContainerComponentProps<TData>) => {
  const isEmpty = !data.length

  if (isLoading) {
    return <>{renderLoading ? renderLoading() : <>Loading...</>}</>
  }

  if (isError) {
    return <>{renderError ? renderError() : <>Error...</>}</>
  }

  if (isEmpty) {
    return <>{renderEmpty ? renderEmpty() : <>No items to display.</>}</>
  }

  return <>{data.map((item, index) => renderItem(item, index))}</>
}
