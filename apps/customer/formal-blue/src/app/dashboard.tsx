import { FC } from 'react';
import { ContractsWidget, PromotionsWidget } from '@onboarding-course/customer-common-ui';
import { UserSummaryWidget } from '@onboarding-course/customer-profile-ui';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

const Dashboard: FC = () => {
  return (
    <Grid container spacing={3} columns={12}>
      <Grid size={8}>
        <ContractsWidget />
      </Grid>
      <Grid size={4}>
        <Stack spacing={4}>
          <UserSummaryWidget />
          <PromotionsWidget />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
