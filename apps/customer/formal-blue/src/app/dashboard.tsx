import { FC } from 'react';
import { ContractsWidget } from '@onboarding-course/customer-common-ui';
import Grid from '@mui/material/Grid';

const Dashboard: FC = () => {
  return (
    <Grid container spacing={3} columns={12}>
      <Grid size={8}>
        <ContractsWidget />
      </Grid>
      <Grid size={4}>
         {/* Placeholder for other widgets */}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
