import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Tag, Tooltip, message, Spin, Button } from 'antd';
// import './Table.css'

// Utility function to abbreviate long strings
const abbreviateString = (str, maxLength = 20) => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  const partLength = Math.floor((maxLength - 3) / 2); // Adjust for '...'
  return `${str.slice(0, partLength)}...${str.slice(-partLength)}`;
};

// Function to handle copying text to clipboard
const handleCopy = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => message.success('Copied to clipboard!'))
    .catch(() => message.error('Failed to copy.'));
};

const TransactionDetails = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [table, setTable] = useState("load_x");
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  // Function to fetch transaction data
  const fetchTransactionData = () => {
    // setLoading(true);
    axios
      .get('https://xtsp-go.niceriver-b5ad439b.centralindia.azurecontainerapps.io/v1/api/txs') 
      .then((response) => {
        console.log(response.data);
        
        const dataToset = response.data.filter((tx) => tx.tx_type == table);
        console.log("load dat  u a", dataToset);
        // setTransactionData(response.data);

        // Sort data by tx.time in descending order (newest first)
        dataToset.sort((a, b) => {
          const timeA = new Date(a.time);
          const timeB = new Date(b.time);
          return timeB - timeA; // Descending order
        });

        setTransactionData(dataToset);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching transaction data:', error);
        message.error('Failed to load transaction data.');
        setLoading(false);
      })
      .finally(() => {
        // setLoading(false);
        setButtonLoading(false);
      });
  };

  // Fetch transaction data initially and every 10 seconds
  useEffect(() => {
    fetchTransactionData(); 

    // const intervalId = setInterval(() => {
    //   fetchTransactionData();
    // }, 10000);

    // return () => clearInterval(intervalId);
  }, [table]);

  const handleButtonClick = (type) => {
    if (buttonLoading) return; // Prevent concurrent requests
    setButtonLoading(true);
    setTable(type);
  };

  // Formatting the fetched data for table display
  const formatTransactionData = (data) => {
    return data.map((item, index) => {
      const inputUtxos = item?.tx?.tx?.input_utxos || [];
      const outputUtxos = item?.tx?.tx?.output_utxos || [];

      const parseAddress = (addressStr) => {
        try {
          return JSON.parse(addressStr);
        } catch (error) {
          return { x: 'N/A', y: 'N/A' };
        }
      };

      return {
        key: index + 1,
        tx_time: item?.time || "N/A",
        txId: item?.tx_id || 'N/A',
        txStatus: item?.tx_status || 'N/A',
        txType: item?.tx_type || 'N/A',
        outputEphemeralKey: item?.tx?.tx?.output_utxo?.ephemeral_key || item?.tx?.tx?.output_utxos?.[0]?.ephemeral_key || item?.tx?.tx?.tx?.output_utxos?.[0]?.ephemeral_key  || 'N/A',
        outputGenTxId:  item?.tx?.tx?.output_utxo?.gen_tx_id || item?.tx?.tx?.output_utxos?.[0]?.gen_tx_id ||  item?.tx?.tx?.tx?.output_utxos?.[0]?.gen_tx_id || 'N/A',
        inputEphemeralKey: inputUtxos[0]?.ephemeral_key || item?.tx?.tx?.tx?.input_utxos?.[0]?.ephemeral_key || 'N/A',
        inputGenTxId: inputUtxos[0]?.gen_tx_id || item?.tx?.tx?.tx?.input_utxos?.[0]?.gen_tx_id || 'N/A',
        outputAmount: item?.tx?.tx?.amount || 'N/A',
        // address: { x: item?.tx?.tx?.output_utxo?.address.x, y:item?.tx?.tx?.output_utxo?.address.y} ||  { x: item?.tx?.tx?.input_utxos[0]?.address?.x, y:item?.tx?.tx?.input_utxos[0]?.address.y} || { x: 'N/A', y: 'N/A' },


      address: item?.tx?.tx?.output_utxo?.address?.x && item?.tx?.tx?.output_utxo?.address?.y
  ? { x: item?.tx?.tx?.output_utxo?.address.x, y: item?.tx?.tx?.output_utxo?.address.y }
  : (item?.tx?.tx?.input_utxos?.[0]?.address?.x && item?.tx?.tx?.input_utxos?.[0]?.address?.y
      ? { x: item?.tx?.tx?.input_utxos[0]?.address.x, y: item?.tx?.tx?.input_utxos[0]?.address.y }
      : (item?.tx?.tx?.tx?.input_utxos?.[0]?.address 
          ? parseAddress(item?.tx?.tx?.tx?.input_utxos?.[0]?.address)
          : parseAddress(item?.tx?.tx?.input_utxos?.[0]?.address)))
  
      };
    });
  };

  // Columns for the table
  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'txId',
      key: 'txId',
      render: (text) => (
        <Tooltip title="Click to copy">
          <span
            style={{ cursor: 'pointer', color: '#4096ff' }}
            onClick={() => handleCopy(text)}
          >
            {abbreviateString(text, 15)}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'txStatus',
      key: 'txStatus',
      render: (status) => (
        <Tag color={status === 'completed' ? 'green' : 'red'}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'txType',
      key: 'txType',
      render: (type) => (
        <Tag color="blue" style={{ borderRadius: '20px', padding: '2px 10px' }}>
          {type}
        </Tag>
      ),
    },
    {
      title: 'Output Ephemeral Key',
      dataIndex: 'outputEphemeralKey',
      key: 'outputEphemeralKey',
      render: (text) => (
        <Tooltip title="Click to copy">
          <span
            style={{ cursor: 'pointer', color: '#4096ff' }}
            onClick={() => handleCopy(text)}
          >
            {abbreviateString(text, 15)}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Output Gen Tx ID',
      dataIndex: 'outputGenTxId',
      key: 'outputGenTxId',
      render: (text) => (
        <Tooltip title="Click to copy">
          <span
            style={{ cursor: 'pointer', color: '#4096ff' }}
            onClick={() => handleCopy(text)}
          >
            {abbreviateString(text, 15)}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Input Ephemeral Key',
      dataIndex: 'inputEphemeralKey',
      key: 'inputEphemeralKey',
      render: (text) => (
        <Tooltip title="Click to copy">
          <span
            style={{ cursor: 'pointer', color: '#4096ff' }}
            onClick={() => handleCopy(text)}
          >
            {abbreviateString(text, 15)}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Input Gen Tx ID',
      dataIndex: 'inputGenTxId',
      key: 'inputGenTxId',
      render: (text) => (
        <Tooltip title="Click to copy">
          <span
            style={{ cursor: 'pointer', color: '#4096ff' }}
            onClick={() => handleCopy(text)}
          >
            {abbreviateString(text, 15)}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'outputAmount',
      key: 'outputAmount',
      render: (value) => {
        const valueStr = JSON.stringify(value);
        const maxLength = 10; 
        if (valueStr.length > maxLength) {
          return <span>{valueStr.slice(2, 10)}...{valueStr.slice(-10,-2)}</span>;
        }
        return <span>{value}</span>; 
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (address) => (
        <div>
          <Tooltip title="Click to copy">
            <div
              style={{ cursor: 'pointer', color: '#4096ff' }}
              onClick={() => handleCopy(address.x)}
            >
              <strong>X:</strong> {abbreviateString(address.x, 25)}
            </div>
          </Tooltip>
          <Tooltip title="Click to copy">
            <div
              style={{ cursor: 'pointer', color: '#4096ff' }}
              onClick={() => handleCopy(address.y)}
            >
              <strong>Y:</strong> {abbreviateString(address.y, 25)}
            </div>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#141414' }} className="transaction-container">
     <div style={{ marginBottom: '16px', textAlign: 'center' }} className="button-group">
  <Button
    type={table === "load_x" ? "primary" : "default"}
    style={{
      marginRight: '8px',
      backgroundColor: table === "load_x" ? '#1890ff' : '#f0f0f0', // Lighter background for inactive buttons
      color: table === "load_x" ? '#fff' : '#000', // Dark text for inactive buttons for contrast
      border: table === "load_x" ? '1px solid #1890ff' : '1px solid #d9d9d9', // Lighter border for inactive buttons
      transition: 'all 0.3s ease',
      
    }}
          disabled={buttonLoading}
          onClick={() => handleButtonClick("load_x")}
  >
    Load
  </Button>
  <Button
    type={table === "unload_x" ? "primary" : "default"}
    style={{
      marginRight: '8px',
      backgroundColor: table === "unload_x" ? '#1890ff' : '#f0f0f0',
      color: table === "unload_x" ? '#fff' : '#000',
      border: table === "unload_x" ? '1px solid #1890ff' : '1px solid #d9d9d9',
      transition: 'all 0.3s ease',
    }}
          disabled={buttonLoading}
          onClick={() => handleButtonClick("unload_x")}
  >
    Unload
  </Button>
  <Button
    type={table === "transfer_x" ? "primary" : "default"}
    style={{
      backgroundColor: table === "transfer_x" ? '#1890ff' : '#f0f0f0',
      color: table === "transfer_x" ? '#fff' : '#000',
      border: table === "transfer_x" ? '1px solid #1890ff' : '1px solid #d9d9d9',
      transition: 'all 0.3s ease',
    }}
          disabled={buttonLoading}
          onClick={() => handleButtonClick("transfer_x")}
  >
    Transfer
  </Button>
</div>
      {loading ? (
        <Spin size="large" style={{ display: 'block', margin: 'auto', color: '#fff' }}  className="loading-spinner"/>
      ) : (
        <Table
          columns={columns}
          dataSource={formatTransactionData(transactionData)}
          pagination={false}
          bordered={false}
          rowClassName="dark-row"
          style={{ color: '#fff' }}

          className="transaction-table"
        />
      )}
    </div>
  );
};

export default TransactionDetails;
