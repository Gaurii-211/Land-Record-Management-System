import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaShieldAlt, FaSearch, FaGavel } from 'react-icons/fa';
import './Home.css';

Modal.setAppElement('#root');

function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className='home-page'>
        <div className="hero">
        <div className="hero-content">
            <h1>Manage Land Records Efficiently</h1>
            <p>Blockchain and AI-powered solutions to secure and verify land records.</p>
            <a href="/records" className="cta-button">Explore Records</a>
        </div>
    </div>

      <section className="features">
        <div className="card" onClick={openModal}>
        <FaShieldAlt className="icon" />
          <h2>Blockchain Security</h2>
          <p>Ensure tamper-proof land records using blockchain technology.</p>
        </div>
        <div className="card">
        <FaSearch className="icon" />
          <h2>AI-Powered Dispute Detection</h2>
          <p>Identify potential land disputes with AI-driven analytics.</p>
        </div>
        <div className="card">
        <FaGavel className="icon" />
          <h2>Smart Contracts</h2>
          <p>Automate property transfers and inheritance with smart contracts.</p>
        </div>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Property Details"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Property Details</h2>
        <p>Here, you can display specific property details fetched from the backend.</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default Home;
