import { Card, CardContent, Stack, Avatar, Typography, Box } from '@mui/material';
import { useIntl } from 'react-intl';

import { formatName } from '@onboarding-course/customer-profile-domain';
import { UserSummaryWidgetSkeleton } from './user-summary-widget-skeleton';
import { useUserProfileQuery } from '../queries/use-profile-query';

export const UserSummaryWidget = () => {
  const intl = useIntl();
  const { data: user, isLoading, isError } = useUserProfileQuery();

  if (isLoading) {
    return (
      <Card sx={{ maxHeight: '20vh' }}>
        <UserSummaryWidgetSkeleton />
      </Card>
    );
  }

  if (isError || !user) {
    return (
      <Card sx={{ maxHeight: '20vh' }}>
        <CardContent>
          <Typography variant="subtitle2" color="error">
            {intl.formatMessage({ id: 'customer.dashboard.user.error', defaultMessage: 'Unable to load user information' })}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const name = formatName(user);
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || user.username.charAt(0).toUpperCase();

  return (
    <Card sx={{ maxHeight: '20vh' }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ width: 56, height: 56 }}>{initials}</Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.phone || intl.formatMessage({ id: 'customer.dashboard.user.noPhone', defaultMessage: 'No phone number' })}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

