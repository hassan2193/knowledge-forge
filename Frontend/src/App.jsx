import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import RoleSelect from "./pages/RoleSelect";
import AdminDashboard from "./pages/AdminDashboard";
import KnowledgeBase from "./pages/KnowledgeBase";
import DocumentViewer from "./pages/DocumentViewer";
import Sources from "./pages/Sources";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/roles" element={<RoleSelect />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/knowledge-base" element={<KnowledgeBase />} />
        <Route
  path="/admin/knowledge-base/:id"
  element={<DocumentViewer />}
/>
<Route
  path="/admin/sources"
  element={<Sources />}
/>
        <Route path="/creator" element={<h1>Creator Dashboard</h1>} />
        <Route path="/student" element={<h1>Student Dashboard</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;