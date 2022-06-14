import BlackOverlay from "./BlackOverlay";
import Container from "./Container";
import Header from "./header";
import Sidebar from "./sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Sidebar />
      <Container>
        <BlackOverlay />
        <Header />
        {children}
      </Container>
    </>
  );
};

export default Layout;
