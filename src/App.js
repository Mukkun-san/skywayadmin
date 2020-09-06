import React from 'react';
import Auth from './auth';
import DashboardLayout from './pages/layout';

function App() {

  return (
    <Auth>
        <DashboardLayout />
    </Auth>
  );
}

export default App;