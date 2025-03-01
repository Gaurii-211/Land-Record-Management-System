import React, { useState } from 'react';
import './TransferForm.css';

function TransferForm() {
  const [formData, setFormData] = useState({
    propertyId: '',
    newOwner: '',
    transferDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Transfer Details:', formData);
    // You can send this data to your backend API
  };

  return (
    <div className="form-container">
      <h2>Transfer Property</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Property ID:
          <input
            type="text"
            name="propertyId"
            value={formData.propertyId}
            onChange={handleChange}
          />
        </label>
        <label>
          New Owner:
          <input
            type="text"
            name="newOwner"
            value={formData.newOwner}
            onChange={handleChange}
          />
        </label>
        <label>
          Transfer Date:
          <input
            type="date"
            name="transferDate"
            value={formData.transferDate}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit Transfer</button>
      </form>
    </div>
  );
}

export default TransferForm;
