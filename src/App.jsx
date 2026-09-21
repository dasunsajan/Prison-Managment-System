import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Prisoners from "./pages/Prisoners";
import Staff from "./pages/Staff";

function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-slate-50 min-h-screen">{children}</div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/prisoners"
          element={
            <Layout>
              <Prisoners />
            </Layout>
          }
        />
        <Route
          path="/staff"
          element={
            <Layout>
              <Staff />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;