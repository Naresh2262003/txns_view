import React, { useState } from "react";
import BlockDetailsPage from './components/BlockDetailsPage.jsx';
import TransactionTable from './components/TransactionTable.jsx';
import HeaderComponent from './components/Header.jsx';
import SiderContent from "./components/SiderContent.jsx";

import { BrowserRouter as Router, Routes, Route ,Navigate } from 'react-router-dom';
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;
import './App.css';
import Dashboard from "./components/Dashboard.jsx";
import Audit from "./components/Audit.jsx"
import Limits from "./components/Limits.jsx"

function App() {
  const [searchData, setSearchData] = useState("");
  const [cardView, setCardView] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <Layout>
        {/* Header */}
        <HeaderComponent 
          setSearchData={setSearchData} 
          cardView={cardView} 
          setCardView={setCardView} 
        />

        <Layout style={{ marginTop: '60px' }}>
          {/* Sider with Toggle Button */}
          <Sider
            width={collapsed ? 80 : 240} // Adjust width based on collapse state
            collapsible
            collapsed={collapsed}
            trigger={null} // Remove default toggle button
            style={{
              position: 'fixed',
              height: '700px',
              zIndex: '1',
              textAlign: 'center',
              lineHeight: '20px',
              color: '#fff',
              backgroundColor: '#1677ff',
              transition: 'width 0.3s',
              overflow:"hidden"
            }}
          >
            {/* <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                color: '#fff',
                background: 'none',
                border: 'none',
              }}
            /> */}
            <SiderContent collapsed={collapsed} setCollapsed={setCollapsed} />
          </Sider>

          {/* Main Content */}
          <Content style={{ padding: '0px', marginLeft: collapsed? '80px':'240px' }}>
            <div className="container">
              <Routes>
                <Route path="/txns_view/reports" element={<TransactionTable />} />
                <Route path="/txns_view/dashboard" element={<Dashboard />} />
                <Route path="/txns_view/audit" element={<Audit />} />
                <Route path="/txns_view/limits" element={<Limits />} />
                <Route path="/txns_view/:id" element={<BlockDetailsPage />} />
                <Route path="*" element={<Navigate to="/txns_view/dashboard" />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
