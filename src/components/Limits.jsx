import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography, Input, Tooltip, message, Space, Row, Col, Button } from 'antd';
import { EditOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const LimitsPage = () => {
  // States for input values
  const [loadLimit, setLoadLimit] = useState('');
  const [transactionLimit, setTransactionLimit] = useState('');

  // States for editability
  const [loadLimitEditable, setLoadLimitEditable] = useState(false);

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchLimitsData = async () => {
      try {
        const response = await axios.get(
          'https://xtsp-go.niceriver-b5ad439b.centralindia.azurecontainerapps.io/v1/api/admin/configs/' // Replace with your API endpoint
        );

        console.log("limit", response)
        // Set the load limit based on filtered results
        const loadLimit = response.data.find(item => item.key === "load_amount_max_limit");
        setLoadLimit(loadLimit.value.replace(/\..*$/, ""));

        console.log("limit   ji", loadLimit.value.replace(/\..*$/, ""))

        const transactionLimit = response.data.find(item => item.key === "per_transfer_max_limit");
        setTransactionLimit(transactionLimit.value.replace(/\..*$/, ""));
      } catch (error) {
        console.error('Error fetching limits:', error);
        message.error('Failed to fetch limits. Please try again later.');
      }
    };

    fetchLimitsData();
  }, []);

  // Handle edit toggling
  const handleEditClick = () => {
    setLoadLimitEditable(!loadLimitEditable);
  };

  // Handle saving updated values
  const handleSave = async () => {
    try {
      await axios.put(
        `https://xtsp-go.niceriver-b5ad439b.centralindia.azurecontainerapps.io/v1/api/admin/configs/1`,
        {
          key: 'load_amount_max_limit',
          updated_by: 'admin',
          value: loadLimit, 
        }
      );

      setLoadLimitEditable(false); // Disable edit mode
      message.success('Load limit updated successfully');
    } catch (error) {
      console.error('Error updating load limit:', error);
      message.error('Failed to update load limit. Please try again later.');
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#141414',
        minHeight: '100vh',
        padding: '20px',
        maxWidth: '100%',
      }}
    >
      <Title level={3} style={{ marginBlock: '20px', textAlign: 'center', color: '#fff' }}>
        Update Allowed Limits
      </Title>
      <Space direction="vertical" size="large" style={{ width: '100%', backgroundColor: '#141414' }}>
        {/* XCBDC Load Card */}
        <Card
          style={{
            background: 'rgb(6, 6, 6)',
            color: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            width: '100%',
          }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={5} style={{ color: '#FFF' }}>
                XCBDC Load
              </Title>
              <Text type="secondary" style={{ color: '#FFF', fontWeight:'400' }}>
                (Real-time change)
              </Text>
            </Col>
            <Col>
              <Tooltip title="Edit Load Limit">
                <EditOutlined
                  style={{ fontSize: '18px', cursor: 'pointer', color: '#fff' }}
                  onClick={handleEditClick}
                />
              </Tooltip>
            </Col>
          </Row>
          <Input
            value={loadLimit}
            onChange={(e) => setLoadLimit(e.target.value)}
            placeholder="Limit on XCBDC Load amounts"
            suffix={<InfoCircleOutlined style={{ color: '#bfbfbf' }} />}
            style={{
              marginTop: '10px',
              borderRadius: '5px',
              backgroundColor: 'white',
              borderColor: '#d9d9d9',
            }}
            readOnly={!loadLimitEditable}
          />
          {loadLimitEditable && (
            <Button
              type="primary"
              onClick={handleSave}
              style={{ marginTop: '10px' }}
            >
              Save
            </Button>
          )}
        </Card>

        {/* XCBDC Transaction Card */}
        <Card
          style={{
            background: 'rgb(6, 6, 6)',
            color: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            width: '100%',
          }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={5} style={{ color: '#fff' }}>
                XCBDC Transaction
              </Title>
            </Col>
            <Col>
              <Tooltip title="Requires Mobile app update, contact admin">
                <InfoCircleOutlined style={{ fontSize: '18px', color: '#fff' }} />
              </Tooltip>
            </Col>
          </Row>
          <Input
            value={transactionLimit}
            suffix={<InfoCircleOutlined style={{ color: '#bfbfbf' }} />}
            style={{
              marginTop: '10px',
              borderRadius: '5px',
              backgroundColor: 'white',
              borderColor: '#d9d9d9',
            }}
            readOnly
          />
        </Card>
      </Space>
    </div>
  );
};

export default LimitsPage;

