import { Anchor } from '@mantine/core';
import Navbar from '../Navbar/Navbar';
import useStyles from './AppSection.styles';
import { ReactComponent as Twitter } from '../../assets/social-twitter.svg';
import { ReactComponent as Discord } from '../../assets/social-discord.svg';
import { ReactComponent as Telegram } from '../../assets/social-telegram.svg';

const NavbarSection = ({ children }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.section}>
      <Navbar />

      <div className={classes.content}>
        {children}

        <div className={classes.social}>
          <Anchor className={classes.icon}>
            <Twitter />
          </Anchor>
          <Anchor className={classes.icon}>
            <Discord />
          </Anchor>
          <Anchor className={classes.icon}>
            <Telegram />
          </Anchor>
        </div>
      </div>
    </div>
  );
};

export default NavbarSection;
