import { useParams, Link as RouterLink } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Card, CardContent, Typography, Box, Chip, Button, Stack, Container } from '@mui/material';
import { Contract, mockContracts } from '../../widgets/contracts-widget/contracts-widget';

export const ContractDetails = () => {
  const { id } = useParams();
  const intl = useIntl();

  const contract: Contract | undefined = mockContracts.find((c) => c.id === id);

  return (
    <Container>
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" component="h2" color="primary">
              {intl.formatMessage({ id: 'customer.common.contract.details.title', defaultMessage: 'Contract Details' })}
            </Typography>
            <Button variant="outlined" component={RouterLink} to="/dashboard">
              {intl.formatMessage({ id: 'customer.common.contract.details.back', defaultMessage: 'Back to Dashboard' })}
            </Button>
          </Box>

          {!contract ? (
            <Typography color="error">
              {intl.formatMessage({ id: 'customer.common.contract.details.notFound', defaultMessage: 'Contract not found' })}
            </Typography>
          ) : (
            <Stack spacing={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{contract.name}</Typography>
                <Chip
                  label={intl.formatMessage({ id: `customer.common.widgets.contracts.status.${contract.status}`, defaultMessage: contract.status })}
                  color={contract.status === 'active' ? 'success' : 'warning'}
                  size="small"
                  variant="outlined"
                />
              </Box>

              <Typography variant="body1">
                {intl.formatMessage({
                  id: `customer.common.widgets.contracts.type.${contract.type}`,
                  defaultMessage: contract.type.toUpperCase()
                })}
              </Typography>

              <Typography variant="body1" color="text.secondary">
                {intl.formatMessage({ id: 'customer.common.contract.details.price', defaultMessage: 'Price' })}:{' '}
                {intl.formatNumber(contract.price, { style: 'currency', currency: 'EUR' })}
              </Typography>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};
