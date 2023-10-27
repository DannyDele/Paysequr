import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Layout from "./pages/Layout";
import SignIn from "./pages/sign_in";
import EscrowTransactions from "./components/EscrowTransactions";
import Message from "./pages/message";
import RequireAuth from "./features/RequireAuth";
import DisputeCases from "./pages/escrow/dispute_cases";
import DisputeHistory from "./pages/escrow/dispute_history";
import Delivery from "./pages/escrow/delivery";
import Overview from "./pages/escrow/overview";

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
                {/* TAB 1. ESCROW PAYMENT MODULE: */}
                {/* Transactions overview */}
                <Route path="/overview" element={<Overview />} />
                {/* Ongoing Transaction */}
                <Route
                  path="/escrow-pay-transactions"
                  element={<EscrowTransactions />}
                />
                {/* Dispute resolution ==> Dispute cases */}
                <Route path="/dispute-cases" element={<DisputeCases />} />
                {/* Dispute resolution ==> Dispute History */}
                <Route path="/dispute-history" element={<DisputeHistory />} />
                {/* Track Delivery Status */}
                <Route path="/track-delivery" element={<Delivery />} />
                {/* ------------------------------ */}

                <Route path="/message" element={<Message />} />
              </Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </main>
  );
}

export default App;
