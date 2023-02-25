import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";

import Topbar from "./components/global/Topbar";
import Sidebar from "./components/global/sidebar/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import Team from "./pages/users/Users";
import Clients from "./pages/clients/Clients";
import Invoices from "./pages/invoices/Invoices";
import ClientForm from "./pages/clientForm/ClientForm";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider<any> theme={theme}>
        <CssBaseline />
        <ProSidebarProvider>
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/clientForm" element={<ClientForm />} />
              </Routes>
            </main>
          </div>
        </ProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
export default App;
