import React, { useState } from 'react';
import CryptoVidget from '../ui/CryptoVidget';
import MarketVidget from '../ui/MarketVidget';
import AuthForm from '../ui/AuthForm';
import LogoName from '../ui/LogoName';

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
