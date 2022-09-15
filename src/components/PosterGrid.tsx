const sizes = {
  sm: "grid-cols-[repeat(auto-fill,minmax(110px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(148px,1fr))]",
  md: "grid-cols-[repeat(auto-fill,minmax(148px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]",
};

interface PosterGridProps {
  children: React.ReactNode;
  size: keyof typeof sizes;
}

const PosterGrid = ({ children, size }: PosterGridProps) => {
  return <div className={`${sizes[size]} grid gap-3`}>{children}</div>;
};

export default PosterGrid;
