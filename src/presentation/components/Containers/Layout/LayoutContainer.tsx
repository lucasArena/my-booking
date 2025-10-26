import React from 'react'

import { useMediaQuery } from '@mui/material'
import { AppBarMobileContainerComponent } from '@/presentation/components/Containers/AppBar/Mobile/AppBarMobileContainerComponent'
import { AppBarWebContainerComponent } from '@/presentation/components/Containers/AppBar/Web/AppBarWebContainerComponent'

export const LayoutContainerComponent: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const pages = [
    {
      label: 'Book now',
      path: '/',
      icon: 'calendar_month_outlined',
    },
    { label: 'My bookings', path: '/my-bookings', icon: 'house_outlined' },
  ]

  const isMobile = useMediaQuery('(max-width:768px)')

  const AppBarContent = isMobile
    ? AppBarMobileContainerComponent
    : AppBarWebContainerComponent

  return (
    <>
      <AppBarContent pages={pages} />

      {children}
    </>
  )
}
