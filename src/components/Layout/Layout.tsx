import {VStack} from '@chakra-ui/react';
import {TopBar} from './TopBar';
import {Outlet} from 'react-router-dom';

export function Layout() {
  return (
    <VStack px={[2, 10]} pb={[10, 20]} align="center">
      <TopBar />
      <Outlet />
    </VStack>
  );
}
