import type { SxProps, Theme } from '@mui/material'

export const useAppBarWebContainerComponentStyles = (): Record<
  string,
  SxProps<Theme>
> => ({
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    display: 'flex',
    gap: 2,
  },
  logo: {
    cursor: 'pointer',
    mr: 2,
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
  },
})
