import { useSidebar } from "@/stores/sidebar";

const BlackOverlay = () => {
  const mobileShown = useSidebar((s) => s.mobileShown);
  const toggleMobile = useSidebar((s) => s.toggleMobile);

  return (
    <div
      onClick={toggleMobile}
      className={`${
        mobileShown ? "block md:hidden" : "hidden"
      } fixed h-full w-full bg-black/50`}
    />
  );
};

export default BlackOverlay;
