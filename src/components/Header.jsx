import React, { useState } from "react";
import { Layout, Input, Typography } from "antd";
import { SearchOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Logo from '../assets/downloadImg.jpeg'

const { Header } = Layout;
const { Title } = Typography;

const HeaderComponent = ({ setSearchData }) => {
  const [searchText, setSearchText] = useState("");

  // Handle changes to the search input
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setSearchData(e.target.value); 
  };

  // Clear the input value when the clear button is clicked
  const handleClear = () => {
    setSearchText(""); 
    setSearchData(""); 
  };

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "center", 
        alignItems: "center", 
        color: "white",
        backgroundColor: "#001529",
        padding: "0 50px",
        cursor: "pointer"
      }}
    >
      <div style={{ position: "absolute", left: 50, display: "flex", alignItems: "center" }}>
        
        <img 
          src={Logo} 
          alt="Logo"
          style={{ height: 40, marginRight: 10 }} 
          onClick={handleClear}
        />
        <Title level={3} style={{ margin: 0, color: "white" }} onClick={handleClear}>
          Xaults
        </Title>
      </div>

      <Input
        placeholder="Search Transaction ID"
        prefix={<SearchOutlined />}
        suffix={
          searchText && (
            <CloseCircleOutlined
              onClick={handleClear}
              style={{ color: "#999", cursor: "pointer" }}
            />
          )
        }
        value={searchText}
        onChange={handleSearchChange}
        style={{
          width: 800, 
          height: 40,
        }}
      />
    </Header>
  );
};

export default HeaderComponent;
