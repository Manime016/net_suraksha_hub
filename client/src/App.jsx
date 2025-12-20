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


// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageComplaints from "./pages/admin/ManageComplaints";
import UserProgress from "./pages/admin/UserProgress";
import ApproveTests from "./pages/admin/ApproveTests";
import ApproveCertificates from "./pages/admin/ApproveCertificates";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Protected Routes with Shared Layout */}
        <Route path="/user-dashboard" element={<UserLayout />}>
          {/* This is the index route. 
              When the user visits /user-dashboard, it renders UserDashboard 
          */}
          <Route index element={<UserDashboard />} />

          {/* These are child routes. 
              They render INSIDE the UserLayout's <Outlet /> 
          */}
          <Route path="raise" element={<RaiseComplaint />} />
          <Route path="status" element={<ComplaintStatus />} />
          <Route path="study" element={<StudyMaterial />} />
          <Route path="test" element={<Test />} />
          <Route path="certificates" element={<Certificate />} />
        </Route>

        {/* Admin Routes */}
        {/* Admin Side */}
        <Route path="/admin-dashboard" element={<UserLayout isAdmin={true} />}>
          <Route index element={<AdminDashboard />} />
          <Route path="complaints" element={<ManageComplaints />} />
          <Route path="progress" element={<UserProgress />} />
          <Route path="tests" element={<ApproveTests />} />
          <Route path="certificates" element={<ApproveCertificates />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;