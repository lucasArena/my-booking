import { alpha } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'
import type { SxProps } from '@mui/material'

export const useHomeStyles = (): Record<string, SxProps<Theme>> => ({
  hero: (theme: Theme) => ({
    position: 'relative',
    overflow: 'hidden',
    color: theme.palette.common.white,
    py: { xs: 8, md: 12 },
    borderBottomLeftRadius: { xs: 48, md: 96 },
    borderBottomRightRadius: { xs: 48, md: 96 },
    background: `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 50%, ${theme.palette.grey[700]} 100%)`,
  }),
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    background:
      'radial-gradient(circle at 15% 25%, rgba(255, 255, 255, 0.18), transparent 45%), radial-gradient(circle at 85% 20%, rgba(255, 255, 255, 0.12), transparent 40%), radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.15), transparent 40%)',
  },
  heroContainer: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContent: {
    width: '100%',
    maxWidth: 760,
    textAlign: 'center',
    alignItems: 'center',
    mx: 'auto',
  },
  heroTitle: {
    fontWeight: 800,
    fontSize: { xs: '2.5rem', md: '3.75rem' },
    lineHeight: 1,
  },
  heroSubtitle: {
    maxWidth: 520,
    color: 'rgba(255, 255, 255, 0.84)',
    mx: 'auto',
  },
  searchPaper: (theme: Theme) => ({
    mt: { xs: 4, md: 6 },
    p: { xs: 3, sm: 3 },
    borderRadius: 10,
    backgroundColor: alpha(theme.palette.common.white, 0.92),
    boxShadow: '0 24px 48px rgba(15, 23, 42, 0.25)',
  }),
  searchStack: {
    flexDirection: { xs: 'column', sm: 'row' },
    gap: { xs: 2, sm: 2.5 },
    alignItems: { xs: 'stretch', sm: 'center' },
    justifyContent: 'center',
  },
  searchField: (theme: Theme) => ({
    flex: 1,
    minWidth: { sm: 170 },
    '& .MuiOutlinedInput-root': {
      borderRadius: 9999,
      backgroundColor: alpha(theme.palette.common.white, 0.16),
    },
    '& .MuiInputLabel-root': {
      fontWeight: 600,
    },
  }),
  searchButton: {
    alignSelf: { xs: 'stretch', sm: 'center' },
    minWidth: { sm: 140 },
    borderRadius: 9999,
    textTransform: 'none',
    fontWeight: 700,
    py: 1.5,
    boxShadow: 'none',
  },
  heroHighlights: {
    mt: { xs: 4, md: 5 },
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightChip: (theme: Theme) => ({
    backgroundColor: alpha(theme.palette.common.white, 0.12),
    color: theme.palette.common.white,
    fontWeight: 600,
    borderRadius: 9999,
    px: 1.5,
  }),
})
