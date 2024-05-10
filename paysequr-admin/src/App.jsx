import React, { useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import TransactionPage from './Component/Escrow/Transactions';
import DashboardBody from './Component/Dashboard/Dashboard';
import EcommercePage from './Component/Ecommerce/Ecommerce'; // Import your EcommercePage component
import Escrow from './Component/Escrow/Escrow'; // Import your PayEscrowPage component
import DisputeResolutionPage from './Component/Escrow/Dispute-resolution';
import ResolvedDisputePage from './Component/Escrow/Resolved-disputes';
import UnresolvedDisputesPage from './Component/Escrow/Unresolved-disputes';
import ChatBox from './Component/Escrow/Chatbox';
import BillPayment from './Component/Bill-Payment/Bill-payment';
import CategoriesManagementPage from './Component/Bill-Payment/Categories-management';
import ServiceProviderPage from './Component/Bill-Payment/Service-provider-management';
import PaymentTransactionPage from './Component/Bill-Payment/Payment-transactions';
import OrderPage from './Component/Ecommerce/Order-and-transactions';
import PendingListPage from './Component/Ecommerce/Pending-list';
import ProductManagementPage from './Component/Ecommerce/Product-management';
import UserDatabase from './Component/User-Management/User-database';
import UserPage from './Component/User-Management/User-management';
import UserActionPage from './Component/User-Management/User-actions';
import CommunicationWithUsers from './Component/User-Management/Communication';
import UserBanning from './Component/User-Management/User-banning';
import UserVerificationPage from './Component/User-Management/User-verification';
import PendingVerificationsPage from './Component/User-Management/Pending-verifications';
import QueriedVerifications from './Component/User-Management/Queried-verifications';
import CompletedVerifications from './Component/User-Management/Completed-verifications';
import FinancialAnalysisPage from './Component/Financial-Analytics/Financial-analysis';
import RevenueOverviewPage from './Component/Financial-Analytics/Revenue-overview';
import RevenueBreakdown from './Component/Financial-Analytics/Revenue-breakdown';
import RevenueTrends from './Component/Financial-Analytics/Revenue-trends';
import CustomerSupportPage from './Component/Customer-support/Customer-support';
import SupportTicketPage from './Component/Customer-support/Support-tickets';
import TicketResponsePage from './Component/Customer-support/Ticket-response';
import ReportAnalyticsPage from './Component/Report-analytics/Report-analytics';
import CustomReports from './Component/Report-analytics/Custom-reports';
import TransactionLog from './Component/Report-analytics/Transaction-log';
import UserActivityLogPage from './Component/Report-analytics/User-activity-log';
import SettingsPage from './Component/Settings/Settings';
import AppSettingsPage from './Component/Settings/App-setting';
import SecuritySettingsPage from './Component/Settings/Security-setting';
import NotificationPreferencesPage from './Component/Settings/Notification-preference';
import KYCVerificationPage from './Component/User-Management/KYC-verification';
import { Provider } from 'react-redux';
import store from './redux/store'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import theme from './assets/muiStyles/theme'
import TrackDeliveryStatusPage from './Component/Escrow/Delivery-status';
import MessagingSystem from './Component/Customer-support/Messaging';
import { useState } from 'react';
const App = () => {
 
  return (
    <Provider store={store}> {/* Wrap your App component with Provider and pass store as prop */}
            <ThemeProvider theme={theme}>


    <Router>
      <Routes> {/* Wrap Route components inside Routes */}
        <Route exact path="/" element={<DashboardBody  />} /> {/* Use 'element' prop to specify the component */}
        <Route path="/ecommerce" element={<EcommercePage  />} />
        <Route path="/escrow" element={<Escrow />} />
        {/* Add more routes for other tabs */}
        <Route path="/dispute-resolution" element={<DisputeResolutionPage />}/>
        <Route path="/transactions" element={<TransactionPage />}/>
        <Route path="/resolved-disputes" element={<ResolvedDisputePage/>}/>
        <Route path="/unresolved-disputes" element={<UnresolvedDisputesPage />}/>
        <Route path="/chat" element={<ChatBox />}/>
        <Route path="/billpayment" element={<BillPayment/>} />
        <Route path="/categories-management" element={<CategoriesManagementPage />}/>
        <Route path="/service-provider-management" element={<ServiceProviderPage />}/>
        <Route path="/payment-transactions" element={<PaymentTransactionPage />}/>
        <Route path ="/order-and-transactions" element={<OrderPage />}/>
        <Route path ="/pending-list" element={<PendingListPage />}/>
        <Route path ="/product-management" element={<ProductManagementPage />}/>
        <Route path="/user-database" element={<UserDatabase />}/>
        <Route path="/user-management" element={<UserPage />}/>
        <Route path="/user-actions" element={<UserActionPage />}/>
        <Route path="/communication" elemenet={<CommunicationWithUsers />}/>
        <Route path ="/user-banning" elementl={<UserBanning />}/>
        <Route path="/user-verification" element={<UserVerificationPage />}/>
        <Route path="/pending-verification" element={<PendingVerificationsPage />}/>
        <Route path="/queried-verification" element={<QueriedVerifications/>}/>
        <Route path="/completed-verification" element={<CompletedVerifications/>}/>
        <Route path="/financial-analysis" element={<FinancialAnalysisPage />}/>
        <Route path="/revenue-overview" element={<RevenueOverviewPage />}/>
        <Route path="/revenue-breakdown" element={<RevenueBreakdown />}/>
        <Route path="/revenue-trends" element={<RevenueTrends />}/>
        <Route path="/customer-support" element={<CustomerSupportPage />}/>
        <Route path="/support-ticket" element={<SupportTicketPage />}/>
        <Route path="/ticket-response" element={<TicketResponsePage />}/>
        <Route path="/report-analytics" element={<ReportAnalyticsPage />}/>
        <Route path="/custom-reports" element={<CustomReports />}/>
        <Route path="/transaction-logs" element={<TransactionLog />}/>
        <Route path="/user-activity" elemnt={<UserActivityLogPage />}/>
        <Route path="/settings" element={<SettingsPage />}/>
        <Route path="/app-setting" element={<AppSettingsPage />}/>
        <Route path="/security-setting" element={<SecuritySettingsPage />}/>
        <Route path="/notification-preference" element={<NotificationPreferencesPage />}/>
        <Route path="/kyc-verification" element={<KYCVerificationPage />}/>
        <Route path="/track-delivery-status" element={<TrackDeliveryStatusPage />}/>
        <Route path="/messaging-system" element={<MessagingSystem />}/>
      </Routes>
        </Router>
              </ThemeProvider>

          </Provider>

  );
};

export default App;
