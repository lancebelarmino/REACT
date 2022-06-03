import { Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider, Global } from '@mantine/core';
import { EtherContextProvider } from './context/EtherContext';
import AppSection from './components/App/AppSection';
import Dashboard from './pages/Dashboard/Dashboard';
import Account from './pages/Account/Account';
import Calculator from './pages/Calculator/Calculator';
import LockedStaking from './pages/LockedStaking/LockedStaking';
import Lottery from './pages/Lottery/Lottery';
import theme from './styles/theme';
import global from './styles/global';

function App() {
  return (
    <MantineProvider theme={theme} withNormalizeCSS>
      <Global styles={global} />
      <EtherContextProvider>
        <AppSection>
          <Routes>
            <Route path="/" element={<Navigate to={'dashboard'} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/locked-staking" element={<LockedStaking />} />
            <Route path="/lottery" element={<Lottery />} />
          </Routes>
        </AppSection>
      </EtherContextProvider>
    </MantineProvider>
  );
}

export default App;
