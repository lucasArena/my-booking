import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import type { IPropertyCardProps } from '@/presentation/components/Data/Property/Card/PropertyCardComponent.types'
import { usePropertyCardComponentStyles } from '@/presentation/components/Data/Property/Card/PropertyCardComponent.styles'

export const PropertyCardComponent: React.FC<IPropertyCardProps> = ({
  img,
  name,
  description,
  location,
  actions,
}) => {
  const styles = usePropertyCardComponentStyles()

  return (
    <Card sx={styles.card}>
      <CardMedia
        component="img"
        height={220}
        image={img}
        alt={name}
        sx={styles.media}
      />
      <CardContent sx={styles.cardContent}>
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1.5}>
            <div>
              <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
                {name}
              </Typography>

              <Typography variant="body2" color="text.secondary" mt={0.5}>
                {location}
              </Typography>
            </div>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Stack>
      </CardContent>

      {actions && (
        <>
          <Divider />
          <CardActions sx={styles.cardActions}>{actions}</CardActions>
        </>
      )}
    </Card>
  )
}
