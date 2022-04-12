import { Image, Anchor } from '@mantine/core';
import Navbar from '../Navbar/Navbar';
import useStyles from './AppSection.styles';
import gradient1 from '../../assets/gradient-1.png';
import gradient2 from '../../assets/gradient-2.png';
import gradient3 from '../../assets/gradient-3.png';
import { ReactComponent as Twitter } from '../../assets/social-twitter.svg';
import { ReactComponent as Discord } from '../../assets/social-discord.svg';
import { ReactComponent as Telegram } from '../../assets/social-telegram.svg';

const NavbarSection = ({ children }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.section}>
      <Image className={classes.gradient1} src={gradient1} />
      <Image className={classes.gradient2} src={gradient2} />
      <Image className={classes.gradient3} src={gradient3} />

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
