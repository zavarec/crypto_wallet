import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import CoinsList from '../ui/MarketData/CoinsList';
import FavoritesPage from './FavoritesPage';

export default function MarketDataPage(): JSX.Element {
  return (
    <Tabs isManual variant="enclosed" display="block"  pt="3%" >
      <TabList display="flex" justifyContent="center" alignItems="flex-start">
        <Tab color="yellow">CryptoCurrency</Tab>
        <Tab color="yellow">Избранные</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CoinsList />
        </TabPanel>
        <TabPanel>
          <FavoritesPage />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
