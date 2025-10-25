import {
  AppBar,
  Box,
  Button,
  Container,
  Icon,
  Toolbar,
  Typography,
} from '@mui/material'
import type { IAppBarContainerComponentProps } from '@/presentation/components/Containers/AppBar/AppBarContainerComponent.types'
import { useAppBarWebContainerComponentStyles } from '@/presentation/components/Containers/AppBar/Web/AppBarWebContainerComponent.styles'
import { useNavigate } from 'react-router-dom'

export const AppBarWebContainerComponent: React.FC<
  IAppBarContainerComponentProps
> = ({ pages }) => {
  const navigate = useNavigate()
  const styles = useAppBarWebContainerComponentStyles()

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={styles.contentContainer}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={styles.logo}
            onClick={() => navigate('/')}>
            LOGO
          </Typography>

          <Box sx={styles.buttonContainer}>
            {pages.map(page => (
              <Box key={page.label}>
                <Button
                  key={page.label}
                  color="inherit"
                  onClick={() => navigate(page.path)}
                  startIcon={<Icon>{page.icon}</Icon>}>
                  {page.label}
                </Button>
              </Box>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
