import { Box, Typography, Button, Paper, Stack, Grid } from '@mui/material';
import { UserProfile, UserProfileModel } from '@onboarding-course/customer-profile-domain';
import { FC } from 'react';
import { useIntl } from 'react-intl';

export interface ProfileViewProps {
  user: UserProfile;
  onEdit: () => void;
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Box>
    <Typography variant="subtitle2" color="textSecondary">
      {label}
    </Typography>
    <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>{value}</Typography>
  </Box>
);

export const ProfileView: FC<ProfileViewProps> = ({ user, onEdit }) => {
  const intl = useIntl();
  const profile = UserProfileModel.fromRaw(user);
  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, maxWidth: '100%', width: { md: 600 }, mx: 'auto' }}>
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} mb={3} gap={2}>
        <Typography variant="h5" component="h1">
          {intl.formatMessage({ id: 'customer.profile.myProfile' })}
        </Typography>
        <Button variant="outlined" onClick={onEdit} fullWidth={false} sx={{ alignSelf: { xs: 'stretch', sm: 'auto' } }}>
          {intl.formatMessage({ id: 'customer.profile.editProfile' })}
        </Button>
      </Box>

      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InfoRow label={intl.formatMessage({ id: 'customer.profile.name' })} value={profile.displayName} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InfoRow label={intl.formatMessage({ id: 'customer.profile.email' })} value={user.email} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InfoRow label={intl.formatMessage({ id: 'customer.profile.phone' })} value={user.phone || '-'} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <InfoRow label={intl.formatMessage({ id: 'customer.profile.address' })} value={profile.fullAddress} />
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
};
