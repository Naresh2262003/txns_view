import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Table, Tag, Tooltip, message, Spin, Button, Skeleton } from 'antd';
// import './TransactionTable.css'

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
  const [table, setTable] = useState(localStorage.getItem("table") || "load_x");
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  // Track the previous transactionData with useRef to compare
  const prevTransactionDataRef = useRef();

  // Function to fetch transaction data
  const fetchTransactionData = () => {
    // setLoading(true);
    if(table!='utxos_x'){
    axios
      .get(' https://xtsp-go.niceriver-b5ad439b.centralindia.azurecontainerapps.io/v1/api/txs/?proof=false') 
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

        // if (JSON.stringify(prevTransactionDataRef.current) !== JSON.stringify(dataToset)) {
          setTransactionData(dataToset);
          // message.success('New UTXO found!');
        // }

        prevTransactionDataRef.current = dataToset;

        localStorage.setItem("table",table);

        // setTransactionData(dataToset);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching transaction data:', error);
        message.error('Failed to load transaction data.');
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
        setButtonLoading(false);
      });
    }else{
      axios
      .get('https://xtsp-go.niceriver-b5ad439b.centralindia.azurecontainerapps.io/v1/api/xtsp/xrupee/balance/') 
      .then((response) => {
        console.log(response.data);
        
        // const dataToset = response.data.filter((tx) => tx.tx_type == table);
        // console.log("load dat  u a", dataToset);
        setTransactionData(response.data.utxos);
        console.log(transactionData)

        // // Sort data by tx.time in descending order (newest first)
        // dataToset.sort((a, b) => {
        //   const timeA = new Date(a.time);
        //   const timeB = new Date(b.time);
        //   return timeB - timeA; // Descending order
        // });

        // // if (JSON.stringify(prevTransactionDataRef.current) !== JSON.stringify(dataToset)) {
        //   setTransactionData(dataToset);
        //   // message.success('New UTXO found!');
        // // }

        // prevTransactionDataRef.current = dataToset;

        localStorage.setItem("table",table);

        // // setTransactionData(dataToset);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching transaction data:', error);
        message.error('Failed to load transaction data.');
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
        setButtonLoading(false);
      });
    }
  };

  // Fetch transaction data initially and every 10 seconds
  useEffect(() => {
    console.log("I am heer")
    fetchTransactionData(); 

    const intervalId = setInterval(() => {
      fetchTransactionData();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [table]);

  const handleButtonClick = (type) => {
    if (buttonLoading) return; // Prevent concurrent requests
    setButtonLoading(true);
    setTable(type);
    localStorage.setItem("table",type);
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
        inputEphemeralKey: inputUtxos[0]?.ephemeral_key || item?.tx?.tx?.tx?.input_utxos?.[0]?.ephemeral_key || item?.ephemeral_key || 'N/A',
        inputGenTxId: inputUtxos[0]?.gen_tx_id || item?.tx?.tx?.tx?.input_utxos?.[0]?.gen_tx_id || item?.gen_tx_id || 'N/A',
        outputAmount: item?.tx?.tx?.amount || item?.amount || 'N/A',
        ephemeral_key: item?.ephemeral_key || 'N/A',
        // em
        // address: { x: item?.tx?.tx?.output_utxo?.address.x, y:item?.tx?.tx?.output_utxo?.address.y} ||  { x: item?.tx?.tx?.input_utxos[0]?.address?.x, y:item?.tx?.tx?.input_utxos[0]?.address.y} || { x: 'N/A', y: 'N/A' },


  //     address: item?.tx?.tx?.output_utxo?.address?.x && item?.tx?.tx?.output_utxo?.address?.y
  // ? { x: item?.tx?.tx?.output_utxo?.address.x, y: item?.tx?.tx?.output_utxo?.address.y }
  // : (item?.tx?.tx?.input_utxos?.[0]?.address?.x && item?.tx?.tx?.input_utxos?.[0]?.address?.y
  //     ? { x: item?.tx?.tx?.input_utxos[0]?.address.x, y: item?.tx?.tx?.input_utxos[0]?.address.y }
  //     : (item?.tx?.tx?.tx?.input_utxos?.[0]?.address 
  //         ? parseAddress(item?.tx?.tx?.tx?.input_utxos?.[0]?.address)
  //         : parseAddress(item?.tx?.tx?.input_utxos?.[0]?.address)))
   address : item?.tx?.tx?.output_utxo?.address?.x && item?.tx?.tx?.output_utxo?.address?.y
    ? { x: item.tx.tx.output_utxo.address.x, y: item.tx.tx.output_utxo.address.y }
    : item?.tx?.tx?.input_utxos?.[0]?.address?.x && item?.tx?.tx?.input_utxos?.[0]?.address?.y
    ? { x: item.tx.tx.input_utxos[0].address.x, y: item.tx.tx.input_utxos[0].address.y }
    : item?.tx?.tx?.tx?.input_utxos?.[0]?.address
    ? parseAddress(item.tx.tx.tx.input_utxos[0].address)
    : item?.tx?.tx?.input_utxos?.[0]?.address
    ? parseAddress(item.tx.tx.input_utxos[0].address)
    : parseAddress(item?.address)
  
      };
    });
  };

  
  const filterColumns = (columns, data) => {
    return columns.filter((column) =>
      data.some((item) => item[column.dataIndex] !== "N/A")
    );
  };

  // Columns for the table
  const headerStyle = {
    background: 'none',
    color: '#fff',
    fontWeight:'700',
    textAlign: 'center',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '16px'
  };

  const columnStyle = {
    padding: '10px',
    borderRadius: '8px',
    color: '#fff', // Text color
    textAlign: 'center', // Center-align text
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', // Optional shadow
  };


  const columns = [
    {
      title: (
        <div style={{ ...headerStyle }}>
          TRANSACTION ID
        </div>
      ),
      dataIndex: 'txId',
      key: 'txId',
      align: 'center',
      
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#000', // Header background color
        },
      }),
      onCell: () => ({
        style: {
          backgroundColor: '#000', border: 'none', // Column cell background color
        },
      }),
      render: (text) => (
        <div style={columnStyle}>
        <Tooltip title="Click to copy">
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => handleCopy(text)}
          >
            {abbreviateString(text, 25)}
          </span>
        </Tooltip>
        </div>
      ),
    },
    {
      title: (
        <div style={{ ...headerStyle }}>STATUS</div>
      ),
      dataIndex: 'txStatus',
      key: 'txStatus',
      align: 'center',
      
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#000', // Header background color
        },
      }),
      onCell: () => ({
        style: {
          backgroundColor: '#000', border: 'none', // Column cell background color
        },
      }),
      render: (status) => (
        <Tag
          // style={{
          //   color: status === 'completed' ? '#2E8B57' : '#DC143C',
          //   backgroundColor: status === 'completed' ? '#2E8B571F' : '#DC143C1F', // 1F is 15% opacity in hex
          //   border: `1px solid ${status === 'completed' ? '#2E8B57' : '#DC143C'}`,
          //   padding: '4px 8px', // Optional padding for better appearance
          //   borderRadius: '4px', // Optional for rounded corners
          //   display: 'inline-block', // Ensures it behaves like a tag
          // }}
          color={status === 'completed' ? '#2E8B57' : '#DC143C'}
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: (
        <div style={{ ...headerStyle }}>TYPE</div>
      ),
      dataIndex: 'txType',
      key: 'txType',
      align: 'center',
      
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#000', // Header background color
        },
      }),
      onCell: () => ({
        style: {
          backgroundColor: '#000',  border: 'none',// Column cell background color
        },
      }),
      render: (type) => (
        <Tag
          // color="#1E3A8A"
          // style={{
          //   color: '#1E3A8A',
          //   backgroundColor: '#1E3A8A1F', // 1F is 15% opacity in hex
          //   border: '1px solid #1E3A8A',
          //   borderRadius: '20px',
          //   padding: '2px 10px',
          //   display: 'inline-block', // Ensures it behaves like a tag
          // }}

          color="#1E3A8A" style={{ borderRadius: '20px', padding: '2px 10px' }}
        >
          {type}
        </Tag>
      ),
    },
    {
      title: (
        <div style={{ ...headerStyle }}>OUTPUT EPHEMERAL KEY</div>
      ),
      dataIndex: 'outputEphemeralKey',
      key: 'outputEphemeralKey',
      align: 'center',
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#000',// Header background color
        },
      }),
      onCell: () => ({
        style: {
          backgroundColor: '#000',  border: 'none',// Column cell background color
        },
      }),
      render: (text) => (
        
        <div style={columnStyle}>
        <Tooltip title="Click to copy">
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => handleCopy(text)}
          >
            {abbreviateString(text, 15)}
          </span>
        </Tooltip>
        </div>
      ),
    },
    {
      title: (
        <div style={{ ...headerStyle }}>OUTPUT GEN TX ID</div>
      ),
      dataIndex: 'outputGenTxId',
      key: 'outputGenTxId',
      align: 'center',
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#000', // Header background color
        },
      }),
      onCell: () => ({
        style: {
          backgroundColor: '#000',  border: 'none', // Column cell background color
        },
      }),
      render: (text) => (
        
        <div style={columnStyle}>
        <Tooltip title="Click to copy">
          <span
            style={{ cursor: 'pointer'}}
            onClick={() => handleCopy(text)}
          >
            {abbreviateString(text, 30)}
          </span>
        </Tooltip>
        </div>
      ),
    },
    {
      title: (
        <div style={{ ...headerStyle }}>{table!="utxos_x" ? "INPUT EPHEMERAL KEY": "EPHEMERAL KEY"}</div>
      ),
      dataIndex: 'inputEphemeralKey',
      key: 'inputEphemeralKey',
      align: 'center',
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#000', // Header background color
        },
      }),
      onCell: () => ({
        style: {
          backgroundColor: '#000',  border: 'none',// Column cell background color
        },
      }),
      render: (text) => (
        <div style={columnStyle}>
        <Tooltip title="Click to copy">
          <span
            style={{ cursor: 'pointer'}}
            onClick={() => handleCopy(text)}
          >
            {abbreviateString(text, 15)}
          </span>
        </Tooltip>
        </div>
      ),
    },
    {
      title: (
        <div style={{ ...headerStyle }}>{table!="utxos_x" ? "INPUT GEN TX ID": "GEN TX ID"}</div>
      ),
      dataIndex: 'inputGenTxId',
      key: 'inputGenTxId',
      align: 'center',
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#000', // Header background color
        },
      }),
      onCell: () => ({
        style: {
          backgroundColor: '#000',  border: 'none',// Column cell background color
        },
      }),
      render: (text) => (
        
        <div style={columnStyle}>
        <Tooltip title="Click to copy">
          <span
            style={{ cursor: 'pointer'}}
            onClick={() => handleCopy(text)}
          >
            {abbreviateString(text, 30)}
          </span>
        </Tooltip>
        </div>
      ),
    },
    {
      title: (
        <div style={{ ...headerStyle }}>AMOUNT</div>
      ),
      dataIndex: 'outputAmount',
      key: 'outputAmount',
      align: 'center',
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#000',  // Header background color
        },
      }),
      onCell: () => ({
        style: {
          backgroundColor: '#000',  border: 'none',// Column cell background color
        },
      }),
      render: (value) => {
        const abbreviatedValue = abbreviateString(value, 30); // Abbreviate amount string to 10 characters
        return (
          <div style={{ ...columnStyle, color:"#c23fff", fontWeight: 'bold'}}>
            <span>{(table== 'load_x' || table == 'unload_x') ? '₹ ':''}{abbreviatedValue}</span>
          </div>
        );
      },
    }, 
    
    {
      title: (
        <div style={{ ...headerStyle }}>ADDRESS</div>
      ),
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#000',  // Header background color
        },
      }),
      onCell: () => ({
        style: {
          backgroundColor: '#000',  border: 'none',// Column cell background color
        },
      }),
      render: (address) => (
        
        <div >
          <Tooltip title="Click to copy">
            <div
              style={{ cursor: 'pointer', ...columnStyle }}
              onClick={() => handleCopy(address.x)}
            >
              <strong style={{color:"#c23fff"}}>X:</strong> {abbreviateString(address.x, 25)}
            </div>
          </Tooltip>
          <Tooltip title="Click to copy">
            <div
              style={{ cursor: 'pointer', ...columnStyle}}
              onClick={() => handleCopy(address.y)}
            >
              <strong style={{color:"#c23fff"}}>Y:</strong> {abbreviateString(address.y, 25)}
            </div>
          </Tooltip>
        </div>
      ),
      
    },
  ];
  
  
  const formattedData = formatTransactionData(transactionData);
  const filteredColumns = filterColumns(columns, formattedData);

  return (
    <div style={{ padding: '24px', backgroundColor: '#141414' }} className="transaction-container">
<div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '16px', textAlign: 'center' }} className="tab-group">
      <div
        onClick={() => handleButtonClick("load_x")}
        style={{
          cursor: 'pointer',
          borderBottom: table === "load_x" ? '3px solid #1890ff' : '3px solid transparent',
          padding: '8px 16px',
          color: table === "load_x" ? '#1890ff' : '#fff',
          transition: 'all 0.3s ease',
          fontWeight: table === "load_x" ? 'bold' : 'normal'
        }}
      >
        LOAD
      </div>
      <div
        onClick={() => handleButtonClick("unload_x")}
        style={{
          cursor: 'pointer',
          borderBottom: table === "unload_x" ? '3px solid #1890ff' : '3px solid transparent',
          padding: '8px 16px',
          color: table === "unload_x" ? '#1890ff' : '#fff',
          transition: 'all 0.3s ease',
          fontWeight: table === "unload_x" ? 'bold' : 'normal'
        }}
      >
        UNLOAD
      </div>
      <div
        onClick={() => handleButtonClick("transfer_x")}
        style={{
          cursor: 'pointer',
          borderBottom: table === "transfer_x" ? '3px solid #1890ff' : '3px solid transparent',
          padding: '8px 16px',
          color: table === "transfer_x" ? '#1890ff' : '#fff',
          transition: 'all 0.3s ease',
          fontWeight: table === "transfer_x" ? 'bold' : 'normal'
        }}
      >
        TRANSFER
      </div>
      <div
        onClick={() => handleButtonClick("utxos_x")}
        style={{
          cursor: 'pointer',
          borderBottom: table === "utxos_x" ? '3px solid #1890ff' : '3px solid transparent',
          padding: '8px 16px',
          color: table === "utxos_x" ? '#1890ff' : '#fff',
          transition: 'all 0.3s ease',
          fontWeight: table === "utxos_x" ? 'bold' : 'normal'
        }}
      >
        UTXOs
      </div>
    </div>
      {loading ? (
        <div style={{ padding: '24px', backgroundColor: '#141414' }} className="transaction-container">
        {/* Skeleton for Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            marginBottom: '16px',
            textAlign: 'center',
          }}
          className="tab-group"
        >
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              style={{
                cursor: 'pointer',
                borderBottom: '3px solid transparent',
                padding: '8px 16px',
                color: '#fff',
                transition: 'all 0.3s ease',
                fontWeight: 'normal',
              }}
            >
              <Skeleton.Input active={true} size="small" style={{ width: 60 }} />
            </div>
          ))}
        </div>
    
        {/* Skeleton for Table */}
        <div>
          <Skeleton active={true} paragraph={{ rows: 6 }} className="table-skeleton" />
        </div>
      </div>
      ) : (
        <Table
        columns={filteredColumns}
        dataSource={formattedData}
          pagination={false}
          bordered={false}
          rowClassName="dark-row"
          style={{ color: '#000' , backgroundColor: "#000" }}

          className="transaction-table"
          scroll={{ x: 'max-content' }}

        />
      )}
    </div>
  );
};

export default TransactionDetails;
