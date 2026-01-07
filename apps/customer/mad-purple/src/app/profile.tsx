import { ProfileContainer } from '@onboarding-course/customer-profile-ui';
import { CircularProgress, Container } from '@mui/material';
import { Suspense } from 'react';


const Profile = () => {
  return (
      <Container maxWidth="lg">
        <Suspense fallback={<CircularProgress />}>
          <ProfileContainer />   
        </Suspense>
      </Container>
  );
};

export default Profile;
