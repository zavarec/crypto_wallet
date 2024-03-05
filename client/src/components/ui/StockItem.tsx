import React, { useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import type { StockType } from '../../types/stockType';
import UniversalModal from './UniversalModal';
import { saveApiKeyThunk } from '../../redux/thunkActions/apiKeyThunkActions';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHook';
import type { UserType } from '../../types/authType';

type StockItemProps = {
  stock: StockType;
  user: UserType;
};

function OverlayTwo(): JSX.Element {
  return <ModalOverlay bg="none" backdropFilter="auto" backdropInvert="80%" backdropBlur="2px" />;
}

export default function StockItem({ stock, user }: StockItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as ApiKeyType;
    void dispatch(saveApiKeyThunk(data));
    onClose();
    navigate('/portfolio');
  };

  const handleButtonClick = (): void => {
    onOpen();
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      rounded="md"
      alignItems="center"
      transition="all .3s ease"
      width="min-content"
      padding="3px"
      _hover={{
        backgroundColor: useColorModeValue('gray.100', 'gray.600'),
      }}
    >
      <Card
        align="center"
        bgColor="#1a1e25"
        bgGradient={[
          'webkit-radial-gradient(ellipse farthest-corner at center center, #1a1e25 0%, #111326 100%)',
          'moz-radial-gradient(ellipse farthest-corner at center center, #1a1e25 0%, #111326 100%)',
          'radial-gradient(ellipse farthest-corner at center center, #1a1e25 0%,#111326 100%)',
        ]}
      >
        <Image paddingTop="30px" objectFit="cover" width="72px" src={stock.img} alt="stock" />
        <CardBody>
          <Text style={{ color: 'white', paddingTop: '20px' }}>{stock.name}</Text>
        </CardBody>
        <CardFooter>
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="white"
            onClick={() => handleButtonClick()}
          >
            Connect
          </Button>
          <UniversalModal isOpen={isOpen} onClose={onClose}>
            {stock.id === 1 ? (
              <>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>API KEY Input</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <form onSubmit={handleSubmit}>
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
            ) : (
              <>
                {overlay}
                <ModalContent>
                  <ModalHeader>Please come back later</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <form
                      onSubmit={() => {
                        setOverlay(<OverlayTwo />);
                      }}
                    >
                      <Text>The market is not connected!</Text>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                  </ModalFooter>
                </ModalContent>
              </>
            )}
          </UniversalModal>
        </CardFooter>
      </Card>
    </Box>
  );
}
