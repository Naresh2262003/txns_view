import React, { useState } from "react";
import BlockDetailsPage from './components/BlockDetailsPage.jsx'
import TransactionTable from './components/TransactionTable.jsx'
import HeaderComponent from './components/Header.jsx'
import { Layout } from "antd";
import './App.css'

function App() {
  const [searchData, setSearchData] = useState("");

  return (
    <div>
      <Layout className="container" style={{ minHeight: "100vh" }}>
        <HeaderComponent setSearchData={setSearchData} />
        {searchData? 
          <BlockDetailsPage txId={searchData} />:
          <TransactionTable />
        }
      </Layout>
    </div>
  );
}

export default App;
