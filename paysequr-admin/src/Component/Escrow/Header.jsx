import React from 'react';

const EscrowHeader = () => {
  return (
    <header style={headerStyle}>
      <h1>Escrow</h1>
    </header>
  );
};

const headerStyle = {
  background: '#1F2937', // Change the background color to red
  color: '#fff', // Set the text color to white
  textAlign: 'center',
  padding: '10px',
};

export default EscrowHeader;
