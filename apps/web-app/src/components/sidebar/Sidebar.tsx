import { useSidebar } from "@/stores/sidebarStore";
import { BsGithub, BsTvFill } from "react-icons/bs";
import { HiBookmark, HiClock } from "react-icons/hi";
import { IoMdApps } from "react-icons/io";
import { MdMovie } from "react-icons/md";
import { RiMenu4Fill } from "react-icons/ri";
import SidebarIcons from "./SidebarIcons";

const sidebarCats = [
  [
    {
      name: "Home",
      icon: IoMdApps,
      link: "/",
      currentPageCheck: (path: string) => path == "/",
    },
    {
      name: "Movies",
      icon: MdMovie,
      link: "/genres/movie/28",
      currentPageCheck: (path: string) => path.startsWith("/genres/movie"),
    },
    {
      name: "TV",
      icon: BsTvFill,
      link: "/genres/tv/10759",
      currentPageCheck: (path: string) => path.startsWith("/genres/tv"),
    },
  ],

  [
    {
      name: "Bookmarks",
      icon: HiBookmark,
      link: "/bookmarks",
      currentPageCheck: (path: string) => path == "/bookmarks",
    },
    {
      name: "History",
      icon: HiClock,
      link: "/history",
      currentPageCheck: (path: string) => path == "/history",
    },
  ],

  [
    {
      name: "Github",
      icon: BsGithub,
      link: "/github",
      currentPageCheck: (path: string) => path == "/github",
    },
  ],
];

const Sidebar = () => {
  const sidebarOpen = useSidebar((s) => s.isOpen);
  const mobileShown = useSidebar((s) => s.mobileShown);
  const toggleSidebar = useSidebar((s) => s.toggle);

  return (
    <div
      className={`${sidebarOpen ? "w-sidebarOpen" : "w-sidebarClosed"} ${
        mobileShown
          ? "block"
          : sidebarOpen
          ? "-ml-sidebarOpen md:ml-0"
          : "-ml-sidebarClosed md:ml-0"
      } fixed z-30 h-full overflow-y-auto overflow-x-hidden border-r border-border border-opacity-[.24] bg-theme transition-all duration-300 scrollbar-hide`}
    >
      <div className="flex flex-col p-[30px]">
        <div className="flex flex-row items-center space-x-4">
          <div className="p-[2px]">
            <RiMenu4Fill
              onClick={toggleSidebar}
              className="h-7 w-7 shrink-0 cursor-pointer"
            />
          </div>
          <div
            className={`${
              sidebarOpen ? "opacity-90" : "invisible opacity-0"
            } whitespace-nowrap transition-all duration-200`}
          >
            Media-app
          </div>
        </div>

        <SidebarIcons categories={sidebarCats} />
      </div>
    </div>
  );
};

export default Sidebar;
