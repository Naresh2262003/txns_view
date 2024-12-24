
import React, { useState } from "react";
import { Layout, Input, Typography, Switch } from "antd";
import { SearchOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Logo from '../assets/newImg.png';
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;

const HeaderComponent = ({ setSearchData, cardView, setCardView }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate(); 

  // Handle changes to the search input
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setSearchData(e.target.value); 
  };

  // Handle search input submission
  const handleSearchSubmit = () => {
    if (searchText.trim()) {
      navigate(`/txns_view/${searchText}`); // Navigate to the dynamic route
    }else{
      navigate(`/txns_view/`);
    }
  };

  // Clear the input value when the clear button is clicked
  const handleClear = () => {
    setSearchText(""); 
    setSearchData(""); 
    navigate(`/txns_view/`);
  };

  // Handle toggle change
  const handleToggleChange = (checked) => {
    setCardView(checked);  // Update the cardView state based on the toggle
  };

  return (
    <Header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between", 
        alignItems: "center", 
        color: "white",
        backgroundColor: "#001529",
        padding: "0 50px",
        cursor: "pointer",
        overflow: "hidden",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Left section: Logo and title */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img 
          src={Logo} 
          alt="Logo"
          style={{ height: 180, marginRight: 10, padding:0 }} 
          onClick={handleClear}
        />
        {/* <Title level={3} style={{ margin: 0, color: "white" }} onClick={handleClear}>
          Xaults
        </Title> */}
      </div>

      {/* Right section: Search bar and toggle */}
      <div style={{ display: "flex", justifyContent: "center" }}>
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
          onPressEnter={handleSearchSubmit}
          style={{
            width: 800, 
            height: 45,
            marginRight: 16
          }}
        />
        
        {/* Toggle for Card View */}
        {/* <div>
          <span style={{ color: "white", marginRight: 8 }}>
            {`Card View: ${cardView ? 'On' : 'Off'}`}
          </span>
          <Switch
            checked={cardView}
            onChange={handleToggleChange}  // Toggle the cardView state
          />
        </div> */}
      </div>
    </Header>
  );
};

export default HeaderComponent;

