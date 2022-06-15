import { useState } from "react";
import MenuIcon from "./MenuIcon";
import SearchBar from "./SearchBar";
import { UserButton } from "./UserButton";

const Header = () => {
  const [transparent, setTransparent] = useState(false);

  return (
    <div className="flex h-16 flex-row items-center justify-between md:h-20">
      <MenuIcon />
      <SearchBar transparent={transparent} />
      <UserButton />
    </div>
  );
};

export default Header;
