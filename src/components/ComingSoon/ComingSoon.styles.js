import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  message: {
    display: 'grid',
    placeItems: 'center',
    width: '100%',
    height: 'calc(100% - 160px)',
  },

  title: {
    textTransform: 'uppercase',
    letterSpacing: 6,
  },

  gradient1: {
    position: 'fixed',
    top: 50,
    right: 50,
    pointerEvents: 'none',
  },
}));

export default useStyles;
