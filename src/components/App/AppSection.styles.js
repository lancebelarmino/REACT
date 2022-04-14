import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  section: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',

    [theme.fn.smallerThan('md')]: {
      gridTemplateColumns: '1fr',
    },

    '@media (max-height: 656px)': {
      gridTemplateColumns: '1fr',
    },
  },

  wallet: {
    position: 'relative',
    zIndex: 9999,
    textAlign: 'right',
    marginBottom: 40,
  },

  content: {
    position: 'relative',
    padding: '2.5rem 2.5rem 10rem 2.5rem',

    [theme.fn.smallerThan('md')]: {
      minHeight: 'calc(100vh - 100px)',
      padding: '2.5rem 2.5rem 0 2.5rem',
    },
  },

  social: {
    position: 'absolute',
    zIndex: 999,
    bottom: 40,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 280,
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('md')]: {
      bottom: 24,
    },
  },

  icon: {
    '& g g': {
      transition: `${theme.other.transitions.stroke}, ${theme.other.transitions.fill}`,
    },

    '&:hover g g': {
      stroke: 'rgba(177, 95, 169, 0.2)',
      fill: 'rgba(177, 95, 169, 0.2)',
    },
  },
}));

export default useStyles;
