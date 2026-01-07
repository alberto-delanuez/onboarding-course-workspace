import { FC } from 'react';
import { ContractsWidget } from '@onboarding-course/customer-common-ui';
import { UserSummaryWidget } from '@onboarding-course/customer-profile-ui';
import { Grid } from '@mui/material';

const Dashboard: FC = () => {
  return (
      <Grid container spacing={3} columns={12}>
      <Grid size={8}>
        <ContractsWidget />
      </Grid>
      <Grid size={4}>
         <UserSummaryWidget />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
