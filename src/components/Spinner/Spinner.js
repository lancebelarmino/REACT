import React from 'react';
import { Text } from '@mantine/core';
import { DominoSpinner } from 'react-spinners-kit';
import { motion } from 'framer-motion';
import { spinnerVariant } from '../../utils/framer-variants';
import useStyles from './Spinner.styles';

const Spinner = () => {
  const { classes } = useStyles();

  return (
    <motion.div className={classes.spinner} variants={spinnerVariant} initial="hidden" animate="visible" exit="exit">
      <DominoSpinner size={250} color="#ED38FA" />
      <Text size="md" className={classes.description}>
        Loading...
      </Text>
    </motion.div>
  );
};

export default Spinner;
