import React from 'react'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import { Box, Stack, Typography } from '@mui/material'
import type { IMessageComponentProps } from '@/presentation/components/Feedback/Message/MessageComponent.types'

export const MessageComponent: React.FC<IMessageComponentProps> = ({
  Icon,
  message,
  cta,
  messageStyle,
}) => {
  return (
    <Box width="100%" py={6} display="flex" justifyContent="center">
      <Stack spacing={2} alignItems="center">
        {Icon ?? <InboxOutlinedIcon color="disabled" sx={{ fontSize: 124 }} />}

        <Typography
          variant="subtitle1"
          color="text.secondary"
          textAlign="center"
          sx={messageStyle}>
          {message}
        </Typography>

        {cta}
      </Stack>
    </Box>
  )
}
