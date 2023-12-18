import {isRouteErrorResponse, useNavigate, useRouteError} from 'react-router-dom';
import {Box, Button, Flex, Heading, Text} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';

type NetworkError = {
  data: {
    message: string;
  };
  status: number;
};

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  const {t} = useTranslation();

  const getErrorMessage = () => {
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) {
        return t('error.pageNotFound');
      }
      return error.statusText || t('error.unknown');
    }

    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === 'object' && error !== null && 'status' in error && error.status === 404) {
      return (error as NetworkError).data.message;
    }

    return t('error.unknown');
  };

  const errorMessage = getErrorMessage();

  function handleGoHome() {
    navigate('/');
  }

  return (
    <Flex direction="column" gap={2} align="center" justify="center" height="100vh" bg="white">
      <Box
        bgPosition="center"
        bgRepeat="no-repeat"
        bgColor="white"
        h="400px"
        w="100%"
        bgImage="url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)"
      />
      <Heading variant="h1">{t('error.title')}</Heading>
      <Text>{errorMessage}</Text>
      <Button mt="4" onClick={handleGoHome}>
        {t('error.homeButtonLabel')}
      </Button>
    </Flex>
  );
}
