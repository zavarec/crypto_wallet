import { Box, Card, CardBody, Text } from '@chakra-ui/react';
import React from 'react';
import type { ApiKeyType } from '../../types/apiKeyType';

type PortfolioItomsProps = {
  api: ApiKeyType;
};

export default function PortfolioItom({ api }: PortfolioItomsProps): JSX.Element {
  return (
    <Box>
      <Card>
        <CardBody>
          <Text>{api.name}</Text>
        </CardBody>
      </Card>
    </Box>
  );
}
