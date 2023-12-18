import {Button, Heading, Stack, Text, VStack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {AddIcon} from 'src/asserts/icons';
import {selectFirstName} from 'src/features/login/store';

export function TodosHeading() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const firstName = useSelector(selectFirstName);

  const currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Stack direction={['column', 'row']} justify="space-between" gap={4}>
      <VStack align="flex-start" gap={2}>
        <Heading variant="h1">{t('heading.greeting', {firstName})}</Heading>
        <Text>{currentDate}</Text>
      </VStack>
      <Button rightIcon={<AddIcon />} onClick={() => navigate('/create')}>
        {t('todos.addButton')}
      </Button>
    </Stack>
  );
}
