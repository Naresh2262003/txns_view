// import React, { useState } from "react";
// import BlockDetailsPage from './components/BlockDetailsPage.jsx'
// import TransactionTable from './components/TransactionTable.jsx'
// import HeaderComponent from './components/Header.jsx'
// import NewPage from './components/NewView.jsx'
// import { Layout } from "antd";
// import './App.css'

// function App() {
//   const [searchData, setSearchData] = useState("");
//   const [cardView, setCardView]= useState(false);

//   return (
//     <div>
//       <Layout className="container" style={{ minHeight: "100vh" }}>
//         <HeaderComponent setSearchData={setSearchData} />
//         {searchData? 
//           <BlockDetailsPage txId={searchData} />:
//           <TransactionTable />
//         }
//       </Layout>
//     </div>
//   );
// }

// export default App;


// *******************************************************************************
import React, { useState } from "react";
import BlockDetailsPage from './components/BlockDetailsPage.jsx';
import TransactionTable from './components/TransactionTable.jsx';
import HeaderComponent from './components/Header.jsx';
import NewPage from './components/NewView.jsx';
import { Layout } from "antd";
import './App.css';

function App() {
  const [searchData, setSearchData] = useState("");
  const [cardView, setCardView] = useState(false);

  return (
    <div>
      <Layout className="container" style={{ minHeight: "100vh" }}>
        {/* Pass cardView state and setCardView function to HeaderComponent */}
        <HeaderComponent 
          setSearchData={setSearchData} 
          cardView={cardView} 
          setCardView={setCardView} 
        />

        {/* Conditional Rendering based on searchData and cardView */}
        {searchData ? (
          <BlockDetailsPage txId={searchData} />
        ) : cardView ? (
          <NewPage /> // Render NewPage when cardView is true
        ) : (
          <TransactionTable /> // Render TransactionTable by default
        )}
      </Layout>
    </div>
  );
}

export default App;
