import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import RoleSelect from "./pages/RoleSelect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/roles" element={<RoleSelect />} />

        <Route path="/admin" element={<h1>Admin Dashboard</h1>} />
        <Route path="/creator" element={<h1>Creator Dashboard</h1>} />
        <Route path="/student" element={<h1>Student Dashboard</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;