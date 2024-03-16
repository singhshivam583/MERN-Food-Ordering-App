import Hero from "@/components/Hero";
import Header from "../components/Navbar/Header";
import Footer from "@/components/Footer/Footer";

type Props = {
  children: React.ReactNode;
  showHero? : boolean;
};

const Layout = ({ children, showHero = false } : Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      {showHero && <Hero/>}
      <div className="container flex-1 py-10 mx-auto">
        {children}
      </div>
      <Footer/>
    </div>
  )
};

export default Layout;

