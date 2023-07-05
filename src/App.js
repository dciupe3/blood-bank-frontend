import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Layout from "./components/layout/general/Layout";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import DonorPage from "./pages/donor/Donor";
import DoctorPage from "./pages/doctor/Doctor";
import AdminPage from "./pages/admin/Admin";
import LayoutDonor from "./components/layout/donor/LayoutDonor";
import LayoutAdmin from "./components/layout/admin/LayoutAdmin";
import CreateDoctor from "./pages/doctor/CreateDoctor";
import AllDoctorsPage from "./pages/doctor/AllDoctors";
import LayoutMini2 from "./components/layout/general/LayoutMini2";
import LocationsPage from "./pages/location/Locations";
import DonorAppointmentsPage from "./pages/appointment/DonorAppointments";
import LayoutDoctor from "./components/layout/doctor/LayoutDoctor";
import DoctorAppointmentsPage from "./pages/appointment/DoctorAppointments";
import MapPage from "./pages/donor/MapPage";
import LayoutMap from "./components/layout/general/LayoutMap";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/login" element={<Layout><LoginPage /></Layout>} />
        <Route path="/signup" element={<Layout><SignUp /></Layout>} />
        <Route path="/donor" element={<LayoutDonor><DonorPage /></LayoutDonor>} />
        <Route path="/donor/map" element={<LayoutDonor><LayoutMap><MapPage /></LayoutMap></LayoutDonor>} />
        <Route path="/admin" element={<LayoutAdmin><AdminPage /></LayoutAdmin>} />
        <Route path="/doctor" element={<LayoutDoctor><DoctorPage /></LayoutDoctor>} />
        <Route path="/admin/create-doctor" element={<LayoutAdmin><CreateDoctor /></LayoutAdmin>} />
        <Route path="/admin/doctors" element={<LayoutAdmin><LayoutMini2><AllDoctorsPage /></LayoutMini2></LayoutAdmin>} />
        <Route path="/admin/doctors" element={<LayoutAdmin><LayoutMini2><AllDoctorsPage /></LayoutMini2></LayoutAdmin>} />
        <Route path="/donor/locations" element={<LayoutDonor><LayoutMini2><LocationsPage /></LayoutMini2></LayoutDonor>} />
        <Route path="/donor/appointments" element={<LayoutDonor><LayoutMini2><DonorAppointmentsPage /></LayoutMini2></LayoutDonor>} />
        <Route path="/doctor/appointments" element={<LayoutDoctor><LayoutMini2><DoctorAppointmentsPage /></LayoutMini2></LayoutDoctor>} />

      </Routes>
  );
}

export default App;
