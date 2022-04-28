import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  row: {
    position: 'relative',
    zIndex: 999,

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
    padding: '1.5rem 1.25rem',
    border: '0.5px solid #C2C2C233',
    background: 'transparent',
    color: theme.colors.white[0],
    fontSize: theme.fontSizes.md,

    '&:focus': {
      border: '0.5px solid rgba(255, 255, 255, 0.4)',
    },
  },

  inputAmount: {
    position: 'relative',
    marginBottom: 40,
  },

  inputError: {
    position: 'absolute',
    bottom: -28,
  },

  btn: {
    height: 52,
    background: 'transparent linear-gradient(117deg, #80808033 0%, #FFFFFF00 50%, #FFFFFF4D 100%) 0% 0% no-repeat padding-box',
    backgroundImage: 'linear-gradient(to right,  #FFFFFF1F 0%, #FFFFFF3D 40%, #9679BC 100%)',
    backgroundSize: '200% auto',
    fontSize: theme.fontSizes.md,
    textTransform: 'uppercase',
    borderRadius: 12,
    transition: theme.other.transitions.background,

    '&:hover': {
      backgroundPositionX: 'right',
      backgroundPositionY: 'center',
      backgroundColor: '#EB429F',
    },
  },

  mechanics: {
    overflowX: 'hidden',
    height: 234,
    paddingRight: 20,
  },

  scrollBackground: {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
  },

  listTitle: {
    marginBottom: 20,
  },

  listItem: {
    color: theme.colors.white[0],

    '&:not(:last-of-type)': {
      marginBottom: 12,
    },
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
