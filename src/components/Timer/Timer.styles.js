import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  timer: {
    fontSize: 32,
    lineHeight: 1.25,
    fontWeight: 700,

    [theme.fn.smallerThan('lg')]: {
      fontSize: 28,
    },
  },
}));

export default useStyles;
