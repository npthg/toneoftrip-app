import { AppBar, Box, Container, CssBaseline, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import {theme} from '../theme';

export default function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Tone of Trip - Personalized</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <img src='https://toneoftrip.com/wp-content/uploads/2021/05/Toneoftrip-Logo-1.png' style={{width: 55, height: 55, marginLeft: 25}}/>
            {/* <Typography variant="h6">Create your own bracelet</Typography> */}
          </Toolbar>
        </AppBar>

        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Container>
          <Box marginTop={15}>
            <Component {...pageProps} />
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
