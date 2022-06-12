import { useSidebar } from "@/stores/sidebar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const sidebarOpen = useSidebar((s) => s.isOpen);
  const mobileShown = useSidebar((s) => s.mobileShown);
  const toggleSidebar = useSidebar((s) => s.toggle);
  const toggleMobile = useSidebar((s) => s.toggleMobile);

  return (
    <div>
      <Sidebar />
      <div
        className={`${
          sidebarOpen ? "md:ml-sidebarOpen" : "md:ml-sidebarClosed"
        } transition-all duration-300`}
      >
        <div>
          {mobileShown && (
            <div
              onClick={toggleMobile}
              className="fixed z-10 h-full w-full bg-black/50 md:hidden"
            />
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
