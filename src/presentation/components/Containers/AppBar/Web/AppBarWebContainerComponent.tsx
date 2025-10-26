import { AppBar, Box, Button, Container, Icon, Toolbar } from '@mui/material'
import type { IAppBarContainerComponentProps } from '@/presentation/components/Containers/AppBar/AppBarContainerComponent.types'
import { useAppBarWebContainerComponentStyles } from '@/presentation/components/Containers/AppBar/Web/AppBarWebContainerComponent.styles'
import { useLocation, useNavigate } from 'react-router-dom'

export const AppBarWebContainerComponent: React.FC<
  IAppBarContainerComponentProps
> = ({ pages }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const styles = useAppBarWebContainerComponentStyles()

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={styles.contentContainer}>
          <Box sx={styles.buttonContainer}>
            {pages.map(page => {
              const isActive = location.pathname === page.path

              return (
                <Box key={page.label}>
                  <Button
                    color="inherit"
                    onClick={() => navigate(page.path)}
                    startIcon={<Icon>{page.icon}</Icon>}
                    data-active={isActive ? 'true' : 'false'}
                    sx={{
                      ...styles.navButton,
                      ...(isActive ? styles.navButtonActive : {}),
                    }}>
                    {page.label}
                  </Button>
                </Box>
              )
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
