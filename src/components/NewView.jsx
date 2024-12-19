



import React from "react";
import { Layout, Input, Card, Descriptions, Row, Col, Typography } from "antd";
// import { SearchOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
// const { Title } = Typography;

const NewView = ({blockData}) => {
//   const blockData = {
//     "time": "2024-12-19T09:24:42.631625Z",
//     "tx": {
//       "comments": null,
//       "tx": {
//         "amount": "501",
//         "cbdc_address": "shubham@bank.erupee",
//         "cbdc_tx_hash": "20056cbe9cf836f83dce5966ab85a4db7b57cb0ca2d4f48d2541267d5e94a13a",
//         "input_utxos": [
//           {
//             "address": {
//               "is_infinite": false,
//               "x": "0x13aa304869762a025087f3edc80702ac4f65c415bdf61ef6fbfd9d0d0696229f",
//               "y": "0x10d59852e42db421a9ddfac0416dc4b8d2cde1290052a8c408d090975cac3129"
//             },
//             "amount": [
//               [
//                 129,
//                 42,
//                 155,
//                 53,
//                 140,
//                 74,
//                 206,
//                 166,
//                 23,
//                 147,
//                 126,
//                 180,
//                 109,
//                 32,
//                 43,
//                 16,
//                 172,
//                 123,
//                 22,
//                 202,
//                 10,
//                 156,
//                 33,
//                 10,
//                 119,
//                 239,
//                 251,
//                 15,
//                 211,
//                 160,
//                 166,
//                 37
//               ]
//             ],
//             "ephemeral_key": [
//               34,
//               55,
//               136,
//               185,
//               132,
//               27,
//               21,
//               74,
//               8,
//               62,
//               66,
//               230,
//               213,
//               166,
//               56,
//               34,
//               83,
//               174,
//               25,
//               119,
//               68,
//               76,
//               37,
//               8,
//               65,
//               74,
//               255,
//               102,
//               15,
//               116,
//               8,
//               217,
//               46,
//               248,
//               85,
//               10,
//               69,
//               214,
//               71,
//               82,
//               188,
//               170,
//               77,
//               61,
//               250,
//               85,
//               224,
//               252,
//               39,
//               61,
//               5,
//               228,
//               211,
//               192,
//               64,
//               246,
//               244,
//               9,
//               30,
//               151,
//               62,
//               175,
//               50,
//               132],
//             "gen_tx_id": "16887552272558531656859627451956502894576413506232438707745883332385299582832"
//           }
//         ],
//         "output_utxo": {
//           "address": {
//             "is_infinite": false,
//             "x": "0x2ec61e04b6a77ef2e865e77f0d5cc494416c6bd9cb31fdba110d98321c78d751",
//             "y": "0x14945942c2df9b18199e7c221b5ba5a6ca2aaacb81bf87e92bc23410bc692bba"
//           },
//           "amount": [
//             [
//               258,
//               171,
//               77,
//               245,
//               238,
//               201,
//               84,
//               49,
//               92,
//               156,
//               182,
//               191,
//               36,
//               212,
//               214,
//               147,
//               47,
//               52,
//               204,
//               160,
//               244,
//               146,
//               185,
//               34,
//               57,
//               135,
//               169,
//               191,
//               23,
//               72,
//               83,
//               34
//             ]
//           ],
//           "ephemeral_key": [
//             3,
//             42,
//             39,
//             130,
//             179,
//             82,
//             194,
//             12,
//             69,
//             255,
//             194,
//             112,
//             211,
//             222,
//             14,
//             255,
//             227,
//             68,
//             141,
//             65,
//             76,
//             45,
//             64,
//             187,
//             102,
//             212,
//             89,
//             34,
//             229,
//             193,
//             235,
//             33,
//             11,
//             226,
//             23,
//             243,
//             35,
//             58,
//             116,
//             15,
//             187,
//             85,
//             70,
//             113,
//             198,
//             245,
//             119,
//             242,
//             17,
//             44,
//             43,
//             17,
//             16,
//             105,
//             11,
//             29,
//             29,
//             93,
//             58,
//             186,
//             95,
//             241,
//             1,
//             37
//           ],
//           "gen_tx_id": "3356282246715040335689602395527584568061590078484204073490907766799532332254"
//         },
//         "proof": "0x0",
//         "signatures": [
//           "0x0"
//         ],
//         "tx_id": "0193de3b-d200-763c-ab66-ecfa841d4e3f"
//       }
//     },
//     "tx_id": "0193de3b-d200-763c-ab66-ecfa841d4e3f",
//     "tx_status": "completed",
//     "tx_type": "unload_x"
//   }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header with search */}
      

      {/* Main Content */}
      <Content style={{ padding: "24px" }}>
        <Card
          title={`Details of Input UTXO's`}
          style={{
            color: "white",
            marginBottom: "24px",
          }}
          headStyle={{
            color: "white",
            backgroundColor: "#1C2531",
          }}
        >
          {/* Row for Block Details and Technical Details */}
          <Row gutter={16}>
            <Col xs={24} md={28}>
              {/* Block Details Table */}
              <Card
                style={{
                  color: "white",
                }}
                headStyle={{
                  color: "white",
                  backgroundColor: "#1C2531",
                }}
              >
                <Descriptions bordered column={1} style={{ color: "white" }}>
                  <Descriptions.Item label="Time">{blockData.time}</Descriptions.Item>
                  <Descriptions.Item label="Comments">
                    {blockData?.tx?.comments ? blockData?.tx?.comments[0]: "N/A"}
                  </Descriptions.Item>
                  { blockData?.tx?.tx?.amount && <Descriptions.Item label="Amount">{blockData?.tx?.tx?.amount}</Descriptions.Item>}
                  {blockData?.tx?.tx?.cbdc_address && <Descriptions.Item label="CBDC Address">{blockData?.tx?.tx?.cbdc_address}</Descriptions.Item>}
                  {blockData?.tx?.tx?.key && <Descriptions.Item label="Key">{blockData?.tx?.tx?.key}</Descriptions.Item>}
                  { blockData?.tx?.tx?.cbdc_tx_hash && <Descriptions.Item label="CBDC transaction Hash">
                    {blockData?.tx?.tx?.cbdc_tx_hash}
                  </Descriptions.Item>}
                  {/* { (blockData?.tx?.tx?.input_utxos || blockData?.tx?.tx?.input_utxos[0] )? 
                  <><Descriptions.Item label="Address 1">
                    {blockData?.tx?.tx?.input_utxos[0]?.address?.x}
                  </Descriptions.Item>
                  <Descriptions.Item label="Address 2">
                    {blockData?.tx?.tx?.input_utxos[0]?.address?.y}
                  </Descriptions.Item>
                  <Descriptions.Item label="Amount">
                    {JSON.stringify(blockData?.tx?.tx?.input_utxos[0]?.amount)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ephemeral Key">
                    {JSON.stringify(blockData?.tx?.tx?.input_utxos[0]?.ephemeral_key)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Generated transaction Id">
                    {blockData?.tx?.tx?.input_utxos[0]?.gen_tx_id}
                  </Descriptions.Item>
                  </> : <></>
                  } */}
                  <Descriptions.Item label="Proof">
                    {blockData?.tx?.tx?.proof}
                  </Descriptions.Item>
                  { (blockData?.tx?.tx?.signatures && blockData?.tx?.tx?.signatures[0] || blockData?.tx?.tx?.signature) &&<Descriptions.Item label="Signatures">
                    {blockData?.tx?.tx?.signatures[0] || blockData?.tx?.tx?.signature}
                  </Descriptions.Item>}
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

            {  blockData?.tx?.tx?.output_utxo || (blockData?.tx?.tx?.output_utxos && blockData?.tx?.tx?.output_utxos[0])  && <></> 

            //     <Col xs={24} md={12}>
            //   {/* Technical Details Card */}
            //   <Card
            //     title="Output UTXO 1"
            //     style={{
            //       color: "white",
            //       marginTop: 24,
            //     }}
            //     headStyle={{
            //       color: "white",
            //       backgroundColor: "#1C2531",
            //     }}
            //   >
            //     <Descriptions column={1} style={{ color: "white" }}>
            //       <Descriptions.Item label="Address 1">
            //         {blockData?.tx?.tx?.output_utxo?.address?.x || blockData?.tx?.tx?.output_utxos ? blockData?.tx?.tx?.output_utxos[0]?.address : "NA"}
            //       </Descriptions.Item>
            //       <Descriptions.Item label="Address 2">
            //         {blockData?.tx?.tx?.output_utxo?.address?.y || blockData?.tx?.tx?.output_utxos ? blockData?.tx?.tx?.output_utxos[0]?.address: "N/A"}
            //       </Descriptions.Item>
            //       <Descriptions.Item label="Amount">
            //         {JSON.stringify(blockData?.tx?.tx?.output_utxo?.amount) || blockData?.tx?.tx?.output_utxos ? blockData?.tx?.tx?.output_utxos[0]?.amount : "NA"}
            //       </Descriptions.Item>
            //       <Descriptions.Item label="Ephemeral_key">
            //         {JSON.stringify(blockData?.tx?.tx?.output_utxo?.ephemeral_key) ||  blockData?.tx?.tx?.output_utxos ? blockData?.tx?.tx?.output_utxos[0]?.ephemeral_key : "NA"}
            //       </Descriptions.Item>
            //       <Descriptions.Item label="Generated Transaction Id">
            //         {blockData?.tx?.tx?.output_utxo?.gen_tx_id ||  blockData?.tx?.tx?.output_utxos ? blockData?.tx?.tx?.output_utxos[0]?.gen_tx_id : "NA"}
            //       </Descriptions.Item>
            //     </Descriptions>
            //   </Card>
            // </Col> : <></>
            }



            { blockData?.tx?.tx?.output_utxos && blockData?.tx?.tx?.output_utxos[1]  &&  <></>

            // <Col xs={24} md={12}>
            // {/* Technical Details Card */}
            // <Card
            // title="Output UTXO 1"
            // style={{
            //   color: "white",
            //   marginTop: 24,
            // }}
            // headStyle={{
            //   color: "white",
            //   backgroundColor: "#1C2531",
            // }}
            // >
            // <Descriptions column={1} style={{ color: "white" }}>
            //   <Descriptions.Item label="Address 1">
            //     {blockData?.tx?.tx?.output_utxos ? blockData?.tx?.tx?.output_utxos[1]?.address: "NA"}
            //   </Descriptions.Item>
            //   <Descriptions.Item label="Address 2">
            //     {blockData?.tx?.tx?.output_utxos ? blockData?.tx?.tx?.output_utxo[1]?.address: "NA"}
            //   </Descriptions.Item>
            //   <Descriptions.Item label="Amount">
            //     {blockData?.tx?.tx?.output_utxos ? blockData?.tx?.tx?.output_utxos[1]?.amount: "NA"}
            //   </Descriptions.Item>
            //   <Descriptions.Item label="Ephemeral_key">
            //     {blockData?.tx?.tx?.output_utxos ? blockData?.tx?.tx?.output_utxos[1]?.ephemeral_key:"NA"}
            //   </Descriptions.Item>
            //   <Descriptions.Item label="Generated Transaction Id">
            //     {blockData?.tx?.tx?.output_utxos ? blockData?.tx?.tx?.output_utxos[1]?.gen_tx_id:"NA"}
            //   </Descriptions.Item>
            // </Descriptions>
            // </Card>
            // </Col> : <></>
            }
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default NewView;