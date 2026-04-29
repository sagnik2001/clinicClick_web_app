import { Modal, SimpleGrid, Button } from "@mantine/core";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { api_url } from "../../Urls/Api";
import { DashboardTopBar } from "../../Components/common/CareShell";

const dashboardLinks = [
  { name: "Dashboard", href: "/doctorDashboard" },
  { name: "Patient registry", href: "/doctorPatients" },
  { name: "Appointments", href: "/doctorappointment" },
  { name: "Profile", href: "/doctorDetails" },
];

const DashboardLayout = ({ children }) => {
  const [showLogout, setShowLogout] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${api_url}logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then(() => {
        localStorage.removeItem("token");
        navigate("/doctorlogin");
        toast.success("Logged out");
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/doctorlogin");
      });
  };

  return (
    <div className="care-dashboard">
      <DashboardTopBar
        links={dashboardLinks}
        activePath={location.pathname}
        onLogout={() => setShowLogout(true)}
        roleLabel="Health worker"
      />
      <main className="care-dashboard-main">{children}</main>

      <Modal
        opened={showLogout}
        onClose={() => setShowLogout(false)}
        title="Are you sure you want to logout?"
        centered
      >
        <SimpleGrid cols={2}>
          <Button variant="outline" onClick={() => setShowLogout(false)}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleLogout} color="red">
            Logout
          </Button>
        </SimpleGrid>
      </Modal>
    </div>
  );
};

export default DashboardLayout;
