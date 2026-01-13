import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import LanguageIcon from '@mui/icons-material/Language';

export interface NavigationProps {
  title: string;
  onLogout: () => void;
  currentLocale: string;
  onLocaleChange: (locale: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ title, onLogout, currentLocale, onLocaleChange }) => {
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (locale: string) => {
    onLocaleChange(locale);
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {intl.formatMessage({ id: 'customer.common.nav.title', defaultMessage: title })}
        </Typography>
        <Box display="flex" alignItems="center">
          <Button color="inherit" component={Link} to="/dashboard">
            {intl.formatMessage({ id: 'customer.common.nav.dashboard', defaultMessage: 'Dashboard' })}
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/profile"
          >
            {intl.formatMessage({ id: 'customer.common.nav.profile', defaultMessage: 'Profile' })}
          </Button>
          
          <Button color="inherit" onClick={handleMenuOpen} startIcon={<LanguageIcon />}>
            {currentLocale.toUpperCase()}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
            <MenuItem onClick={() => handleLanguageChange('es')}>Español</MenuItem>
          </Menu>

          <Button color="inherit" onClick={onLogout}>
            {intl.formatMessage({ id: 'customer.common.nav.logout', defaultMessage: 'Logout' })}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
