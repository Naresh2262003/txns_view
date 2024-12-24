import React, { useState } from "react";
import BlockDetailsPage from './components/BlockDetailsPage.jsx';
import TransactionTable from './components/TransactionTable.jsx';
import HeaderComponent from './components/Header.jsx';
import NewPage from './components/NewView.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from "antd";
import './App.css';

function App() {
  const [searchData, setSearchData] = useState("");
  const [cardView, setCardView] = useState(false);

  return (
    <Router>
      <div>
        <Layout >
          <HeaderComponent 
            setSearchData={setSearchData} 
            cardView={cardView} 
            setCardView={setCardView} 
          />
        </Layout>
      </div>
      <div className="container">
      <Routes>
        <Route path="/txns_view/" element={<TransactionTable/>}></Route>
        <Route path="/txns_view/:id" element={<BlockDetailsPage/>}></Route>
      </Routes>
      </div>
    </Router>
  );
}

export default App;