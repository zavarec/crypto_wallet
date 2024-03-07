import React, { useState } from 'react';
import CryptoVidget from '../ui/CryptoVidget';
import AuthForm from '../ui/AuthForm';
import LogoName from '../ui/LogoName';
import MarketVidget from '../ui/MarketData/MarketVidget';

export default function MainPage(): JSX.Element {
  const [formType, setFormType] = useState('login');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <LogoName />
      <AuthForm />
      <MarketVidget />
      <CryptoVidget />
    </div>
  );
}
