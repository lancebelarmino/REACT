import { Title, Text, Image, SimpleGrid, Button } from '@mantine/core';
import Card from '../../components/Card/Card';
import { ReactComponent as Wallet } from '../../assets/account-balance.svg';
import { ReactComponent as Gains } from '../../assets/account-gains.svg';
import { ReactComponent as Rewards } from '../../assets/account-rewards.svg';
import avalanche from '../../assets/account-avalanche.png';
import oto from '../../assets/account-oto.png';
import react from '../../assets/account-react.png';
import gradient4 from '../../assets/gradient-4.png';
import gradient5 from '../../assets/gradient-5.png';
import useStyles from './Account.styles';

const row2 = [
  { icon: Gains, title: 'Realized Gains', label: '15 AVAX', value: '$ 1200.17' },
  { icon: Rewards, title: 'Pending Rewards', label: '0.17 AVAX', value: '$ 13.65' },
];

const Account = () => {
  const { classes, cx } = useStyles();

  const row2List = row2.map((item) => (
    <Card className={classes.cardStat}>
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
              1 000 000.21
            </Text>
            <Text size="md">$ 1 300.15</Text>
          </div>
        </Card>
      </div>

      <div className={classes.row}>
        <SimpleGrid className={classes.row} cols={2} spacing={40} breakpoints={[{ maxWidth: 768, cols: 1 }]}>
          {row2List}
        </SimpleGrid>
      </div>

      <div className={classes.row}>
        <SimpleGrid className={classes.row} cols={3} spacing={40} breakpoints={[{ maxWidth: 768, cols: 1 }]}>
          <Card>
            <Image className={classes.cardActionImage} src={avalanche} width={60} height={60} />
            <Button className={classes.btn} fullWidth>
              Claim
            </Button>
          </Card>
          <Card>
            <Image className={classes.cardActionImage} src={oto} width={60} height={60} />
            <Button className={cx(classes.btn, classes.btnGradient)} fullWidth>
              Claim
            </Button>
          </Card>
          <Card>
            <Image className={classes.cardActionImage} src={react} width={60} height={60} />
            <Button className={classes.btn} fullWidth>
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
