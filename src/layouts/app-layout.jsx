import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AppLayout = () => {
  const { sidebarCollapsed } = useSelector((state) => state.ui);

  return (
    <>
      <div className="w-full min-h-screen pb-10">
        <Navbar />
        <main className="mx-auto flex min-w-0 max-w-7xl grow flex-col sm:flex-row sm:py-6">
          {/* Sidebar */}
          <SideBar />

          {/* Main content */}
          <div
            style={{ scrollbarWidth: "none" }}
            className={`flex grow flex-col overflow-y-auto px-4 sm:p-6 transition-all duration-300
              ${sidebarCollapsed ? "sm:w-[calc(100%-4rem)]" : "sm:w-[calc(100%-14rem)]"}`}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default AppLayout;
