import { Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider, Global } from '@mantine/core';
import AppSection from './components/App/AppSection';
import Dashboard from './pages/Dashboard/Dashboard';
import Account from './pages/Account/Account';
import Calculator from './pages/Calculator/Calculator';
import theme from './styles/theme';
import components from './styles/components';
import global from './styles/global';

function App() {
  return (
    <MantineProvider theme={theme} styles={components} withNormalizeCSS>
      <Global styles={global} />
      <AppSection>
        <Routes>
          <Route path="/" element={<Navigate to={'dashboard'} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/calculator" element={<Calculator />} />
        </Routes>
      </AppSection>
    </MantineProvider>
  );
}

export default App;
