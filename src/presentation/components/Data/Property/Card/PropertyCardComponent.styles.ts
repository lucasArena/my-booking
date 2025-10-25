import { alpha } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'
import type { SxProps } from '@mui/material'

export const usePropertyCardComponentStyles = (): Record<
  string,
  SxProps<Theme>
> => ({
  card: (theme: Theme) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 4,
    boxShadow: '0 20px 48px rgba(15, 23, 42, 0.12)',
    overflow: 'hidden',
    background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.96)} 0%, ${alpha(theme.palette.primary.light, 0.12)} 100%)`,
  }),
  media: {
    height: 220,
    objectFit: 'cover',
    objectPosition: 'center',
  },
  ratingChip: (theme: Theme) => ({
    backgroundColor: alpha(theme.palette.warning.main, 0.18),
    color: theme.palette.warning.dark,
    fontWeight: 600,
    '& .MuiChip-icon': {
      color: 'inherit',
    },
  }),
  cardContent: {
    px: 3,
    pt: 3,
    pb: 2,
  },
  cardActions: {
    px: 3,
    pb: 3,
    pt: 0,
    mt: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 2,
  },
  detailsButton: {
    textTransform: 'none',
    fontWeight: 600,
  },
})
