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
import type { StockType } from '../../types/stockType';

type StockItemProps = {
  stock: StockType;
};

export default function StudentItem({ stock }: StockItemProps): JSX.Element {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      rounded="md"
      alignItems="center"
      transition="all .3s ease"
      _hover={{
        backgroundColor: useColorModeValue('gray.100', 'gray.600'),
      }}
    >
      <Card align="center">
        <Image
          objectFit="cover"
          maxW={{ base: '100%', sm: '200px' }}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />
        <CardBody>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
        <CardFooter>
          <Button colorScheme="blue">View here</Button>
        </CardFooter>
      </Card>
    </Box>
  );
}
