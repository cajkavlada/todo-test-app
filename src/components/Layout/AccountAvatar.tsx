import {Avatar, HStack, Text, Tooltip, useBreakpointValue} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {logout, selectUserInfo} from 'src/features/login/store';

export function AccountAvatar() {
  const account = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const isMobile = useBreakpointValue({base: true, sm: false});

  if (account === null) return null;
  const {firstName, lastName, image} = account;
  const fullName = `${firstName} ${lastName}`;

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <HStack>
      <Tooltip label={t('logout.tooltip')} p={2} borderRadius={5}>
        <Avatar
          boxSize={[10, 6]}
          name={fullName}
          src={image}
          onClick={handleLogout}
          sx={{
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        />
      </Tooltip>
      {!isMobile && <Text>{fullName}</Text>}
    </HStack>
  );
}
