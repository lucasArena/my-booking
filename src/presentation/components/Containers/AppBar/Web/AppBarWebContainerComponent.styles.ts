import type { SystemStyleObject, Theme } from '@mui/system'

type AppBarWebStyles = Record<string, SystemStyleObject<Theme>>

export const useAppBarWebContainerComponentStyles = (): AppBarWebStyles => ({
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    display: 'flex',
    gap: 2,
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
