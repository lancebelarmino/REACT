import React, { useContext } from 'react';
import { Title, Text, Image, SimpleGrid, Button } from '@mantine/core';
import EtherContext from '../../context/EtherContext';
import Card from '../../components/Card/Card';
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
  const { walletData, claimPendingRewards, compoundDividends } = useContext(EtherContext);
  const { classes } = useStyles();

  const row2 = [
    { icon: Gains, title: 'Realized Gains', label: `${walletData.gains} AVAX`, value: `$ ${walletData.gainsInUsd}` },
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

  return (
    <div>
      <div className={classes.row}>
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
      </div>

      <div className={classes.row}>
        <SimpleGrid className={classes.row} cols={2} spacing={40} breakpoints={[{ maxWidth: 768, cols: 1 }]}>
          {row2List}
        </SimpleGrid>
      </div>

      <div className={classes.row}>
        <SimpleGrid className={classes.row} cols={2} spacing={40} breakpoints={[{ maxWidth: 768, cols: 1 }]}>
          <Card>
            <Image className={classes.cardActionImage} src={avalanche} width={60} height={60} />
            <Button className={classes.btn} onClick={claimPendingRewards} fullWidth>
              Claim
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
      </div>

      <Image className={classes.gradient4} src={gradient4} />
      <Image className={classes.gradient5} src={gradient5} />
    </div>
  );
};

export default Account;
