import React, { useContext, useEffect } from 'react';
import EtherContext from '../../context/EtherContext';
import { Title, Text, Image, SimpleGrid, Button } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { contentVariant, imageVariant } from '../../utils/framer-variants';
import Notification from '../../components/Feedback/Notification';
import Card from '../../components/Card/Card';
import { ReactComponent as Success } from '../../assets/notif-success.svg';
import { ReactComponent as Error } from '../../assets/notif-error.svg';
import { ReactComponent as Wallet } from '../../assets/account-balance.svg';
import { ReactComponent as Gains } from '../../assets/account-gains.svg';
import { ReactComponent as Rewards } from '../../assets/account-rewards.svg';
import avalanche from '../../assets/account-avalanche.png';
// import oto from '../../assets/account-oto.png';
import react from '../../assets/account-react.png';
import gradient4 from '../../assets/gradient-4.png';
import gradient5 from '../../assets/gradient-5.png';
import useStyles from './Account.styles';

const Account = () => {
  const { walletData, setWalletData, claimPendingRewards, compoundDividends, error, setError } = useContext(EtherContext);
  const { classes } = useStyles();

  const row2 = [
    { icon: Gains, title: 'Claimed Rewards', label: `${walletData.gains} AVAX`, value: `$ ${walletData.gainsInUsd}` },
    { icon: Rewards, title: 'Pending Rewards', label: `${walletData.rewards} AVAX`, value: `$ ${walletData.rewardsInUsd}` },
  ];

  const row2List = row2.map((item) => (
    <Card key={item.title} className={classes.cardStat}>
      <item.icon className={classes.cardStatIcon} />
      <div>
        <Title className={classes.cardStatTitle} order={5}>
          {item.title}
        </Title>
        <Text className={classes.cardStatLabel} size="md">
          {item.label}
        </Text>
        <Text size="md">{item.value}</Text>
      </div>
    </Card>
  ));

  useEffect(() => {
    if (walletData.isClaimed || walletData.isCompounded) {
      let screenTimer = setTimeout(() => {
        setWalletData((prevData) => ({ ...prevData, isClaimed: false, isCompounded: false }));
      }, 1500);

      return () => {
        clearTimeout(screenTimer);
      };
    }
  }, [walletData.isClaimed, walletData.isCompounded, setWalletData]);

  useEffect(() => {
    if (error) {
      let screenTimer = setTimeout(() => {
        setError(null);
      }, 1500);

      return () => {
        clearTimeout(screenTimer);
      };
    }
  }, [error, setError]);

  return (
    <div>
      <AnimatePresence exitBeforeEnter>
        {walletData.isClaimed && (
          <Notification
            key="claim-success"
            icon={Success}
            title="Claim Successful"
            description="You claimed AVAX tokens."
            onClose={() => setWalletData((prevData) => ({ ...prevData, isClaimed: false }))}
          />
        )}
        {walletData.isCompounded && (
          <Notification
            key="compound-success"
            icon={Success}
            title="Compound Successful"
            description="You've received REACT Tokens."
            onClose={() => setWalletData((prevData) => ({ ...prevData, isCompounded: false }))}
          />
        )}
        {error && <Notification key="error" icon={Error} title={error.title} description={error.description} onClose={() => setError(null)} />}
      </AnimatePresence>

      <motion.div className={classes.row} variants={contentVariant} custom={1}>
        <Card className={classes.cardStat}>
          <Wallet className={classes.cardStatIcon} />
          <div>
            <Title className={classes.cardStatTitle} order={5}>
              Balance
            </Title>
            <Text className={classes.cardStatLabel} size="md">
              {walletData.balance}
            </Text>
            <Text size="md">$ {walletData.balanceInUsd}</Text>
          </div>
        </Card>
      </motion.div>

      <motion.div className={classes.row} variants={contentVariant} custom={2}>
        <SimpleGrid className={classes.row} cols={2} spacing={40} breakpoints={[{ maxWidth: 768, cols: 1 }]}>
          {row2List}
        </SimpleGrid>
      </motion.div>

      <motion.div className={classes.row} variants={contentVariant} custom={3}>
        <SimpleGrid className={classes.row} cols={2} spacing={40} breakpoints={[{ maxWidth: 768, cols: 1 }]}>
          <Card>
            <Image className={classes.cardActionImage} src={avalanche} width={60} height={60} />
            <Button className={classes.btn} onClick={claimPendingRewards} fullWidth>
              Claim Pending Rewards
            </Button>
          </Card>
          {/* <Card>
            <Image className={classes.cardActionImage} src={oto} width={60} height={60} />
            <Button className={cx(classes.btn, classes.btnGradient)} fullWidth>
              Claim
            </Button>
          </Card> */}
          <Card>
            <Image className={classes.cardActionImage} src={react} width={60} height={60} />
            <Button className={classes.btn} onClick={compoundDividends} fullWidth>
              Compound with 0% tax
            </Button>
          </Card>
        </SimpleGrid>
      </motion.div>

      <Image className={classes.gradient4} src={gradient4} component={motion.div} variants={imageVariant} />
      <Image className={classes.gradient5} src={gradient5} component={motion.div} variants={imageVariant} />
    </div>
  );
};

export default Account;
