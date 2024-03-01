import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import Root from './components/Root';
import PortfolioPage from './components/pages/PortfolioPage';
import MarketDataPage from './components/pages/MarketDataPage';

export default function App(): JSX.Element {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { path: '/', element: <MainPage /> },
        { path: 'portfolio', element: <PortfolioPage /> },
        { path: 'marketdata', element: <MarketDataPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
