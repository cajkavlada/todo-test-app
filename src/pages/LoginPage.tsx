import {Heading, Text, VStack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {PageContainer} from 'src/components/Layout/PageContainer';
import {LoginForm} from 'src/features/login/components/LoginFom';
import {useAuthRedirect} from 'src/features/login/utils/useAuthRedirect';

export function LoginPage() {
  const isAuthenticated = useAuthRedirect('/', null);
  const {t} = useTranslation();
  if (isAuthenticated) {
    return null;
  }

  return (
    <PageContainer maxWidth={560}>
      <VStack gap={6} align="flex-start">
        <Heading variant="h1">{t('login.heading')}</Heading>
        <Text>{t('login.description')}</Text>
      </VStack>
      <LoginForm />
    </PageContainer>
  );
}
