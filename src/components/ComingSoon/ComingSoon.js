import React from 'react';
import { Title, Image } from '@mantine/core';
import gradient1 from '../../assets/gradient-1.png';
import useStyles from './ComingSoon.styles';

const ComingSoon = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.message}>
      <Title className={classes.title} order={1}>
        Coming Soon
      </Title>
      <Image className={classes.gradient1} src={gradient1} />
    </div>
  );
};

export default ComingSoon;
