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
  logo: {
    mr: 2,
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
  },
})
