import React, { useEffect, useRef, memo } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Text } from '@chakra-ui/react';
import { useAppSelector } from '../../hooks/useReduxHook';
import type { CoinType } from '../../types/coinsListApiTypes';

export default function CoinVidget(): JSX.Element {
  const { id } = useParams();
  const data = useAppSelector((state) => state.coins.data?.coins);
  const oneCoin = data?.find((coin) => coin.uuid === id);
  // console.log(oneCoin);

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
    <div>
      {oneCoin && (
        <div style={{display: 'flex'}}>
          <img src={oneCoin.iconUrl} alt={oneCoin.name} style={{ width: '100px' }}/>
          <h2 style={{color: 'white'}}>{oneCoin.name}</h2>
        </div>
      )}
      <div className="tradingview-widget-container" ref={widgetRef}>
        <div className="tradingview-widget-container__widget" />
        <div className="tradingview-widget-copyright">
          <a href="https://www.tradingview.com/" rel="noopener nofollow noreferrer" target="_blank">
            <span className="blue-text">Track all markets on TradingView</span>
          </a>
        </div>
      </div>
    </div>
  );
}
