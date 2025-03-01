import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import TransferForm from './components/TransferForm';
import PropertyRecords from './components/PropertyRecords';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Header />} />
          <Route path="/" element={<Footer />} />
          <Route path="/transfer" element={<TransferForm />} />
          <Route path="/records" element={<PropertyRecords />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
