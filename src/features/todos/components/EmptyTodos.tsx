import {Heading, Icon, Text, VStack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';

import {ReactComponent as Logo} from '../../../asserts/largeLogo.svg';

export function EmptyTodos() {
  const {t} = useTranslation();
  return (
    <VStack>
      <Icon as={Logo} boxSize="150px" />
      <VStack gap={4}>
        <Heading variant="h2">{t('todos.empty.heading')}</Heading>
        <Text>{t('todos.empty.description')}</Text>
      </VStack>
    </VStack>
  );
}
