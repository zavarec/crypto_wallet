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
      toast({ title: 'Fill in all the fields', status: 'error', duration: 5000, isClosable: true });
      return;
    }

    if (formType) {
      void dispatch(signUpThunk(data)).then((result) => {
        if (result.meta.requestStatus === 'rejected') {
          toast({
            title: 'Something went wrong during registration',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Registration is successful',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }
      });
    } else {
      dispatch(signInThunk(data))
        .then((result) => {
          if (result.meta.requestStatus === 'rejected') {
            toast({
              title: 'There is no such user',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          } else {
            toast({
              title: 'The login is completed',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
          }
        })
        .catch((error) => {
          toast({
            title: 'An error occurred while performing the operation',
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
