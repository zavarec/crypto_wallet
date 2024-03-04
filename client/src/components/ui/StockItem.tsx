import React from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import type { StockType } from '../../types/stockType';

type StockItemProps = {
  stock: StockType;
};

export default function StudentItem({ stock }: StockItemProps): JSX.Element {
  // const cardStyle = {
  //   bgColor: '#dbe7fe',
  //   bgGradient: [
  //     'webkit-radial-gradient(ellipse farthest-corner at center center, #dbe7fe 0%, #383b59 100%)',
  //     'moz-radial-gradient(ellipse farthest-corner at center center, #dbe7fe 0%, #383b59 100%)',
  //     'radial-gradient(ellipse farthest-corner at center center, #dbe7fe 0%, #383b59 100%)',
  //   ],
  // };

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
          <Button rightIcon={<ArrowForwardIcon />} colorScheme="white">
            View here
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
}
