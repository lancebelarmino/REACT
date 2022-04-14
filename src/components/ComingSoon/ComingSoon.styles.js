import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  message: {
    display: 'grid',
    placeItems: 'center',
    width: '100%',
    height: 'calc(100vh - 264px)',

    [theme.fn.smallerThan('sm')]: {
      height: 'calc(100% - 160px)',
      textAlign: 'center',
    },

    '@media (max-height: 656px)': {
      height: 'calc(100vh - 390px)',
      textAlign: 'center',
    },
  },

  title: {
    position: 'relative',
    zIndex: 9999,
    textTransform: 'uppercase',
    letterSpacing: 6,
  },

  gradient1: {
    position: 'fixed',
    zIndex: 999,
    top: 50,
    right: 50,
    pointerEvents: 'none',
  },
}));

export default useStyles;
