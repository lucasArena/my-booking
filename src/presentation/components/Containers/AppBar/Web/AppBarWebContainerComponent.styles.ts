import type { SystemStyleObject, Theme } from '@mui/system'

type AppBarWebStyles = Record<string, SystemStyleObject<Theme>>

export const useAppBarWebContainerComponentStyles = (): AppBarWebStyles => ({
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
  navButton: {
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 12,
    px: 2.5,
    py: 1,
  },
  navButtonActive: {
    backgroundColor: 'common.white',
    color: 'primary.main',
    '&:hover': {
      backgroundColor: 'grey.100',
    },
  },
})
