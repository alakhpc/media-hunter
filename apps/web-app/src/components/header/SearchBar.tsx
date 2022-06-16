import { HiSearch } from "react-icons/hi";

interface SearchBarProps {
  transparent: boolean;
}

const SearchBar = ({ transparent }: SearchBarProps) => {
  return (
    <div className="relative mx-4 w-96 md:ml-0">
      <input
        type="text"
        placeholder="Search"
        className={`h-8 w-full pr-8 ${
          transparent
            ? "bg-white/10 shadow-lg backdrop-blur-sm"
            : "bg-lightgray"
        } rounded-md border-none placeholder:text-white/50`}
      />
      <div className="absolute top-[6px] right-2 text-white/60">
        <HiSearch className="h-5 w-5" />
      </div>
    </div>
  );
};

export default SearchBar;
