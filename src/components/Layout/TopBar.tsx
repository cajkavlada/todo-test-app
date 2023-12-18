import {Flex} from '@chakra-ui/react';
import {motion} from 'framer-motion';

import {AccountAvatar} from './AccountAvatar';
import {ReactComponent as Logo} from '../../asserts/logoWithName.svg';
import {useSelector} from 'react-redux';
import {selectIsAuthenticated} from 'src/features/login/store';

export function TopBar() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <>
      <Flex
        px={[2, 0]}
        py={[6, 10]}
        w="100%"
        justifyContent={isAuthenticated ? 'space-between' : 'center'}
      >
        <motion.div layout>
          <Logo height="32px" width="128" />
        </motion.div>
        {isAuthenticated && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: {opacity: 0},
              visible: {opacity: 1},
            }}
            transition={{delay: 0.1}}
          >
            <AccountAvatar />
          </motion.div>
        )}
      </Flex>
    </>
  );
}
