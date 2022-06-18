import { useSidebar } from "@/stores/sidebarStore";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

interface SidebarIconProps {
  categories: {
    name: string;
    icon: IconType;
    link: string;
    currentPageCheck: (path: string) => boolean;
  }[][];
}

const SidebarIcon = ({ categories }: SidebarIconProps) => {
  const router = useRouter();
  const sidebarOpen = useSidebar((s) => s.isOpen);

  return (
    <>
      {categories.map((cat, i) => (
        <div
          key={i}
          className="flex flex-col space-y-[26px] border-b border-border border-opacity-50 py-9"
        >
          {cat.map(({ currentPageCheck, ...icon }, i) => {
            const isCurrent = currentPageCheck(router.asPath);
            return (
              <Link key={icon.name} href={icon.link}>
                <a className="w-min">
                  <div className="group flex cursor-pointer flex-row items-center space-x-4 pr-3">
                    <div
                      className={`${
                        isCurrent ? "bg-white" : "bg-gray group-hover:bg-white"
                      } flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200`}
                    >
                      <icon.icon
                        className={`${
                          isCurrent
                            ? "text-black"
                            : "text-white group-hover:text-black"
                        } h-4 w-4 transition-colors duration-200`}
                      />
                    </div>
                    <div
                      className={`${
                        sidebarOpen ? "opacity-100" : "opacity-0"
                      } ${
                        isCurrent
                          ? "text-white"
                          : "text-border group-hover:text-white"
                      } text-sm transition-all duration-200`}
                    >
                      {icon.name}
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      ))}
    </>
  );
};

export default SidebarIcon;
