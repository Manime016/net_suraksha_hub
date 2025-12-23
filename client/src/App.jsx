import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Layout
import UserLayout from "./layouts/UserLayout";

// User Pages
import UserDashboard from "./pages/user/UserDashboard";
import RaiseComplaint from "./pages/user/RaiseComplaint";
import ComplaintStatus from "./pages/user/ComplaintStatus";
import StudyMaterial from "./pages/user/StudyMaterial";
import Certificate from "./pages/user/Certificate";
import Test from "./pages/user/Test";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageComplaints from "./pages/admin/ManageComplaints";
import ManageStudyMaterial from "./pages/admin/ManageCourses"; // 📚 Add this
import UserProgress from "./pages/admin/UserProgress";
import ApproveTests from "./pages/admin/ApproveTests";
import ApproveCertificates from "./pages/admin/ApproveCertificates";
import AddAdmin from './pages/admin/AddAdmin';

// Auth
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= USER ROUTES ================= */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="user">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="raise" element={<RaiseComplaint />} />
          <Route path="status" element={<ComplaintStatus />} />
          <Route path="study" element={<StudyMaterial />} />
          <Route path="test" element={<Test />} />
          <Route path="certificates" element={<Certificate />} />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <UserLayout isAdmin={true} />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="complaints" element={<ManageComplaints />} />
          <Route path="/admin-dashboard/materials" element={<ManageStudyMaterial />} />
          <Route path="progress" element={<UserProgress />} />
          <Route path="tests" element={<ApproveTests />} />
          <Route path="certificates" element={<ApproveCertificates />} />
          <Route path="/admin-dashboard/add-admin" element={<AddAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
