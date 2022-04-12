import { Title, Text, Image, SimpleGrid } from '@mantine/core';
import Card from '../../components/Card/Card';
import { ReactComponent as Price } from '../../assets/dashboard-price.svg';
import { ReactComponent as MarketCap } from '../../assets/dashboard-market.svg';
import { ReactComponent as Holders } from '../../assets/dashboard-holders.svg';
import { ReactComponent as Rewards } from '../../assets/dashboard-rewards.svg';
import gradient1 from '../../assets/gradient-1.png';
import gradient2 from '../../assets/gradient-2.png';
import gradient3 from '../../assets/gradient-3.png';
import useStyles from './Dashboard.styles';

const row1 = [
  { icon: Price, title: 'Price', value: 0.0 },
  { icon: MarketCap, title: 'Market Cap', value: 0.0 },
  { icon: Holders, title: 'Holders', value: 0.0 },
  { icon: Rewards, title: 'Total Rewards Distributed', value: 0.0 },
];

const Dashboard = () => {
  const { classes } = useStyles();

  const row1List = row1.map((item) => (
    <Card className={classes.cardStat}>
      <item.icon className={classes.cardStatIcon} />
      <div>
        <Title className={classes.cardStatTitle} order={5}>
          {item.title}
        </Title>
        <Text size="md">{item.value}</Text>
      </div>
    </Card>
  ));

  return (
    <div>
      <SimpleGrid
        className={classes.row}
        cols={4}
        spacing={40}
        breakpoints={[
          { maxWidth: 1366, cols: 2 },
          { maxWidth: 768, cols: 1 },
        ]}>
        {row1List}
      </SimpleGrid>

      <div className={classes.row}>
        <Card className={classes.chart}>Chart</Card>
      </div>

      <Image className={classes.gradient1} src={gradient1} />
      <Image className={classes.gradient2} src={gradient2} />
      <Image className={classes.gradient3} src={gradient3} />
    </div>
  );
};

export default Dashboard;
