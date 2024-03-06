import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import Root from './components/Root';
import PortfolioPage from './components/pages/PortfolioPage';
import MarketDataPage from './components/pages/MarketDataPage';
import LoggedPage from './components/pages/LoggedPage';
import PrivateRouter from './components/HOCs/PrivateRouter';
import { useAppDispatch, useAppSelector } from './hooks/useReduxHook';
import { checkTokenThunk } from './redux/thunkActions/authThunkActions';
import FavoritesPage from './components/pages/FavoritesPage';
import ErrorPage from './components/pages/ErrorPage';
import CoinPage from './components/pages/CoinPage';

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    void dispatch(checkTokenThunk());
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { path: '/', element: <MainPage /> },
        { path: 'portfolio', element: <PortfolioPage /> },
        { path: 'marketdata', element: <MarketDataPage /> },
        { path: 'favorites', element: <FavoritesPage /> },
        { path: 'marketdata/:id', element: <CoinPage /> },
        {
          element: <PrivateRouter isAllowed={user.status === 'logged'} redirect="/" />,
          children: [{ path: 'logged', element: <LoggedPage /> }],
        },
      ],
      errorElement: <ErrorPage />,
    },
    { path: '*', element: <ErrorPage /> },
    {},
  ]);
  return <RouterProvider router={router} />;
}
