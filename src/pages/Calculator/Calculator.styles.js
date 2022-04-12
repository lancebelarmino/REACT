import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  row: {
    position: 'relative',
    zIndex: 9999,

    '&:not(:last-child)': {
      marginBottom: 40,
    },
  },

  cardStat: {
    display: 'flex',
    alignItems: 'center',
  },

  cardStatIcon: {
    marginRight: 20,
  },

  cardStatTitle: {
    marginBottom: 8,
    textTransform: 'uppercase',
  },

  input: {
    padding: '24px 20px',
    border: '0.5px solid #C2C2C233',
    background: 'transparent linear-gradient(97deg, #C2C2C233 0%, #80808033 100%) 0% 0% no-repeat padding-box',
    color: theme.colors.white[0],
    fontSize: theme.fontSizes.md,

    '&:focus': {
      border: '0.5px solid rgba(255, 255, 255, 0.4)',
    },
  },

  inputAmount: {
    marginBottom: 40,
  },

  gradient6: {
    position: 'fixed',
    top: 500,
    right: -100,
    pointerEvents: 'none',
  },

  gradient7: {
    position: 'fixed',
    top: 120,
    left: 0,
    pointerEvents: 'none',
  },
}));

export default useStyles;
