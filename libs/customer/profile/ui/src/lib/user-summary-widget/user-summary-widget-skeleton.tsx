import { Card, CardContent, Stack, Skeleton, Box } from "@mui/material";


export const UserSummaryWidgetSkeleton: React.FC = () => {
  return (
    <Card sx={{ maxHeight: '20vh' }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Skeleton variant="circular" width={56} height={56} />
          <Box>
            <Skeleton variant="text" width={100} height={24} />
            <Skeleton variant="text" width={80} height={20} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};