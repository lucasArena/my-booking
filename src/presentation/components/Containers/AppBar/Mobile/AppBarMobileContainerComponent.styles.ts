import type { SxProps, Theme } from '@mui/material'

export const useAppBarMobileContainerComponentStyles = (): Record<
  string,
  SxProps<Theme>
> => ({
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
