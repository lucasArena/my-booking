import { Card, CardContent, Skeleton, Stack, Typography } from '@mui/material'
import { usePropertyCardComponentStyles } from '@/presentation/components/Data/Property/Card/PropertyCardComponent.styles'

export const PropertyCardSkeletonComponent: React.FC = () => {
  const styles = usePropertyCardComponentStyles()

  return (
    <Card sx={styles.card}>
      <Skeleton variant="rectangular" height={220} width={'100%'} />

      <CardContent sx={styles.cardContent}>
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1.5}>
            <div>
              <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
                <Skeleton variant="text" width="120px" />
              </Typography>

              <Typography variant="body2" color="text.secondary" mt={0.5}>
                <Skeleton variant="text" width="80px" />
              </Typography>
            </div>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            <Skeleton variant="text" width="200px" />
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
