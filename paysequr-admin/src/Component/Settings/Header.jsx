import React from 'react';

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={{ margin: '0 auto' }}> {/* Center the content */}
        <h1>Settings</h1>
      </div>
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
