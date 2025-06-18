import { Outlet } from "react-router-dom";
import { Navbar } from "../../navbar";

export const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen dark:bg-gray-900">
        <div className="pt-16 ">
          <Outlet />
        </div>
      </main>
    </>
  );
};
