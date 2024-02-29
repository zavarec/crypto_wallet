import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import App from './App';
import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';
import theme from './utils/theme';
import { store } from './redux/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
    ,
  </Provider>,
);
