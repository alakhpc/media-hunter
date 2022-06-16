import { useState } from "react";
import MenuIcon from "./MenuIcon";
import SearchBar from "./SearchBar";
import { UserButton } from "./UserButton";

const Header = () => {
  const [transparent, setTransparent] = useState(true);

  return (
    <div
      className={`${
        transparent ? "bg-transparent" : "bg-theme"
      } mx-4 my-2 flex h-16 flex-row items-center justify-between md:h-20`}
    >
      <MenuIcon />
      <SearchBar transparent={transparent} />
      <UserButton />
    </div>
  );
};

export default Header;
