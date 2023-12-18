import {Card, CardProps} from '@chakra-ui/react';
import {motion} from 'framer-motion';

const MotionCard = motion(Card);

export function PageContainer({children, ...props}: CardProps) {
  const pageVariants = {
    hidden: {opacity: 0, y: 10},
    visible: {opacity: 1, y: 0},
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    // duration: 3,
  };

  return (
    <MotionCard
      w="100%"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      transition={pageTransition}
      {...props}
    >
      {children}
    </MotionCard>
  );
}
