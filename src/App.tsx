import {Provider} from 'react-redux';
import {ChakraProvider} from '@chakra-ui/react';
import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {RouterProvider} from 'react-router-dom';

import {router} from './routing/router';
import {theme} from './theme';
import {store} from './store';
import {Notifications} from './components/Notifications';

function App() {
  const {i18n, t} = useTranslation();

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme} resetCSS>
        <Helmet
          titleTemplate={`%s - ${t('app.title')}`}
          defaultTitle={t('app.title')}
          htmlAttributes={{lang: i18n.language}}
        >
          <meta name="description" content={t('app.description')} />
        </Helmet>
        <RouterProvider router={router} />
        <Notifications />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
