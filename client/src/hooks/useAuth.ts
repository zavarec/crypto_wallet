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

    if (formType) {
      void dispatch(signUpThunk(data));
      toast({ title: 'Регистрация успешна', status: 'success', duration: 5000, isClosable: true });
    } else {
      void dispatch(signInThunk(data));
      toast({ title: 'Вход выполнен', status: 'success', duration: 5000, isClosable: true });
    }
  };
  return {
    submitHandler,
    formType,
    changeState,
  };
}
