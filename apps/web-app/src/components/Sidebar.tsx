import { useSidebar } from "@/stores/sidebar";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsGithub, BsPlayFill, BsTvFill } from "react-icons/bs";
import { HiBookmark } from "react-icons/hi";
import { IoMdApps } from "react-icons/io";
import { RiMenu4Fill } from "react-icons/ri";

const sidebarCats = [
  [
    {
      name: "Home",
      icon: IoMdApps,
      link: "/",
      isCurrent: (path: string) => path == "/",
    },
    {
      name: "Movies",
      icon: BsPlayFill,
      link: "/movies",
      isCurrent: (path: string) => path == "/movies",
    },
    {
      name: "TV",
      icon: BsTvFill,
      link: "/tv",
      isCurrent: (path: string) => path == "/tv",
    },
  ],

  [
    {
      name: "Bookmarks",
      icon: HiBookmark,
      link: "/bookmarks",
      isCurrent: (path: string) => path == "/bookmarks",
    },
  ],

  [
    {
      name: "Github",
      icon: BsGithub,
      link: "/github",
      isCurrent: (path: string) => path == "/github",
    },
  ],
];

const Sidebar = () => {
  const router = useRouter();
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
      } fixed z-20 h-full border-r border-border border-opacity-[.24] bg-theme transition-all duration-300`}
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
        <div className="flex flex-col">
          {sidebarCats.map((cat, i) => (
            <div
              key={i}
              className="flex flex-col space-y-[26px] border-b border-border border-opacity-50 py-9"
            >
              {cat.map((i) => {
                const isCurrent = i.isCurrent(router.asPath);
                return (
                  <div
                    key={i.name}
                    className="group flex w-max cursor-pointer flex-row items-center space-x-4"
                  >
                    <Link href={i.link}>
                      <div
                        className={`${
                          isCurrent
                            ? "bg-white"
                            : "bg-gray group-hover:bg-white"
                        } flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-75`}
                      >
                        <i.icon
                          className={`${
                            isCurrent
                              ? "text-black"
                              : "text-white group-hover:text-black"
                          } h-4 w-4 transition-colors duration-75`}
                        />
                      </div>
                    </Link>
                    <div
                      className={`${
                        sidebarOpen ? "opacity-100" : "invisible opacity-0"
                      } ${
                        isCurrent
                          ? "text-white"
                          : "text-border group-hover:text-white"
                      } text-sm transition-all duration-200`}
                    >
                      {i.name}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
