import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/roles" element={<h1>Choose Your Role</h1>} />
        <Route path="/admin" element={<h1>Admin Dashboard</h1>} />
        <Route path="/creator" element={<h1>Creator Dashboard</h1>} />
        <Route path="/student" element={<h1>Student Dashboard</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;