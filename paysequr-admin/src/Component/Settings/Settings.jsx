import React,{useState} from 'react';
import Header from './Header'; // Assuming you have a Header component
import Headermenu from './Menu'; // Assuming you have a DashboardBody component

const SettingsPage = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <Header />
      <Headermenu />
    </div>
  );
};

export default SettingsPage;
