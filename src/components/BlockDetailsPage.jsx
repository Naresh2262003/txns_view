import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography, Descriptions, Spin, message, Layout, Row, Col } from "antd";
import './DetailsPage.css'

const { Title } = Typography;
const { Content } = Layout;


// Helper function to parse address
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://xtsp-go.niceriver-b5ad439b.centralindia.azurecontainerapps.io/v1/api/txs"
        );
        const transactions = response.data;

        // Find the transaction matching txId
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

  const blockData = transaction;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px" }}>
        <Card
          title={`Details of Input UTXO's`}
          style={{ color: "white", marginBottom: "24px" }}
          headStyle={{ color: "white", backgroundColor: "#1C2531" }}
          className="custom-card"
        >
          <Row gutter={16}>
            <Col xs={24} md={24}>
              <Card
                style={{ color: "white" }}
                headStyle={{ color: "white", backgroundColor: "#1C2531" }}
                className="custom-card"
              >
                <Descriptions bordered column={1} className="custom-descriptions" style={{color:"white"}}>
                  <Descriptions.Item label="Time" >{blockData.time}</Descriptions.Item>
                  <Descriptions.Item label="Comments" >
                    {blockData?.tx?.comments?.[0] || "N/A"}
                  </Descriptions.Item>
                  {blockData?.tx?.tx?.amount && (
                    <Descriptions.Item label="Amount">
                      {blockData?.tx?.tx?.amount}
                    </Descriptions.Item>
                  )}
                  {blockData?.tx?.tx?.cbdc_address && (
                    <Descriptions.Item label="CBDC Address">
                      {blockData?.tx?.tx?.cbdc_address}
                    </Descriptions.Item>
                  )}
                  {blockData?.tx?.tx?.key && (
                    <Descriptions.Item label="Key">
                      {blockData?.tx?.tx?.key}
                    </Descriptions.Item>
                  )}
                  {blockData?.tx?.tx?.cbdc_tx_hash && (
                    <Descriptions.Item label="CBDC Transaction Hash">
                      {blockData?.tx?.tx?.cbdc_tx_hash}
                    </Descriptions.Item>
                  )}
                  <Descriptions.Item label="Proof">
                    {blockData?.tx?.tx?.proof || "N/A"}
                  </Descriptions.Item>
                  {(blockData?.tx?.tx?.signatures?.[0] || blockData?.tx?.tx?.signature) && (
                    <Descriptions.Item label="Signatures">
                      {blockData?.tx?.tx?.signatures?.[0] || blockData?.tx?.tx?.signature}
                    </Descriptions.Item>
                  )}
                  {blockData?.tx?.tx?.input_utxos?.length > 0 ? (
  <>
    <Descriptions.Item label="Address X">
      {blockData?.tx?.tx?.input_utxos[0]?.address?.x || blockData?.tx?.tx?.input_utxos[0]?.address || "N/A"}
    </Descriptions.Item>
    <Descriptions.Item label="Address Y">
      {blockData?.tx?.tx?.input_utxos[0]?.address?.y || blockData?.tx?.tx?.input_utxos[0]?.address || "N/A"}
    </Descriptions.Item>
    <Descriptions.Item label="Amount">
      {JSON.stringify(blockData?.tx?.tx?.input_utxos[0]?.amount) || "N/A"}
    </Descriptions.Item>
    <Descriptions.Item label="Ephemeral Key">
      {JSON.stringify(blockData?.tx?.tx?.input_utxos[0]?.ephemeral_key) || "N/A"}
    </Descriptions.Item>
    <Descriptions.Item label="Generated Transaction ID">
      {blockData?.tx?.tx?.input_utxos[0]?.gen_tx_id || "N/A"}
    </Descriptions.Item>
  </>
) : (
  blockData?.tx?.tx?.tx?.input_utxos?.length > 0 ? (
    <>
      <Descriptions.Item label="Address X">
        {blockData?.tx?.tx?.tx?.input_utxos[0]?.address || blockData?.tx?.tx?.tx?.input_utxos[0]?.address || "N/A"}
      </Descriptions.Item>
      <Descriptions.Item label="Address Y">
        {blockData?.tx?.tx?.tx?.input_utxos[0]?.address?.y || blockData?.tx?.tx?.tx?.input_utxos[0]?.address || "N/A"}
      </Descriptions.Item>
      <Descriptions.Item label="Amount">
        {JSON.stringify(blockData?.tx?.tx?.tx?.input_utxos[0]?.amount) || "N/A"}
      </Descriptions.Item>
      <Descriptions.Item label="Ephemeral Key">
        {JSON.stringify(blockData?.tx?.tx?.tx?.input_utxos[0]?.ephemeral_key) || "N/A"}
      </Descriptions.Item>
      <Descriptions.Item label="Generated Transaction ID">
        {blockData?.tx?.tx?.tx?.input_utxos[0]?.gen_tx_id || "N/A"}
      </Descriptions.Item>
    </>
  ):<></>
)}
                  <Descriptions.Item label="Transaction ID">
                    {blockData?.tx_id}
                  </Descriptions.Item>
                  <Descriptions.Item label="Transaction Status">
                    {blockData?.tx_status}
                  </Descriptions.Item>
                  <Descriptions.Item label="Transaction Type">
                    {blockData?.tx_type}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>

            {blockData?.tx?.tx?.output_utxo &&
              <Col xs={24} md={24} >
                <Card
                  title={`Output UTXO`}
                  style={{ color: "white", marginTop: 24 }}
                  headStyle={{ color: "white", backgroundColor: "#1C2531" }}
                  className="custom-card"
                >
                  <Descriptions bordered column={1} style={{ color: "white" }} className="custom-descriptions">
                    <Descriptions.Item label="Address X">
                      {blockData?.tx?.tx?.output_utxo?.address?.x || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address Y">
                      {blockData?.tx?.tx?.output_utxo?.address?.y || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Amount">
                      {blockData?.tx?.tx?.output_utxo?.amount || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ephemeral Key">
                      {blockData?.tx?.tx?.output_utxo?.ephemeral_key || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Generated Transaction ID">
                      {blockData?.tx?.tx?.output_utxo?.gen_tx_id || "N/A"}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            }

            {blockData?.tx?.tx?.output_utxos?.map((utxo, index) => (
              <Col xs={24} md={12} key={index}>
                <Card
                  title={`Output UTXO ${index + 1}`}
                  style={{ color: "white", marginTop: 24 }}
                  headStyle={{ color: "white", backgroundColor: "#1C2531" }}
                  className="custom-card"
                >
                  <Descriptions bordered column={1} style={{ color: "white" }} className="custom-descriptions">
                    <Descriptions.Item label="Address">
                      {utxo?.address || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Amount">
                      {utxo.amount || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ephemeral Key">
                      {utxo.ephemeral_key || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Generated Transaction ID">
                      {utxo.gen_tx_id || "N/A"}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            ))}

{blockData?.tx?.tx?.tx?.output_utxos?.map((utxo, index) => (
              <Col xs={24} md={12} key={index}>
                <Card
                  title={`Output UTXO ${index + 1}`}
                  style={{ color: "white", marginTop: 24 }}
                  headStyle={{ color: "white", backgroundColor: "#1C2531" }}
                  className="custom-card"
                >
                  <Descriptions bordered column={1} style={{ color: "white" }} className="custom-descriptions">
                    <Descriptions.Item label="Address" >
                      {utxo?.address || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Amount">
                      {utxo.amount || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ephemeral Key">
                      {utxo.ephemeral_key || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Generated Transaction ID">
                      {utxo.gen_tx_id || "N/A"}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default DetailPage;


// ****************************************************************************************************************************************
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, Typography, Descriptions, Spin, message ,Layout, Input, Row, Col } from "antd";
// import NewView from "./NewView";

// const { Title, Text } = Typography;

// const { Header, Content } = Layout;

// // Helper function to parse address (if needed)
// const parseAddress = (address) => {
//   try {
//     return JSON.parse(address);
//   } catch {
//     return { x: "N/A", y: "N/A" };
//   }
// };

// const DetailPage = ({ txId }) => {
//   const [transaction, setTransaction] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch data from API
//   useEffect(() => {
//     console.log(txId);
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("https://xtsp-go.niceriver-b5ad439b.centralindia.azurecontainerapps.io/v1/api/txs");
//         const transactions = response.data;

//         // Search through the array of transactions for a matching txId
//         const foundTx = transactions.find((tx) => tx.tx_id === txId);
//         if (foundTx) {
//           console.log("I am ",foundTx);
//           setTransaction(foundTx);
//         } else {
//           message.error("Transaction not found.");
//         }
//       } catch (error) {
//         message.error("Failed to fetch transactions. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [txId]);

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", padding: "2rem" }}>
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (!transaction) {
//     return (
//       <div style={{ padding: "2rem", textAlign: "center" }}>
//         <Title level={2}>Transaction Not Found</Title>
//       </div>
//     );
//   }

//   const blockData= transaction;


//   return (
//     blockData  &&
//     <Layout style={{ minHeight: "100vh" }}>
//       {/* Header with search */}
      

//       {/* Main Content */}
//       <Content style={{ padding: "24px" }}>
//         <Card
//           title={`Details of Input UTXO's`}
//           style={{
//             color: "white",
//             marginBottom: "24px",
//           }}
//           headStyle={{
//             color: "white",
//             backgroundColor: "#1C2531",
//           }}
//         >
//           {/* Row for Block Details and Technical Details */}
//           <Row gutter={16}>
//             <Col xs={24} md={28}>
//               {/* Block Details Table */}
//               <Card
//                 style={{
//                   color: "white",
//                 }}
//                 headStyle={{
//                   color: "white",
//                   backgroundColor: "#1C2531",
//                 }}
//               >
//                 <Descriptions bordered column={1} style={{ color: "white" }}>
//                   <Descriptions.Item label="Time">{blockData.time}</Descriptions.Item>
//                   <Descriptions.Item label="Comments">
//                     {blockData?.tx?.comments ? blockData?.tx?.comments[0]: "N/A"}
//                   </Descriptions.Item>
//                   { blockData?.tx?.tx?.amount && <Descriptions.Item label="Amount">{blockData?.tx?.tx?.amount}</Descriptions.Item>}
//                   {blockData?.tx?.tx?.cbdc_address && <Descriptions.Item label="CBDC Address">{blockData?.tx?.tx?.cbdc_address}</Descriptions.Item>}
//                   {blockData?.tx?.tx?.key && <Descriptions.Item label="Key">{blockData?.tx?.tx?.key}</Descriptions.Item>}
//                   { blockData?.tx?.tx?.cbdc_tx_hash && <Descriptions.Item label="CBDC transaction Hash">
//                     {blockData?.tx?.tx?.cbdc_tx_hash}
//                   </Descriptions.Item>}
//                   {/* { (blockData?.tx?.tx?.input_utxos || blockData?.tx?.tx?.input_utxos[0] )? 
//                   <><Descriptions.Item label="Address 1">
//                     {blockData?.tx?.tx?.input_utxos[0]?.address?.x}
//                   </Descriptions.Item>
//                   <Descriptions.Item label="Address 2">
//                     {blockData?.tx?.tx?.input_utxos[0]?.address?.y}
//                   </Descriptions.Item>
//                   <Descriptions.Item label="Amount">
//                     {JSON.stringify(blockData?.tx?.tx?.input_utxos[0]?.amount)}
//                   </Descriptions.Item>
//                   <Descriptions.Item label="Ephemeral Key">
//                     {JSON.stringify(blockData?.tx?.tx?.input_utxos[0]?.ephemeral_key)}
//                   </Descriptions.Item>
//                   <Descriptions.Item label="Generated transaction Id">
//                     {blockData?.tx?.tx?.input_utxos[0]?.gen_tx_id}
//                   </Descriptions.Item>
//                   </> : <></>
//                   } */}
//                   <Descriptions.Item label="Proof">
//                     {blockData?.tx?.tx?.proof}
//                   </Descriptions.Item>
//                   { (blockData?.tx?.tx?.signatures && blockData?.tx?.tx?.signatures[0] || blockData?.tx?.tx?.signature) &&<Descriptions.Item label="Signatures">
//                     {blockData?.tx?.tx?.signatures[0] || blockData?.tx?.tx?.signature}
//                   </Descriptions.Item>}
//                   <Descriptions.Item label="Transaction ID">
//                     {blockData?.tx_id}
//                   </Descriptions.Item>
//                   <Descriptions.Item label="Transaction Status">
//                     {blockData?.tx_status}
//                   </Descriptions.Item>
//                   <Descriptions.Item label="Transaction Type">
//                     {blockData?.tx_type}
//                   </Descriptions.Item>
//                 </Descriptions>
//               </Card>
//             </Col>

//             {  blockData?.tx?.tx?.output_utxo || (blockData?.tx?.tx?.output_utxos && blockData?.tx?.tx?.output_utxos[0])  && <></> 

//             //     <Col xs={24} md={12}>
//             //   {/* Technical Details Card */}
//             //   <Card
//             //     title="Output UTXO 1"
//             //     style={{
//             //       color: "white",
//             //       marginTop: 24,
//             //     }}
//             //     headStyle={{
//             //       color: "white",
//             //       backgroundColor: "#1C2531",
//             //     }}
//             //   >
//             //     <Descriptions column={1} style={{ color: "white" }}>
//             //       <Descriptions.Item label="Address 1">
//             //         {blockData?.tx?.tx?.output_utxo?.address?.x || blockData?.tx?.tx?.output_utxos ? blockData?.tx?.tx?.output_utxos[0]?.address : "NA"}
//             //       </Descriptions.Item>
//             //       <Descriptions.Item label="Address 2">
//             //         {blockData?.tx?.tx?.output_utxo?.address?.y || blockData?.tx?.tx?.output_utxos ? blockData?.tx?.tx?.output_utxos[0]?.address: "N/A"}
//             //       </Descriptions.Item>
//             //       <Descriptions.Item label="Amount">
//             //         {JSON.stringify(blockData?.tx?.tx?.output_utxo?.amount) || blockData?.tx?.tx?.output_utxos ? blockData?.tx?.tx?.output_utxos[0]?.amount : "NA"}
//             //       </Descriptions.Item>
//             //       <Descriptions.Item label="Ephemeral_key">
//             //         {JSON.stringify(blockData?.tx?.tx?.output_utxo?.ephemeral_key) ||  blockData?.tx?.tx?.output_utxos ? blockData?.tx?.tx?.output_utxos[0]?.ephemeral_key : "NA"}
//             //       </Descriptions.Item>
//             //       <Descriptions.Item label="Generated Transaction Id">
//             //         {blockData?.tx?.tx?.output_utxo?.gen_tx_id ||  blockData?.tx?.tx?.output_utxos ? blockData?.tx?.tx?.output_utxos[0]?.gen_tx_id : "NA"}
//             //       </Descriptions.Item>
//             //     </Descriptions>
//             //   </Card>
//             // </Col> : <></>
//             }



//             { blockData?.tx?.tx?.output_utxos && blockData?.tx?.tx?.output_utxos[1]  &&  <></>

//             // <Col xs={24} md={12}>
//             // {/* Technical Details Card */}
//             // <Card
//             // title="Output UTXO 1"
//             // style={{
//             //   color: "white",
//             //   marginTop: 24,
//             // }}
//             // headStyle={{
//             //   color: "white",
//             //   backgroundColor: "#1C2531",
//             // }}
//             // >
//             // <Descriptions column={1} style={{ color: "white" }}>
//             //   <Descriptions.Item label="Address 1">
//             //     {blockData?.tx?.tx?.output_utxos ? blockData?.tx?.tx?.output_utxos[1]?.address: "NA"}
//             //   </Descriptions.Item>
//             //   <Descriptions.Item label="Address 2">
//             //     {blockData?.tx?.tx?.output_utxos ? blockData?.tx?.tx?.output_utxo[1]?.address: "NA"}
//             //   </Descriptions.Item>
//             //   <Descriptions.Item label="Amount">
//             //     {blockData?.tx?.tx?.output_utxos ? blockData?.tx?.tx?.output_utxos[1]?.amount: "NA"}
//             //   </Descriptions.Item>
//             //   <Descriptions.Item label="Ephemeral_key">
//             //     {blockData?.tx?.tx?.output_utxos ? blockData?.tx?.tx?.output_utxos[1]?.ephemeral_key:"NA"}
//             //   </Descriptions.Item>
//             //   <Descriptions.Item label="Generated Transaction Id">
//             //     {blockData?.tx?.tx?.output_utxos ? blockData?.tx?.tx?.output_utxos[1]?.gen_tx_id:"NA"}
//             //   </Descriptions.Item>
//             // </Descriptions>
//             // </Card>
//             // </Col> : <></>
//             }
//           </Row>
//         </Card>
//       </Content>
//     </Layout>

//   );
// };

// export default DetailPage;
