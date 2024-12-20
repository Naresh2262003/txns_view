
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Descriptions, Row, Col, Spin, message, Tooltip } from "antd";

const TransactionDetails = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(true);
    const [table, setTable] = useState(localStorage.getItem("table")|| "load_x");

  // Fetch transaction data
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

  useEffect(() => {
    fetchTransactionData();
  }, []);

  if (loading) {
    return <Spin tip="Loading transactions..." />;
  }

  return (




    <div style={{ padding: "0", backgroundColor: "#f5f5f5" }}>
  {table === "load_x" &&
    transactionData.map((item, index) => (
      <Row gutter={[16, 16]} key={index} style={{ marginBottom: "16px" }}>
        {/* Transaction Card */}
        <Col xs={24} md={12}>
          <Card
            title={`Transaction ${index + 1}`}
            style={{
              marginBottom: "0px",
              color: "white",
              height: "100%",
            }}
            headStyle={{
              color: "white",
              backgroundColor: "#1C2531",
            }}
          >
            <Descriptions
              bordered
              column={1}
              className="custom-descriptions"
              style={{ color: "white" }}
            >
              <Descriptions.Item label="Transaction ID">
                {item.tx_id || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {item.tx_status || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Type">
                {item.tx_type || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Amount">
                {item?.tx?.tx?.amount || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Hash">
                {item?.tx?.tx?.cbdc_tx_hash || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Key">
                {item?.tx?.tx?.key || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Signature">
                {item?.tx?.tx?.signature || "N/A"}
              </Descriptions.Item>
               {/* <Descriptions.Item label="Proof">
                    {item?.tx?.tx?.proof}
                </Descriptions.Item> */}
            </Descriptions>
          </Card>
        </Col>

        {/* Output UTXO Card */}
        <Col xs={24} md={12}>
          <Card
            title={`Output UTXO 1`}
            style={{
              marginBottom: "0px",
              color: "white",
              height: "100%",
            }}
            headStyle={{
              color: "white",
              backgroundColor: "#1C2531",
            }}
          >
            <Descriptions
              bordered
              column={1}
              className="custom-descriptions"
              style={{ color: "white" }}
            >
              <Descriptions.Item label="Address X">
                {item?.tx?.tx?.output_utxo?.address?.x || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Address Y">
                {item?.tx?.tx?.output_utxo?.address?.y || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Ephemeral Key">
                {item?.tx?.tx?.output_utxo?.ephemeral_key || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Gen Tx ID">
                {item?.tx?.tx?.output_utxo?.gen_tx_id || "N/A"}
              </Descriptions.Item>
              {/* <Descriptions.Item label="Amount Array">{item?.tx?.tx?.output_utxo?.amount || "N/A"}</Descriptions.Item> */}
            </Descriptions>
          </Card>
        </Col>
      </Row>
    ))}

{table === "unload_x" &&
    transactionData.map((item, index) => (
      <Row gutter={[16, 16]} key={index} style={{ marginBottom: "16px" }}>
        {/* Transaction Card */}
        <Col xs={24} md={12}>
          <Card
            title={`Transaction ${index + 1}`}
            style={{
              marginBottom: "0px",
              color: "white",
              height: "100%",
            }}
            headStyle={{
              color: "white",
              backgroundColor: "#1C2531",
            }}
          >
            <Descriptions
              bordered
              column={1}
              className="custom-descriptions"
              style={{ color: "white" }}
            >
              <Descriptions.Item label="Transaction ID">
                {item.tx_id || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {item.tx_status || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Type">
                {item.tx_type || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Amount">
                {item?.tx?.tx?.amount || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Hash">
                {item?.tx?.tx?.cbdc_tx_hash || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Sender Address">
                {item?.tx?.tx?.cbdc_address || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Signature">
                {item?.tx?.tx?.signatures[0] || "N/A"}
              </Descriptions.Item>
               <Descriptions.Item label="Proof">
                    {item?.tx?.tx?.proof}
                </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Output UTXO Card */}
        <Col xs={24} md={12}>
          <Card
            title={`Output UTXO 1`}
            style={{
              marginBottom: "0px",
              color: "white",
              height: "100%",
            }}
            headStyle={{
              color: "white",
              backgroundColor: "#1C2531",
            }}
          >
            <Descriptions
              bordered
              column={1}
              className="custom-descriptions"
              style={{ color: "white" }}
            >
              <Descriptions.Item label="Address X">
                {item?.tx?.tx?.input_utxos[0]?.address?.x || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Address Y">
                {item?.tx?.tx?.input_utxos[0]?.address?.y || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Ephemeral Key">
                {item?.tx?.tx?.input_utxos[0]?.ephemeral_key || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Gen Tx ID">
                {item?.tx?.tx?.input_utxos[0]?.gen_tx_id || "N/A"}
              </Descriptions.Item>
              {/* <Descriptions.Item label="Amount Array">
                {item?.tx?.tx?.input_utxos[0]?.amount || "N/A"}
              </Descriptions.Item> */}
            </Descriptions>
          </Card>
        </Col>
      </Row>
    ))}

  {table === "transfer_x" &&
    transactionData.map((item, index) => {

        // if(index>0 && index <5){
        //     return ( <Row gutter={[16, 16]} key={index} style={{ marginBottom: "16px" }}>
        //         {/* Transaction Card */}
        //         <Col xs={24} md={8}>
        //           <Card
        //             title={`Transaction ${index + 1}`}
        //             style={{
        //               marginBottom: "0px",
        //               color: "white",
        //               height: "100%",
        //             }}
        //             headStyle={{
        //               color: "white",
        //               backgroundColor: "#1C2531",
        //             }}
        //           >
        //             <Descriptions
        //               bordered
        //               column={1}
        //               className="custom-descriptions"
        //               style={{ color: "white" }}
        //             >
        //               <Descriptions.Item label="Transaction ID">
        //                 {item.tx_id || "N/A"}
        //               </Descriptions.Item>
        //               <Descriptions.Item label="Status">
        //                 {item.tx_status || "N/A"}
        //               </Descriptions.Item>
        //               <Descriptions.Item label="Type">
        //                 {item.tx_type || "N/A"}
        //               </Descriptions.Item>
        //               <Descriptions.Item label="Input Address">
        //                 {item?.tx?.tx?.input_utxos[0].address.x || item?.tx?.tx?.input_utxos[0].address.x || "N/A"}
        //               </Descriptions.Item>
        //               {/* <Descriptions.Item label="Amount">
        //                 {item?.tx?.tx?.tx?.input_utxos[0].amount || "N/A"}
        //               </Descriptions.Item> */}
        //               <Descriptions.Item label="Ephemeral Key">
        //                 {item?.tx?.tx?.tx?.input_utxos[0].ephemeral_key || "N/A"}
        //               </Descriptions.Item>
        //               <Descriptions.Item label="Signature">
        //                 {item?.tx?.tx?.signatures?.[0] || "N/A"}
        //               </Descriptions.Item>
        //               <Descriptions.Item label="Proof">
        //                 {/* {item?.tx?.tx?.tx?.proof || "N/A"} */}
        //               </Descriptions.Item>
        //             </Descriptions>
        //           </Card>
        //         </Col>
        
        //         {/* Output UTXO 1 Card */}
        //         <Col xs={24} md={8}>
        //           <Card
        //             title={`Output UTXO 1`}
        //             style={{
        //               marginBottom: "0px",
        //               color: "white",
        //               height: "100%",
        //             }}
        //             headStyle={{
        //               color: "white",
        //               backgroundColor: "#1C2531",
        //             }}
        //           >
        //             <Descriptions
        //               bordered
        //               column={1}
        //               className="custom-descriptions"
        //               style={{ color: "white" }}
        //             >
        //               <Descriptions.Item label="Output Address">
        //                 {item?.tx?.tx?.tx?.output_utxos[0].address || item?.tx?.tx?.input_utxos[0].address.x || "N/A"}
        //               </Descriptions.Item>
        //               {/* <Descriptions.Item label="Amount">
        //                 {item?.tx?.tx?.tx?.output_utxos[0].amount || "N/A"}
        //               </Descriptions.Item> */}
        //               <Descriptions.Item label="Ephemeral Key">
        //                 {item?.tx?.tx?.tx?.output_utxos[0].ephemeral_key || "N/A"}
        //               </Descriptions.Item>
        //             </Descriptions>
        //           </Card>
        //         </Col>
        
        //         {/* Output UTXO 2 Card */}
        //         <Col xs={24} md={8}>
        //           <Card
        //             title={`Output UTXO 2`}
        //             style={{
        //               marginBottom: "0px",
        //               color: "white",
        //               height: "100%",
        //             }}
        //             headStyle={{
        //               color: "white",
        //               backgroundColor: "#1C2531",
        //             }}
        //           >
        //             <Descriptions
        //               bordered
        //               column={1}
        //               className="custom-descriptions"
        //               style={{ color: "white" }}
        //             >
        //               <Descriptions.Item label="Output Address">
        //                 {item?.tx?.tx?.tx?.output_utxos[0].address || item?.tx?.tx?.input_utxos[0].address.x || "N/A"}
        //               </Descriptions.Item>
        //              {/* <Descriptions.Item label="Amount">
        //                 {item?.tx?.tx?.tx?.output_utxos[0].amount || "N/A"}
        //               </Descriptions.Item>  */}
        //               <Descriptions.Item label="Ephemeral Key">
        //                 {item?.tx?.tx?.tx?.output_utxos[0].ephemeral_key || "N/A"}
        //               </Descriptions.Item>
        //             </Descriptions>
        //           </Card>
        //         </Col>
        //       </Row>
        //     );
        // }
        
        return ( <Row gutter={[16, 16]} key={index} style={{ marginBottom: "16px" }}>
        {/* Transaction Card */}
        <Col xs={24} md={8}>
          <Card
            title={`Transaction ${index + 1}`}
            style={{
              marginBottom: "0px",
              color: "white",
              height: "100%",
            }}
            headStyle={{
              color: "white",
              backgroundColor: "#1C2531",
            }}
          >
            <Descriptions
              bordered
              column={1}
              className="custom-descriptions"
              style={{ color: "white" }}
            >
              <Descriptions.Item label="Transaction ID">
                {item.tx_id || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {item.tx_status || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Type">
                {item.tx_type || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Input Address">
                {item?.tx?.tx?.tx?.input_utxos[0].address || item?.tx?.tx?.input_utxos[0].address.x || "N/A"}
              </Descriptions.Item>
              {/* <Descriptions.Item label="Amount">
                {item?.tx?.tx?.tx?.input_utxos[0].amount || "N/A"}
              </Descriptions.Item> */}
              <Descriptions.Item label="Ephemeral Key">
                {item?.tx?.tx?.tx?.input_utxos[0].ephemeral_key || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Signature">
                {item?.tx?.tx?.signatures?.[0] || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Proof">
                {/* {item?.tx?.tx?.tx?.proof || "N/A"} */}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Output UTXO 1 Card */}
        <Col xs={24} md={8}>
          <Card
            title={`Output UTXO 1`}
            style={{
              marginBottom: "0px",
              color: "white",
              height: "100%",
            }}
            headStyle={{
              color: "white",
              backgroundColor: "#1C2531",
            }}
          >
            <Descriptions
              bordered
              column={1}
              className="custom-descriptions"
              style={{ color: "white" }}
            >
              <Descriptions.Item label="Output Address">
                {item?.tx?.tx?.tx?.output_utxos[0].address || item?.tx?.tx?.input_utxos[0].address.x || "N/A"}
              </Descriptions.Item>
              {/* <Descriptions.Item label="Amount">
                {item?.tx?.tx?.tx?.output_utxos[0].amount || "N/A"}
              </Descriptions.Item> */}
              <Descriptions.Item label="Ephemeral Key">
                {item?.tx?.tx?.tx?.output_utxos[0].ephemeral_key || "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Output UTXO 2 Card */}
        <Col xs={24} md={8}>
          <Card
            title={`Output UTXO 2`}
            style={{
              marginBottom: "0px",
              color: "white",
              height: "100%",
            }}
            headStyle={{
              color: "white",
              backgroundColor: "#1C2531",
            }}
          >
            <Descriptions
              bordered
              column={1}
              className="custom-descriptions"
              style={{ color: "white" }}
            >
              <Descriptions.Item label="Output Address">
                {item?.tx?.tx?.tx?.output_utxos[0].address || item?.tx?.tx?.input_utxos[0].address.x || "N/A"}
              </Descriptions.Item>
             {/* <Descriptions.Item label="Amount">
                {item?.tx?.tx?.tx?.output_utxos[0].amount || "N/A"}
              </Descriptions.Item>  */}
              <Descriptions.Item label="Ephemeral Key">
                {item?.tx?.tx?.tx?.output_utxos[0].ephemeral_key || "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    );
    })}



</div>
  );
};

export default TransactionDetails;
