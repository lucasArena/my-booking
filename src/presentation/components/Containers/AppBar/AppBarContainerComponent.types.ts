export interface IAppBar {
  label: string
  path: string
  icon: string
}

export interface IAppBarContainerComponentProps {
  pages: IAppBar[]
}
