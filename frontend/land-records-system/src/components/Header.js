import React from 'react';
import { FaHome, FaFileAlt, FaExchangeAlt } from 'react-icons/fa';

function Header() {
  return (
    <header>
      <nav>
        <h1>Land Records Management</h1>
        <ul className="nav-links">
          <li><a href="/"><FaHome /> Home</a></li>
          <li><a href="/records"><FaFileAlt /> View Records</a></li>
          <li><a href="/transfer"><FaExchangeAlt /> Transfer Property</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
