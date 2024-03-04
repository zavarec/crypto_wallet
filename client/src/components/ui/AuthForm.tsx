import React from 'react';
import { Box, Button, HStack, Input, Stack } from '@chakra-ui/react';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useAppSelector } from '../../hooks/useReduxHook';

export default function AuthForm(): JSX.Element {
  const { submitHandler, formType, changeState } = useAuth();
  const user = useAppSelector((state) => state.auth.user);

  if (user.status === 'logged') {
    return <Navigate to="/logged" />;
  }

  const inputStyle = {
    bgColor: '#1a202c',
    color: 'white',
    bgGradient: [
      'webkit-linear-gradient(to top, #dbe7fe 0%, #1a202c 20%)',
      'moz-linear-gradient(to top, #dbe7fe 0%, #1a202c 20%)',
      'linear-gradient(to top, #dbe7fe 0%, #1a202c 20%)',
    ],
    border: '2px solid white',
  };

  return (
    <Box
      as="form"
      display="flex"
      justifyContent="center"
      alignItems="center"
      paddingTop="50px"
      onSubmit={submitHandler}
    >
      <Stack spacing={4} w="35%">
        {formType && (
          <Input placeholder="Name" type="name" name="name" style={inputStyle} />
        )}

        <Input placeholder="Email" type="email" name="email" style={inputStyle} />

        <Input placeholder="Password" type="password" name="password" style={inputStyle} />

        <Box>
          <Box style={{ textAlign: 'center' }}>
            <Button name="login" variant="link" onClick={changeState} color="white">
              {' '}
              {!formType ? 'No account' : 'I already have an account'}
            </Button>
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
            <Button type="submit" name="signup" style={{ ...inputStyle, width: '100%' }}>
              {' '}
              Ok
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
