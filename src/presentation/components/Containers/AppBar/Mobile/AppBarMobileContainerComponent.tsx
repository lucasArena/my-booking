import {
  AppBar,
  Box,
  Container,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import type { IAppBarContainerComponentProps } from '@/presentation/components/Containers/AppBar/AppBarContainerComponent.types'
import { useAppBarMobileContainerComponent } from '@/presentation/components/Containers/AppBar/Mobile/AppBarMobileContainerComponent.rules'
import { useAppBarMobileContainerComponentStyles } from '@/presentation/components/Containers/AppBar/Mobile/AppBarMobileContainerComponent.styles'

export const AppBarMobileContainerComponent: React.FC<
  IAppBarContainerComponentProps
> = ({ pages }) => {
  const styles = useAppBarMobileContainerComponentStyles()
  const { anchorElNav, handleOpenNavMenu, handleClick } =
    useAppBarMobileContainerComponent()

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Box sx={styles.contentContainer}>
          <IconButton size="large" color="inherit" onClick={handleOpenNavMenu}>
            <Icon>menu</Icon>
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleClick}
            sx={{ display: { xs: 'block', md: 'none' } }}>
            {pages.map(page => (
              <MenuItem key={page.label} onClick={() => handleClick(page.path)}>
                <Typography sx={{ textAlign: 'center' }}>
                  {page.label}
                </Typography>
              </MenuItem>
            ))}
          </Menu>

          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={styles.logo}
            onClick={() => handleClick('/')}>
            LOGO
          </Typography>
        </Box>
      </Container>
    </AppBar>
  )
}
