import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';

export default function CryptoVidget(): JSX.Element {
  useEffect(() => {
    // Создаем новый элемент скрипта
    const script = document.createElement('script');
    script.src = 'https://cryptorank.io/widget/marquee.js';
    script.async = true;

    // Добавляем скрипт в элемент div с id 'cr-widget-marquee'
    document.getElementById('cr-widget-marquee')?.appendChild(script);

    // Эта функция будет вызвана при размонтировании компонента
    return () => {
      // Удаляем скрипт, чтобы избежать утечек памяти
      document.getElementById('cr-widget-marquee')?.removeChild(script);
    };
  }, []);
  return (
    <Box style={{paddingTop: '50px', paddingBottom: '20px'}}>
      <div
        id="cr-widget-marquee"
        data-coins="bitcoin,ethereum,tether,ripple,cardano"
        data-theme="light"
        data-show-symbol="true"
        data-show-icon="true"
        data-show-period-change="true"
        data-period-change="24H"
        data-api-url="https://api.cryptorank.io/v0"
      >
        <a href="https://cryptorank.io">Coins by Cryptorank</a>
      </div>
    </Box>
  );
}
