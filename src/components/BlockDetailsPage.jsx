import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography, Descriptions, Spin, message } from "antd";

const { Title, Text } = Typography;

// Helper function to parse address (if needed)
const parseAddress = (address) => {
  try {
    return JSON.parse(address);
  } catch {
    return { x: "N/A", y: "N/A" };
  }
};

const DetailPage = ({ txId }) => {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    console.log(txId);
    const fetchData = async () => {
      try {
        const response = await axios.get("https://xtsp-go.niceriver-b5ad439b.centralindia.azurecontainerapps.io/v1/api/txs");
        const transactions = response.data;

        // Search through the array of transactions for a matching txId
        const foundTx = transactions.find((tx) => tx.tx_id === txId);
        if (foundTx) {
          setTransaction(foundTx);
        } else {
          message.error("Transaction not found.");
        }
      } catch (error) {
        message.error("Failed to fetch transactions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [txId]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!transaction) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <Title level={2}>Transaction Not Found</Title>
      </div>
    );
  }

  const inputUtxos = transaction?.tx?.tx?.input_utxos || [];
  const outputUtxos = transaction?.tx?.tx?.output_utxos || [];
  const outputAddress = parseAddress(outputUtxos[0]?.address);

  const details = {
    txId: transaction?.tx_id || "N/A",
    txStatus: transaction?.tx_status || "N/A",
    txType: transaction?.tx_type || "N/A",
    outputEphemeralKey: outputUtxos[0]?.ephemeral_key || "N/A",
    outputGenTxId: outputUtxos[0]?.gen_tx_id || "N/A",
    inputEphemeralKey: inputUtxos[0]?.ephemeral_key || "N/A",
    inputGenTxId: inputUtxos[0]?.gen_tx_id || "N/A",
    outputAmount: outputUtxos[0]?.amount || "N/A",
    inputAmount: inputUtxos[0]?.amount || "N/A",
    address: outputAddress || { x: "N/A", y: "N/A" },
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Card>
        <Title level={2} style={{ textAlign: "center", marginBottom: "1rem" }}>
          Transaction Details
        </Title>

        <Descriptions bordered column={1} size="middle">
          <Descriptions.Item label="Transaction ID">
            <Text code>{details.txId}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Transaction Status">
            {details.txStatus}
          </Descriptions.Item>
          <Descriptions.Item label="Transaction Type">
            {details.txType}
          </Descriptions.Item>
          <Descriptions.Item label="Output Ephemeral Key">
            <Text code>{details.outputEphemeralKey}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Output Generated Transaction ID">
            <Text code>{details.outputGenTxId}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Input Ephemeral Key">
            <Text code>{details.inputEphemeralKey}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Input Generated Transaction ID">
            <Text code>{details.inputGenTxId}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Output Amount">
            {details.outputAmount}
          </Descriptions.Item>
          <Descriptions.Item label="Input Amount">
            {details.inputAmount}
          </Descriptions.Item>
          <Descriptions.Item label="Output Address">
            <div>
              <Text>X: {details.address.x}</Text> <br />
              <Text>Y: {details.address.y}</Text>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default DetailPage;
