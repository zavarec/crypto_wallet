import {
  Box,
  Button,
  Card,
  CardBody,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import type { ApiKeyType } from '../../types/apiKeyType';
import { useAppDispatch } from '../../hooks/useReduxHook';
import { deleteApiKeyThunk, updateApiThunk } from '../../redux/thunkActions/apiKeyThunkActions';
import UniversalModal from './UniversalModal';
import type { UserType } from '../../types/authType';

type PortfolioItomsProps = {
  api: ApiKeyType;
  user: UserType;
  stock: ApiKeyType;
};

export default function PortfolioItom({ api, user, stock }: PortfolioItomsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleButtonClick = (): void => {
    onOpen();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, id: number): void => {
    e.preventDefault();
    console.log(id);
    const data = Object.fromEntries(new FormData(e.currentTarget)) as ApiKeyType
    void dispatch(updateApiThunk({ api: data, id }));

    onClose();
  };

  return (
    <Box>
      <Card>
        <CardBody>
          <Text>{api.name}</Text>
          <Button onClick={() => void dispatch(deleteApiKeyThunk(api.id))}>Удалить</Button>
          <Button onClick={() => handleButtonClick()}>Редактировать</Button>
          <UniversalModal isOpen={isOpen} onClose={onClose}>
            <>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>API KEY Input</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <form onSubmit={(e) => handleSubmit(e, Number(api.id))}>
                    <Stack spacing={3}>
                      <Input name="name" placeholder="Name" />
                      <Input name="market_id" type="hidden" defaultValue={stock.id} />
                      <Input name="user_id" type="hidden" defaultValue={user.id} />
                      <Input name="api_key" placeholder="API Key" />
                      <Input name="api_secret" placeholder="API Secret" />
                      <Button colorScheme="black" variant="outline" type="submit">
                        Connect
                      </Button>
                    </Stack>
                  </form>
                </ModalBody>
              </ModalContent>
            </>
          </UniversalModal>
        </CardBody>
      </Card>
    </Box>
  );
}
