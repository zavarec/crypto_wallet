import React, { useState } from 'react';
import CryptoVidget from '../ui/CryptoVidget';
import AuthForm from '../ui/AuthForm';
import LogoName from '../ui/LogoName';

export default function MainPage(): JSX.Element {
  const [formType, setFormType] = useState('login');

  return (
    <>
      <LogoName />
      <AuthForm />
      <CryptoVidget />
    </>
  );
}
