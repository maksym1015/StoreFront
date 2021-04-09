import 'assets/styles/app.less';
import 'assets/styles/app.scss';
import App, { AppProps, AppContext as NextAppContext } from 'next/app';
import { initializeApollo } from '@lib/apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import Layout from 'components/Layout';
import cookie from 'cookie';
import { AppContext } from 'lib/context';
import { ClientWrapper } from 'lib/client-wrapper';
import { PUBLIC_ROUTES } from 'utils/constant';
// @ts-ignore
import { ThemeProvider } from 'emotion-theming';
import theme from 'theme/direct';
import mobile from 'is-mobile';

interface Props extends AppProps {
  userLoggedIn: boolean;
}

export default function MyApp({ Component, pageProps, userLoggedIn }: Props) {
  const apolloClient = initializeApollo();

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <AppContext loggedIn={userLoggedIn}>
          <ClientWrapper>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ClientWrapper>
        </AppContext>
      </ApolloProvider>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (appContext: NextAppContext) => {
  const request = appContext.ctx.req;
  const isMobile = mobile({ ua: request });

  // Disable mobile access
  if (isMobile && appContext.ctx.res && appContext.router.pathname !== '/unsupported-mobile') {
    appContext.ctx.res.writeHead(302, { Location: '/unsupported-mobile' });
    appContext.ctx.res.end();
  }

  const redirectToLoginPage = () => {
    if (appContext.ctx.res) {
      appContext.ctx.res.writeHead(302, { Location: '/login' });
      appContext.ctx.res.end();
    }
  };
  let loggedIn = false;

  if (request) {
    const cookies = cookie.parse(request.headers.cookie || '');
    loggedIn = Boolean(cookies['access_token']);

    if (
      !loggedIn &&
      !PUBLIC_ROUTES.includes(appContext.router.pathname) &&
      appContext?.ctx?.res?.writeHead
    ) {
      return redirectToLoginPage();
    }
  }

  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, userLoggedIn: loggedIn };
};
