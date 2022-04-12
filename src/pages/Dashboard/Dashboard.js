import { Title, Text, SimpleGrid } from '@mantine/core';
import Card from '../../components/Card/Card';
import { ReactComponent as Price } from '../../assets/dashboard-price.svg';
import { ReactComponent as MarketCap } from '../../assets/dashboard-market.svg';
import { ReactComponent as Holders } from '../../assets/dashboard-holders.svg';
import { ReactComponent as Rewards } from '../../assets/dashboard-rewards.svg';
import useStyles from './Dashboard.styles';

const stats = [
  { icon: Price, title: 'Price', value: 0.0 },
  { icon: MarketCap, title: 'Market Cap', value: 0.0 },
  { icon: Holders, title: 'Holders', value: 0.0 },
  { icon: Rewards, title: 'Total Rewards Distributed', value: 0.0 },
];

const Dashboard = () => {
  const { classes } = useStyles();

  const row1 = stats.map((item) => (
    <Card className={classes.card}>
      <item.icon className={classes.cardIcon} />
      <div>
        <Title className={classes.cardTitle} order={5}>
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
        {row1}
      </SimpleGrid>

      <div className={classes.row}>
        <Card className={classes.chart}>Chart</Card>
      </div>
    </div>
  );
};

export default Dashboard;
