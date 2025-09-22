import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import RecipeList from './pages/RecipeList';
import QueueList from './pages/QueueList';
import FinishedList from './pages/FinishedList';
import SalesForm from './pages/SalesForm';
import ProfitReport from './pages/ProfitReport';

import Layout from './components/Layout';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><ProductList /></Layout>} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/queue" element={<QueueList />} />
        <Route path="/finished" element={<FinishedList />} />
        <Route path="/sales" element={<SalesForm />} />
        <Route path="/profit" element={<ProfitReport />} />
      </Routes>
    </Router>
  );
}

export default App;
