import { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CardActions,
  CardMedia,
  MobileStepper,
  useTheme,
} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export interface Promotion {
  id: string;
  titleKey: string;
  defaultTitle: string;
  descriptionKey: string;
  defaultDescription: string;
  imageUrl: string;
}

const mockPromotions: Promotion[] = [
  {
    id: '1',
    titleKey: 'customer.common.widgets.promotions.item1.title',
    defaultTitle: 'New WiFi 6 Router',
    descriptionKey: 'customer.common.widgets.promotions.item1.description',
    defaultDescription: 'Experience ultra-fast speeds with our latest router.',
    imageUrl:
      'https://dummyjson.com/image/300x150/008080/ffffff?text=WiFi+6+Router',
  },
  {
    id: '2',
    titleKey: 'customer.common.widgets.promotions.item2.title',
    defaultTitle: 'Finance a 4K TV',
    descriptionKey: 'customer.common.widgets.promotions.item2.description',
    defaultDescription: 'Get a brand new 55" 4K TV with 0% interest.',
    imageUrl:
      'https://dummyjson.com/image/300x150/ff7f50/ffffff?text=4K+TV+Promo',
  },
  {
    id: '3',
    titleKey: 'customer.common.widgets.promotions.item3.title',
    defaultTitle: 'Unlimited Data Plan',
    descriptionKey: 'customer.common.widgets.promotions.item3.description',
    defaultDescription: 'Upgrade to unlimited data for just €5 more per month.',
    imageUrl:
      'https://dummyjson.com/image/300x150/4682b4/ffffff?text=Unlimited+Data',
  },
];

export const PromotionsWidget = () => {
  const intl = useIntl();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = mockPromotions.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const currentPromo = mockPromotions[activeStep];

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" component="h2" gutterBottom color="primary">
          {intl.formatMessage({
            id: 'customer.common.widgets.promotions.title',
            defaultMessage: 'Promotions for You',
          })}
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardMedia
              component="img"
              height="140"
              image={currentPromo.imageUrl}
              alt={currentPromo.defaultTitle}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="div">
                {intl.formatMessage({
                  id: currentPromo.titleKey,
                  defaultMessage: currentPromo.defaultTitle,
                })}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {intl.formatMessage({
                  id: currentPromo.descriptionKey,
                  defaultMessage: currentPromo.defaultDescription,
                })}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="secondary" variant="contained" fullWidth>
                {intl.formatMessage({
                  id: 'customer.common.widgets.promotions.interested',
                  defaultMessage: 'I am interested',
                })}
              </Button>
            </CardActions>
          </Card>
        </Box>
      </CardContent>
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ bgcolor: 'transparent', p: 2 }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </Card>
  );
};
