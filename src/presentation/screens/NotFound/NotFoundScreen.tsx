import { NoDataStateComponent } from '@/presentation/components/Feedback/NoData/NoDataStateComponent'
import { Button, Stack } from '@mui/material'

export const NotFoundPage: React.FC = () => {
  return (
    <Stack justifyContent="center" alignItems="center" height="90vh">
      <NoDataStateComponent
        messageStyle={{ fontSize: '1.5rem', fontWeight: 'bold' }}
        message="404 - Page Not Found"
        cta={
          <Button variant="contained" href="/">
            Go to Home
          </Button>
        }
      />
    </Stack>
  )
}
