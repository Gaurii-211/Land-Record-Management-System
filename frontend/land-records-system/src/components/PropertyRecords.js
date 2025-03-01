import React, { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import debounce from 'lodash.debounce';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import './PropertyRecords.css';

// Fix for missing Leaflet marker icons
const DefaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function PropertyRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [commercialFilter, setCommercialFilter] = useState(''); // Commercial vs Residential filter
  const [priceRange, setPriceRange] = useState([0, 100000000]); // Price range filter
  const [carpetAreaRange, setCarpetAreaRange] = useState([0, 5000]); // Carpet Area range filter
  const recordsPerPage = 6;

  // Load the CSV file when the component mounts
  useEffect(() => {
    fetch('/properties.csv')
      .then((response) => response.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          complete: (result) => {
            setPropertyData(result.data);
            setFilteredRecords(result.data);
          },
        });
      });
  }, []);

  // Debounced search handler to reduce lag
  const debouncedSearch = debounce((value) => {
    const filtered = propertyData.filter(record =>
      record.City?.toLowerCase().includes(value.toLowerCase()) ||
      record.ID?.toLowerCase().includes(value.toLowerCase()) ||
      record.Landmark?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRecords(filtered);
    setCurrentPage(1);
  }, 300);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  // Multi-Select Filters: Commercial, Price Range, Carpet Area Range
  const handleCommercialChange = (e) => {
    setCommercialFilter(e.target.value);
  };

  const handlePriceChange = (e) => {
    const [minPrice, maxPrice] = e.target.value.split('-').map(Number);
    setPriceRange([minPrice, maxPrice]);
  };

  const handleCarpetAreaChange = (e) => {
    const [minArea, maxArea] = e.target.value.split('-').map(Number);
    setCarpetAreaRange([minArea, maxArea]);
  };

  // Memoize sorted and filtered records
  const filteredAndSortedRecords = useMemo(() => {
    let filteredRecords = [...propertyData];

    // Apply Commercial Filter
    if (commercialFilter) {
      filteredRecords = filteredRecords.filter(
        record => (commercialFilter === 'commercial' ? record.Commercial === 'Y' : record.Commercial === 'N')
      );
    }

    // Apply Price Range Filter
    filteredRecords = filteredRecords.filter(
      record => parseFloat(record.Price) >= priceRange[0] && parseFloat(record.Price) <= priceRange[1]
    );

    // Apply Carpet Area Range Filter
    filteredRecords = filteredRecords.filter(
      record => parseFloat(record.CarpetArea) >= carpetAreaRange[0] && parseFloat(record.CarpetArea) <= carpetAreaRange[1]
    );

    // Apply Sorting
    if (sortOption === 'carpetArea') {
      filteredRecords.sort((a, b) => parseFloat(b.CarpetArea) - parseFloat(a.CarpetArea));
    } else if (sortOption === 'price') {
      filteredRecords.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));
    } else if (sortOption === 'id') {
      filteredRecords.sort((a, b) => a.ID.localeCompare(b.ID));
    }

    return filteredRecords;
  }, [propertyData, commercialFilter, priceRange, carpetAreaRange, sortOption]);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredAndSortedRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div className="property-records-page">
      <h2>Property Records</h2>

      <div className="filter-options">
        <div className="search-sort-row">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by area name, city, or ID..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="sort-dropdown">
            <select value={sortOption} onChange={handleSort}>
              <option value="">Sort By</option>
              <option value="carpetArea">Carpet Area (sq.ft.)</option>
              <option value="price">Price</option>
              <option value="id">Property ID</option>
            </select>
          </div>
        </div>

        {/* New line for additional filters */}
        <div className="additional-filters">
          {/* Commercial Filter */}
          <div className="commercial-dropdown">
            <select value={commercialFilter} onChange={handleCommercialChange}>
              <option value="">All</option>
              <option value="commercial">Commercial</option>
              <option value="residential">Residential</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="price-range">
            <label>Price Range: </label>
            <select onChange={handlePriceChange}>
              <option value="0-100000000">Any</option>
              <option value="0-1000000">₹0 - ₹1,000,000</option>
              <option value="1000000-5000000">₹1,000,000 - ₹5,000,000</option>
              <option value="5000000-10000000">₹5,000,000 - ₹10,000,000</option>
              <option value="10000000-100000000">₹10,000,000+</option>
            </select>
          </div>

          {/* Carpet Area Range Filter */}
          <div className="carpet-area-range">
            <label>Carpet Area: </label>
            <select onChange={handleCarpetAreaChange}>
              <option value="0-5000">Any</option>
              <option value="0-1000">0 - 1,000 sq.ft.</option>
              <option value="1000-2000">1,000 - 2,000 sq.ft.</option>
              <option value="2000-5000">2,000 - 5,000 sq.ft.</option>
            </select>
          </div>
        </div>
      </div>

      <div className="records-container">
        {currentRecords.map((record, index) => (
          <div key={index} className="record-card">
            <h3>Property ID: {record.ID}</h3>
            <p>Price: ₹{record.Price}</p>
            <p>Carpet Area: {record.CarpetArea} sq.ft.</p>
            <p>Commercial: {record.Commercial === 'Y' ? 'Yes' : 'No'}</p>
            <p>Location: {record.Landmark}, {record.City}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        {currentPage > 1 && <button onClick={prevPage}>Previous</button>}
        {indexOfLastRecord < filteredAndSortedRecords.length && <button onClick={nextPage}>Next</button>}
      </div>

      {/* Map Container */}
      <div className="map-container">
        <MapContainer center={[19.0760, 72.8777]} zoom={10} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {currentRecords.map((record, index) => {
            const latitude = 19.0760 + index * 0.01; // Placeholder lat
            const longitude = 72.8777 + index * 0.01; // Placeholder lng

            return (
              <Marker key={index} position={[latitude, longitude]}>
                <Popup>
                  <strong>{record.ID}</strong><br />
                  {record.Landmark}, {record.City}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}

export default PropertyRecords;
