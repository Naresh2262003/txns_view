// Import necessary libraries
import React, { useDebugValue, useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, Card, Typography, Row, Col, Progress, Statistic, Button, Skeleton } from 'antd';
import { LockOutlined,TransactionOutlined, BarChartOutlined, UserOutlined, EyeOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
  const [data, setData] = useState(null); // State to hold API data
  const api = "https://xtsp-go.niceriver-b5ad439b.centralindia.azurecontainerapps.io/v1/api/audit-log/";

  useEffect(() => {
    // Fetch data from the API using axios
    const fetchData = async () => {
      try {
        const response = await axios.get(api);
        console.log(response);
        setData(response.data); // Store the fetched data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  
  if(!data){
    return (
    <Layout style={{ height: "100vh", background: "#1A1A1A" }}>
      {/* Header */}
      <Layout>
        <Header
          style={{
            background: "#1F1F1F",
            padding: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Skeleton.Input active={true} size="large" style={{ width: 200 }} />
        </Header>
  
        <Content style={{ padding: "24px" }}>
          {/* Row: Limits and Metrics */}
          <Row gutter={[16, 16]}>
            {[1, 2, 3].map((key) => (
              <Col span={8} key={key}>
                <Card
                  style={{
                    background: "#2C2C2C",
                    color: "#FFFFFF",
                    textAlign: "center",
                    padding: "20px",
                    borderRadius: "12px",
                  }}
                >
                  <Skeleton.Avatar active={true} size="large" style={{ marginBottom: "12px" }} />
                  <Skeleton.Input active={true} size="small" style={{ width: 150, margin: "10px 0" }} />
                  <Skeleton.Input active={true} size="default" style={{ width: 100, margin: "16px 0" }} />
                  <Skeleton.Input active={true} size="small" style={{ width: 120 }} />
                </Card>
              </Col>
            ))}
          </Row>
  
          {/* Row: Statistics and Overview */}
          <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
            {[1, 2, 3, 4].map((key) => (
              <Col span={6} key={key}>
                <Card style={{ background: "#2C2C2C", color: "#FFFFFF", textAlign: "center" }}>
                  <Skeleton.Input active={true} size="small" style={{ width: 180, marginBottom: "12px" }} />
                  <Skeleton.Input active={true} size="large" style={{ width: 80 }} />
                </Card>
              </Col>
            ))}
          </Row>
  
          {/* Row: Visual Representation */}
          <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
            <Col span={12}>
              <Card style={{ background: "#2C2C2C", color: "#FFFFFF" }}>
                <Skeleton.Input active={true} size="small" style={{ width: 200, marginBottom: "12px" }} />
                <Skeleton active={true} paragraph={{ rows: 6 }} />
              </Card>
            </Col>
            <Col span={12}>
              <Card style={{ background: "#2C2C2C", color: "#FFFFFF" }}>
                <Skeleton.Input active={true} size="small" style={{ width: 200, marginBottom: "12px" }} />
                <Skeleton active={true} paragraph={{ rows: 1 }} />
                <Skeleton.Input active={true} size="default" style={{ width: 100, margin: "12px 0" }} />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
    )
  }

  const pieData = [
    { name: "Loaded", value: parseFloat(data.total_loaded) },
    { name: "Unloaded", value: parseFloat(data.total_unloaded) },
    { name: "XCBDC", value: parseFloat(data.total_xcbdc) },
  ];

  const COLORS = ["#7D4AEA", "#C084FC", "#4CAF50"];


  return (
    <Layout style={{ height: "100vh", background: "#1A1A1A" }}>

      {/* Main Content */}
      <Layout>
        <Header
          style={{
            background: "#1F1F1F",
            padding: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Roboto, serif",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: "24px", fontWeight: "bold" }}>
            Dashboard Overview
          </Text>
        </Header>

        <Content style={{ padding: "24px" }}>
          {/* Row : Limits and Metrics */}
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card
                style={{
                  background: "linear-gradient(135deg, #7D4AEA, #C084FC)",
                  color: "#FFFFFF",
                  textAlign: "center",
                  paddingBlock: "16px",
                  paddingInline: "20px",
                  borderRadius: "12px",
                }}
              >
                <Text style={{ fontSize: "35px", color: "#FFFFFF", marginBottom: "12px" }}>₹</Text>
                {/* <Text style={{ fontSize: "16px", fontWeight: "600" }}> XCBDC Load Limit</Text>
                <Title level={3} style={{ color: "#FFFFFF", margin: "16px 0" }}>₹{data.xcbdc_load_limit}</Title>
                <Text style={{ color: "#FFFFFF", fontSize: "14px", opacity: 0.8 }}>Daily cap for XCBDC loading</Text> */}
                <Text style={{ fontSize: "16px", fontWeight: "600" }}> Total Pool Balance</Text>
                <Title level={3} style={{ color: "#FFFFFF", margin: "16px 0" }}>₹{data.pool_balance}</Title>
                <Text style={{ color: "#FFFFFF", fontSize: "14px", opacity: 0.8 }}>Available balance for transactions</Text>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                style={{
                  background: "linear-gradient(135deg, #4CAF50, #8BC34A)",
                  color: "#FFFFFF",
                  textAlign: "center",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >
                <BarChartOutlined style={{ fontSize: "36px", color: "#FFFFFF", marginBottom: "12px" }} />
                {/* <Text style={{ fontSize: "16px", fontWeight: "600" }}> Transaction Amount Limit</Text>
                <Title level={3} style={{ color: "#FFFFFF", margin: "16px 0" }}>₹{data.xcbdc_txn_amount_limit}</Title>
                <Text style={{ color: "#FFFFFF", fontSize: "14px", opacity: 0.8 }}>Maximum amount per transaction</Text> */}
                <Text style={{ fontSize: "16px", fontWeight: "600" }}> CBDC Circulation</Text>
                <Title level={3} style={{ color: "#FFFFFF", margin: "16px 0" }}>₹{data.total_cbdc}</Title>
                <Text style={{ color: "#FFFFFF", fontSize: "14px", opacity: 0.8 }}>Total circulating CBDC</Text>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                style={{
                  background: "linear-gradient(135deg, #F44336, #FF7961)",
                  color: "#FFFFFF",
                  textAlign: "center",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >
                <TransactionOutlined style={{ fontSize: "36px", color: "#FFFFFF", marginBottom: "12px" }} />
                <Text style={{ fontSize: "16px", fontWeight: "600" }}> Total Transactions</Text>
                <Title level={3} style={{ color: "#FFFFFF", margin: "16px 0" }}>{data.total_xcbdc_txns}</Title>
                <Text style={{ color: "#FFFFFF", fontSize: "14px", opacity: 0.8 }}>Total XCBDC transactions</Text>
              </Card>
            </Col>
          </Row>
          {/* Row : Statistics and Overview */}
          <Row gutter={[16, 16]} align="middle" style={{ marginTop: "24px" }}>
            <Col span={6}>
              <Card style={{ background: "#2C2C2C", color: "#FFFFFF", textAlign: "center" }}>
                <Statistic
                  title="XCBDC Load Limit"
                  value={data.xcbdc_load_limit}
                  prefix={<Text style={{ color: "#7D4AEA", fontSize: "24px" }}>₹</Text>}
                  valueStyle={{ color: "#FFFFFF" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ background: "#2C2C2C", color: "#FFFFFF", textAlign: "center" }}>
                <Statistic
                  title="Transaction Amount Limit"
                  value={data.xcbdc_txn_amount_limit}
                  valueStyle={{ color: "#FFFFFF" }}
                  prefix={<Text style={{ color: "#7D4AEA", fontSize: "24px" }}>₹</Text>}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ background: "#2C2C2C", color: "#FFFFFF", textAlign: "center" }}>
                <Statistic
                  title="CBDC Users"
                  value={data.total_cbdc_users}
                  prefix={<UserOutlined style={{ color: "#4CAF50" }} />}
                  valueStyle={{ color: "#FFFFFF" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ background: "#2C2C2C", color: "#FFFFFF", textAlign: "center" }}>
                <Statistic
                  title="Stealth Addresses"
                  value={data.total_stealth_addresses}
                  valueStyle={{ color: "#FFFFFF" }}
                  prefix={<LockOutlined style={{ color: "#F0A202" }} />}
                />
              </Card>
            </Col>
          </Row>

          

          {/* Row : Visual Representation */}
          <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
            <Col span={12}>
              <Card style={{ background: "#2C2C2C", color: "#FFFFFF" }}>
                <Text style={{ color: "#B5B5B5", fontSize: "14px" }}>Transaction Overview</Text>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={12}>
              <Card style={{ background: "#2C2C2C", color: "#FFFFFF" }}>
                <Text style={{ color: "#B5B5B5", fontSize: "14px" }}>XCBDC Transaction Progress</Text>
                <Progress
                  percent={(parseFloat(data.total_xcbdc) / parseFloat(data.xcbdc_load_per_day_limit)) * 100}
                  showInfo
                  strokeColor={{
                    "0%": "#7D4AEA",
                    "100%": "#C084FC",
                  }}
                />
                <Text style={{ color: "#FFFFFF" }}>
                  ₹{data.total_xcbdc} / ₹{data.xcbdc_load_per_day_limit}
                </Text>
              </Card>
            </Col>
          </Row>

        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
