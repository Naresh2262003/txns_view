import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography, Descriptions, Spin, message, Layout, Row, Col, Alert , Skeleton} from "antd";
import './DetailsPage.css'
import ReadMore from "./Readmore.jsx";
import { useParams } from "react-router-dom"; 

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

const formatTime = (isoTime) => {
  if (!isoTime) return "N/A";
  const date = new Date(isoTime);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Use 12-hour format
    timeZoneName: 'short', // Include time zone
  });
};

const DetailPage = ({ txId }) => {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); 
  const [transactionId, settransactionId]= useState(id);

  console.log("id is ", id);

  useEffect(() => {
    settransactionId(id);
  }, [id]);

  useEffect(() => {
    setLoading(true);
  const fetchData = async () => {
    try {
      console.log("Fetching transaction details...");
      const response = await axios.get(
        `https://xtsp-go.niceriver-b5ad439b.centralindia.azurecontainerapps.io/v1/api/txs/?tx_id=${transactionId}`
      );
      const transactions = response.data;

      // Set the first transaction from the API response (adjust this if logic changes)
      if (transactions && transactions.length > 0) {
        setTransaction(transactions[0]);
      } else {
        message.error("Transaction not found.");
        // setTransaction(null);
      }
    } catch (error) {
      console.error("Error fetching transaction:", error);
      setTransaction(null);
      message.error("Failed to fetch transactions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [transactionId]);

const proofButtonHandler = async () => {
  try {
    console.log("verifying proof");
    const response = await axios.get(
      `https://xtsp-go.niceriver-b5ad439b.centralindia.azurecontainerapps.io/v1/api/xtsp/txs/${transactionId}/verify/`
    );

    message.success(response.data.message)
  } catch (error) {
    message.error(error.message)
    console.error('Error fetching proof:', error);
  }
};

if (loading) {
  return (
    <div style={{ textAlign: "center", padding: "2rem", backgroundColor:"black" }}>
      {/* <Spin size="large" /> */}
      <Card
    title={`Details of Input UTXO's`}
    style={{ color: "white", marginBottom: "24px" }}
    headStyle={{ color: "white", backgroundColor: "#1C2531" }}
  >
    <Row gutter={16}>
      <Col xs={24} md={24}>
        <Card
          style={{
            color: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            backgroundColor: 'white',
          }}
          headStyle={{ color: "white" }}
        >
          <Descriptions
            bordered
            column={1}
            className="custom-descriptions"
            style={{
              color: "white",
              border: "1px solid #2C3E50",
              borderRadius: "8px",
            }}
            labelStyle={{ width: "300px", fontWeight: "bold" }}
          >
            <Descriptions.Item label="Time">
              <Skeleton.Input active={true} size="small" style={{ width: 200 }} />
            </Descriptions.Item>
            <Descriptions.Item label="Transaction ID">
              <Skeleton.Input active={true} size="small" style={{ width: 300 }} />
            </Descriptions.Item>
            <Descriptions.Item label="Transaction Status">
              <Skeleton.Input active={true} size="small" style={{ width: 150 }} />
            </Descriptions.Item>
            <Descriptions.Item label="Transaction Type">
              <Skeleton.Input active={true} size="small" style={{ width: 100 }} />
            </Descriptions.Item>
            <Descriptions.Item label="Amount">
              <Skeleton.Input active={true} size="small" style={{ width: 150 }} />
            </Descriptions.Item>
            <Descriptions.Item label="CBDC Address">
              <Skeleton.Input active={true} size="small" style={{ width: 250 }} />
            </Descriptions.Item>
            <Descriptions.Item label="Key">
              <Skeleton.Input active={true} size="small" style={{ width: 300 }} />
            </Descriptions.Item>
            <Descriptions.Item label="Proof">
              <Skeleton.Button active={true} size="small" style={{ width: 100 }} />
            </Descriptions.Item>
            <Descriptions.Item label="Signatures">
              <Skeleton.Input active={true} size="small" style={{ width: 300 }} />
            </Descriptions.Item>
            <Descriptions.Item label="Address X">
              <Skeleton.Input active={true} size="small" style={{ width: 200 }} />
            </Descriptions.Item>
            <Descriptions.Item label="Address Y">
              <Skeleton.Input active={true} size="small" style={{ width: 200 }} />
            </Descriptions.Item>
            <Descriptions.Item label="Generated Transaction ID">
              <Skeleton.Input active={true} size="small" style={{ width: 250 }} />
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    </Row>
  </Card>

    </div>
  );
}

if (!transaction) {
  return (
    <div style={{ height:'100vh' , width: '100%', padding: "2rem", textAlign: "center" }}>
      <Title level={2}>Transaction Not Found</Title>
    </div>
  );
}

  console.log("hey!", transaction);
  const blockData = transaction;

  return (
    <Layout style={{ minHeight: "100vh" , backgroundColor: "#101820"}}>
      <Content style={{ padding: "24px", backgroundColor: "#101820" }}>
        <Card
          title={`Details of UTXO's`}
          style={{ color: "white", marginBottom: "24px" }}
          headStyle={{ color: "white", backgroundColor: "#1C2531" }}
        >
          <Row gutter={16}>
            <Col xs={24} md={24}>
              <Card
                style={{ color: "white" ,
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  backgroundColor: 'white'
                }}
                headStyle={{ color: "white" }}
              >
                <Descriptions bordered column={1} className="custom-descriptions" style={{color:"white", border: "1px solid #2C3E50",
                borderRadius: "8px",}} labelStyle={{ width: "300px", fontWeight: "bold" }}>
                  <Descriptions.Item label="Time" >
                  {formatTime(blockData.time)}</Descriptions.Item>
                  <Descriptions.Item label="Transaction ID">
                  <span style={{ fontFamily: "monospace" }}>{blockData?.tx_id}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label="Transaction Status">
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    color: "white",
                    backgroundColor:
                      blockData?.tx_status === "completed"
                        ? "#28a745"
                        : blockData?.tx_status === "Failed"
                        ? "#dc3545"
                        : "#ffc107",
                  }}
                >
                  {blockData?.tx_status}
                </span>
                </Descriptions.Item>
                  <Descriptions.Item label="Transaction Type">
                    {/* {blockData?.tx_type} */}

  {blockData?.tx_type ? blockData.tx_type.toUpperCase() : "N/A"}
                  </Descriptions.Item>
                  {blockData?.tx?.tx?.amount && (
                    <Descriptions.Item label="Amount">
                      {blockData?.tx?.tx?.amount}
                    </Descriptions.Item>
                  )}
                  {blockData?.tx?.tx?.cbdc_address && (
                    <Descriptions.Item label="CBDC Address">
                      <span
                    style={{
                      // fontFamily: "monospace",
                      // color:"white",
                      // backgroundColor: "grey",
                      // padding: "2px 4px",
                      // borderRadius: "4px",
                      fontFamily: "monospace",
    color: "#000",
    backgroundColor: "#eae5e5",
    borderRadius: "4px",
    display: "inline-block",
    padding: "10px",
    fontSize: "12px",
                      
                    }}
                    >
                      {blockData?.tx?.tx?.cbdc_address}
                      </span>
                    </Descriptions.Item>
                  )}
                  {blockData?.tx?.tx?.key && (
                    <Descriptions.Item label="Key">
                    <span
                      style={{fontFamily: "monospace",
                        color: "#000",
                        backgroundColor: "#eae5e5",
                        borderRadius: "4px",
                        display: "inline-block",
                        padding: "10px",
                        fontSize: "12px",
                      }}
                    >
                      {blockData?.tx?.tx?.key}
                    </span>
                  </Descriptions.Item>
                  )}
                  {blockData?.tx?.tx?.cbdc_tx_hash && (
                <Descriptions.Item label="CBDC Transaction Hash">
                  <span
                    style={{fontFamily: "monospace",
                      color: "#000",
                      backgroundColor: "#eae5e5",
                      borderRadius: "4px",
                      display: "inline-block",
                      padding: "10px",
                      fontSize: "12px",
                    }}
                  >
                    {blockData?.tx?.tx?.cbdc_tx_hash}
                  </span>
                </Descriptions.Item>
              )}
                  <Descriptions.Item label={
                    <div style={{ display: 'flex', alignItems: 'center' , justifyContent:'space-between' }}>
                      Proof
                      <button
    style={{
      marginRight: '50px',
      padding: '8px 16px',
      fontSize: '14px',
      cursor: 'pointer',
      backgroundColor: '#007bff', 
      color: 'white',
      border: 'none',
      borderRadius: '4px', 
      transition: 'all 0.3s ease', 
    }}
    onClick={proofButtonHandler}
    onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'} // Darker on hover
    onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'} // Revert back to original color
  >
    Proof
  </button>
                    </div>
                  }>
                   <ReadMore text={ blockData?.tx?.tx?.proof || blockData?.tx?.tx?.tx?.proof || "N/A"} maxLines={3} />
                   
                  </Descriptions.Item>
                  {blockData?.tx?.tx?.signatures?.[0] && (
                <Descriptions.Item label="Signatures">
                  <span style={{ fontFamily: "monospace" }}>
                    {blockData?.tx?.tx?.signatures[0]}
                  </span>
                </Descriptions.Item>
              )}
    </Descriptions>
  </Card>
</Col>
{/* //******************* */}
{blockData?.tx?.tx?.tx?.input_utxos?.length > 0 ? (
  <Col xs={24} md={24}>
    <Card
      title={`Input UTXO`}
      style={{
        color: "white",
        marginTop: "24px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        backgroundColor: 'white'
      }}
      headStyle={{ color: "white", backgroundColor: "#1C2531" }}
      className="custom-card"
    >
      <Descriptions
        bordered
        column={1}
        style={{
          color: "white",
          border: "1px solid #2C3E50",
          borderRadius: "8px",
        }}
        labelStyle={{ width: "300px", fontWeight: "bold" }}
        className="custom-descriptions"
      >
        {/* <Descriptions.Item label="Generated Transaction ID">
    <span
                    style={{fontFamily: "monospace",
                      color: "#000",
                      backgroundColor: "#eae5e5",
                      borderRadius: "4px",
                      display: "inline-block",
                      padding: "10px",
                      fontSize: "12px",
                    }}
                    >
      {blockData?.tx?.tx?.input_utxos[0]?.gen_tx_id || "N/A"}
      </span>
    </Descriptions.Item> */}
    <Descriptions.Item label="Address ">
      <span
                    style={{fontFamily: "monospace",
                      color: "#000",
                      backgroundColor: "#eae5e5",
                      borderRadius: "4px",
                      display: "inline-block",
                      padding: "10px",
                      fontSize: "12px",
                    }}
                    >
        {blockData?.tx?.tx?.tx?.input_utxos[0]?.address || blockData?.tx?.tx?.tx?.input_utxos[0]?.address || "N/A"}
        </span>
      </Descriptions.Item>
      <Descriptions.Item label="Amount">
        {JSON.stringify(blockData?.tx?.tx?.tx?.input_utxos[0]?.amount) || "N/A"}
      </Descriptions.Item>
      <Descriptions.Item label="Ephemeral Key">
        {JSON.stringify(blockData?.tx?.tx?.tx?.input_utxos[0]?.ephemeral_key) || "N/A"}
      </Descriptions.Item>
      <Descriptions.Item label="Generated Transaction ID">
        <span
                    style={{fontFamily: "monospace",
                      color: "#000",
                      backgroundColor: "#eae5e5",
                      borderRadius: "4px",
                      display: "inline-block",
                      padding: "10px",
                      fontSize: "12px",
                    }}
                    >
        {blockData?.tx?.tx?.tx?.input_utxos[0]?.gen_tx_id || "N/A"}
        </span>
      </Descriptions.Item>
      </Descriptions>
    </Card>
  </Col>
):<></>
}

{blockData?.tx?.tx?.input_utxos?.length > 0 ? (
  <><Col xs={24} md={24}>
  <Card
    title={`Input UTXO`}
    style={{
      color: "white",
      marginTop: "24px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      backgroundColor: 'white'
    }}
    headStyle={{ color: "white", backgroundColor: "#1C2531" }}
    className="custom-card"
  >
    <Descriptions
      bordered
      column={1}
      style={{
        color: "white",
        border: "1px solid #2C3E50",
        borderRadius: "8px",
      }}
      labelStyle={{ width: "300px", fontWeight: "bold" }}
      className="custom-descriptions"
    >
    <Descriptions.Item label="Address X">
    <span
                    style={{fontFamily: "monospace",
                      color: "#000",
                      backgroundColor: "#eae5e5",
                      borderRadius: "4px",
                      display: "inline-block",
                      padding: "10px",
                      fontSize: "12px",
                    }}
                  >
      {blockData?.tx?.tx?.input_utxos[0]?.address?.x || blockData?.tx?.tx?.input_utxos[0]?.address || "N/A"}
      </span>
    </Descriptions.Item>
    <Descriptions.Item label="Address Y">
    <span
                    style={{fontFamily: "monospace",
                      color: "#000",
                      backgroundColor: "#eae5e5",
                      borderRadius: "4px",
                      display: "inline-block",
                      padding: "10px",
                      fontSize: "12px",
                    }}
                    >
      {blockData?.tx?.tx?.input_utxos[0]?.address?.y || blockData?.tx?.tx?.input_utxos[0]?.address || "N/A"}
      </span>
    </Descriptions.Item>
    <Descriptions.Item label="Amount">
      {JSON.stringify(blockData?.tx?.tx?.input_utxos[0]?.amount) || "N/A"}
    </Descriptions.Item>
    <Descriptions.Item label="Ephemeral Key">
      {JSON.stringify(blockData?.tx?.tx?.input_utxos[0]?.ephemeral_key) || "N/A"}
    </Descriptions.Item>
    <Descriptions.Item label="Generated Transaction ID">
    <span
                    style={{fontFamily: "monospace",
                      color: "#000",
                      backgroundColor: "#eae5e5",
                      borderRadius: "4px",
                      display: "inline-block",
                      padding: "10px",
                      fontSize: "12px",
                    }}
                    >
      {blockData?.tx?.tx?.input_utxos[0]?.gen_tx_id || "N/A"}
      </span>
    </Descriptions.Item>
      </Descriptions>
    </Card>
  </Col>
  </>
) :<></>}
{/* ******************************************* */}
{blockData?.tx?.tx?.output_utxo && (
  <Col xs={24} md={24}>
    <Card
      title={`Output UTXO`}
      style={{
        color: "white",
        marginTop: "24px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        backgroundColor: 'white'
      }}
      headStyle={{ color: "white", backgroundColor: "#1C2531" }}
      className="custom-card"
    >
      <Descriptions
        bordered
        column={1}
        style={{
          color: "white",
          border: "1px solid #2C3E50",
          borderRadius: "8px",
        }}
        labelStyle={{ width: "300px", fontWeight: "bold" }}
        className="custom-descriptions"
      >
        <Descriptions.Item label="Address X">
        <span
                    style={{fontFamily: "monospace",
                      color: "#000",
                      backgroundColor: "#eae5e5",
                      borderRadius: "4px",
                      display: "inline-block",
                      padding: "10px",
                      fontSize: "12px",
                    }}
                    >
          {blockData?.tx?.tx?.output_utxo?.address?.x || "N/A"}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="Address Y">
        <span
                    style={{fontFamily: "monospace",
                      color: "#000",
                      backgroundColor: "#eae5e5",
                      borderRadius: "4px",
                      display: "inline-block",
                      padding: "10px",
                      fontSize: "12px",
                    }}
                    >
          {blockData?.tx?.tx?.output_utxo?.address?.y || "N/A"}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="Amount">
          {blockData?.tx?.tx?.output_utxo?.amount || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Ephemeral Key">
          {blockData?.tx?.tx?.output_utxo?.ephemeral_key || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Generated Transaction ID">
        <span
                    style={{fontFamily: "monospace",
                      color: "#000",
                      backgroundColor: "#eae5e5",
                      borderRadius: "4px",
                      display: "inline-block",
                      padding: "10px",
                      fontSize: "12px",
                    }}
                    >
          {blockData?.tx?.tx?.output_utxo?.gen_tx_id || "N/A"}
          </span>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  </Col>
)}

{blockData?.tx?.tx?.output_utxos?.map((utxo, index) => (
  <Col xs={24} md={12} key={index}>
    <Card
      title={`Output UTXO ${index + 1}`}
      style={{
        color: "white",
        marginTop: "24px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        backgroundColor: 'white'
      }}
      headStyle={{ color: "white", backgroundColor: "#1C2531" }}
      className="custom-card"
    >
      <Descriptions
        bordered
        column={1}
        style={{
          color: "white",
          border: "1px solid #2C3E50",
          borderRadius: "8px",
        }}
        labelStyle={{ width: "300px", fontWeight: "bold" }}
        className="custom-descriptions"
      >
        <Descriptions.Item label="Address">
        <span
                    style={{fontFamily: "monospace",
                      color: "#000",
                      backgroundColor: "#eae5e5",
                      borderRadius: "4px",
                      display: "inline-block",
                      padding: "10px",
                      fontSize: "12px",
                    }}
                    >
          {utxo?.address || "N/A"}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="Amount">
          <ReadMore text={utxo.amount || "N/A"} maxLines={3} />
        </Descriptions.Item>
        <Descriptions.Item label="Ephemeral Key">
          {utxo.ephemeral_key || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Generated Transaction ID">
        <span
                    style={{fontFamily: "monospace",
                      color: "#000",
                      backgroundColor: "#eae5e5",
                      borderRadius: "4px",
                      display: "inline-block",
                      padding: "10px",
                      fontSize: "12px",
                    }}
                    >
          {utxo.gen_tx_id || "N/A"}
          </span>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  </Col>
))}

{blockData?.tx?.tx?.tx?.output_utxos?.map((utxo, index) => (
  <Col xs={24} md={12} key={index}>
    <Card
      title={`Output UTXO ${index + 1}`}
      style={{
        color: "white",
        marginTop: "24px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        backgroundColor: 'white'
      }}
      headStyle={{ color: "white", backgroundColor: "#1C2531" }}
      className="custom-card"
    >
      <Descriptions
        bordered
        column={1}
        style={{
          color: "white",
          border: "1px solid #2C3E50",
          borderRadius: "8px",
        }}
        labelStyle={{ width: "300px", fontWeight: "bold" }}
        className="custom-descriptions"
      >
        <Descriptions.Item label="Address">
          {utxo?.address || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Amount">
          <ReadMore text={utxo.amount || "N/A"} maxLines={3} />
        </Descriptions.Item>
        <Descriptions.Item label="Ephemeral Key">
          {utxo.ephemeral_key || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Generated Transaction ID">
        <span
                    style={{fontFamily: "monospace",
                      color: "#000",
                      backgroundColor: "#eae5e5",
                      borderRadius: "4px",
                      display: "inline-block",
                      padding: "10px",
                      fontSize: "12px",
                    }}
                    >
          {utxo.gen_tx_id || "N/A"}
          </span>
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
