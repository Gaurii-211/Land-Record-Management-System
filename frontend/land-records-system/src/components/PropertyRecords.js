import React, { useState } from 'react';
import './PropertyRecords.css';

function PropertyRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filteredRecords, setFilteredRecords] = useState(mockPropertyRecords); // Example data

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = mockPropertyRecords.filter(record =>
      record.owner.toLowerCase().includes(e.target.value.toLowerCase()) ||
      record.propertyId.includes(e.target.value) ||
      record.location.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredRecords(filtered);
  };

  const handleSort = (e) => {
    const sortValue = e.target.value;
    setSortOption(sortValue);

    const sortedRecords = [...filteredRecords].sort((a, b) => {
      if (sortValue === 'size') {
        return b.size - a.size; // Sort by size (largest first)
      } else if (sortValue === 'id') {
        return a.propertyId.localeCompare(b.propertyId); // Sort by property ID
      }
      return 0;
    });

    setFilteredRecords(sortedRecords);
  };

  return (
    <div className="property-records-page">
      <h2>Property Records</h2>

      <div className="filter-options">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by owner, location, or ID..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="sort-dropdown">
          <select value={sortOption} onChange={handleSort}>
            <option value="">Sort By</option>
            <option value="size">Size (acres)</option>
            <option value="id">Property ID</option>
          </select>
        </div>
      </div>

      <div className="records-container">
        {filteredRecords.map((record) => (
          <div key={record.propertyId} className="record-card">
            <h3>{record.propertyId}</h3>
            <p>Owner: {record.owner}</p>
            <p>Location: {record.location}</p>
            <p>Size: {record.size} acres</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const mockPropertyRecords = [
  { propertyId: 'PR001', owner: 'John Doe', location: 'New York', size: 2.5 },
  { propertyId: 'PR002', owner: 'Jane Smith', location: 'California', size: 5.0 },
  { propertyId: 'PR003', owner: 'Alice Johnson', location: 'Florida', size: 3.8 }
];

export default PropertyRecords;