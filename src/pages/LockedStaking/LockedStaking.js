import React, { useContext, useState, useEffect } from 'react';
import EtherContext from '../../context/EtherContext';
import { Title, Text, Image, SimpleGrid, NumberInput, Button, ScrollArea, List } from '@mantine/core';
import { useForm } from '@mantine/form';
import { motion, AnimatePresence } from 'framer-motion';
import { contentVariant, imageVariant } from '../../utils/framer-variants';
import Card from '../../components/Card/Card';
import Timer from '../../components/Timer/Timer';
import Notification from '../../components/Feedback/Notification';
import { ReactComponent as Success } from '../../assets/notif-success.svg';
import { ReactComponent as Error } from '../../assets/notif-error.svg';
import { ReactComponent as Balance } from '../../assets/calculator-balance.svg';
import { ReactComponent as Token } from '../../assets/calculator-token.svg';
import { ReactComponent as Boost } from '../../assets/calculator-boost.svg';
import { ReactComponent as Time } from '../../assets/calculator-time.svg';
import gradient6 from '../../assets/gradient-6.png';
import gradient7 from '../../assets/gradient-7.png';
import useStyles from './LockedStaking.styles';

const mechanics = [
  'Rewards are in the form of REACT Tokens',
  'The daily ROI is fixed and flat meaning it does not compound on a daily basis.',
  'Users get their entire locked staking rewards 72 hours after their initial lock time. REACT tokens are directly sent to the user’s wallet.',
  'There is no early exit option as it defeats the purpose of the campaign so consider if you’re holding long term as you need to lock your tokens for the full duration.',
  'Users can only lock and stake once during the campaign.',
  'Users can only lock their tokens during the campaign period.',
];

const LockedStaking = () => {
  const { walletData, setWalletData, lockTokens, error, setError } = useContext(EtherContext);
  const form = useForm({
    initialValues: {
      amount: 0,
    },

    validate: {
      amount: (value) => (value < 1 || value === undefined ? 'Amount must not be empty' : null),
    },
  });
  const [days, setDays] = useState();
  const { classes } = useStyles();

  const row1 = [
    { icon: Balance, title: 'Balance', value: walletData.balance },
    { icon: Token, title: 'Locked Tokens', value: 0.0 },
    { icon: Boost, title: 'Boost', value: 0.0 },
    { icon: Time, title: 'Time Remaining Before Unlock', value: 0.0, isTimer: true },
  ];

  const row1List = row1.map((item) => (
    <Card key={item.title} className={classes.cardStat}>
      <item.icon className={classes.cardStatIcon} />
      <div>
        <Title className={classes.cardStatTitle} order={5}>
          {item.title}
        </Title>
        {!item.isTimer && <Text size="md">{item.value}</Text>}
        {item.isTimer && <Timer />}
      </div>
    </Card>
  ));

  const mechanicsList = mechanics.map((item, index) => (
    <List.Item id={index} className={classes.listItem}>
      {item}
    </List.Item>
  ));

  const calculateStaking = () => {
    lockTokens(form.values.amount, days);
  };

  useEffect(() => {
    if (walletData.isLocked) {
      let screenTimer = setTimeout(() => {
        setWalletData((prevData) => ({ ...prevData, isLocked: false }));
      }, 1500);

      return () => {
        clearTimeout(screenTimer);
      };
    }
  }, [walletData.isLocked, setWalletData]);

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
        {walletData.isLocked && (
          <Notification
            key="claim-success"
            icon={Success}
            title="Locked Successful"
            description="You locked REACT tokens."
            onClose={() => setWalletData((prevData) => ({ ...prevData, isLocked: false }))}
          />
        )}
        {error && <Notification key="error" icon={Error} title={error.title} description={error.description} onClose={() => setError(null)} />}
      </AnimatePresence>

      <motion.div className={classes.row} variants={contentVariant} custom={1}>
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
      </motion.div>

      <motion.div className={classes.row} variants={contentVariant} custom={2}>
        <Card>
          <SimpleGrid className={classes.row} cols={2} spacing={60} breakpoints={[{ maxWidth: 768, cols: 1 }]}>
            <form onSubmit={form.onSubmit(calculateStaking)}>
              <NumberInput
                className={classes.inputAmount}
                classNames={{ input: classes.input, error: classes.inputError }}
                placeholder="Amount"
                decimalSeparator="."
                precision={2}
                noClampOnBlur
                hideControls
                onBlur={() => form.validateField('amount')}
                {...form.getInputProps('amount')}
              />
              <SimpleGrid className={classes.row} cols={2} spacing={40} breakpoints={[{ maxWidth: 768, cols: 1 }]}>
                <Button
                  type="submit"
                  className={classes.btn}
                  onClick={() => {
                    setDays(15);
                  }}
                  fullWidth>
                  15 D
                </Button>
                <Button
                  type="submit"
                  className={classes.btn}
                  onClick={() => {
                    setDays(30);
                  }}
                  fullWidth>
                  30 D
                </Button>
              </SimpleGrid>
              <Button className={classes.btn} fullWidth>
                Claim Unlocked Tokens
              </Button>
            </form>
            <ScrollArea
              classNames={{
                scrollbar: classes.scrollBackground,
              }}
              className={classes.mechanics}
              type="auto"
              offsetScrollbars>
              <Title className={classes.listTitle} order={5}>
                Mechanics:
              </Title>
              <List>{mechanicsList}</List>
            </ScrollArea>
          </SimpleGrid>
        </Card>
      </motion.div>

      <Image className={classes.gradient6} src={gradient6} component={motion.div} variants={imageVariant} />
      <Image className={classes.gradient7} src={gradient7} component={motion.div} variants={imageVariant} />
    </div>
  );
};

export default LockedStaking;
