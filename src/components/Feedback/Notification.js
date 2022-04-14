import React from 'react';
import { Title, Text, UnstyledButton } from '@mantine/core';
import { motion } from 'framer-motion';
import { notifVariant } from '../../utils/framer-variants';
import { ReactComponent as Close } from '../../assets/notif-close.svg';
import useStyles from './Notification.styles';

const Notification = ({ icon: Icon, title, description, onClose }) => {
  const { classes } = useStyles();

  return (
    <motion.div className={classes.notif} variants={notifVariant} initial="hidden" animate="visible" exit="exit">
      <UnstyledButton className={classes.btn} onClick={onClose}>
        <Close />
      </UnstyledButton>
      <Icon className={classes.icon} />
      <Title className={classes.title} order={3}>
        {title}
      </Title>
      <Text size="md">{description}</Text>
    </motion.div>
  );
};

export default Notification;
