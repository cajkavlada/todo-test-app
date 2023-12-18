import {Box, BoxProps} from '@chakra-ui/react';
import {HTMLMotionProps, motion} from 'framer-motion';

const ChakraMotionBox = motion(Box);

type MotionBoxProps = Omit<BoxProps, 'transition'> &
  HTMLMotionProps<'div'> & {
    motionKey?: string | number;
  };

export function MotionBox({children, motionKey, ...props}: MotionBoxProps) {
  return (
    <ChakraMotionBox
      key={motionKey}
      layout
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: {opacity: 0},
        visible: {opacity: 1},
      }}
      {...props}
    >
      {children}
    </ChakraMotionBox>
  );
}
