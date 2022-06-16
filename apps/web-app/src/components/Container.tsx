import { useSidebar } from "@/stores/sidebar";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  const sidebarOpen = useSidebar((s) => s.isOpen);

  return (
    <div
      className={`${
        sidebarOpen ? "md:ml-sidebarOpen" : "md:ml-sidebarClosed"
      } flex h-screen flex-col transition-all duration-300`}
    >
      {children}
    </div>
  );
};

export default Container;
