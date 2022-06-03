import React, { useContext, useEffect } from 'react';
import EtherContext from '../../context/EtherContext';
import { Title, Text, Image, SimpleGrid } from '@mantine/core';
import { motion } from 'framer-motion';
import { contentVariant, imageVariant } from '../../utils/framer-variants';
import Card from '../../components/Card/Card';
import { ReactComponent as Price } from '../../assets/dashboard-price.svg';
import { ReactComponent as MarketCap } from '../../assets/dashboard-market.svg';
// import { ReactComponent as Holders } from '../../assets/dashboard-holders.svg';
import { ReactComponent as Rewards } from '../../assets/dashboard-rewards.svg';
import gradient1 from '../../assets/gradient-1.png';
import gradient2 from '../../assets/gradient-2.png';
import gradient3 from '../../assets/gradient-3.png';
import useStyles from './Dashboard.styles';

const Dashboard = () => {
  const { dashboardData, isLoading } = useContext(EtherContext);
  const { classes } = useStyles();

  const row1 = [
    { icon: Price, title: 'Price', value: dashboardData.price },
    { icon: MarketCap, title: 'Market Cap', value: dashboardData.marketCap },
    // { icon: Holders, title: 'Holders', value: 0.0 },
    { icon: Rewards, title: 'Total Rewards Distributed', value: dashboardData.rewards },
  ];

  const row1List = row1.map((item) => (
    <Card key={item.title} className={classes.cardStat}>
      <item.icon className={classes.cardStatIcon} />
      <div>
        <Title className={classes.cardStatTitle} order={5}>
          {item.title}
        </Title>
        <Text size="md">{item.value}</Text>
      </div>
    </Card>
  ));

  useEffect(() => {
    if (!isLoading) {
      // describe widget configuration and saving to a global variable for future use
      var configuration = {
        from: 'BNB',
        to: '0xd33df97747dD6bEcAD26B2e61F818c94B7588E69',
        fromChain: 'BSC',
        toChain: 'AVALANCHE',
        amount: 0.1,
        iframe: 'flex',
        hideSelectionFrom: false,
        hideSelectionTo: true,
        theme: 'dark',
        background: '#b2831f',
        injectTokens: {
          avalanche: ['0xd33df97747dD6bEcAD26B2e61F818c94B7588E69'],
        },
        slippagePercent: {
          instantTrades: 16,
          crossChain: 16,
        },
        fee: 0.075,
        feeTarget: '0x5eFDd1c04bbDD19E0cBC8FBAC1EC52f871925961',
        promoCode: 'ernIv7vi',
      };

      // prevent accidental changes to the object, for example, when re-creating a widget for another theme
      Object.freeze(configuration);

      // create widget
      rubicWidget.init(configuration); // eslint-disable-line
    }
  }, [isLoading]);

  return (
    <div>
      <motion.div className={classes.row} variants={contentVariant} custom={1}>
        <SimpleGrid cols={3} spacing={40} breakpoints={[{ maxWidth: 1024, cols: 1 }]}>
          {row1List}
        </SimpleGrid>
      </motion.div>

      <motion.div className={classes.row} variants={contentVariant} custom={2}>
        <Card className={classes.chart}>
          <iframe className={classes.dex} src="https://dexscreener.com/avalanche/0x580436ecaba01815711aa4a191c4405c73ddf829" title="dexchart"></iframe>
        </Card>
      </motion.div>

      <motion.div className={classes.row} variants={contentVariant} custom={2}>
        <Card>
          <div id="rubic-widget-root"></div>
        </Card>
      </motion.div>

      <Image className={classes.gradient1} src={gradient1} component={motion.div} variants={imageVariant} />
      <Image className={classes.gradient2} src={gradient2} component={motion.div} variants={imageVariant} />
      <Image className={classes.gradient3} src={gradient3} component={motion.div} variants={imageVariant} />
    </div>
  );
};

export default Dashboard;
