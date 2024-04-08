import React from 'react';

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1>Financial Analysis</h1>
    </header>
  );
};

const headerStyle = {
  background: '#1F2937',
  color: '#fff', // Set the text color to white
  textAlign: 'center',
  padding: '10px',
};

export default Header;
