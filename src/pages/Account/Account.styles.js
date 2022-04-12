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

  cardStatLabel: {
    marginBottom: 4,
  },

  cardActionImage: {
    display: 'grid',
    placeItems: 'center',
    marginBottom: 20,
  },

  btn: {
    height: 52,
    background: 'transparent linear-gradient(292deg, #80808033 0%, #C2C2C233 100%) 0% 0% no-repeat padding-box',
    fontSize: theme.fontSizes.md,
    textTransform: 'uppercase',
    transition: theme.other.transitions.background,

    '&:hover': {
      background: 'transparent linear-gradient(292deg, #EB429F 0%, #9679BC 100%) 0% 0% no-repeat padding-box',
    },
  },

  btnGradient: {
    background: 'transparent linear-gradient(292deg, #EB429F 0%, #9679BC 100%) 0% 0% no-repeat padding-box',
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
}));

export default useStyles;
