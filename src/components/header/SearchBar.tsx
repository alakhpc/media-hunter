import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import { HiSearch } from "react-icons/hi";
import { debounce } from "throttle-debounce";

interface SearchBarProps {
  transparent: boolean;
  hasTransparent: boolean;
}

const SearchBar = ({ transparent, hasTransparent }: SearchBarProps) => {
  const router = useRouter();
  const query = router.query.q;

  const onChange = debounce(200, (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    !!value && router.push(`/search?q=${value}`);
  });

  return (
    <div className="relative mx-4 w-96 md:ml-0">
      <input
        type="text"
        placeholder="Search"
        defaultValue={query}
        onChange={onChange}
        className={`${
          transparent
            ? "bg-white/10 shadow-lg backdrop-blur-[1px]"
            : hasTransparent
            ? "bg-graytext/20"
            : "bg-lightgray"
        } h-8 w-full rounded-md border-none pr-8 transition-colors duration-200 placeholder:text-white/70`}
      />
      <div className="absolute top-[6px] right-2 text-white/60">
        <HiSearch className="h-5 w-5" />
      </div>
    </div>
  );
};

export default SearchBar;
