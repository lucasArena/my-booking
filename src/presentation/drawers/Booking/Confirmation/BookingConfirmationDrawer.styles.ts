import { styled } from '@mui/material/styles'

export const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.grey[700]
      : theme.palette.grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}))
