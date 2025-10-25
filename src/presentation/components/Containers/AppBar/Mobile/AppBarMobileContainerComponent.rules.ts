import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAppBarMobileContainerComponent = () => {
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleClick = (path: string) => {
    setAnchorElNav(null)

    navigate(path)
  }

  return {
    anchorElNav,
    handleOpenNavMenu,
    handleClick,
  }
}
