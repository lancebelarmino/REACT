import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import reactAbi from '../utils/rebaseAggregatorAbi.json';
import wavaxAbi from '../utils/wavaxAbi.json';

const EtherContext = React.createContext();

const defaultDashboardData = {
  avaxPrice: 0,
  price: 0,
  marketCap: 0,
  // holders: 0,
  rewards: 0,
};

const defaultWalletData = {
  balance: 0,
  balanceInUsd: 0,
  gains: 0,
  gainsInUsd: 0,
  rewards: 0,
  rewardsInUsd: 0,
  isClaimed: false,
  isCompounded: false,
  isLocked: false,
  time: 0,
};

export const EtherContextProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(defaultDashboardData);
  const [user, setUser] = useState(() => {
    const stickyValue = sessionStorage.getItem('user');
    return stickyValue !== null ? JSON.parse(stickyValue) : null;
  });
  const [error, setError] = useState(null);
  const [walletData, setWalletData] = useState(defaultWalletData);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  const avaxProvider = useMemo(() => new ethers.providers.getDefaultProvider('https://api.avax.network/ext/bc/C/rpc'), []);
  const reactContract = useMemo(() => new ethers.Contract('0xd33df97747dD6bEcAD26B2e61F818c94B7588E69', reactAbi, avaxProvider), [avaxProvider]);
  const wavaxContract = useMemo(() => new ethers.Contract('0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', wavaxAbi, avaxProvider), [avaxProvider]);
  const lpPair = '0x580436ecaba01815711aa4a191c4405c73ddf829';
  const tokenDecimal = 18;

  const tokenFormatEther = (value) => {
    return ethers.utils.formatUnits(value, tokenDecimal);
  };

  // Dashboard
  const getAvaxPrice = useCallback(async () => {
    const response = await fetch('https://api.coinstats.app/public/v1/coins/avalanche-2');
    const data = await response.json();
    const avaxPrice = data.coin.price;

    return avaxPrice;
  }, []);

  const getLPBalance = useCallback(async () => {
    const avaxBalance = await wavaxContract.balanceOf(lpPair);
    const tokenBalance = await reactContract.balanceOf(lpPair);

    return {
      avax: ethers.utils.formatUnits(avaxBalance, tokenDecimal),
      token: tokenFormatEther(tokenBalance),
    };
  }, [wavaxContract, reactContract]);

  const getTokenPrice = useCallback((lpAvax, lpToken, avaxPrice) => {
    if (lpAvax && lpToken && avaxPrice) {
      const avaxBalanceInUsd = lpAvax * avaxPrice;
      const tokenPrice = (avaxBalanceInUsd / lpToken).toFixed(tokenDecimal);

      return parseFloat(tokenPrice).toFixed(5);
    }
  }, []);

  const getMarketCap = useCallback(
    async (reactPrice) => {
      let totalSupply = await reactContract.totalSupply();

      let marketCap = tokenFormatEther(totalSupply) * reactPrice;

      return marketCap.toFixed(3);
    },
    [reactContract]
  );

  const getTotalRewardsDistributed = useCallback(async () => {
    const rewards = await reactContract.getTotalReflected();

    return parseFloat(tokenFormatEther(rewards)).toFixed(5);
  }, [reactContract]);

  // Account
  const getAccountBalance = useCallback(
    async (address) => {
      if (!address) {
        return;
      }

      const balance = await reactContract.balanceOf(address);

      return parseFloat(tokenFormatEther(balance)).toFixed(5);
    },
    [reactContract]
  );

  const getUserRealizedGains = useCallback(
    async (address) => {
      const realizeGains = await reactContract.getUserRealizedGains(address);
      const gains = tokenFormatEther(realizeGains);

      return parseFloat(gains).toFixed(3);
    },
    [reactContract]
  );

  const getPendingRewards = useCallback(
    async (address) => {
      const unpaidEarnings = await reactContract.getUserUnpaidEarnings(address);
      const rewards = tokenFormatEther(unpaidEarnings);

      return parseFloat(rewards).toFixed(3);
    },
    [reactContract]
  );

  const procMetamask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    const networkId = network.chainId;

    return { signer, networkId };
  };

  const claimPendingRewards = async () => {
    try {
      let metamask = await procMetamask();

      if (metamask.networkId !== 43114) {
        const error = { id: 'network', error: 'Not in correct network' };
        throw error;
      }

      const react = new ethers.Contract('0xd33df97747dD6bEcAD26B2e61F818c94B7588E69', reactAbi, metamask.signer);
      await react.claimPendingRewards();

      setWalletData((prevData) => ({ ...prevData, rewards: 0, rewardsInUsd: 0, isClaimed: true }));
    } catch (error) {
      if (error.id === 'network') {
        setError({ title: 'Wrong Network', description: error.error });
        return;
      }
      setError({ title: 'Claim Failed', description: 'Unable to claim AVAX tokens.' });
    }
  };

  const compoundDividends = async () => {
    try {
      let metamask = await procMetamask();

      if (metamask.networkId !== 43114) {
        const error = { id: 'network', error: 'Not in correct network' };
        throw error;
      }

      const react = new ethers.Contract('0xd33df97747dD6bEcAD26B2e61F818c94B7588E69', reactAbi, metamask.signer);
      await react.compoundDividends();

      setWalletData((prevData) => ({ ...prevData, rewards: 0, rewardsInUsd: 0, isCompounded: true }));
    } catch (error) {
      if (error.id === 'network') {
        setError({ title: 'Wrong Network', description: error.error });
        return;
      } else if (error.data.code === 3) {
        setError({ title: 'Compound Failed', description: 'No rewards to compound.' });
        return;
      }
      setError({ title: 'Compound Failed', description: 'Unable to compound AVAX tokens.' });
    }
  };

  const lockTokens = async (amount, days) => {
    try {
      let metamask = await procMetamask();
      const react = new ethers.Contract('0xd33df97747dD6bEcAD26B2e61F818c94B7588E69', reactAbi, metamask.signer);
      const daysInSeconds = days * 86400;

      if (metamask.networkId !== 43114) {
        const error = { id: 'network', error: 'Not in correct network' };
        throw error;
      }

      metamask.signer.signMessage('Lock Tokens');
      await react.lockInitialTokens(amount, daysInSeconds);

      const time = await getRemainingTokenLockTime();

      setWalletData((prevData) => ({ ...prevData, time, isLocked: true }));
    } catch (error) {
      if (error.id === 'network') {
        setError({ title: 'Wrong Network', description: error.error });
        return;
      }
    }
  };

  const getRemainingTokenLockTime = useCallback(async () => {
    const seconds = await reactContract.getRemainingTokenLockTime(user);
    return seconds * 1 * 1000;
  }, [reactContract, user]);

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const user = await signer.getAddress();

    sessionStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const calculateWallet = useCallback(async () => {
    const balance = await getAccountBalance(user);
    const balanceInUsd = (balance * dashboardData.price).toFixed(3);
    const gains = await getUserRealizedGains(user);
    const gainsInUsd = (gains * dashboardData.avaxPrice).toFixed(3);
    const rewards = await getPendingRewards(user);
    const rewardsInUsd = (rewards * dashboardData.avaxPrice).toFixed(3);
    const time = await getRemainingTokenLockTime(user);

    setWalletData((prevData) => ({
      ...prevData,
      balance,
      balanceInUsd,
      gains,
      gainsInUsd,
      rewards,
      rewardsInUsd,
      time,
    }));
  }, [getAccountBalance, getUserRealizedGains, getPendingRewards, user, dashboardData.price, dashboardData.avaxPrice, getRemainingTokenLockTime]);

  // On page load
  const fetchData = useCallback(async () => {
    const avaxPrice = await getAvaxPrice();
    const lpBalance = await getLPBalance();
    const reactPrice = getTokenPrice(lpBalance.avax, lpBalance.token, avaxPrice);
    const marketCap = await getMarketCap(reactPrice);
    const rewards = await getTotalRewardsDistributed();

    setDashboardData({ avaxPrice, price: reactPrice, marketCap, rewards });
    setIsLoading(false);
  }, [getAvaxPrice, getLPBalance, getTokenPrice, getMarketCap, getTotalRewardsDistributed]);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (user) {
      calculateWallet();
    }
  }, [user, location.pathname, calculateWallet]);

  return (
    <EtherContext.Provider
      value={{
        dashboardData,
        walletData,
        setWalletData,
        connectWallet,
        calculateWallet,
        user,
        claimPendingRewards,
        compoundDividends,
        isLoading,
        setIsLoading,
        error,
        setError,
        lockTokens,
      }}>
      {children}
    </EtherContext.Provider>
  );
};

export default EtherContext;
