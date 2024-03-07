import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useReduxHook';

type TradingViewWidgetProps = {
  symbol: string;
};

export default function CoinInfoVidget(): JSX.Element {
  const { id } = useParams();
  const data = useAppSelector((state) => state.coins.data?.coins);
  const oneCoin = data?.find((coin) => coin.uuid === id);

  const widgetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (widgetContainerRef.current) {
      widgetContainerRef.current.innerHTML = '';

      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js';
      script.async = true;
      script.type = 'text/javascript';
      script.innerHTML = JSON.stringify({
        symbol: `CRYPTO:${oneCoin?.symbol}USD`,
        width: 800,
        locale: 'en',
        colorTheme: 'dark',
        isTransparent: false,
      });

      widgetContainerRef.current.appendChild(script);
    }
  }, [oneCoin?.symbol]);

  return (
    <div
      ref={widgetContainerRef}
      className="tradingview-widget-container"
      style={{ height: '500px' }}
    />
  );
}
