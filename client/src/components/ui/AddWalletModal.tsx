import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useAppDispatch } from '../../hooks/useReduxHook';
import type { ApiKeyType } from '../../types/apiKeyType';
import { saveApiKeyThunk } from '../../redux/thunkActions/apiKeyThunkActions';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddWalletModal({ isOpen, onClose }: ModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.currentTarget)) as ApiKeyType;
      void dispatch(saveApiKeyThunk(data));
    },
    [onClose],
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>API KEY Input</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Input name="name" placeholder="Name" />
              <Input name="api key" placeholder="API Key" />
              <Input name="api secret" placeholder="API Secret" />
              <Button colorScheme="black" variant="outline" type="submit">
                Connect
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
