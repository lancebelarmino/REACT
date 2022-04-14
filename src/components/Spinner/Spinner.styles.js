import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  spinner: {
    position: 'absolute',
    zIndex: 9999,
    top: 0,
    left: 0,
    display: 'grid',
    placeItems: 'center',
    alignContent: 'center',
    height: '100vh',
    width: '100%',
    background: theme.colors.black[0],

    '& > div > div': {
      background: 'linear-gradient(45deg, #ED38FA 0%, #79B7F0 82.48%)',
    },
  },

  description: {
    marginTop: 60,
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
}));

export default useStyles;
