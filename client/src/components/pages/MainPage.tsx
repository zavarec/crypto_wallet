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
    <Box p={4}>
      <Box textAlign="center" mb={4}>
        <Button
          mr={2}
          onClick={() => setFormType('login')}
          colorScheme={formType === 'login' ? 'teal' : 'gray'}
        >
          Вход
        </Button>
        <Button
          onClick={() => setFormType('signup')}
          colorScheme={formType === 'signup' ? 'teal' : 'gray'}
        >
          Регистрация
        </Button>
      </Box>

      <Box as="form" onSubmit={submitHandler} color="yellow" width="30%">
        {formType === 'signup' && (
          <FormControl isRequired mb={4}>
            <FormLabel>Имя пользователя</FormLabel>
            <Input color="yellow" name="name" placeholder="Введите ваше имя" />
          </FormControl>
        )}
        <FormControl isRequired mb={4}>
          <FormLabel>Email</FormLabel>
          <Input name="email" placeholder="Введите ваш email" />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Пароль</FormLabel>
          <Input name="password" type="password" placeholder="Введите ваш пароль" />
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full">
          {formType === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </Button>
      </Box>
    </Box>
  );
}
