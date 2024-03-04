import { useToast } from '@chakra-ui/react';
import type React from 'react';
import { useState } from 'react';
import { useAppDispatch } from './useReduxHook';
import { signInThunk, signUpThunk } from '../redux/thunkActions/authThunkActions';
import type { UserSignUpType } from '../types/authType';

export default function useAuth(): {
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  formType: boolean;
  changeState: () => void;
} {
  const [formType, setFormType] = useState(false);

  const toast = useToast();
  const dispatch = useAppDispatch();

  const changeState = (): void => {
    setFormType((prev) => !prev);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as UserSignUpType;

    if (!data.email || !data.password) {
      toast({ title: 'Заполните все поля', status: 'error', duration: 5000, isClosable: true });
      return;
    }

    if (formType) {
      void dispatch(signUpThunk(data)).then((result) => {
        if (result.error) {
          toast({
            title: 'Что-то пошло не так при регистрации',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Регистрация успешна',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }
      });
    } else {
      dispatch(signInThunk(data))
        .then((result) => {
          if (result.error) {
            toast({
              title: 'Такого пользователя не существует',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          } else {
            toast({ title: 'Вход выполнен', status: 'success', duration: 5000, isClosable: true });
          }
        })
        .catch((error) => {
          toast({
            title: 'Произошла ошибка при выполнении операции',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };
  return {
    submitHandler,
    formType,
    changeState,
  };
}
