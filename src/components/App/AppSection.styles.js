import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  section: {
    display: 'flex',

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },

    '@media (max-height: 656px)': {
      flexDirection: 'column',
    },
  },

  gradient1: {
    position: 'fixed',
    top: -518,
    left: -462,
    pointerEvents: 'none',
  },

  gradient2: {
    position: 'fixed',
    top: 127,
    left: 160,
    pointerEvents: 'none',
  },

  gradient3: {
    position: 'fixed',
    bottom: -580,
    right: -550,
    pointerEvents: 'none',
  },

  content: {
    position: 'relative',
    zIndex: 999,
    flexGrow: 1,
    padding: '40px 40px 160px 40px',
  },

  social: {
    position: 'absolute',
    zIndex: 9999,
    bottom: 40,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 280,
    display: 'flex',
    justifyContent: 'space-between',
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
