import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  row: {
    '&:not(:last-child)': {
      marginBottom: 40,
    },
  },

  card: {
    display: 'flex',
    alignItems: 'center',
  },

  cardIcon: {
    marginRight: 20,
  },

  cardTitle: {
    marginBottom: 8,
  },

  chart: {
    height: 400,
  },
}));

export default useStyles;
