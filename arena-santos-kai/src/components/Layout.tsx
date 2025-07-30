
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DashboardSidebar } from "./layout/DashboardSidebar";
import { DashboardHeader } from "./layout/DashboardHeader";
import { UserProfile } from "../pages/Login"; // Corrected path

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock user data - replace with actual auth context later
  const mockUser = {
    profile: "admin" as UserProfile,
    name: "Admin User",
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.removeItem('userToken');
    localStorage.removeItem('userProfile');
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar for Desktop */}
      <div className={`hidden lg:block transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <DashboardSidebar
          profile={mockUser.profile}
          currentPath={location.pathname}
          onNavigate={handleNavigate}
          isCollapsed={!isSidebarOpen}
        />
      </div>

      {/* Sidebar for Mobile (Drawer) */}
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60" onClick={() => setSidebarOpen(false)}></div>
      )}
      <div className={`fixed lg:hidden z-50 h-full bg-card transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <DashboardSidebar
          profile={mockUser.profile}
          currentPath={location.pathname}
          onNavigate={handleNavigate}
          isCollapsed={false}
        />
      </div>

      <div className="flex-1 flex flex-col">
        <DashboardHeader
          profile={mockUser.profile}
          userName={mockUser.name}
          onLogout={handleLogout}
          onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 p-6 lg:p-10 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
