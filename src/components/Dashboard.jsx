
import React, { useDebugValue, useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, Card, Typography, Row, Col, Progress, Statistic, Button, Skeleton } from 'antd';
import { LockOutlined,TransactionOutlined, BarChartOutlined, UserOutlined, EyeOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
  // const [data, setData] = useState(null); // State to hold API data
  // const api = "https://xtsp-go.niceriver-b5ad439b.centralindia.azurecontainerapps.io/v1/api/audit-log/";

  // useEffect(() => {
  //   // Fetch data from the API using axios
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(api);
  //       console.log(response);
  //       setData(response.data); // Store the fetched data in state
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const [data, setData] = useState(null); // State to hold API data
  const [loading, setLoading] = useState(true); // Loading state
  const api = "https://xtsp-go.niceriver-b5ad439b.centralindia.azurecontainerapps.io/v1/api/audit-log/";

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(api);
        console.log(response.data);
        setData(response.data); // Store the fetched data in state
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Ensure loading is false in case of error
      }
    };

    // Fetch data initially
    fetchData();

    // Set interval to fetch data every 10 seconds
    const intervalId = setInterval(fetchData, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [api]); // Depend on the API URL

  
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
          <Text style={{ color: "#FFFFFF", fontSize: "34px", fontWeight: "bold" }}>
            Dashboard Overview
          </Text>
        </Header>

        <Content style={{ padding: "24px" }}>
          {/* Row : Limits and Metrics */}
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card
                style={{
                  background: "#2C2C2C",
                  color: "#FFFFFF",
                  textAlign: "center",
                  paddingBlock: "16px",
                  paddingInline: "20px",
                  borderRadius: "12px",
                }}
              >
                <Statistic
                  title={<Text style={{ fontSize: "16px",color: "#fff" }}>XCBDC Pool Balance</Text>}
                  value={new Intl.NumberFormat('en-IN').format(data.pool_balance)}
                  prefix={<Text style={{ color: "#fff", fontSize: "24px" }}>₹</Text>}
                  valueStyle={{ color: "#FFFFFF" }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                style={{
                  background: "#2C2C2C",
                  color: "#FFFFFF",
                  textAlign: "center",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >
                <Statistic
                  title={<Text style={{fontSize: "16px", color: "#fff" }}>CBDC in Circulation</Text>}
                  value={new Intl.NumberFormat('en-IN').format(data.total_cbdc)}
                  prefix={<Text style={{ color: "#fff", fontSize: "24px" }}>₹</Text>}
                  valueStyle={{ color: "#FFFFFF" }}
                />
              </Card>
            </Col>
          </Row>
          {/* Row : Statistics and Overview */}
          <Row gutter={[16, 16]} align="middle" style={{ marginTop: "24px" }}>
            
            
          {/* <Col span={8}>
              <Card
                style={{
                  background: "#2C2C2C",
                  color: "#FFFFFF",
                  textAlign: "center",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >
                <Statistic
                  title={<Text style={{fontSize: "16px", color: "#fff" }}>Total XCBDC transactions</Text>}
                  value={data.total_xcbdc_txns}
                  valueStyle={{ color: "#FFFFFF" }}
                />
                
              </Card>
            </Col> */}
            
            <Col span={12}>
              <Card style={{ background: "#2C2C2C", color: "#FFFFFF", textAlign: "center" }}>
                <Statistic
                  title="CBDC Users"
                  value={data.total_cbdc_users}
                  valueStyle={{ color: "#FFFFFF" }}
                />
              </Card>
            </Col>
            
            <Col span={12}>
              <Card style={{ background: "#2C2C2C", color: "#FFFFFF", textAlign: "center" }}>
                <Statistic
                  title="Stealth Addresses"
                  value={data.total_stealth_addresses}
                  valueStyle={{ color: "#FFFFFF" }}
                />
              </Card>
            </Col>

            
          </Row>

          <Row gutter={[16, 16]} align="middle" style={{ marginTop: "24px" }}>
          <Col span={12}>
              <Card style={{ background: "#2C2C2C", color: "#FFFFFF", textAlign: "center" }}>
                <Statistic
                  title="XCBDC Load Limit"
                  value={new Intl.NumberFormat('en-IN').format(data.xcbdc_load_limit)}
                  prefix={<Text style={{ color: "#7D4AEA", fontSize: "24px" }}>₹</Text>}
                  valueStyle={{ color: "#FFFFFF" }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card style={{ background: "#2C2C2C", color: "#FFFFFF", textAlign: "center" }}>
                <Statistic
                  title="Transaction Amount Limit"
                  value={new Intl.NumberFormat('en-IN').format(data.xcbdc_txn_amount_limit)}
                  valueStyle={{ color: "#FFFFFF" }}
                  prefix={<Text style={{ color: "#7D4AEA", fontSize: "24px" }}>₹</Text>}
                />
              </Card>
            </Col>
            </Row>
          {/*  */}
          <Row gutter={[16, 16]} align="middle" style={{ marginTop: "24px" }}>
            <Col span={8}>
              <Card style={{ background: "#2C2C2C", color: "#FFFFFF", textAlign: "center" }}>
                <Statistic
                  title="XCBDC Loaded"
                  value={new Intl.NumberFormat('en-IN').format(data.total_loaded)}
                  prefix={<Text style={{ color: "#7D4AEA", fontSize: "24px" }}>₹</Text>}
                  valueStyle={{ color: "#FFFFFF" }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ background: "#2C2C2C", color: "#FFFFFF", textAlign: "center" }}>
                <Statistic
                  title="XCBDC Unloaded"
                  value={new Intl.NumberFormat('en-IN').format(data.total_unloaded)}
                  prefix={<Text style={{ color: "#7D4AEA", fontSize: "24px" }}>₹</Text>}
                  valueStyle={{ color: "#FFFFFF" }}
                />
              </Card>
            </Col>

            
            <Col span={8}>
              <Card style={{ background: "#2C2C2C", color: "#FFFFFF", textAlign: "center" }}>
            <Statistic
                  title="Total XCBDC transactions"
                  value={data.total_xcbdc_txns}
                  valueStyle={{ color: "#FFFFFF" }}
                />
                </Card>
                </Col>
            
          </Row>

          {/* Row : Visual Representation */}
          {/* <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
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
                  ₹{data.total_xcbdc} / ₹{data.xcbdc_txn_amount_limit}
                </Text>
              </Card>
            </Col>
          </Row> */}

        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
