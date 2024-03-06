import React, { useEffect, useRef, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useReduxHook';

export default function CoinVidget(): JSX.Element {
  const { id } = useParams();
  const data = useAppSelector((state) => state.coins.data?.coins);
  const oneCoin = data?.find((coin) => coin.uuid === id);
  console.log(oneCoin);

  // const container = useRef<HTMLDivElement | null>(null);
  // console.log(data);
  // useEffect(() => {
  //   const currentContainer = container.current;

  //   if (currentContainer) {
  //     currentContainer.innerHTML = '';

  //     const script = document.createElement('script');
  //     script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
  //     script.type = 'text/javascript';
  //     script.async = true;
  //     script.text = `
  //         {
  //           "autosize": true,
  //           "symbol": "BYBIT:SOLUSDT",
  //           "interval": "D",
  //           "timezone": "Etc/UTC",
  //           "theme": "dark",
  //           "style": "1",
  //           "locale": "en",
  //           "enable_publishing": false,
  //           "allow_symbol_change": true,
  //           "calendar": false,
  //           "support_host": "https://www.tradingview.com"
  //         }`;
  //     currentContainer.appendChild(script);
  //     return () => {
  //       currentContainer.innerHTML = '';
  //     };
  //   }
  // }, [coin]);
  const widgetRef = useRef(null);

  useEffect(() => {
    if (widgetRef.current) {
      // Очищаем содержимое контейнера, если скрипт уже был вставлен
      widgetRef.current.innerHTML = '';

      // Создаем скрипт
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.async = true;
      script.type = 'text/javascript';
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: `CRYPTOCAP:${oneCoin?.symbol}`,
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        enable_publishing: false,
        allow_symbol_change: true,
        calendar: false,
        support_host: 'https://www.tradingview.com',
      });

      widgetRef.current.appendChild(script);
    }
  }, [oneCoin?.symbol]); //

  return (
    //   <div
    //     className="tradingview-widget-container"
    //     ref={container}
    //     style={{ height: '100%', width: '100%' }}
    //   >
    //     <div
    //       className="tradingview-widget-container__widget"
    //       style={{ height: 'calc(100% - 32px)', width: '100%' }}
    //     />
    //     <div className="tradingview-widget-copyright">
    //       <a href="https://www.tradingview.com/" rel="noopener nofollow noreferrer" target="_blank">
    //         <span className="blue-text">Track all markets on TradingView</span>
    //       </a>
    //     </div>
    //   </div>
    <div className="tradingview-widget-container" ref={widgetRef}>
      <div className="tradingview-widget-container__widget" />
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow noreferrer" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
}
