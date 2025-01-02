import React, { useState } from "react";
import { Input, Button, Spin, Alert, Card, Typography, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Audit.css"; 

const { Title, Text } = Typography;

const Audit = () => {
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const searchTransactionById = (transactionId, navigate) => {
    if (transactionId.trim()) {
      navigate(`/txns_view/${transactionId}`);
    } else {
      navigate(`/txns_view/dashboard`);
    }
  };

  const handleSearch = async () => {
    // if (!transactionId) {
    //   setError("Transaction ID cannot be empty.");
    //   return;
    // }

    searchTransactionById(transactionId, navigate);

    setError(null);
    setTransactionData(null);
    setLoading(true);

    try {
      const response = await axios.get(`${api_url}${transactionId}`);
      setTransactionData(response.data);
    } catch (err) {
      setError("Failed to fetch transaction data. Please check the Transaction ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "radial-gradient(circle, #1e1e1e, #000)",
        minHeight: "100vh",
        padding: "50px",
        color: "#fff",
      }}
    >
      <Row justify="center" align="middle" style={{ textAlign: "center" }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          <Title style={{ color: "#F0F0F0" }}>Audit Transaction </Title>
          <div style={{ marginBottom: "20px" }}>
            <Input
              placeholder="Enter Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              size="large"
              style={{
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
            <Button
              type="primary"
              size="large"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              style={{
                width: "100%",
                borderRadius: "8px",
                background: "linear-gradient(90deg, #E9D5FF, #F472B6)",
                border: "none",
              }}
            >
              Search
            </Button>
          </div>

          {loading && (
            <div style={{ margin: "20px 0" }}>
              <Spin size="large" tip="Searching..." />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Audit;

