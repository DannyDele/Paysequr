import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Dashboard from "./scenes/Dashboard";
import Layout from "./scenes/layout";
import Bills from "./scenes/bills";
import Customers from "./scenes/customers";
import Transactions from "./scenes/transactions";
import Monthly from "./scenes/monthly";
import Breakdown from "./scenes/breakdown";
import Admin from "./scenes/admin";
import Performance from "./scenes/performance";
import SignIn from "./scenes/signin";
import EscrowTransactions from "./components/EscrowTransactions";
import BillTransactions from "./components/BillTransactions";
import Message from "./scenes/message";
import RequireAuth from "./features/RequireAuth";
import UserInfo from "./scenes/userinfo";
import DisputeCases from "./scenes/DisputeCases";
import DisputeHistory from "./scenes/DisputeHistory";
import Delivery from "./scenes/Delivery";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <main>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<SignIn />} />
            {/*PROTECTED ROUTES*/}
            <Route element={<RequireAuth />}>
              <Route element={<Layout />}>
                <Route path="/overview" element={<Dashboard />} />
                <Route
                  path="/escrow-pay-transactions"
                  element={<EscrowTransactions />}
                />
                <Route path="/dispute-cases" element={<DisputeCases />} />
                <Route path="/dispute-history" element={<DisputeHistory />} />
                <Route path="/track-delivery" element ={<Delivery/>} />

                <Route path="/bills" element={<Bills />} />
                <Route path="/users" element={<Customers />} />
                <Route path="/users/:id" element={<UserInfo />} />
                <Route
                  path="/bill-transactions"
                  element={<BillTransactions />}
                />
                <Route path="/monthly" element={<Monthly />} />
                <Route path="/breakdown" element={<Breakdown />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/message" element={<Message />} />
              </Route>
              <Route path="/transactions" element={<Transactions />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </main>
  );
}

export default App;
