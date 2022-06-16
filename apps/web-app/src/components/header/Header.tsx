import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { throttle } from "throttle-debounce";
import MenuIcon from "./MenuIcon";
import SearchBar from "./SearchBar";
import { UserButton } from "./UserButton";

const Header = () => {
  const router = useRouter();
  const hasTransparent = /^\/(movie|tv)\/\d+$/gm.test(router.asPath);
  const [transparent, setTransparent] = useState(true);

  const transparentScroll = 192;

  // Make header top transparent for /movie/123 and /tv/123
  useEffect(() => {
    const handleScroll = throttle(150, () => {
      if (window.scrollY > transparentScroll) {
        setTransparent(false);
      } else {
        setTransparent(true);
      }
    });

    if (hasTransparent) {
      setTransparent(true);
      document.addEventListener("scroll", handleScroll);
      return () => document.removeEventListener("scroll", handleScroll);
    } else {
      setTransparent(false);
    }
  }, [hasTransparent]);

  return (
    <div
      className={`${
        transparent
          ? "bg-transparent"
          : hasTransparent
          ? "bg-theme/75 shadow-lg shadow-white/20 backdrop-blur-md"
          : "bg-theme"
      } sticky top-0 z-10 flex h-16 flex-row items-center justify-between px-4 transition-colors duration-200 md:h-20`}
    >
      <MenuIcon />
      <SearchBar transparent={transparent} hasTransparent={hasTransparent} />
      <UserButton />
    </div>
  );
};

export default Header;
