import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { useAppDispatch } from '../../hooks/useReduxHook';
import type { UserSignUpType } from '../../types/authType';
import { signInThunk, signUpThunk } from '../../redux/thunkActions/authThunkActions';

export default function MainPage(): JSX.Element {
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
  }, []); // Пустой массив зависимостей означает, что эффект будет выполняться один раз при монтировании компонента
  const [formType, setFormType] = useState('login');
  const toast = useToast();
  const dispatch = useAppDispatch();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as UserSignUpType;
    console.log(data);
    if (formType === 'signup') {
      void dispatch(signUpThunk(data));
      toast({ title: 'Регистрация успешна', status: 'success', duration: 5000, isClosable: true });
    } else {
      void dispatch(signInThunk(data));
      toast({ title: 'Вход выполнен', status: 'success', duration: 5000, isClosable: true });
    }
  };

  return (
    <Box>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box >
          <Button type="submit" name='signup'> signup</Button>
          <Button type="submit" name='login'> login</Button>
        </Box>
        <Box>
          <FormControl isRequired width="100%" alignItems="center">
            <FormLabel>Name</FormLabel>
            <Input placeholder="Name" />
            <FormLabel>Email</FormLabel>
            <Input placeholder="Email" />
            <FormLabel>Password</FormLabel>
            <Input placeholder="Password" />
          </FormControl>
        </Box>
      </Box>
      <Box
        style={{
          width: '80%',
        }}
      >
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
    </Box>
  );
}
