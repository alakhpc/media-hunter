import { useSidebar } from "@/stores/sidebarStore";
import { RiMenu4Fill } from "react-icons/ri";

const MenuIcon = () => {
  const toggleMobile = useSidebar((s) => s.toggleMobile);

  return (
    <div onClick={toggleMobile} className="p-[2px] md:hidden">
      <RiMenu4Fill className="h-7 w-7 cursor-pointer" />
    </div>
  );
};

export default MenuIcon;
