import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import TransferForm from "./components/TransferForm";
import PropertyRecords from "./components/PropertyRecords";
import ConnectWallet from "./components/ConnectWallet"; // Import the ConnectWallet component
import RegisterLand from "./components/RegisterLand";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transfer" element={<TransferForm />} />
          <Route path="/records" element={<PropertyRecords />} />
          <Route path="/register" element={<RegisterLand />} />
        </Routes>
        <ConnectWallet /> {/* Ensure this is placed in a visible location */}
        <RegisterLand />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
