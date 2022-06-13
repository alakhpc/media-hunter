import { useState } from "react";
import MenuIcon from "./MenuIcon";
import SearchBar from "./SearchBar";
import { UserButton } from "./UserButton";

const Header = () => {
  const [transparent, setTransparent] = useState(false);

  return (
    <div className="flex h-20 flex-row items-center justify-between p-4 md:h-24 md:pl-0">
      <MenuIcon />
      <SearchBar transparent={transparent} />
      <UserButton />
    </div>
  );
};

export default Header;
