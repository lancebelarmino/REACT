import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Anchor } from '@mantine/core';
import EtherContext from '../../context/EtherContext';
import Navbar from '../Navbar/Navbar';
import WalletButton from '../Wallet/WalletButton';
import WalletMessage from '../Wallet/WalletMessage';
import { ReactComponent as Twitter } from '../../assets/social-twitter.svg';
import { ReactComponent as Discord } from '../../assets/social-discord.svg';
import { ReactComponent as Telegram } from '../../assets/social-telegram.svg';
import Spinner from '../Spinner/Spinner';
import useStyles from './AppSection.styles';

const NavbarSection = ({ children }) => {
  const { user, isLoading } = useContext(EtherContext);
  const { classes } = useStyles();

  return (
    <AnimatePresence exitBeforeEnter>
      {isLoading ? (
        <Spinner key="spinner" />
      ) : (
        <motion.div className={classes.section} initial="hidden" animate="visible">
          <Navbar />
          <div className={classes.content}>
            <div className={classes.wallet}>{user ? <WalletMessage /> : <WalletButton />}</div>
            {children}
            <div className={classes.social}>
              <Anchor className={classes.icon} href="https://twitter.com/react_dao" target="_blank" rel="noreferrer">
                <Twitter />
              </Anchor>
              <Anchor className={classes.icon} href="https://discord.com/invite/reactdao" target="_blank" rel="noreferrer">
                <Discord />
              </Anchor>
              <Anchor className={classes.icon} href=" https://t.me/react_dao" target="_blank" rel="noreferrer">
                <Telegram />
              </Anchor>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavbarSection;
