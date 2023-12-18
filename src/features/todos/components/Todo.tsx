import {
  Checkbox,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react';
import {Todo as TodoProps} from '../todos.types';
import {useDeleteTodoMutation, useUpdateTodoMutation} from '../store/todosEndpoints';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {MoreIcon, DeleteIcon, EditIcon} from '../../../asserts/icons';

export function Todo({id, todo, description, completed}: TodoProps) {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  return (
    <VStack align="flex-start">
      <HStack gap={3} justify="space-between" w="100%">
        <HStack gap={3}>
          <Checkbox
            size="lg"
            isChecked={completed}
            onChange={() => updateTodo({id, completed: !completed})}
          />
          <Heading variant="h3">{todo}</Heading>
        </HStack>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<MoreIcon />}
            variant="ghost"
            colorScheme="gray"
            size="sm"
          />
          <MenuList borderRadius={16} py={2}>
            <MenuItem icon={<EditIcon />} py={3} onClick={() => navigate(`/edit/${id}`)}>
              {t('todo.editMenu')}
            </MenuItem>
            <MenuItem
              icon={<DeleteIcon color="red.500" />}
              py={3}
              color="red.500"
              onClick={() => deleteTodo(id)}
            >
              {t('todo.deleteMenu')}
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <Text pl={10}>{description}</Text>
    </VStack>
  );
}
