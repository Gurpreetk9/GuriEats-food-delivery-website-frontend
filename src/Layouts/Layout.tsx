import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";

type props = {
  children: React.ReactNode;
  ishero?: boolean;
};
function Layout({ children, ishero = false }: props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header></Header>
      {ishero && <Hero></Hero>}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
