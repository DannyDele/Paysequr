import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import TransactionPage from './Component/Escrow/Transactions';
import DashboardBody from './Component/Dashboard/Dashboard';
// import EcommercePage from './EcommercePage'; // Import your EcommercePage component
import Escrow from './Component/Escrow/Escrow'; // Import your PayEscrowPage component
import DisputeResolutionPage from './Component/Escrow/Dispute-resolution';
import ResolvedDisputePage from './Component/Escrow/Resolved-disputes';
import UnresolvedDisputesPage from './Component/Escrow/Unresolved-disputes';
import ChatBox from './Component/Escrow/Chatbox';
import BillPayment from './Component/Bill-Payment/Bill-payment';
import CategoriesManagementPage from './Component/Bill-Payment/Categories-management';
import ServiceProviderPage from './Component/Bill-Payment/Service-provider-management';
import PaymentTransactionPage from './Component/Bill-Payment/Payment-transactions';

const App = () => {
  return (
    <Router>
      <Routes> {/* Wrap Route components inside Routes */}
        <Route exact path="/" element={<DashboardBody />} /> {/* Use 'element' prop to specify the component */}
        {/* <Route path="/ecommerce" element={<EcommercePage />} /> */}
        <Route path="/escrow" element={<Escrow />} />
        {/* Add more routes for other tabs */}
        <Route path="/dispute-resolution" element={<DisputeResolutionPage/>}/>
        <Route path="/transactions" element={<TransactionPage/>}/>
        <Route path="/resolved-disputes" element={<ResolvedDisputePage/>}/>
        <Route path="/unresolved-disputes" element={<UnresolvedDisputesPage/>}/>
        <Route path="/chat" element={<ChatBox/>}/>
        <Route path="/billpayment" element={<BillPayment />} />
        <Route path="/categories-management" element={<CategoriesManagementPage/>}/>
        <Route path="/service-provider-management" element={<ServiceProviderPage/>}/>
        <Route path="/payment-transactions" element={<PaymentTransactionPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
