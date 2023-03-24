// import SuperAdmin from './pages/SuperAdmin/SuperAdmin';

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Dashboard from "./scenes/dashboard";
import Layout from "./scenes/layout";
import Bills from './scenes/bills';
import Customers from './scenes/customers';
import Transactions from './scenes/transactions';
import Geography from "./scenes/geography";
import Overview from "./scenes/overview";
import Daily from "./scenes/daily";
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

function App() {
const mode = useSelector((state) => state.global.mode);
const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <main>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace/>}/>
            <Route path="/login" element = {<SignIn/>} />
                        {/*PROTECTED ROUTES*/}
            <Route element={<RequireAuth/>}>
            <Route element={<Layout/>}>
            <Route path="/dashboard" element = {<Dashboard/>} />
            <Route path="/bills" element = {<Bills/>} />
            <Route path="/users" element ={<Customers/>} />
            <Route path="/users/:id" element ={<UserInfo/>} />
            <Route path="/bill-transactions" element ={<BillTransactions/>} />
            <Route path="/escrow-pay-transactions" element ={<EscrowTransactions/>} />
            {/* <Route path="/geography" element ={<Geography/>} /> */}
            <Route path="/overview" element ={<Overview/>} />
            <Route path="/daily" element ={<Daily/>} />
            <Route path="/monthly" element ={<Monthly/>} />
            <Route path="/breakdown" element ={<Breakdown/>} />
            <Route path="/admin" element ={<Admin/>} />
            <Route path="/performance" element ={<Performance/>} />
            <Route path="/message" element ={<Message/>} />
            </Route>
            <Route path="/transactions" element ={<Transactions/>} />
            </Route>
          </Routes>
        </ThemeProvider>
        </BrowserRouter>
    </main>
  );
}

export default App;
