import React from 'react';
import { Box, Button, HStack, Input, Stack } from '@chakra-ui/react';
import useAuth from '../../hooks/useAuth';

export default function AuthForm(): JSX.Element {
  const { submitHandler, formType, changeState } = useAuth();

  return (
    <Box
      as="form"
      display="flex"
      justifyContent="center"
      alignItems="center"
      onSubmit={submitHandler}
    >
      <Stack spacing={4} w="35%">
        {formType && (
          <Input
            placeholder="Name"
            type="name"
            name="name"
            style={{ backgroundColor: 'whitesmoke', border: '2px solid green' }}
          />
        )}

        <Input
          placeholder="Email"
          type="email"
          name="email"
          style={{ backgroundColor: 'whitesmoke', border: '2px solid green' }}
        />

        <Input
          placeholder="Password"
          type="password"
          name="password"
          style={{ backgroundColor: 'whitesmoke', border: '2px solid green' }}
        />

        <Box>
          <Box style={{ textAlign: 'center' }}>
            <Button name="login" variant="link" onClick={changeState} color="gold">
              {' '}
              {!formType ? 'Нет аккаунта' : 'У меня уже есть аккаунт'}
            </Button>
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
            <Button type="submit" name="signup" style={{ width: '50%', backgroundColor: '#f6ad55' }}>
              {' '}
              Oк
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
