import React, { useEffect, useRef, memo } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Text } from '@chakra-ui/react';
import { useAppSelector } from '../../hooks/useReduxHook';
import type { CoinType } from '../../types/coinsListApiTypes';

export default function CoinVidget(): JSX.Element {
  const { id } = useParams();
  const data = useAppSelector((state) => state.coins.data?.coins)!;
  const favorites = useAppSelector((state) => state.coins.data?.favorites)!;
  const arr = [...data, ...favorites]
  const oneCoin = arr.find((coin) => coin.uuid === id);
  // console.log(oneCoin);

  const widgetRef = useRef<HTMLDivElement>(null);

  console.log('----------', `${oneCoin?.symbol}`);

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
        symbol: `CRYPTO:${oneCoin?.symbol}USD`,
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
    <div style={{ height: '380px', width: '800px', marginTop: '0px' }}>
      {/* {oneCoin && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image src={oneCoin.iconUrl} alt={oneCoin.name} w="100px" h="auto" />
          <Text ml="2" fontSize="xl" fontWeight="bold" color="white">
            {oneCoin.name}
          </Text>
        </div>
      )} */}
      <div
        className="tradingview-widget-container"
        ref={widgetRef}
        style={{
          marginTop: '20px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: '100%', borderRadius: '10px' }}
        />
        <div className="tradingview-widget-copyright" style={{ marginTop: '10px' }}>
          <a
            href="https://www.tradingview.com/"
            rel="noopener nofollow noreferrer"
            target="_blank"
            style={{ color: '#1a1a1a', textDecoration: 'none' }}
          >
            <span className="blue-text">Track all markets on TradingView</span>
          </a>
        </div>
      </div>
    </div>
  );
}
