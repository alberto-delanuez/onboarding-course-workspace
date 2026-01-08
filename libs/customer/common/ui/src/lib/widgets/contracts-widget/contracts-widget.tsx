import React from 'react';
import { Card, CardContent, Typography, Button, Box, Chip, Stack } from '@mui/material';

export interface Contract {
  id: string;
  name: string;
  type: 'mobile' | 'fiber' | 'tv';
  price: number;
  status: 'active' | 'pending';
}

const mockContracts: Contract[] = [
  { id: '1', name: 'Go Max Cinema', type: 'mobile', price: 25.99, status: 'active' },
  { id: '2', name: 'Home Fiber 1Gbps', type: 'fiber', price: 30.00, status: 'active' },
  { id: '3', name: 'Family TV Pack', type: 'tv', price: 10.50, status: 'pending' },
];

export const ContractsWidget = () => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom color="primary">
          My Contracts
        </Typography>
        <Stack spacing={2}>
          {mockContracts.map((contract) => (
            <Box
              key={contract.id}
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: 'background.paper'
              }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {contract.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {contract.type.toUpperCase()} • {contract.price}€/month
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
                 <Chip
                    label={contract.status}
                    color={contract.status === 'active' ? 'success' : 'warning'}
                    size="small"
                    variant="outlined"
                 />
                 <Button variant="text" size="small" color="secondary" sx={{ textDecoration: 'underline' }}>
                   Details
                 </Button>
              </Box>
            </Box>
          ))}
        </Stack>
        <Box mt={3} display="flex" justifyContent="flex-end">
             <Button variant="contained" sx={{ bgcolor: 'tertiary.main', color: 'tertiary.contrastText', '&:hover': { bgcolor: 'tertiary.dark' } }}>
                New Contract
             </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
