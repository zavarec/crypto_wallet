import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';

export default function MarketVidget(): JSX.Element {
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (widgetContainerRef.current) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: '910',
        height: '490',
        defaultColumn: 'overview',
        screener_type: 'crypto_mkt',
        displayCurrency: 'USD',
        colorTheme: 'dark',
        locale: 'en',
      });

      widgetContainerRef.current.appendChild(script);
    }
  }, []);

  return (
    <Box style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
      <div className="tradingview-widget-container" ref={widgetContainerRef} />
    </Box>
  );
}
