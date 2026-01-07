import  { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FormattedMessage } from 'react-intl';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            textAlign="center"
            gap={3}
          >
            <ErrorOutlineIcon color="error" sx={{ fontSize: 80 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              <FormattedMessage id="page.errorBoundary.errorOccurred" />
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              <FormattedMessage id="page.errorBoundary.errorDescription" />
            </Typography>
            {this.state.error && (
               <Typography variant="caption" color="error" sx={{ mt: 2, display: 'block', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {this.state.error.toString()}
              </Typography>
            )}
            <Button variant="contained" onClick={this.handleReload}>
              <FormattedMessage id="page.errorBoundary.reloadPage" />
            </Button>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}
