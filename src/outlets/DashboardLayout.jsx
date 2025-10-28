import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/dashboard/adminSidebar";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
